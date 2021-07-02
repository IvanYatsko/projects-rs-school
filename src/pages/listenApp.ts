import { getCars } from '../api/garage/apiCar';
import STORE from '../store/store';
import { DISABLED, GARAGE_PAGE } from './app.config';
import { listenGarage } from './garage/listenGarage';
import { gameRace, removeCar, visibleNavigations } from './garage/renderCars/renderCar/listenCar';

import { renderCars } from './garage/renderCars/renderCars';
import { renderApp } from './renderApp';
import { listenWinners, sortScore } from './winner/listenWinner';

async function changePage() :Promise<void> {
  const arrayCars = await getCars(STORE.carsPage);
  STORE.cars = arrayCars.items;
  STORE.carsCount = +arrayCars.count;
  const nextPage = renderCars();
  (document.getElementById('main') as HTMLElement).innerHTML = nextPage;
}

function setDisabled(className: string, doc: HTMLElement | Document = document) {
  (doc.querySelector(className) as HTMLElement).setAttribute(DISABLED, DISABLED);
}

function removeDisabled(className: string, doc: HTMLElement | Document = document) {
  (doc.querySelector(className) as HTMLElement).removeAttribute(DISABLED);
}

function resAllFill() {
  const raceAll: boolean = STORE.driveAnimation.isRace;
  const resAll: boolean = STORE.driveAnimation.isReset;
  if (resAll) {
    if (document.querySelector('.reset') as HTMLElement) {
      removeDisabled('.reset');
    }
  } else if (document.querySelector('.reset') as HTMLElement) {
    setDisabled('.reset');
  }
  if (raceAll) {
    if (document.querySelector('.race') as HTMLElement) {
      removeDisabled('.race');
    }
  } else if (document.querySelector('.race') as HTMLElement) {
    setDisabled('.race');
  }
  const winnerElement: HTMLElement = document.querySelector('.winner-element') as HTMLElement;

  if (STORE.showTextWinner) {
    winnerElement.style.display = 'flex';
  }

  if (document.getElementById('add-name') as HTMLInputElement) {
    (document.getElementById('add-name') as HTMLInputElement).value = STORE.saveCreate.value;
  }
  if (document.getElementById('add-color') as HTMLInputElement) {
    (document.getElementById('add-color') as HTMLInputElement).value = STORE.saveCreate.color;
  }

  if (STORE.inputCreate) {
    (document.getElementById('add-name') as HTMLInputElement).value = STORE.inputCreate;
  }
  if (STORE.colorCreate) {
    (document.getElementById('add-color') as HTMLInputElement).value = STORE.colorCreate;
  }
}

async function fillFields(): Promise<void> {
  STORE.animation.forEach((item) => {
    const car: HTMLElement = document.getElementById(`car${item.id}`) as HTMLElement;
    if (car?.querySelector('.car-view__car') as HTMLElement) {
      (car?.querySelector('.car-view__car') as HTMLElement).style.left = `${item.dataAnimation.positionCar}%`;
    }
    if (item.dataAnimation.isStart) {
      if (car?.querySelector('.car-move__a') as HTMLElement) {
        removeDisabled('.car-move__a', car);
      }
    } else if (car?.querySelector('.car-move__a') as HTMLElement) {
      setDisabled('.car-move__a', car);
    }
    if (item.dataAnimation.isFinish) {
      if (car?.querySelector('.car-move__b') as HTMLElement) {
        removeDisabled('.car-move__b', car);
      }
    } else if (car?.querySelector('.car-move__b') as HTMLElement) {
      setDisabled('.car-move__b', car);
    }
  });
  resAllFill();
}

export function listenApp(): void {
  visibleNavigations();
  document.body.addEventListener('click', async (event: MouseEvent): Promise<void> => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('winners')) {
      STORE.view = 'winner';
      await listenWinners();
      visibleNavigations();
    }
    if (target.classList.contains('garage')) {
      STORE.view = 'garage';
      renderApp();
      await fillFields();
      visibleNavigations();
    }
    if (target.classList.contains('next')) {
      if (STORE.view === GARAGE_PAGE) {
        ++STORE.carsPage;
        changePage();
      } else {
        ++STORE.winnersPage;
        await listenWinners();
      }
      visibleNavigations();
    }
    if (target.classList.contains('prev')) {
      if (STORE.view === GARAGE_PAGE) {
        --STORE.carsPage;
        changePage();
      } else {
        --STORE.winnersPage;
        await listenWinners();
      }
      visibleNavigations();
    }
  });
  listenGarage();
  removeCar();
  gameRace();
  sortScore();
}

import { getCars } from '../api/garage/apiCar';
import STORE from '../store/store';
import { DISABLED } from './app.config';
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

async function fillFields(): Promise<void> {
  const raceAll: boolean = STORE.driveAnimation.race;
  const resAll: boolean = STORE.driveAnimation.reset;
  STORE.animation.forEach((item) => {
    const car: HTMLElement = document.getElementById(`car${item.id}`) as HTMLElement;
    if (car?.querySelector('.car-view__car') as HTMLElement) {
      (car?.querySelector('.car-view__car') as HTMLElement).style.left = `${item.dataAnimation.positionCar}%`;
    }
    if (item.dataAnimation.start) {
      if (car?.querySelector('.car-move__a') as HTMLElement) {
        (car.querySelector('.car-move__a') as HTMLElement).removeAttribute(DISABLED);
      }
    } else if (car?.querySelector('.car-move__a') as HTMLElement) {
      (car.querySelector('.car-move__a') as HTMLElement).setAttribute(DISABLED, DISABLED);
    }
    if (item.dataAnimation.finish) {
      if (car?.querySelector('.car-move__b') as HTMLElement) {
        (car.querySelector('.car-move__b') as HTMLElement).removeAttribute(DISABLED);
      }
    } else if (car?.querySelector('.car-move__b') as HTMLElement) {
      (car.querySelector('.car-move__b') as HTMLElement).setAttribute(DISABLED, DISABLED);
    }
  });
  if (resAll) {
    if (document.querySelector('.reset') as HTMLElement) {
      (document.querySelector('.reset') as HTMLElement).removeAttribute(DISABLED);
    }
  } else if (document.querySelector('.reset') as HTMLElement) {
    (document.querySelector('.reset') as HTMLElement).setAttribute(DISABLED, DISABLED);
  }
  if (raceAll) {
    if (document.querySelector('.race') as HTMLElement) {
      (document.querySelector('.race') as HTMLElement).removeAttribute(DISABLED);
    }
  } else if (document.querySelector('.race') as HTMLElement) {
    (document.querySelector('.race') as HTMLElement).setAttribute(DISABLED, DISABLED);
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
}

export function listenApp(): void {
  visibleNavigations();
  document.body.addEventListener('click', async (event: MouseEvent): Promise<void> => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('winners')) {
      STORE.view = 'winner';
      await listenWinners();
      renderApp();
    }
    if (target.classList.contains('garage')) {
      STORE.view = 'garage';
      renderApp();
      await fillFields();
      visibleNavigations();
    }
    if (target.classList.contains('next')) {
      ++STORE.carsPage;
      changePage();
      visibleNavigations();
    }
    if (target.classList.contains('prev')) {
      --STORE.carsPage;
      changePage();
      visibleNavigations();
    }
  });
  listenGarage();
  removeCar();
  gameRace();
  sortScore();
}

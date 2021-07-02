import { startStopEngine, switchEngine } from '../../api/engine/apiEngine';
import { IStartEngineResponse } from '../../api/engine/apiEngine.model';
import { createCar, updateCar } from '../../api/garage/apiCar';
import { ICarsResponse, ICreateCarParams } from '../../api/garage/apiCar.model';
import { createWinner, getWinner, updateWinner } from '../../api/winners/apiWinner';
import { IGetWinner, IUpdateWinners } from '../../api/winners/apiWinner.model';
import { generateRandomCars } from '../../shared/generateRandomCar';
import { svgCar } from '../../shared/svgCar';
import STORE from '../../store/store';
import { IAnimation, IFrame } from '../../store/store.model';
import {
  CARS_PAGE_COUNT, DISABLED, FIRST_WINS, MILLISECONDS, TO_FIXED_NUMBER,
} from '../app.config';
import {
  animationCar, cancelAnimation, emptyTextWinner, isFinish, reRendering, visibleNavigations,
} from './renderCars/renderCar/listenCar';
import { renderCar } from './renderCars/renderCar/renderCar';

export async function showWinner(time: number, car: ICarsResponse): Promise<void> {
  const winnerElement: HTMLElement = document.querySelector('.winner-element') as HTMLElement;
  if (winnerElement) {
    STORE.showTextWinner = `<p>${car.name} went first [${time}s]</p>`;
    winnerElement.innerHTML = STORE.showTextWinner;
    winnerElement.style.display = 'flex';
  }
}

export async function addWinner(time: number, car: ICarsResponse): Promise<void> {
  const aboutCar: IGetWinner = await getWinner(car.id);

  if (Object.keys(aboutCar).length === 0) {
    const dataWinner: IGetWinner = {
      id: car.id,
      wins: FIRST_WINS,
      time,
    };
    await createWinner(dataWinner);
  } else {
    const updWinner: IUpdateWinners = {
      wins: ++aboutCar.wins,
      time: time < aboutCar.time ? time : aboutCar.time,
    };
    await updateWinner(car.id, updWinner);
  }
}

export async function promisesAll(promises: Promise<IStartEngineResponse>[]): Promise<void> {
  let isWinner = false;
  Promise.all(promises).then((response) => {
    response.forEach(async (item, key) => {
      STORE.driveAnimation.isReset = true;
      const dataAnimation: IFrame = await animationCar(`${STORE.cars[key].id}`, item.distance, item.velocity);
      const carEl: HTMLElement = document.getElementById(`car${STORE.cars[key].id}`) as HTMLElement;
      (document.querySelector('.reset') as HTMLElement)?.removeAttribute(DISABLED);
      (carEl?.querySelector('.car-move__b') as HTMLElement)?.removeAttribute(DISABLED);

      STORE.animation.push({ id: `${STORE.cars[key].id}`, dataAnimation });
      const { isSuccess } = await switchEngine(STORE.cars[key].id);
      const isStopActive: string = (document.getElementById(`stop${STORE.cars[key].id}`) as
      HTMLElement)?.getAttribute(DISABLED) as string;
      STORE.animation = STORE.animation.map((elem: IAnimation) => {
        if (+elem.id === STORE.cars[key].id) {
          elem.dataAnimation.isDrive = false;
        }
        return elem;
      });
      if ((document.getElementById(`stop${STORE.cars[key].id}`) as HTMLElement)?.getAttribute(DISABLED)) {
        (document.getElementById(`start${STORE.cars[key].id}`) as HTMLElement)?.removeAttribute(DISABLED);
      }

      const isAllFinish: boolean = isFinish();
      if (isSuccess === false) {
        cancelAnimationFrame(dataAnimation.id);
      } else if (!isWinner && !isStopActive && !isAllFinish) {
        isWinner = true;
        const time: number = +(item.distance / item.velocity / MILLISECONDS).toFixed(TO_FIXED_NUMBER);
        await showWinner(time, STORE.cars[key]);
        await addWinner(time, STORE.cars[key]);
      }
      if (!STORE.animation.length && isAllFinish) {
        STORE.driveAnimation.isRace = true;
        (document.querySelector('.race') as HTMLElement)?.removeAttribute(DISABLED);
      }
    });
  });
}

export function resetAll(): void {
  emptyTextWinner();
  STORE.animation.forEach(async (item) => {
    cancelAnimation(item.id, item.dataAnimation.id);
    (document.getElementById(`stop${item.id}`) as HTMLElement)?.setAttribute(DISABLED, DISABLED);
    if (!item.dataAnimation.isDrive) {
      (document.getElementById(`start${item.id}`) as HTMLElement)?.removeAttribute(DISABLED);
    }
  });
}

export function buttonsRaceReset(): void {
  document.body.addEventListener('click', async (event: MouseEvent): Promise<void> => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('race')) {
      STORE.driveAnimation.isRace = false;
      target.setAttribute(DISABLED, DISABLED);

      const promises: Promise<IStartEngineResponse>[] = STORE.cars.map((item) => {
        const carEl: HTMLElement = document.getElementById(`car${item.id}`) as HTMLElement;
        (carEl.querySelector('.car-move__a') as HTMLElement).setAttribute(DISABLED, DISABLED);
        return startStopEngine(item.id);
      });
      await promisesAll(promises);
    }
    if (target.classList.contains('reset')) {
      STORE.driveAnimation.isReset = false;
      resetAll();
      const resetBut: HTMLElement = document.querySelector('.reset') as HTMLElement;
      resetBut?.setAttribute(DISABLED, DISABLED);
    }
  });
}

async function createGarageCar(target: HTMLElement) {
  const valueCar = (document.getElementById('add-name')) as HTMLInputElement;
  if (!valueCar.value) {
    valueCar.classList.add('error');
    target.setAttribute(DISABLED, DISABLED);
  } else {
    valueCar.classList.remove('error');
    const color: string = ((document.getElementById('add-color')) as HTMLInputElement).value;
    const object: ICreateCarParams = { name: valueCar.value, color };
    const newCar: ICarsResponse = await createCar(object);
    (document.getElementById('cars-count') as HTMLElement).innerHTML = `${++STORE.carsCount}`;
    if (STORE.cars.length <= CARS_PAGE_COUNT) {
      const garage = document.getElementById('cars');
      garage?.insertAdjacentHTML('beforeend', `${renderCar(newCar)}`);
      STORE.cars.push(newCar);
    }
    visibleNavigations();
    valueCar.value = '';
    STORE.inputCreate = '';
  }
}

export function listenGarage(): void {
  document.body.addEventListener('click', async (event: MouseEvent): Promise<void> => {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('create')) {
      createGarageCar(target);
    }
    if (target.classList.contains('update')) {
      const inputUpdate: HTMLInputElement = document.getElementById('update-name') as HTMLInputElement;
      const inputColor: HTMLInputElement = document.getElementById('update-color') as HTMLInputElement;
      const data: ICreateCarParams = { name: inputUpdate.value, color: inputColor.value };
      const idCar: string = inputUpdate.getAttribute('data-id') as string;
      const updateValue: ICarsResponse = await updateCar(+idCar, data);
      const changeCar: HTMLElement = document.getElementById(`car${updateValue.id}`) as HTMLElement;
      const changeCarValue: HTMLElement = changeCar.querySelector('.car-settings__title') as HTMLElement;
      changeCarValue.innerHTML = updateValue.name;
      const changeCarColor: HTMLElement = changeCar.querySelector('.car-view__car') as HTMLElement;
      changeCarColor.setAttribute('data-color', updateValue.color);
      changeCarColor.innerHTML = `${svgCar(updateValue.color)}`;
    }
    if (target.classList.contains('generate')) {
      const arrayCars: ICreateCarParams[] = generateRandomCars();
      const createCars = arrayCars.map((item) => createCar(item));
      await Promise.all(createCars);
      reRendering();
    }
  });
  const createValue = document.getElementById('add-name') as HTMLElement;
  createValue.addEventListener('input', (event) => {
    (document.querySelector('.create') as HTMLElement).removeAttribute(DISABLED);
    STORE.inputCreate = (event.target as HTMLInputElement).value;
  });
  const createColor = document.getElementById('add-color') as HTMLElement;
  createColor.addEventListener('input', (event) => {
    STORE.colorCreate = (event.target as HTMLInputElement).value;
  });
  buttonsRaceReset();
}

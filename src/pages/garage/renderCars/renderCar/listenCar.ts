import { startStopEngine, switchEngine } from '../../../../api/engine/apiEngine';
import { IStartEngineResponse } from '../../../../api/engine/apiEngine.model';
import { deleteCar } from '../../../../api/garage/apiCar';
import { IAnimation, IFrame } from '../../../../store/store.model';
import {
  DISABLED, MILLISECONDS, ONE_SECONDS, PERCENT_ALL, STOPPED,
} from '../../../app.config';
import { reRendering } from '../../listenGarage';

import STORE from '../../../../store/store';

export function removeCar(): void {
  document.body.addEventListener('click', async (event: MouseEvent): Promise<void> => {
    const target: HTMLElement = event.target as HTMLElement;

    if (target.classList.contains('car-button__remove')) {
      const carParrent: HTMLElement = target.closest('.car') as HTMLElement;
      const carId: string = carParrent.getAttribute('data-id') as string;
      await deleteCar(+carId);
      reRendering();
    }

    if (target.classList.contains('car-button__select')) {
      const carParrent: HTMLElement = target.closest('.car') as HTMLElement;
      const carName: HTMLElement = carParrent.querySelector('.car-settings__title') as HTMLElement;
      const carNameValue: string = carName.textContent as string;
      const carColor: HTMLElement = carParrent.querySelector('.car-view__car') as HTMLElement;
      const carColorValue: string = carColor.getAttribute('data-color') as string;
      const inputUpdate: HTMLInputElement = document.getElementById('update-name') as HTMLInputElement;
      const inputColor: HTMLInputElement = document.getElementById('update-color') as HTMLInputElement;
      inputUpdate.value = carNameValue;
      inputColor.value = carColorValue;
      inputUpdate.focus();
      const carId: string = carParrent.getAttribute('data-id') as string;
      inputUpdate.setAttribute('data-id', carId);
      const buttonUpdate: HTMLElement = document.querySelector('.update') as HTMLElement;
      buttonUpdate.removeAttribute('disabled');
    }
  });
}

export async function animationCar(car: string, distance: number, velocity: number): Promise<IFrame> {
  const startTime: number = new Date().getTime();
  const animFrameId: IFrame = {
    id: 0, positionCar: 0, start: false, finish: true, drive: true,
  };
  animFrameId.id = requestAnimationFrame(function animate() {
    const currTime: number = new Date().getTime();
    const timeMove: number = (distance / velocity) / MILLISECONDS;
    const timeFraction: number = (currTime - startTime + ONE_SECONDS) / MILLISECONDS;
    const distanceDrove: number = (timeFraction / timeMove) * PERCENT_ALL;
    animFrameId.positionCar = distanceDrove;
    const carEl = document.getElementById(`car${car}`) as HTMLElement;
    if (carEl) {
      (carEl.querySelector('.car-view__car') as HTMLElement).style.left = `${distanceDrove}%`;
    }
    if (velocity && distanceDrove < PERCENT_ALL) {
      animFrameId.id = requestAnimationFrame(animate);
    }
  });
  return animFrameId;
}

export function emptyTextWinner(): void {
  if (STORE.showTextWinner) {
    STORE.showTextWinner = '';
    (document.querySelector('.winner-element') as HTMLElement).style.display = 'none';
  }
}

export function initialSettings(): void {
  const resetBut: HTMLElement = document.querySelector('.reset') as HTMLElement;
  resetBut?.setAttribute(DISABLED, DISABLED);
  const receBut: HTMLElement = document.querySelector('.race') as HTMLElement;
  receBut?.removeAttribute(DISABLED);
}

export function isFinish(): boolean {
  const allCarsStart: NodeListOf<Element> = document.querySelectorAll('.car-move__a');
  let isAllFinish = true;
  allCarsStart.forEach((el: Element) => {
    if (el.getAttribute(DISABLED)) {
      isAllFinish = false;
    }
  });
  return isAllFinish;
}

export async function cancelAnimation(carId: string, animatId: number): Promise<void> {
  cancelAnimationFrame(animatId);
  const carEl: HTMLElement = (document.getElementById(`car${carId}`) as HTMLElement);

  (carEl?.querySelector('.car-move__b') as HTMLElement)?.setAttribute(DISABLED, DISABLED);

  const { velocity, distance } = await startStopEngine(+carId, STOPPED);
  animationCar(carId, distance, velocity);
  STORE.animation = STORE.animation.filter((item) => item.id !== carId);

  const isAllFinish: boolean = isFinish();
  if (STORE.animation.length === 0 && isAllFinish) {
    STORE.driveAnimation.race = true;
    initialSettings();
  }
}

export function gameRace(): void {
  document.body.addEventListener('click', async (event: MouseEvent): Promise<void> => {
    const target: HTMLElement = event.target as HTMLElement;

    if (target.classList.contains('car-move__a')) {
      target.setAttribute(DISABLED, DISABLED);
      const buttonRest: HTMLElement = document.getElementById('race') as HTMLElement;
      buttonRest.setAttribute(DISABLED, DISABLED);
      const carParrent: HTMLElement = target.closest('.car') as HTMLElement;
      const carParrentId: string = carParrent.getAttribute('data-id') as string;
      const startEngine: IStartEngineResponse = await startStopEngine(+carParrentId, 'started');
      const racing: IFrame = await animationCar(carParrentId, startEngine.distance, startEngine.velocity);
      STORE.animation.push({
        id: carParrentId,
        dataAnimation: racing,
      })
      carParrent.querySelector('.car-move__b')?.removeAttribute(DISABLED);
      const switchEngineValue = await switchEngine(+carParrentId);
      if (!switchEngineValue.success) {
        cancelAnimationFrame(racing.id);
      }
      racing.drive = false;
      if ((document.getElementById(`stop${carParrentId}`) as HTMLElement).getAttribute(DISABLED)) {
        (document.getElementById(`start${carParrentId}`) as HTMLElement).removeAttribute(DISABLED)
      }
      if (STORE.animation.length === 0) {
        (document.getElementById('race') as HTMLElement)?.removeAttribute(DISABLED);
      }
    }
    if (target.classList.contains('car-move__b')) {
      emptyTextWinner();
      const carParrent: HTMLElement = target.closest('.car') as HTMLElement;
      const carParrentId: string = carParrent.getAttribute('data-id') as string;
      const findIdStore: IAnimation = STORE.animation.find((item) => item.id === carParrentId) as IAnimation;
      cancelAnimation(carParrentId, findIdStore.dataAnimation.id);
      if (!findIdStore.dataAnimation.drive) {
        ((document.getElementById(`start${carParrentId}`) as HTMLElement).removeAttribute(DISABLED));
      }
    }
  });
}

import { startStopEngine } from '../../../../api/engine/apiEngine';
import { IStartEngineResponse } from '../../../../api/engine/apiEngine.model';
import { deleteCar } from '../../../../api/garage/apiCar';
import { IFrame } from '../../../../store/store.model';
import {
  DISABLED, MILLISECONDS, ONE_SECONDS, PERCENT_ALL,
} from '../../../app.config';
import { reRendering } from '../../listenGarage';

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
      await animationCar(carParrentId, startEngine.distance, startEngine.velocity);
    }
  });
}

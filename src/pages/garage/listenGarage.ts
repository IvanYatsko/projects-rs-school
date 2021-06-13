import { createCar } from "../../api/garage/apiCar";
import { ICarsResponse, ICreateCarParams } from "../../api/garage/apiCar.model";
import STORE from "../../store/store";
import { CARS_PAGE_COUNT, DISABLED } from "../app.config";
import { renderCar } from "./renderCars/renderCar/renderCar";

export function visibleNavigations(): void {
  const nextButton: HTMLElement = document.querySelector('.next') as HTMLElement;
  const prevButton: HTMLElement = document.querySelector('.prev') as HTMLElement;

  const lastPage = STORE.carsPage * CARS_PAGE_COUNT < STORE.carsCount;
  if (lastPage) {
    nextButton.removeAttribute(DISABLED);
  } else {
    nextButton.setAttribute(DISABLED, 'true');
  }

  const firstPage = STORE.carsPage > 1;
  if (firstPage) {
    prevButton.removeAttribute(DISABLED);
  } else {
    prevButton.setAttribute(DISABLED, 'true');
  }
}

export function listenGarage(): void {
  document.body.addEventListener('click', async (event: MouseEvent): Promise<void> => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('create')) {
      const value: string = ((document.getElementById('add-name')) as HTMLInputElement).value;
      const color: string = ((document.getElementById('add-color')) as HTMLInputElement).value;
      const object: ICreateCarParams = {name: value, color: color};
      const newCar: ICarsResponse = await createCar(object);
      (document.getElementById('cars-count') as HTMLElement).innerHTML = `${++STORE.carsCount}`;

      if (STORE.cars.length <= CARS_PAGE_COUNT) {
        const garage = document.getElementById('cars');
        garage?.insertAdjacentHTML('beforeend',`${renderCar(newCar)}`);
        STORE.cars.push(newCar);
      }
      visibleNavigations();
    }
  })
}

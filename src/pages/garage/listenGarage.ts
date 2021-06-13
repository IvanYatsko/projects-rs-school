import { createCar, getCars } from '../../api/garage/apiCar';
import { ICarsResponse, ICreateCarParams, IGetCars } from '../../api/garage/apiCar.model';
import { generateRandomCars } from '../../shared/generateRandomCar';
import STORE from '../../store/store';
import { CARS_PAGE_COUNT, DISABLED } from '../app.config';
import { renderCar } from './renderCars/renderCar/renderCar';
import { renderCars } from './renderCars/renderCars';

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
      const { value } = (document.getElementById('add-name')) as HTMLInputElement;
      const color: string = ((document.getElementById('add-color')) as HTMLInputElement).value;
      const object: ICreateCarParams = { name: value, color };
      const newCar: ICarsResponse = await createCar(object);
      (document.getElementById('cars-count') as HTMLElement).innerHTML = `${++STORE.carsCount}`;

      if (STORE.cars.length <= CARS_PAGE_COUNT) {
        const garage = document.getElementById('cars');
        garage?.insertAdjacentHTML('beforeend', `${renderCar(newCar)}`);
        STORE.cars.push(newCar);
      }
      visibleNavigations();
    }
    if (target.classList.contains('generate')) {
      const arrayCars: ICreateCarParams[] = generateRandomCars();
      arrayCars.forEach(async (item: ICreateCarParams) => {
        await createCar(item);
      });
      const newCars: IGetCars = await getCars(STORE.carsPage);
      STORE.cars = newCars.items;
      STORE.carsCount = +newCars.count;
      const mainBlock: HTMLElement = document.getElementById('main') as HTMLElement;
      const newBlockCars = renderCars();
      mainBlock.innerHTML = newBlockCars;
      visibleNavigations();
    }
  });
}

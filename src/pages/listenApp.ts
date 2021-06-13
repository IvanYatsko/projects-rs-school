import { getCars } from '../api/garage/apiCar';
import STORE from '../store/store';
import { listenGarage, visibleNavigations } from './garage/listenGarage';
import { renderCars } from './garage/renderCars/renderCars';
import { renderApp } from './renderApp';

export function listenApp(): void {
  visibleNavigations();
  document.body.addEventListener('click', async (event: MouseEvent): Promise<void> => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('winners')) {
      STORE.view = 'winner';
      renderApp();
    }
    if (target.classList.contains('garage')) {
      STORE.view = 'garage';
      renderApp();
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
}

async function changePage() :Promise<void> {
  const arrayCars = await getCars(STORE.carsPage);
  STORE.cars = arrayCars.items;
  STORE.carsCount = +arrayCars.count;
  const nextPage = renderCars();
  (document.getElementById('main') as HTMLElement).innerHTML = nextPage;
}

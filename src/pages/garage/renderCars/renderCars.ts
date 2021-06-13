import STORE from "../../../store/store";
import { renderCar } from "./renderCar/renderCar";

export function renderCars(): string {
  return `<h2 class="title title__main">Garage(<span id="cars-count">${STORE.carsCount}</span>)</h2>
  <h3 class="title title__page">Page#<span id="page">${STORE.carsPage}</span></h3>
  <div class="cars" id="cars">
  ${STORE.cars.map((car) => renderCar(car)).join('')}
  </div>`
}

import { ICarsResponse } from '../../../../api/garage/apiCar.model';
import { svgCar } from '../../../../shared/svgCar';

export function renderCar(car: ICarsResponse): string {
  return `<div class="car" id="car${car.id}" data-id="${car.id}">
  <div class="car-settings">
    <button class="button car-button__select" type="button">
      select
    </button>
    <button class="button car-button__remove" type="button">
      remove
    </button>
    <p class="title car-settings__title">${car.name}</p>
  </div>
  <div class="car-move">
    <button class="button car-move__a" type="button">a</button>
    <button class="button car-move__b" type="button" disabled>b</button>
  </div>
  <div class="car-view">
    <div class="car-view__road">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <picture class="car-view__car" data-color="${car.color}">${svgCar(car.color)}</picture>
    <img class="car-view__flag" src="./images/finish_flag.png" alt="flag" />
  </div>
</div>
`;
}

import { renderCars } from "./renderCars/renderCars";

export function renderGarage(): string {
  return `<div class="settings">
  <div class="settings-block">
    <input id="add-name" class="settings__name" type="text" />
    <input id="add-color" class="setting__color" type="color" />
    <button class="button create" type="button">create</button>
  </div>
  <div class="settings-block">
    <input id="update-name" class="settings__name" type="text" />
    <input id="update-color" class="setting__color" type="color" />
    <button class="button update" type="button">update</button>
  </div>
  <div class="settings-buttons">
    <button class="button race" type="button">race</button>
    <button class="button reset" type="button">reset</button>
    <button class="button generate" type="button">generate cars</button>
  </div>
</div>
<main id="main" class="main">
  ${renderCars()}
</main>`;
}

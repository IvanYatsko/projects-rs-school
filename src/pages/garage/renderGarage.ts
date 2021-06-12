export function renderGarage(): string {
  return `<div class="settings">
  <div class="settings-block">
    <input class="settings__name" type="text" />
    <input class="setting__color" type="color" />
    <button class="button create" type="button">create</button>
  </div>
  <div class="settings-block">
    <input class="settings__name" type="text" />
    <input class="setting__color" type="color" />
    <button class="button update" type="button">update</button>
  </div>
  <div class="settings-buttons">
    <button class="button race" type="button">race</button>
    <button class="button reset" type="button">reset</button>
    <button class="button generate" type="button">generate cars</button>
  </div>
</div>
<main class="main">
  <h2 class="title title__main">Garage(<span>4</span>)</h2>
  <h3 class="title title__page">Page#<span>1</span></h3>
  <div class="cars">
    <div class="car">
      <div class="car-settings">
        <button class="button car-button__select" type="button">
          select
        </button>
        <button class="button car-button__remove" type="button">
          remove
        </button>
        <p class="title car-settings__title">Tesla</p>
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
        <img class="car-view__car" src="./images/car.svg" alt="car" />
        <img class="car-view__flag" src="./images/finish_flag.png" alt="flag" />
      </div>
    </div>
  </div>
</main>`;
}

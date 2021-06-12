export function renderWinner(): string {
  return `<section class="section">
  <h2 class="title title__main">Garage(<span>4</span>)</h2>
  <h3 class="title title__page">Page#<span>1</span></h3>
  <div class="score">
    <div class="score-header">
      <div class="score-header__text">NUMBER</div>
      <div class="score-header__text">CAR</div>
      <div class="score-header__text">NAME</div>
      <div class="score-header__text">WINS</div>
      <div class="score-header__text">BEST TIME (SECONDS)</div>
    </div>
    <div class="score-main">
      <div class="score-main__text">1</div>
      <div class="score-main__text">
        <img src="./images/car.svg" alt="car">
      </div>
      <div class="score-main__text">Tesla</div>
      <div class="score-main__text">1</div>
      <div class="score-main__text">5</div>
    </div>
  </div>
</section>`;
}

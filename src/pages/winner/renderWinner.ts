import STORE from '../../store/store';
import { FIRST_WINS, WIN_PAGE_COUNT } from '../app.config';
import { renderScore } from './renderScore/renderScore';

export function renderWinner(): string {
  return `<section class="section">
  <h2 class="title title__main">Winners(<span>${STORE.winnersCount}</span>)</h2>
  <h3 class="title title__page">Page#<span>${STORE.winnersPage}</span></h3>
  <div class="score">
    <div class="score-header">
      <div class="score-header__text">NUMBER</div>
      <div class="score-header__text">CAR</div>
      <div class="score-header__text">NAME</div>
      <div class="score-header__wins">WINS <span>⇳</span></div>
      <div class="score-header__time">BEST TIME (SECONDS)<span>⇳</span></div>
    </div>
    ${STORE.winners.map((winnerValue,
    key) => renderScore(winnerValue, (STORE.winnersPage - FIRST_WINS) * WIN_PAGE_COUNT + key + FIRST_WINS)).join('')}
  </div>
</section>`;
}

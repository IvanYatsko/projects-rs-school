import STORE from '../store/store';
import { GARAGE_PAGE } from './app.config';
import { renderGarage } from './garage/renderGarage';
import { renderWinner } from './winner/renderWinner';

export async function renderApp(): Promise<void> {
  const app = `<nav class="navigation">
  <button class="button garage" type="button">to garage</button>
  <button class="button winners" type="button">to winners</button>
</nav>
${(STORE.view === GARAGE_PAGE) ? renderGarage() : renderWinner()}
<div class="main-buttons">
  <button class="button prev" type="button" disabled>prev</button>
  <button class="button next" type="button" disabled>next</button>
</div>
`;

  document.body.innerHTML = app;
}

import STORE from '../store/store';
import { renderApp } from './renderApp';

export function listenApp(): void {
  document.body.addEventListener('click', async (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('winners')) {
      STORE.view = 'winner';
      renderApp();
    }
    if (target.classList.contains('garage')) {
      STORE.view = 'garage';
      renderApp();
    }
  });
}

import { listenApp } from './pages/listenApp';
import { renderApp } from './pages/renderApp';
import { initStore } from './store/store';
import './styles.scss';

async function startApp(): Promise<void> {
  await initStore();
  await renderApp();
  listenApp();
}

startApp();

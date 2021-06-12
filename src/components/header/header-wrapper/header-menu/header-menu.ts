import './header-menu.scss';
import { BaseComponent } from '../../../base-component';
import { BaseLink } from './base-link';
import { Router } from '../../../../shared/router';
import {
  ABOUT, ABOUT_NAME, ABOUT_PAGE, BEST_SCORE, BEST_SCORE_NAME,
  BEST_SCORE_PAGE, GAME, GAME_NAME, SETTING, SETTING_NAME, SETTING_PAGE,
} from './header-menu.config';

export class HeaderMenu extends BaseComponent {
  private readonly aboutGame: BaseLink;

  private readonly bestScore: BaseLink;

  private readonly gameSettings: BaseLink;

  private readonly router: Router;

  constructor() {
    super('div', ['header-menu']);
    this.router = new Router();
    this.aboutGame = new BaseLink(`/#${ABOUT}`, ABOUT_PAGE);
    this.bestScore = new BaseLink(`/#${BEST_SCORE}`, BEST_SCORE_PAGE);
    this.gameSettings = new BaseLink(`/#${SETTING}`, SETTING_PAGE);

    this.element.appendChild(this.aboutGame.element);
    this.element.appendChild(this.bestScore.element);
    this.element.appendChild(this.gameSettings.element);
    this.addRoute();
  }

  addRoute(): void {
    this.router
      .add(ABOUT, ABOUT_NAME)
      .add(GAME, GAME_NAME)
      .add(SETTING, SETTING_NAME)
      .add(BEST_SCORE, BEST_SCORE_NAME);

    this.element.addEventListener('click', () => this.router.setRoute());
  }
}

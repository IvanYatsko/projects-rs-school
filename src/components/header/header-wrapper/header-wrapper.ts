import './header-wrapper.scss';
import { BaseComponent } from '../../base-component';
import { HeaderLogo } from './header-logo/header-logo';
import { HeaderMenu } from './header-menu/header-menu';
import { HeaderAuth } from './header-auth/header-auth';

export class HeaderWrapper extends BaseComponent {
  private readonly headerLogo: HeaderLogo;

  private readonly headerMenu: HeaderMenu;

  private readonly headerAuth: HeaderAuth;

  constructor() {
    super('div', ['header-wrapper']);
    this.headerLogo = new HeaderLogo();
    this.headerMenu = new HeaderMenu();
    this.headerAuth = new HeaderAuth();

    this.element.appendChild(this.headerLogo.element);
    this.element.appendChild(this.headerMenu.element);
    this.element.appendChild(this.headerAuth.element);
  }
}


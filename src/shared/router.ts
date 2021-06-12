import { ABOUT } from '../components/header/header-wrapper/header-menu/header-menu.config';
import { RoutesModel } from '../models/routes-model';

export class Router {
  private routes: RoutesModel[] = [];

  public root = ABOUT;

  add(path: string, name: string): Router {
    this.routes.push({ path, name });
    return this;
  }

  remove(path: string): Router {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  }

  flush(): Router {
    this.routes = [];
    return this;
  }

  getRoute(): string {
    this.setRoute();
    return this.root;
  }

  setRoute(root = ''): void {
    if (root !== '') {
      window.location.hash = root;
    }
    this.root = window.location.hash.toString().replace(/#/, '');
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  NavigationEnd,
  Data,
} from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export interface CustomRouteData extends Data {
  breadcrumb?: string;
}

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbsService {
  private _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.buildBreadcrumbs(this.router.routerState.snapshot.root))
      )
      .subscribe((breadcrumbs) => this._breadcrumbs$.next(breadcrumbs));
  }

  private buildBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const routeConfig = route.routeConfig;
    if (routeConfig?.path) {
      const path = routeConfig.path;
      url += `/${path}`;
      breadcrumbs.push({
        label: (routeConfig?.data as CustomRouteData)?.breadcrumb || path, // Tipado seguro
        url,
      });
    }

    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  //   private buildBreadcrumbs(
  //     route: ActivatedRouteSnapshot,
  //     url: string = '',
  //     breadcrumbs: Breadcrumb[] = []
  //   ): Breadcrumb[] {
  //     const routeConfig = route.routeConfig;
  //     if (routeConfig?.path) {
  //       const path = routeConfig.path;
  //       url += `/${path}`;
  //       breadcrumbs.push({
  //         label: routeConfig?.data?.breadcrumb || path,
  //         url,
  //       });
  //     }

  //     if (route.firstChild) {
  //       return this.buildBreadcrumbs(route.firstChild, url, breadcrumbs);
  //     }

  //     return breadcrumbs;
  //   }
}

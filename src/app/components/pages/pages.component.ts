import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { MenuItems } from '../shared/menu-items';
import { BreadcrumbsService } from '../../core/services/breadcrumbs.service';
import { InactivityService } from '../../core/services/inactivity.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css',
})
export class PagesComponent implements OnDestroy, AfterViewInit {
  breadcrumbs$ = this.breadcrumbsService.breadcrumbs$;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private breadcrumbsService: BreadcrumbsService,
    private inactivityService: InactivityService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 1024px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {}
}

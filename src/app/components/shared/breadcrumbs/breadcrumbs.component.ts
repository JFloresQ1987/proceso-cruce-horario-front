import { Component, Input } from '@angular/core';
import { Breadcrumb } from '../../../core/services/breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css',
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: Breadcrumb[] = [];
}

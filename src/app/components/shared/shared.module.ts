import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Error404Component } from './error404/error404.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuItems } from './menu-items';
import { MaterialModule } from '../../material/material.module';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    Error404Component
  ],
  exports: [
    SpinnerComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    Error404Component
  ],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [ MenuItems ]
})
export class SharedModule { }

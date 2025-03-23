import { Injectable } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

export interface Menu {
  name: string;
  roles: string[];
  children: MenuItem[];
}

export interface MenuItem {
  state: string;
  name: string;
  roles: string[];
  type: string;
  icon: string;
}

const MENUITEMS = [
  {
    name: 'Proceso',
    roles: ['ROLE_ADMIN', 'ROLE_USER'],
    children: [
      {
        state: 'generar-proceso',
        name: 'Generar Proceso',
        roles: ['ROLE_ADMIN', 'ROLE_USER'],
        type: 'link',
        icon: 'category',
      },
      {
        state: 'ver-proceso',
        name: 'Ver Proceso',
        roles: ['ROLE_ADMIN', 'ROLE_USER'],
        type: 'link',
        icon: 'format_list_numbered',
      },
    ],
  },
  {
    name: 'Seguridad',
    roles: ['ROLE_ADMIN'],
    children: [
      {
        state: 'usuario',
        name: 'Gestión de Usuario',
        roles: ['ROLE_ADMIN'],
        type: 'link',
        icon: 'supervisor_account',
      },
    ],
  },
  {
    name: 'Configuración',
    roles: ['ROLE_ADMIN'],
    children: [
      {
        state: 'absentismo',
        name: 'Absentismo',
        roles: ['ROLE_ADMIN'],
        type: 'link',
        icon: 'list_alt',
      },
      {
        state: 'tolerancia',
        name: 'Tolerancia',
        roles: ['ROLE_ADMIN'],
        type: 'link',
        icon: 'access_time',
      },      
    ],
  },
];

@Injectable()
export class MenuItems {
  constructor(private authService: AuthService) {}

  getMenuitem(): Menu[] {
    return MENUITEMS.filter((item) =>
      this.authService.hasRoles(item.roles)
    ).map((menu) => {
      menu.children = menu.children.filter((child: any) =>
        this.authService.hasRoles(child.roles)
      );
      return menu;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  fullName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fullName = this.authService.getFullName();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  changePassword(): void {
    this.router.navigateByUrl('/cambiar-clave');
  }
}

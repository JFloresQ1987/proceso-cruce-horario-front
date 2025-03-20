import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hide = true;
  username: string = '';
  password: string = '';
  // recaptchaResponse: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) // private recaptchaV3Service: ReCaptchaV3Service
  {}

  onSubmit(): void {
    if (this.username.trim() == '' || this.password.trim() == '') {
      // this.errorMessage = 'Correo electrónico o contraseña incorrectos';
      this.errorMessage = 'Correo electrónico o contraseña incorrectos';
      return;
    }

    // this.recaptchaV3Service.execute('login').subscribe((token: string) => {
    //   this.recaptchaResponse = token;
    this.authService
      .login(this.username, this.password /*, this.recaptchaResponse*/)
      .subscribe(
        (result) => {
          console.log(result.token);
          this.errorMessage = '';
          this.authService.setToken(result.token);
          this.router.navigate(['/generar-proceso']);
        },
        (error) => {
          this.errorMessage = 'Correo electrónico o contraseña incorrectos';
        }
      );
    // });
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hide = !this.hide;
  }
}

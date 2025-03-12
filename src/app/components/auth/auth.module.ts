import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,    
    HttpClientModule,    
  ]
})
export class AuthModule { }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, MatLabel, MatError],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  // loginForm: FormGroup;

  login(): void {
    console.log('login');
  }

  // constructor(
  //   private formBuilder: FormBuilder,
  //   private authService: AuthService,
  //   private router: Router
  // ) {
  //   this.loginForm = this.formBuilder.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required],
  //   });
  // }

  // get formControls() {
  //   return this.loginForm.controls;
  // }

  // login(): void {
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   const username = this.formControls['username'].value;
  //   const password = this.formControls['password'].value;

  //   this.authService.login(username, password).subscribe(
  //     () => {
  //       console.log('Inicio de sesión exitoso');
  //       this.router.navigate(['/productos']);
  //     },
  //     (error) => {
  //       console.error('Error al iniciar sesión:', error);
  //       // Manejar errores de inicio de sesión aquí
  //     }
  //   );
  // }

  // -----------------------------------------

  // constructor(private authService: AuthService, private router: Router) {}

  // login(): void {
  //   // Validar campos de usuario y contraseña, por ejemplo:
  //   if (!this.username || !this.password) {
  //     console.log('Por favor, ingrese usuario y contraseña');
  //     return;
  //   }

  //   this.authService.login(this.username, this.password).subscribe(
  //     () => {
  //       console.log('Inicio de sesión exitoso');
  //       // Redirigir a la vista de main después del inicio de sesión
  //       this.router.navigate(['/main']);
  //     },
  //     (error) => {
  //       console.error('Error de inicio de sesión:', error);
  //       // Manejar el error de inicio de sesión, por ejemplo, mostrar un mensaje de error al usuario
  //     }
  //   );
  // }
}

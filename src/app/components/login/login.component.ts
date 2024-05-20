import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  private tokenSubject: BehaviorSubject<string | null>;
  public token: Observable<string | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.tokenSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('token')
    );
    this.token = this.tokenSubject.asObservable();
  }

  public get tokenValue(): string | null {
    return this.tokenSubject.value;
  }

  login() {
    const url = 'http://localhost:3000/login';
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.http
      .post<any>(url, { username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.tokenSubject.next(response.token);
          this.router.navigate(['/main']); // Redirige a la página de /productos
        },
        error: (err) => {
          this.snackBar.open('Error al iniciar sesión', 'Cerrar');
        },
      });
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }
}

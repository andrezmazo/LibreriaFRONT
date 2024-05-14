import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap((response) => {
          // Guardar el token de autenticación en el localStorage
          localStorage.setItem('token', response.token);
        })
      );
  }

  logout() {
    // Eliminar el token de autenticación del localStorage
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Verificar si el token de autenticación está presente en el localStorage
    return !!localStorage.getItem('token');
  }
}

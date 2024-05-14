import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { QueryStringService } from './query-string-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    private queryStringService: QueryStringService
  ) {
    this.baseUrl = `${environment.apiBaseRoute}/user`;
  }

  getById(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${idUser}`);
  }

  create(user: User) {
    const newUser = this.prepareBody(user);
    return this.http
      .post<User>(`${this.baseUrl}/`, newUser)
      .pipe(map(this.prepareResponse));
  }

  delete(idUser: number): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/eliminar/${idUser}`);
  }
  //Funcion para crear el objeto de usuario
  private prepareBody(user: User) {
    return {
      username: user.username,
      password: user.password,
    };
  }

  //Funcion para mapear la respuesta
  private prepareResponse(user: User) {
    return user;
  }
}

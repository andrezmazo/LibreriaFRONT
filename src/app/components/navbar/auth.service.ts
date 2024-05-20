import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
('jwt-decode');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserInfo() {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded;
    }
    return null;
  }

  getUserName(): string | null {
    const userInfo = this.getUserInfo();
    return userInfo ? userInfo.username : null;
  }
}

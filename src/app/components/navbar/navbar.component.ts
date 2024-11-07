import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [MatButtonModule, MatCardModule],
})
export class NavbarComponent implements OnInit {
  username: string | null = '';
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.username = this.authService.getUserName();
  }
  logout() {
    localStorage.removeItem('token'); // Elimina el token JWT del almacenamiento local
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión (o a cualquier otra página deseada)
  }
}

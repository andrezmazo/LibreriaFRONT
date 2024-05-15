import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
// import { ProductosComponent } from './productos/productos.component';
// import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  // {
  //   path: 'login',
  //   loadComponent: () => {
  //     return import('./components/login/login.component').then(
  //       (module) => module.LoginComponent
  //     );
  //   },
  // },

  // { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
];

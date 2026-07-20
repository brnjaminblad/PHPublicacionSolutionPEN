import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'crear-aviso',
    loadComponent: () =>
      import('./pages/crear-aviso/crear-aviso.page').then(
        (m) => m.CrearAvisoPage
      ),
  },
];
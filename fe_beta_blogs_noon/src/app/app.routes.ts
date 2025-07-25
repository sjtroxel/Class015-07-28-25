import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { noAuthGuard } from './no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then((c) => c.LoginComponent),
    canActivate: [noAuthGuard],
  },
  {
    path: 'blogs/new',
    loadComponent: () => import('./features/blogs/blogs-new/blogs-new.component').then((c) => c.BlogsNewComponent),
    canActivate: [authGuard],
  }
];

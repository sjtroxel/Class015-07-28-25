import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { noAuthGuard } from './core/guards/no-auth-guard';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        loadComponent: () => import("./features/timeline/timeline").then((c) => c.Timeline),
        canActivate: [authGuard]
    },
    {
        path: "events",
        loadComponent: () => import("./features/events/events").then((c) => c.Events),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import("./features/auth/login/login").then((c) => c.Login),
        canActivate: [noAuthGuard]
    },
];

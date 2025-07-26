import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './core/services/user';
import { AuthenticationService } from './core/services/authentication';
import { of } from 'rxjs';

export function initializeUserData(userService:UserService, authService:AuthenticationService) {
  console.log("This executed!")
  if(authService.isLoggedIn()) {
    return () => userService.getBootstrapData().subscribe() 
  } else {
    return () => of(null);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), {
      provide: APP_INITIALIZER,
      useFactory: initializeUserData,
      deps: [UserService, AuthenticationService],
      multi: true
    },
    provideHttpClient()
  ]
};

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from './services/authentication';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const authToken = authService.getToken();

 console.log('Auth Interceptor → Token found?', !!authToken, 'URL:', req.url);

  const authReq = authToken
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      })
    : req;
  return next(authReq);
};

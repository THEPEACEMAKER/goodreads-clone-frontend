import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Client-side errors
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side errors
          if (error.status === 0) {
            errorMessage = 'Network error';
          } else if (error.status === 401) {
            errorMessage = 'Invalid username or password';
          } else if (error.status === 403) {
            errorMessage = 'You are not authorized to access this resource';
          } else if (error.error.message?.includes('E11000 duplicate key error collection')) {
            errorMessage = 'This email is already registered';
          } else if (error.error.message?.includes('Invalid password')) {
            errorMessage = 'Invalid password';
          } else {
            errorMessage = error.error.message || error.statusText;
          }
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}

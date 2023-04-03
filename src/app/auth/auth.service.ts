import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const user = currentUserData.user;
    const token = currentUserData.token;
    if (user && token) {
      this.currentUser.next(user);
    }
  }

  registerUser(formData: FormData): Observable<number> {
    const headers = new HttpHeaders();
    return this.http.post(`${this.baseUrl}/user/signup`, formData, { headers: headers }).pipe(
      map((response: any) => {
        return response.userId;
      }),
      catchError(this.handleError)
    );
  }

  loginUser(email: string, password: string): Observable<boolean> {
    const user = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/user/login`, user, { headers: headers }).pipe(
      map((response: any) => {
        const token = response.token;
        if (token) {
          const user = response.user;
          // Update the imageUrl property with the correct URL
          const filename = user.imageUrl.split('/').pop();
          user.imageUrl = `http://localhost:3000/images/${filename}`;
          localStorage.setItem('currentUser', JSON.stringify({ user: user, token: token }));
          this.currentUser.next(user);
          return true;
        } else {
          return false;
        }
      }),
      catchError(this.handleError)
    );
  }

  logoutUser(): void {
    this.currentUser.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  getToken(): string | null {
    const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUserData.token ? currentUserData.token : null;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 401) {
      errorMessage = 'Invalid username or password';
    } else if (error.status === 403) {
      errorMessage = 'You are not authorized to access this resource';
    } else if (error.error.message?.includes('E11000 duplicate key error collection')) {
      errorMessage = 'This email is already registered';
    } else if (error.error.message?.includes('Invalid password')) {
      errorMessage = 'Invalid password';
    } else if (error.status === 500) {
      errorMessage = 'An internal server error occurred';
    } else {
      errorMessage = error.message;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

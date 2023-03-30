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
  private token: string | null = null;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/register`, user, { headers: headers }).pipe(
      map((response: any) => {
        const newUser = { ...user, id: response.id };
        return newUser;
      }),
      catchError(this.handleError)
    );
  }

  loginUser(email: string, password: string): Observable<boolean> {
    const user = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/login`, user, { headers: headers }).pipe(
      map((response: any) => {
        const token = response.token;
        if (token) {
          this.token = token;
          const { password, ...userWithoutPassword } = user;
          localStorage.setItem(
            'currentUser',
            JSON.stringify({ user: userWithoutPassword, token: token })
          );
          this.loggedIn.next(true);
          return true;
        } else {
          return false;
        }
      }),
      catchError(this.handleError)
    );
  }

  logoutUser(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const authToken = currentUser.token;
    if (authToken && !this.token) {
      this.token = authToken;
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    return this.token;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 401) {
      errorMessage = 'Invalid username or password';
    } else if (error.status === 403) {
      errorMessage = 'You are not authorized to access this resource';
    } else if (error.status === 500) {
      errorMessage = 'An internal server error occurred';
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

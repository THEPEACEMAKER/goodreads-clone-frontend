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

  registerUser(user: User, file: File): Observable<User> {
    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('password', user.password ?? '');
    formData.append('role', user.role ?? 'user');
    formData.append('photo', file, file.name); // the image file

    const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    return this.http.post(`${this.baseUrl}/register`, formData, { headers: headers }).pipe(
      map((response: any) => {
        const newUser: User = { ...user, id: response.id, photoUrl: response.photoUrl };
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
          const { password, ...userWithoutPassword } = response.user;
          localStorage.setItem(
            'currentUser',
            JSON.stringify({ user: userWithoutPassword, token: token })
          );
          this.currentUser.next(userWithoutPassword);
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
    return currentUserData.token;
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

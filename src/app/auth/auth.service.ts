import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../interfaces';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.BASE_URL;
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
    return this.http.post(`${this.baseUrl}/auth/signup`, formData, { headers: headers }).pipe(
      map((response: any) => {
        return response.userId;
      })
    );
  }

  loginUser(email: string, password: string): Observable<boolean> {
    const user = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/auth/login`, user, { headers: headers }).pipe(
      map((response: any) => {
        const token = response.token;
        if (token) {
          const user: User = response.user;
          localStorage.setItem('currentUser', JSON.stringify({ user: user, token: token }));
          this.currentUser.next(user);
          return true;
        } else {
          return false;
        }
      })
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
}

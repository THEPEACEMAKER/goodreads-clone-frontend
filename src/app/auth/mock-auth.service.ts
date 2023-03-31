import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class MockAuthService {
  private users: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password',
      photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: 'user',
      books: [],
    },
  ];

  constructor() {}

  registerUser(user: User): Observable<User> {
    user.id = this.users.length + 1;
    this.users.push(user);
    return of(user);
  }

  loginUser(email: string, password: string): Observable<boolean> {
    const user = { email, password };
    const authenticatedUser = this.users.find(
      (u) => u.email === user.email && u.password === user.password
    );
    console.log(authenticatedUser);

    if (authenticatedUser) {
      const token = 'mock-token';
      localStorage.setItem('currentUser', JSON.stringify({ user: authenticatedUser, token }));
      return of(true);
    } else {
      return of(false);
    }
  }

  logoutUser(): void {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): Observable<boolean> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const authToken = currentUser.token;
    return of(!!authToken);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated();
  }
}

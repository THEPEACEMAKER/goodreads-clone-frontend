import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: 'user',
      books: [],
    },
  ];
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor() {
    const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const user = currentUserData.user;
    const token = currentUserData.token;
    if (user && token) {
      this.currentUser.next(user);
    }
  }

  registerUser(user: User, file: File): Observable<User> {
    user.id = this.users.length + 1;
    console.log(file);
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

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  logoutUser(): void {
    localStorage.removeItem('currentUser');
  }
}

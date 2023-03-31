import { Component } from '@angular/core';
import { MockAuthService } from './auth/mock-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: `
  //   <button (click)="register()">Register</button>
  //   <button (click)="login()">Log in</button>
  //   <button (click)="logout()">Log out</button>
  //   <p *ngIf="loggedIn$ | async">Logged in</p>
  //   <p *ngIf="!(loggedIn$ | async)">Not logged in</p>
  // `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loggedIn$ = this.authService.isLoggedIn();

  constructor(private authService: MockAuthService) {}

  register() {
    const user = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@example.com',
      password: 'password',
      photoUrl: 'img.png',
    };
    this.authService.registerUser(user).subscribe((result) => {
      console.log(result);
      // Check the result here
    });
  }

  login() {
    const email = 'janedoe@example.com';
    const password = 'password';
    this.authService.loginUser(email, password).subscribe((result) => {
      console.log(result);
      this.loggedIn$ = this.authService.isLoggedIn();
    });
  }

  logout() {
    this.authService.logoutUser();
    this.loggedIn$ = this.authService.isLoggedIn();
  }
}

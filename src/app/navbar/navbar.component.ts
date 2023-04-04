import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  currentUser: Observable<User | null> = this._authService.getCurrentUser();

  constructor(private _authService: AuthService) {}

  logout() {
    this._authService.logoutUser();
  }
}

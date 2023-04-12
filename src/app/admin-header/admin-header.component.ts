import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent {
  constructor(private _authService: AuthService, private router: Router) {}

  logout() {
    this._authService.logoutUser();
    this.router.navigate(['/']);
  }

  isToggled = false;

  toggleClass() {
    this.isToggled = !this.isToggled;
  }
}

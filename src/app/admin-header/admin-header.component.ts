import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  constructor(private _authService:AuthService){

  }

  logout() {
    this._authService.logoutUser();
  }
  

  isToggled = false;

  toggleClass() {
    this.isToggled = !this.isToggled;
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _Router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  loginUser = () => {
    if (this.email!.value && this.password!.value) {
      this._authService.loginUser(this.email?.value, this.password?.value).subscribe((res) => {
        if (res) {
          console.log('Works');
          this._Router.navigate(['/home']);
        } else {
          this.loginError = true;
        }
      });
    }
  };
}

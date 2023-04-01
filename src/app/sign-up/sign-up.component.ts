import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MockAuthService } from '../auth/mock-auth.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  // loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: MockAuthService,
    private _Router: Router
  ) {}

  ngOnInit() {
    // this.loginForm = this.fb.group({
    //   email: new FormControl('', Validators.required),
    //   password: new FormControl('', Validators.required),
    // });

    this.signUpForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.passwordValidator]],
        confirmPassword: ['', [Validators.required]],
        image: [''],
      },
      {
        validator: this.ComparePassword('password', 'confirmPassword'),
      }
    );
  }

  passwordValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    return regex.test(value) ? null : { notRegex: true };
  }

  ComparePassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }
  get lastName() {
    return this.signUpForm.get('lastName');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
  get image() {
    return this.signUpForm.get('image');
  }

  // loginUser = () => {};

  registerUser = () => {
    const user: User = {
      firstName: this.firstName!.value,
      lastName: this.lastName!.value,
      email: this.email!.value,
      password: this.password!.value,
      photoUrl: '',
      // role: this.role!.value,
    };

    const file = this.signUpForm.get('image')?.value;

    this._authService.registerUser(user, file).subscribe((newUser: User) => {
      console.log(newUser);
      this._Router.navigate(['/login']);
    });
  };
}

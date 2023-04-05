import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { UserRole } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  imageFile!: File;
  registerError: string | null = null;
  registerSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _Router: Router
  ) {}

  ngOnInit() {
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

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.imageFile = (target.files as FileList)[0];
  }

  registerUser = () => {
    const formData = new FormData();
    formData.append('firstName', this.firstName!.value);
    formData.append('lastName', this.lastName!.value);
    formData.append('email', this.email!.value);
    formData.append('password', this.password!.value);
    if (this.email!.value.includes('@admin.com')) {
      formData.append('role', UserRole.ADMIN);
    } else {
      formData.append('role', UserRole.USER);
    }

    formData.append('image', this.imageFile);

    this._authService.registerUser(formData).subscribe({
      next: (id: number) => {
        // registered successfully
        this.registerError = null;
        this.registerSuccess = true;
        setTimeout(() => {
          this._Router.navigate(['/login']);
        }, 1000);
      },
      error: (error) => {
        this.registerError = error;
      },
    });
  };
}

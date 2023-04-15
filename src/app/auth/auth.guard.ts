import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { User, UserRole } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      map((user: User | null) => {
        if (user && (state.url === '/login' || state.url === '/signup')) {
          this.router.navigate(['/home']);
          return false;
        } else if (user && user.role === UserRole.ADMIN) {
          return true;
        } else if (!user && (state.url === '/login' || state.url === '/signup')) {
          return true;
        } else {
          this.router.navigate(['/redirect']);
          return false;
        }
      })
    );
  }
}

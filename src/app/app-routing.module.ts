import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { RedirectComponent } from './redirect/redirect.component';
import { AdminAuthorComponent } from './admin-author/admin-author.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'admin', component: AdminMainComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {path: 'trial', component: AdminAuthorComponent},
  { path: 'redirect', component: RedirectComponent },
  { path: 'authors', component: AuthorsComponent },
  {path: 'authors/:id', component: AuthorDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

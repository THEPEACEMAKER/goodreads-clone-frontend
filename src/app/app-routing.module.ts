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
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailsComponent } from './categories/category-details/category-details.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksContainerComponent } from './books-container/books-container.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'admin', component: AdminMainComponent, canActivate: [AuthGuard] },
  { path: 'admin/authors', component: AdminAuthorComponent, canActivate: [AuthGuard] },
  { path: 'admin/books', component: AdminBooksComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard] },
  { path: 'redirect', component: RedirectComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'authors/:id', component: AuthorDetailsComponent },
  { path: 'categories/:id', component: CategoryDetailsComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'mybooks', component: MyBooksComponent },
  { path: 'allbooks', component: AllBooksComponent },
  { path: '**', component:NotFoundComponent},
  // { path: 'categories', component: categoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

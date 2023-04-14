import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { RedirectComponent } from './redirect/redirect.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { AdminAuthorComponent } from './admin-author/admin-author.component';
import { AuthorComponent } from './authors/author/author.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorDetailsComponent } from './authors/author-details/author-details.component';
import { BookCardComponent } from './book-card/book-card.component';
import { FooterComponent } from './footer/footer.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { NgbPaginationModule ,NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { BooksContainerComponent } from './books-container/books-container.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category/category.component';
import { CategoryDetailsComponent } from './categories/category-details/category-details.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { MyBooksComponent } from './my-books/my-books.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    AdminMainComponent,
    RedirectComponent,
    AdminBooksComponent,
    AdminAuthorComponent,
    AuthorComponent,
    AuthorsComponent,
    AuthorDetailsComponent,
    BookCardComponent,
    FooterComponent,
    AdminHeaderComponent,
    BooksContainerComponent,
    CategoriesComponent,
    CategoryComponent,
    CategoryDetailsComponent,
    BookDetailsComponent,
    MyBooksComponent
  ],
  imports: [BrowserModule, ReactiveFormsModule,NgbPaginationModule,NgbCarouselModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

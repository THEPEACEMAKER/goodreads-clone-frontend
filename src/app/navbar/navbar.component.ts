import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Book, User } from '../interfaces';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  currentUser: Observable<User | null> = this._authService.getCurrentUser();
  searchTerm: string = '';
  searchResults: Book[] = [];

  constructor(private _authService: AuthService, private _bookService: BookService) {}

  logout() {
    this._authService.logoutUser();
  }

  search() {
    this._bookService.searchBooks(this.searchTerm).subscribe({
      next: (response: any) => {
        this.searchResults = response.books;
        console.log(response.books);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

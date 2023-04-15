import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../interfaces';
import { ShelfService } from '../services/shelf.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css'],
})
export class MyBooksComponent {
  allBooks: Book[] = [];
  readBooks: Book[] = [];
  wantToReadBooks: Book[] = [];
  currentlyReadingBooks: Book[] = [];
  selectedContent = 'all';
  page = 1; // current page
  perPage = 10; // books per page
  totalBooks = 0;

  constructor(private bookService: BookService, private ShelfService: ShelfService) {}

  ngOnInit(): void {
    this.ShelfService.getUserBooks().subscribe((response) => {
      this.allBooks = response.books;
      this.totalBooks = response.totalBooks;
    });
  }

  showContent(content: string): void {
    this.selectedContent = content;

    switch (content) {
      case 'all':
        this.ShelfService.getUserBooks('', this.page, this.perPage).subscribe((response) => {
          this.allBooks = response.books;
          this.totalBooks = response.totalBooks;
        });
        break;
      case 'read':
        this.ShelfService.getUserBooks('READ', this.page, this.perPage).subscribe((response) => {
          this.readBooks = response.books;
          this.totalBooks = response.totalBooks;
        });
        break;
      case 'want-to-read':
        this.ShelfService.getUserBooks('WANT_TO_READ', this.page, this.perPage).subscribe(
          (response) => {
            this.wantToReadBooks = response.books;
            this.totalBooks = response.totalBooks;
          }
        );
        break;
      case 'currently-reading':
        this.ShelfService.getUserBooks('CURRENTLY_READING', this.page, this.perPage).subscribe(
          (response) => {
            this.currentlyReadingBooks = response.books;
            this.totalBooks = response.totalBooks;
          }
        );
        break;
    }
  }
}

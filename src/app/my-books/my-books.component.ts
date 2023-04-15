import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book} from '../interfaces';
import { ShelfService } from '../services/shelf.service';



@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent {
  allBooks: Book[] = [];
  readBooks: Book[] = [];
  wantToReadBooks: Book[] = [];
  currentlyReadingBooks: Book[] = [];
  selectedContent = 'all';

  constructor(private bookService: BookService, private ShelfService:ShelfService) {}

  ngOnInit(): void {
    this.ShelfService.getUserBooks().subscribe((response) => {
      this.allBooks = response.books;
    });
  }

  showContent(content: string): void {
    this.selectedContent = content;

    switch (content) {
      case 'all':
        if (!this.allBooks.length) {
          this.ShelfService.getUserBooks().subscribe((response) => {
            this.allBooks = response.books;
          });
        }
        break;
      case 'read':
        if (!this.readBooks.length) {
          this.ShelfService.getUserBooks('READ').subscribe((response) => {
            this.readBooks = response.books;
          });
        }
        break;
      case 'want-to-read':
        if (!this.wantToReadBooks.length) {
          this.ShelfService.getUserBooks('WANT_TO_READ').subscribe((response) => {
            this.wantToReadBooks = response.books;
          });
        }
        break;
      case 'currently-reading':
        if (!this.currentlyReadingBooks.length) {
          this.ShelfService.getUserBooks('CURRENTLY_READING').subscribe((response) => {
            this.currentlyReadingBooks = response.books;
          });
        }
        break;
    }
  }
}



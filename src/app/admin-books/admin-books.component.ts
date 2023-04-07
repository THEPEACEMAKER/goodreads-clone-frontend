import { Component, OnInit } from '@angular/core';
import { Book } from '../interfaces';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css'],
})
export class AdminBooksComponent {
  books: Book[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  editingBook: Book | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks(this.currentPage).subscribe(
      (response: any) => {
        // response.books // response.totalBooks
        this.books = response.books;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteBook(id: number): void {
    // console.log(id);
    this.bookService.deleteBook(id).subscribe(
      () => {
        this.books = this.books.filter((b) => b._id !== id);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getBooks();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book);
  }

  deleteBook(bookId: number): Observable<Book> {
    return this.http.delete<Book>(`${this.baseUrl}/${bookId}`);
  }

  updateBook(bookId: number, updates: Partial<Book>): Observable<Book> {
    return this.http.patch<Book>(`${this.baseUrl}/${bookId}`, updates);
  }

  getBooks(page: number = 1): Observable<Book[]> {
    const perPage = 10;
    const url = `${this.baseUrl}?page=${page}&perPage=${perPage}`;
    return this.http.get<Book[]>(url);
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${bookId}`);
  }

  // highest average rating or the most reviewed books
  // getPopularBooks(): Observable<Book[]>
}

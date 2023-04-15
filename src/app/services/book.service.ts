import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = `${environment.BASE_URL}/books`;

  constructor(private http: HttpClient) {}

  addBook(formData: FormData): Observable<Book> {
    const headers = new HttpHeaders();
    return this.http.post<Book>(this.baseUrl, formData, { headers: headers });
  }

  deleteBook(bookId: number): Observable<Book> {
    return this.http.delete<Book>(`${this.baseUrl}/${bookId}`);
  }

  updateBook(bookId: number, updates: FormData): Observable<Book> {
    return this.http.patch<Book>(`${this.baseUrl}/${bookId}`, updates);
  }

  getBooks(page: number = 1, perPage: number = 10): Observable<Book[]> {
    console.log(this.baseUrl);
    const url = `${this.baseUrl}?page=${page}&perPage=${perPage}`;
    console.log(url);
    return this.http.get<Book[]>(url);
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${bookId}`);
  }

  getBooksByCategory(categoryId: string): Observable<Book[]> {
    console.log(`${this.baseUrl}/${categoryId}/books`);
    const url: string = `${this.baseUrl.split('b')[0]}`;
    return this.http.get<Book[]>(`${url}categories/${categoryId}/books`);
  }

  // highest average rating or the most reviewed books
  // getPopularBooks(): Observable<Book[]>
}

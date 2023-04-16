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
    const headers = new HttpHeaders();
    return this.http.patch<Book>(`${this.baseUrl}/${bookId}`, updates, { headers: headers });
  }

  getBooks(page: number = 1, perPage: number = 10): Observable<Book[]> {
    const url = `${this.baseUrl}?page=${page}&perPage=${perPage}`;
    return this.http.get<Book[]>(url);
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${bookId}`);
  }

  getBooksByCategory(categoryId: string, page: number, perPage: number = 6): Observable<Book[]> {
    return this.http.get<Book[]>(
      `${environment.BASE_URL}/categories/${categoryId}/books?page=${page}&perPage=${perPage}`
    );
  }

  searchBooks(searchTerm: string): Observable<Book[]> {
    const url = `${environment.BASE_URL}/books/search?name=${searchTerm}`;
    return this.http.get<Book[]>(url);
  }

  // highest average rating or the most reviewed books
  getPopularBooks(): Observable<Book[]> {
    const url = `${this.baseUrl}/popular`;
    return this.http.get<Book[]>(url);
  }
}

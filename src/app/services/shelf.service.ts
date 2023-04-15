import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BookShelf } from '../interfaces';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class ShelfService {
  private baseUrl = `${environment.BASE_URL}/user`;

  constructor(private http: HttpClient) {}
  // 'WANT_TO_READ', 'CURRENTLY_READING', 'READ', 'NONE'
  addToShelf(bookId: number, shelf: BookShelf | string): Observable<any> {
    const body = { bookId, shelf };

    return this.http.post(`${this.baseUrl}/book`, body);
    // { message: 'Book Added successfully' }
  }

  getUserBooks(
    shelf?: string, // noshelf=allbooks 'WANT_TO_READ', 'CURRENTLY_READING', 'READ'
    page = 1,
    perPage = 10
  ): Observable<{ books: Book[]; totalBooks: number }> {
    let params = new HttpParams().set('page', page.toString()).set('perPage', perPage.toString());

    if (shelf) {
      params = params.set('shelf', shelf);
    }

    return this.http.get<{ books: Book[]; totalBooks: number }>(`${this.baseUrl}/books`, {
      params,
    });
  }
}

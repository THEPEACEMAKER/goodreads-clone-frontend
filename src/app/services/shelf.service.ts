import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookShelf } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ShelfService {
  private baseUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  addToShelf(bookId: number, shelf: BookShelf): Observable<any> {
    const body = { bookId, shelf };
    console.log(`${this.baseUrl}/book`);
    
    return this.http.post(`${this.baseUrl}/book`, body);
    // { message: 'Book Added successfully' }
  }

  updateShelf(bookId: any, shelf: BookShelf): Observable<any> {
    const body = { bookId, shelf };
    return this.http.patch(`${this.baseUrl}/${bookId}`, body);
    // { message: 'User shelf updated successfully', updateData: user }
  }

  deleteFromShelf(bookId: number): Observable<any> {
    const body = { bookId };
    return this.http.delete(`${this.baseUrl}/${bookId}`, { body });
    // { message: 'Book removed from user books', user: user }
  }
}

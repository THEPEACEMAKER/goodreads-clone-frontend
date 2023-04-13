import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private baseUrl = 'http://localhost:3000/ratings';

  constructor(private http: HttpClient) {}

  addRating(bookId: number, rate: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.baseUrl}/${bookId}`, { rate }, { headers: headers });
    // { message: 'Rating added successfully' }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../interfaces';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl = `${environment.BASE_URL}/reviews`;

  constructor(private http: HttpClient) {}

  // Add a new review
  addReview(bookId: number,review:Review): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/${bookId}`,review);
  }

  // Delete a review by ID
  deleteReview(reviewId: string): Observable<Review> {
    const url = `${this.baseUrl}/${reviewId}`;
    return this.http.delete<Review>(url);
  }

  // Update a review by ID
  updateReview(reviewId: string, review: Review): Observable<Review> {
    const url = `${this.baseUrl}/${reviewId}`;
    return this.http.patch<Review>(url, review);
  }

  // Get all reviews
  getAllReviews(page: number = 1): Observable<Review[]> {
    const perPage = 10;
    const url = `${this.baseUrl}?page=${page}&perPage=${perPage}`;
    return this.http.get<Review[]>(url);
  }

  // Get a review by ID
  getReviewById(reviewId: string): Observable<Review> {
    const url = `${this.baseUrl}/${reviewId}`;
    return this.http.get<Review>(url);
  }

  // Get all reviews for a book by book ID
  getReviewsByBookId(bookId: number,page:number,perPage:number=5): Observable<Review[]> {
    const url = `${this.baseUrl}/${bookId}?page=${page}&perPage=${perPage}`;
    return this.http.get<Review[]>(url);
  }

  // Get all reviews for a user by user ID
  getReviewsByUserId(userId: string): Observable<Review[]> {
    const url = `${this.baseUrl}?userId=${userId}`;
    return this.http.get<Review[]>(url);
  }
}

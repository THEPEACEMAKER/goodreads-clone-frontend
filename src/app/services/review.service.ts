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
  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.baseUrl, review);
  }

  // Delete a review by ID
  deleteReview(reviewId: number): Observable<Review> {
    const url = `${this.baseUrl}/${reviewId}`;
    return this.http.delete<Review>(url);
  }

  // Update a review by ID
  updateReview(reviewId: number, review: Review): Observable<Review> {
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
  getReviewById(reviewId: number): Observable<Review> {
    const url = `${this.baseUrl}/${reviewId}`;
    return this.http.get<Review>(url);
  }

  // Get all reviews for a book by book ID
  getReviewsByBookId(bookId: number): Observable<Review[]> {
    const url = `${this.baseUrl}?bookId=${bookId}`;
    return this.http.get<Review[]>(url);
  }

  // Get all reviews for a user by user ID
  getReviewsByUserId(userId: number): Observable<Review[]> {
    const url = `${this.baseUrl}?userId=${userId}`;
    return this.http.get<Review[]>(url);
  }
}

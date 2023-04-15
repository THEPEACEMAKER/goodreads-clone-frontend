import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = `${environment.BASE_URL}/categories`;

  constructor(private http: HttpClient, private _router: Router) {}

  // Add a new category
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  // Delete a category by ID
  deleteCategory(categoryId: number): Observable<Category> {
    const url = `${this.baseUrl}/${categoryId}`;
    return this.http.delete<Category>(url);
  }

  // Update a category by ID
  updateCategory(categoryId: number, category: Category): Observable<Category> {
    const url = `${this.baseUrl}/${categoryId}`;
    return this.http.patch<Category>(url, category);
  }

  // Get all categories
  getAllCategories(page: number = 1, perPage: number = 10): Observable<Category[]> {
    const url = `${this.baseUrl}?page=${page}&perPage=${perPage}`;
    return this.http.get<Category[]>(url);
  }

  // Get a category by ID
  getCategoryById(categoryId: string): Observable<Category> {
    const url = `${this.baseUrl}/${categoryId}`;
    return this.http.get<Category>(url);
  }

  navigateToCategoryDetails(category: any) {
    this._router.navigate(['/categories', category._id]);
  }

  // the categories with the most books or the categories with the highest-rated books
  // getPopularCategories(): Observable<Category[]>
}

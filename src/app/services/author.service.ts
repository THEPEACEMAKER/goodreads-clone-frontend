import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Author } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private baseUrl = 'http://localhost:3000/authors';

  constructor(private http: HttpClient) {}

  addAuthor(formData:FormData): Observable<Author> {
    // return this.http.post<Author>(this.baseUrl, author);

    const headers = new HttpHeaders();
    return this.http.post(`${this.baseUrl}`, formData, { headers: headers }).pipe(
      map((response: any) => {
        return response.authorId;
      })
    );
  }

  deleteAuthor(authorId: number): Observable<Author> {
    return this.http.delete<Author>(`${this.baseUrl}/${authorId}`);
  }

  updateAuthor(authorId: number, updates: FormData): Observable<Author> {
    return this.http.patch<Author>(`${this.baseUrl}/${authorId}`, updates);
  }

  getAuthors(page: number = 1): Observable<Author[]> {
    const perPage = 10;
    const url = `${this.baseUrl}?page=${page}&perPage=${perPage}`;
    return this.http.get<Author[]>(url).pipe(
      map((response: any) => {
        response.authors.forEach((author:any)=>{
          const filename = author.imageUrl.split('/').pop();
          author.imageUrl=`http://localhost:3000/images/${filename}`
        })
        return response.authors;
      })
    );;
  }

  // not implemented in the backend yet
  // getAuthorById(authorId: number): Observable<Author> {
  //   return this.http.get<Author>(`${this.baseUrl}/${authorId}`);
  // }

  // the authors with the most books or the authors with the highest-rated books
  // getPopularAuthors(): Observable<Author[]>
}

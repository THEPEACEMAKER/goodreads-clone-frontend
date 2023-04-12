import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author, Book } from 'src/app/interfaces';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css'],
})
export class AuthorDetailsComponent {
  id: string;
  author: Author | undefined;
  books: Book[]=[];
  page: number=1;
  perPage:number=5;
  totalBooks: number=15;
  constructor(private _authorService: AuthorService, private _activatedRoute: ActivatedRoute) {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.getAuthorById();
    this.getAuthorBooks();
  }

  getAuthorById(){
    this._authorService.getAuthorById(this.id).subscribe({
      next: (response: any) => {
        this.author = response.author;
      },
      error: (error) => {},
    });
  }
  getAuthorBooks(){
    this._authorService.getAuthorBooks(this.id,this.page,this.perPage).subscribe({
      next: (response: any) => {
        this.books=response.authorBooks;
        this.totalBooks=response.totalBooks;
      },
      error: (error) => {},
    })
  }
}

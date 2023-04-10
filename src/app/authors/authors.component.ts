import { Component } from '@angular/core';
import { Author } from '../interfaces/author.interface';
import { AuthorService } from '../services/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent {
  authors: Author[] = [];
  totalAuthors: number = 0;
  constructor(private _authorService: AuthorService) {
    this.getAllAuthors();
  }
  getAllAuthors(): void {
    this._authorService.getAuthors().subscribe({
      next: (response: any) => {        
        this.authors = [...response.authors];
        this.totalAuthors = response.totalAuthors;
      },
    });
  }
}

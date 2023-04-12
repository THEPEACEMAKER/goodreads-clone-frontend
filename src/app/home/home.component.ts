import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Author, Book } from '../interfaces';
import { AuthorService } from '../services/author.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  books:Book[]=[];
  authors:Author[]=[];
  constructor(private _bookService: BookService,private _authorService: AuthorService){
    _bookService.getBooks().subscribe({
      next: (response:any) =>{
        this.books=response.books;
      }
    })

    _authorService.getAuthors().subscribe({
      next: (response:any) =>{
        this.authors=response.authors;
      }
    });
  }


}

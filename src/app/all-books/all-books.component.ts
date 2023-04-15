import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../interfaces';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent {
books: Book[]=[];
totalBooks: number = 0;
page: number=1;
perPage:number=10;

  constructor(private bookService: BookService) {

    this.getBooks()
  }

  getBooks():void{
    this.bookService.getBooks(this.page,this.perPage).subscribe({      
      next: (response: any) => {
        this.books = response.books;
        this.totalBooks=response.totalBooks;
        }
     })
      }


}

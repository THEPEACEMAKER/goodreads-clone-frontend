import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  book:any;
  id:any;
  constructor(private _BookService:BookService, private _ActivatedRoute:ActivatedRoute){
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.book = this._BookService.getBookById(this.id).subscribe({
      next: (book:any) => {
        this.book = book.book;
      console.log(book);
      }

    })

  }
}

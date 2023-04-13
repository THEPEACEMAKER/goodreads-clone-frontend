import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Author, Book, BookShelf } from '../interfaces';
import { Router } from '@angular/router';
import { ShelfService } from '../services/shelf.service';





@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {
  @Input() book!: any;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Book>();

  author!: Author;


newShelf: any = { bookId: 0, shelf: ''}  

  constructor(public router: Router, private ShelfService:ShelfService) {}

  ngOnInit(): void {
    if (this.book && this.book.author) {
      this.author = this.book.author;
    }
  }

  onDelete() {
    this.delete.emit(this.book._id);
  }

  onEdit() {
    this.edit.emit(this.book);
  }

  addSehlf(event:any, bookId:any){
    console.log(event.value);
    console.log(bookId);
    let newShelf = {
      bookId: bookId,
      shelf: event.value
    }
    
    this.ShelfService.addToShelf(bookId, event.value).subscribe({
      next: (response:any) => {
        console.log(response);
    }});

   

  }  
  
  isToggled: boolean = false

  clickedStar(){
      this.isToggled = true
  }

}
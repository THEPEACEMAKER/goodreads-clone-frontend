import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../interfaces';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {
  @Input() book!: Book;
  @Output() delete = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.book._id);
  }
}

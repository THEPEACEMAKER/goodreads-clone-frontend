import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Author, Book } from '../interfaces';
import { Router } from '@angular/router';

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

  constructor(public router: Router) {}

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
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Author, Book, BookShelf } from '../interfaces';
import { Router } from '@angular/router';
import { ShelfService } from '../services/shelf.service';
import { RatingService } from '../services/rating.service';

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

  newShelf: any = { bookId: 0, shelf: '' };
  newRating: any = { bookId: 0, rating: 0 };

  constructor(
    public router: Router,
    private ShelfService: ShelfService,
    private RatingService: RatingService
  ) {}

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

  addSehlf(event: any, bookId: any) {
    console.log(event.value);
    console.log(bookId);
    let newShelf = {
      bookId: bookId,
      shelf: event.value,
    };

    this.ShelfService.addToShelf(bookId, event.value).subscribe({
      next: (response: any) => {
        this.book.shelfName = event.value == 'NONE' ? null : event.value;
      },
    });
  }

  isToggled: boolean = false;

  clickedStar() {
    this.isToggled = true;
  }

  rating: number = 0;
  showAllStars: boolean = false;

  setRating(rating: number) {
    this.rating = rating;
    this.showAllStars = true;
  }

  showStars() {
    this.showAllStars = true;
  }

  hideStars() {
    if (this.rating === 0) {
      this.showAllStars = false;
    }
  }

  addRating(bookId: any, rate: any) {
    console.log(rate);
    console.log(bookId);
    let newRating = {
      bookId: bookId,
      rate: rate,
    };
    this.RatingService.addRating(bookId, rate).subscribe({
      next: (response: any) => {
        console.log(response);
      },
    });
  }
}

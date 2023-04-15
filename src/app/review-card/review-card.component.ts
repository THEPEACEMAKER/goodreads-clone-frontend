import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../interfaces';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css'],
})
export class ReviewCardComponent {
  @Input() review: any;
  @Output() reviewUpdated = new EventEmitter<void>();
  @Output() reviewToUpdate = new EventEmitter<Review>();
  editReviewForm!: FormGroup;
  constructor(private _reviewService: ReviewService,private fb:FormBuilder) {
  }


  deleteReview() {
    this._reviewService.deleteReview(this.review._id).subscribe({
      next: () => this.reviewUpdated.emit(),
      error: (error) => {},
    });
  }

  editReview() {
      this.reviewToUpdate.emit({_id: this.review._id,title: this.review.title,content: this.review.content});
    }
}

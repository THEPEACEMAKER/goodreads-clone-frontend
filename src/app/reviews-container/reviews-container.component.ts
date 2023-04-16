import { Component, Input } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review, User } from '../interfaces';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reviews-container',
  templateUrl: './reviews-container.component.html',
  styleUrls: ['./reviews-container.component.css']
})
export class ReviewsContainerComponent {
  @Input() bookId!: number;

  currentUser!: Observable<User | null>;
  editReviewForm!: FormGroup;
  
reviews = [];
currentPage: number=1;
totalReviews: number=0;
maxReviewsPerPage: number=5;
currentReview: Review={
  title:'',
  content:''
};

      constructor(private _reviewsService: ReviewService,private fb:FormBuilder,private _reviewService:ReviewService,private _authService: AuthService){}

      ngOnInit(){
        this.getReviews();
        
        this.editReviewForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
          content: ['', [Validators.required, Validators.minLength(3)]]
        });


        this.currentUser=this._authService.getCurrentUser();
      }
      getReviews(){
        this._reviewsService.getReviewsByBookId(this.bookId,this.currentPage).subscribe({
          next:(response:any)=>{
            this.reviews=response.bookReviews;
            this.totalReviews=response.totalReviews;
          }
        })
      }

      assignReview(review:Review){
        this.currentReview={...review};
      }

      editReview() {
        if(this.currentReview._id)
        this._reviewService.updateReview(this.currentReview._id,{title:this.editReviewForm.value.title, content:this.editReviewForm.value.content}).subscribe({
          next: (response:any) => {
           this.getReviews();
          },
          error: (err) => {}
        })
      }
}

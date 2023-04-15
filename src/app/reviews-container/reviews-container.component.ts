import { Component, Input } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../interfaces';

@Component({
  selector: 'app-reviews-container',
  templateUrl: './reviews-container.component.html',
  styleUrls: ['./reviews-container.component.css']
})
export class ReviewsContainerComponent {
  @Input() bookId!: number;
  
  editReviewForm!: FormGroup;
  
reviews = [];
currentPage: number=1;
totalReviews: number=0;
maxReviewsPerPage: number=5;
currentReview: Review={
  title:'',
  content:''
};

      constructor(private _reviewsService: ReviewService,private fb:FormBuilder,private _reviewService:ReviewService){}

      ngOnInit(){
        this.getReviews();
        console.log(this.reviews);
        
        this.editReviewForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
          content: ['', [Validators.required, Validators.minLength(3)]]
        });
      }
      getReviews(){
        this._reviewsService.getReviewsByBookId(this.bookId,this.currentPage).subscribe({
          next:(response:any)=>{
            this.reviews=response.bookReviews;
            this.totalReviews=response.totalReviews;
            console.log(this.reviews);
            console.log(response);
            
          }
        })
      }

      assignReview(review:Review){
        this.currentReview={...review};
        console.log(review);
        
      }

      editReview() {
        if(this.currentReview._id)
        this._reviewService.updateReview(this.currentReview._id,{title:this.editReviewForm.value.title, content:this.editReviewForm.value.content}).subscribe({
          next: (response:any) => {
           console.log(response);
           this.getReviews();
          },
          error: (err) => console.log(err)
        })
      }

}

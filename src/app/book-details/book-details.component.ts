import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../services/review.service';



@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  book:any;
  id:any;
  addReviewForm!:FormGroup;
  constructor(private _BookService:BookService, private _ActivatedRoute:ActivatedRoute,private fb:FormBuilder,private _reviewService:ReviewService){
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.book = this._BookService.getBookById(this.id).subscribe({
      next: (response:any) => {
        this.book = response.book;
      }
    })
  }

  ngOnInit(){
    this.addReviewForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      content: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  addReview(){
    if(this.addReviewForm.valid){
      this._reviewService.addReview(this.id,{title:this.addReviewForm.value.title,content:this.addReviewForm.value.content}).subscribe({
        next:(response)=>{},
        error:(error)=>{}
      })
    }
  }
}

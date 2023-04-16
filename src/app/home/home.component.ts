import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Author, Book, Category, User } from '../interfaces';
import { AuthorService } from '../services/author.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../services/category.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentUser: Observable<User | null> = this._authService.getCurrentUser();
  books:Book[]=[];
  authors:Author[]=[];
  categories:Category[]=[];
  popularBooks!: Book[];
  popularAuthors: Author[]=[];
  constructor(private _bookService: BookService,private _authorService: AuthorService, private _CategoryService:CategoryService, private _authService:AuthService){
    _bookService.getBooks().subscribe({
      next: (response:any) =>{
        this.books=response.books;
      }
    })

    _authorService.getAuthors().subscribe({
      next: (response:any) =>{
        this.authors=response.authors;
      }
    });
    _CategoryService.getAllCategories().subscribe({
      next: (response:any) =>{
        this.categories=response.categories;
      }
    });
    
    
    _bookService.getPopularBooks().subscribe({
      next: (response:any) =>{
        this.popularBooks=response.books;
      }
    });
    

    _authorService.getPopularAuthors().subscribe({
      next: (response:any) =>{
        this.popularAuthors=response.authors;
      }
    });


  }






  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    margin: 8,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: true,
  };

}

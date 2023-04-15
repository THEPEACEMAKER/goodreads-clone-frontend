import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Author, Book, Category } from '../interfaces';
import { AuthorService } from '../services/author.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  books:Book[]=[];
  authors:Author[]=[];
  categories:Category[]=[];
  constructor(private _bookService: BookService,private _authorService: AuthorService, private _CategoryService:CategoryService){
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

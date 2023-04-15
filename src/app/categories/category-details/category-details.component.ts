import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, Category } from 'src/app/interfaces';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent {
  id: string;
  category: Category | undefined;
  books: Book[] = [];
  page: number=1;
  perPage:number=6;
  totalBooks: number = 0;
  constructor(private _categoryService: CategoryService, private _bookService: BookService, private _activatedRoute: ActivatedRoute) {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.getCategoryByID()
    this.getBooksByCategory();
  }

  getCategoryByID() {
    this._categoryService.getCategoryById(this.id).subscribe({
      next: (response: any) => {
        this.category = response.category;
      },
      error: (error) => {},
    })
  }

  getBooksByCategory(){
    this._bookService.getBooksByCategory(this.id,this.page,this.perPage).subscribe({      
      next: (response: any) => {
        this.books = response.books;
        this.totalBooks=response.totalBooks;
      },
      error: (error) => {},
    });
  }
}

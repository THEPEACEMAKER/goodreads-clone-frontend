import { Component } from '@angular/core';
import { Category } from '../interfaces';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: Category[] = [];
  totalCategories: number = 0;
  currentPage: number = 1;
  categoriesPerPage: number =10;

  constructor(private _categoryService: CategoryService) {
    this.getAllCategories();
  }
  getAllCategories(): void {
    this._categoryService.getAllCategories(this.currentPage, this.categoriesPerPage).subscribe({
      next: (response: any) => {        
        this.categories = [...response.categories];
        this.totalCategories = response.totalCategories;
      },
    });
  }
}

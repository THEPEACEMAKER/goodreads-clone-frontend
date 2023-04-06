import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Category } from '../interfaces';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css'],
})
export class AdminMainComponent {
  selectedCategory: any;
  newCategory: Category = { name: '' };
  categoryError: string = '';
  categorySuccess: boolean = false;

  categories: Category[] = [];

  constructor(private _authService: AuthService, private _categoryService: CategoryService) {
    this.getAllCategories()
  }

  logout() {
    this._authService.logoutUser();
  }

  addCategory(): void {
    if (this.newCategory.name == '') {
      this.categoryError = "You can't enter empty value";
    } else {
      this._categoryService.addCategory(this.newCategory).subscribe({
        next: (response: any) => {
          console.log(response.message);
          this.categorySuccess = true;
          this.newCategory.name = '';
          this.getAllCategories()
        },
        error: (error) => {
          this.categoryError = error;
        },
      });
    }
  }

  editCategory(categoryId: number): void {
    if (this.newCategory.name == '') {
      this.categoryError = "You can't enter empty value";
    } else {
      this._categoryService.updateCategory(categoryId, this.newCategory).subscribe({
        next: (response: any) => {
          this.categorySuccess = true;
        },
        error: (error) => {
          this.categoryError = error;
        },
      })
    }
  }

  getSelectedCategory(category: any): any {
    this.selectedCategory = category;
  }

  getAllCategories(): void {
    this._categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response.categories
      },
      error: (error) => {
        this.categoryError = error;
      },
    });
  }

  deleteCategory(categoryId: number): void {
    this._categoryService.deleteCategory(categoryId).subscribe({
      next: (response: any) => {
        this.categorySuccess = true;
      },
      error: (error) => {
        this.categoryError = error;
      },
    });
  }
}

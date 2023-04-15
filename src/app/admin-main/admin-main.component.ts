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
  operationStatus = {
    add: {
      success: false,
      error: '',
    },
    edit: {
      success: false,
      error: '',
    },
    delete: {
      success: false,
      error: '',
    },
  };

  categories: Category[] = [];

  constructor(private _authService: AuthService, private _categoryService: CategoryService) {
    this.getAllCategories();
  }

  logout() {
    this._authService.logoutUser();
  }

  addCategory(): void {
    if (this.newCategory.name == '') {
      this.operationStatus.add.error = "You can't enter empty value";
    } else {
      this._categoryService.addCategory(this.newCategory).subscribe({
        next: (response: any) => {
          this.operationStatus.add.success = true;
          this.getAllCategories();
          setTimeout(() => {
            this.clearMessages();
          }, 1000);
        },
        error: (error) => {
          this.operationStatus.add.error = error;
        },
      });
    }
  }

  editCategory(categoryId: number): void {
    if (this.newCategory.name == '') {
      this.operationStatus.edit.error = "You can't enter empty value";
    } else {
      this._categoryService.updateCategory(categoryId, this.newCategory).subscribe({
        next: (response: any) => {
          this.operationStatus.edit.success = true;
          this.getAllCategories();
          setTimeout(() => {
            this.clearMessages();
          }, 1000);
        },
        error: (error) => {
          this.operationStatus.edit.error = error;
        },
      });
    }
  }

  getSelectedCategory(category: any): any {
    this.selectedCategory = category;
  }

  getAllCategories(): void {
    this._categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response.categories;
      },
    });
  }

  deleteCategory(categoryId: number): void {
    this._categoryService.deleteCategory(categoryId).subscribe({
      next: (response: any) => {
        this.operationStatus.delete.success = true;
        this.getAllCategories();
        setTimeout(() => {
          this.clearMessages();
        }, 1000);
      },
      error: (error) => {
        this.operationStatus.delete.error = error;
      },
    });
  }

  clearMessages() {
    this.operationStatus = {
      add: {
        success: false,
        error: '',
      },
      edit: {
        success: false,
        error: '',
      },
      delete: {
        success: false,
        error: '',
      },
    };
    this.newCategory = { name: '' };
  }
}

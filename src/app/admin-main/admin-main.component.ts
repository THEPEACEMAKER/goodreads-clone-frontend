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

  categories: Category[] = [
    { id: 1, name: 'Fiction' },
    { id: 2, name: 'Non-Fiction' },
  ];

  constructor(private _authService: AuthService, private CategoryService: CategoryService) {}

  logout() {
    this._authService.logoutUser();
  }

  addCategory(): void {
    if (this.newCategory.name == '') {
      this.categoryError = "You can't enter empty value";
    } else {
      this.CategoryService.addCategory(this.newCategory).subscribe({
        next: (response: any) => {
          console.log(response.message);
          this.categorySuccess = true;
          this.newCategory.name = '';
        },
        error: (error) => {
          this.categoryError = error;
        },
      });
    }
  }

  editCategory(category: Category): void {
    const index = this.categories.findIndex((c) => c.id === category.id);
    const newName = this.newCategory.name;
    if (newName == '') {
      this.categoryError = "You can't enter empty value";
    } else {
      this.categories[index].name = newName;
    }
  }

  getSelectedCategory(category: any): any {
    this.selectedCategory = category;
  }

  deleteCategory(category: Category): void {
    const index = this.categories.findIndex((c) => c.id === category.id);
    this.categories.splice(index, 1);
  }
}

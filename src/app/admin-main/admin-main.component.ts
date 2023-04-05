import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

interface Category {
  id: number;
  name: string;
  selectedCategory?: string;
}

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css'],
})
export class AdminMainComponent {
  categoryError: boolean = false;
  selectedCategory: any;

  categories: Category[] = [
    { id: 1, name: 'Fiction' },
    { id: 2, name: 'Non-Fiction' },
  ];

  categoryName: string = '';

  constructor(private _authService: AuthService) {}

  logout() {
    this._authService.logoutUser();
  }

  addCategory(): void {
    const newCategory: Category = {
      id: this.categories.length + 1,
      name: this.categoryName,
    };
    if (this.categoryName == '') {
      this.categoryError = true;
    } else {
      this.categories.push(newCategory);
      this.categoryName = '';
    }
  }

  editCategory(category: Category): void {
    const index = this.categories.findIndex((c) => c.id === category.id);
    const newName = this.categoryName;
    if (newName == '') {
      this.categoryError = true;
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

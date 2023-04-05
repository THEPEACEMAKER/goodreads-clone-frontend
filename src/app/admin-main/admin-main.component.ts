import { Component } from '@angular/core';

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
  selectedCategory: any;

  categories: Category[] = [
    { id: 1, name: 'Fiction' },
    { id: 2, name: 'Non-Fiction' },
  ];

  categoryName: string = '';

  constructor() {}

  categoryError: string = '';
  categorySuccess: boolean = false;
  newCategory: Category = { name: '' };
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
    const newName = this.categoryName;
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

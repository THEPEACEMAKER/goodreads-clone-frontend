import { Component, Input } from '@angular/core';
import { Category } from 'src/app/interfaces';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input() category: any;
  constructor(protected _categoryService: CategoryService) {

  }
  navigateToCategoryDetails(category: Category): void {
    this._categoryService.navigateToCategoryDetails(category);
  }
}

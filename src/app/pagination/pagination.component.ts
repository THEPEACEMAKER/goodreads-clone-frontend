import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
@Input() totalPages:number = 1;
@Input() currentPage:number =1;
@Output() pageChange(){

}
pages:number[] = [];

ngOnInit() {
  this.pages=Array(this.totalPages).fill(4).map((x,i)=>i+1);
}

}

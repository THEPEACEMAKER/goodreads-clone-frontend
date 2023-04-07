import { Component, Input } from '@angular/core';
import { Author } from 'src/app/interfaces/author.interface';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {
  @Input() author: any;
  constructor(protected _authorService: AuthorService) {

  }
  navigateToAuthorDetails(author: Author): void {
    this._authorService.navigateToAuthorDetails(author);
  }
}
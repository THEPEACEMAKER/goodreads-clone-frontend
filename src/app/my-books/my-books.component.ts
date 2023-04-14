import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book} from '../interfaces';
// import { MdbTabsModule } from 'mdb-angular-ui-kit/tabss';


@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent {
  books:Book[] = []
  book: Book = {
    _id: 0,
    name: '',
    description: '',
    imageUrl: '',
    category: '',
    author: '',
  };
  currentPage: number = 1;
  totalBooks: number = 1;
  booksPerPage: number =10;

  constructor(private BookService:BookService){
    this.BookService = BookService;
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.BookService.getBooks(this.currentPage,this.booksPerPage).subscribe(
      (response: any) => {
        this.books = response.books;
        this.totalBooks = response.totalBooks;
        console.log(this.totalBooks);
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  selectedButton: number = 0;

  showContent(buttonNumber: number) {
    this.selectedButton = buttonNumber;
  }
}


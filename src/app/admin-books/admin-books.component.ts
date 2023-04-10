import { Component, OnInit } from '@angular/core';
import { Author, Book, Category } from '../interfaces';
import { BookService } from '../services/book.service';
import { CategoryService } from '../services/category.service';
import { AuthorService } from '../services/author.service';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css'],
})
export class AdminBooksComponent {
  imageFile!: File;
  books: Book[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  isEditingBook: boolean = false;
  editingBook: Book | null = null;
  book: Book = {
    _id: 0,
    name: '',
    description: '',
    imageUrl: '',
    category: '',
    author: '',
  };

  categories: Category[] = [];
  authors: Author[] = [];

  constructor(
    private bookService: BookService,
    private _categoryService: CategoryService,
    private _authorService: AuthorService
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.getAllCategories();
    this.getAllAuthors();
  }

  getAllAuthors(): void {
    this._authorService.getAuthors().subscribe({
      next: (authors: any) => {
        this.authors = authors;
      },
    });
  }

  getAllCategories(): void {
    this._categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response.categories;
      },
    });
  }

  getBooks(): void {
    this.bookService.getBooks(this.currentPage).subscribe(
      (response: any) => {
        // response.books // response.totalBooks
        this.books = response.books;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteBook(id: number): void {
    // console.log(id);
    this.bookService.deleteBook(id).subscribe(
      () => {
        this.books = this.books.filter((b) => b._id !== id);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getBooks();
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.imageFile = (target.files as FileList)[0];
  }

  addBook(): void {
    const formData = new FormData();
    formData.append('name', this.book.name);
    formData.append('description', this.book.description);
    formData.append('categoryId', this.book.category);
    formData.append('authorId', this.book.author);
    formData.append('image', this.imageFile);
    this.bookService.addBook(formData).subscribe(
      (newBook) => {
        this.getBooks();
        this.book = {
          _id: 0,
          name: '',
          description: '',
          imageUrl: '',
          category: '',
          author: '',
        };
        console.log(newBook);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editBook(book: Book): void {
    this.isEditingBook = true;
    this.editingBook = book;
    this.book = { ...book };
    const modal = document.getElementById('addBookModal');
    modal!.classList.add('show');
    modal!.style.display = 'block';
  }

  updateBook(): void {
    const formData = new FormData();
    formData.append('name', this.book.name);
    formData.append('description', this.book.description);
    formData.append('categoryId', this.book.category);
    formData.append('authorId', this.book.author);
    formData.append('image', this.imageFile ? this.imageFile : this.book.imageUrl || '');
    if (this.editingBook!._id) {
      this.bookService.updateBook(this.editingBook!._id, formData).subscribe(
        (response: any) => {
          const updatedBook = response.book;
          const index = this.books.findIndex((b) => b._id === updatedBook._id);
          this.books[index] = updatedBook;
          this.editingBook = null;
          this.isEditingBook = false;
          this.book = {
            _id: 0,
            name: '',
            description: '',
            imageUrl: '',
            category: '',
            author: '',
          };
          const modal = document.getElementById('addBookModal');
          modal!.classList.remove('show');
          modal!.style.display = 'none';
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.editingBook = null;
    this.isEditingBook = false;
    this.book = {
      _id: 0,
      name: '',
      description: '',
      imageUrl: '',
      category: '',
      author: '',
    };
    const modal = document.getElementById('addBookModal');
    modal!.classList.remove('show');
    modal!.style.display = 'none';
  }
}

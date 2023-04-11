import { Component } from '@angular/core';
import { Author } from '../interfaces';
import { AuthorService } from '../services/author.service';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {NgbPaginationModule} from '@ng'
@Component({
  selector: 'app-admin-author',
  templateUrl: './admin-author.component.html',
  styleUrls: ['./admin-author.component.css'],
  // imports:[NgbPaginationModule]
})
export class AdminAuthorComponent {
  imageFile!: File;
  addForm!: FormGroup;
  editForm!: FormGroup;
  currentAuthor!: Author;
  constructor(
    private _authService: AuthService,
    private _authorService: AuthorService,
    private fb: FormBuilder
  ) {}

  authors: Author[] = [];
  totalAuthors: number = 0;
  currentPage: number = 1;
  totalPages: number =1;
  pages: number []=[];
  maxAuthorsPerPage: number = 10;

  ngOnInit() {
    this.getAuthors();
    this.updatePages();
    
    this.addForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      dob: ['', [Validators.required]],
      image: [''],
    });

    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      dob: ['', [Validators.required]],
      image: [''],
    });
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.imageFile = (target.files as FileList)[0];
  }

  logout() {
    this._authService.logoutUser();
  }

  getAuthors(){
    this._authorService.getAuthors(this.currentPage).subscribe((response) => {
      this.authors = [...response.authors];
      this.totalAuthors = response.totalAuthors;
      this.updatePages();
      console.log(this.totalAuthors);
      console.log(this.pages); 
    });
  }

  updatePages(){
    this.totalPages=Math.round(this.totalAuthors/this.maxAuthorsPerPage) +1;
    console.log(this.totalPages);
    
  }
  attachEditValues() {
    if (this.editForm.value.firstName === '')
      this.editForm.value.firstName = this.currentAuthor.firstName;
    if (this.editForm.value.lastName === '')
      this.editForm.value.lastName = this.currentAuthor.lastName;
    if (!this.editForm.value.dob) this.editForm.value.dob = this.currentAuthor.dob;
  }

  addAuthor() {
    if (this.addForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.addForm.value.firstName);
      formData.append('lastName', this.addForm.value.lastName);
      formData.append('dob', this.addForm.value.dob.split('T')[0]);
      formData.append('image', this.imageFile);

      this._authorService.addAuthor(formData).subscribe({
        next: (author: Author) => {},
        error: (error) => console.log(error),
      });
      this.getAuthors();
      console.log(this.authors);
      this.addForm.reset();
    }
  }

  getSelectedAuthor(author: Author) {
    this.currentAuthor = { ...author };
  }
  editAuthor() {
    this.attachEditValues();
    
    const formData = new FormData();
    formData.append('firstName', this.editForm.value.firstName);
    formData.append('lastName', this.editForm.value.lastName);
    formData.append('dob', this.editForm.value.dob);
    if (this.editForm.value.imageUrl) formData.append('image', this.imageFile);

    if (this.currentAuthor._id)
      this._authorService.updateAuthor(this.currentAuthor._id, formData).subscribe({
        next: (author: Author) => {},
        error: (error) => console.log(error),
      });
    this.getAuthors();
    this.editForm.reset();
  }

  deleteAuthor() {
    if (this.currentAuthor._id)
      this._authorService.deleteAuthor(this.currentAuthor._id).subscribe({
        next: (author: Author) => console.log(author),
        error: (error) => console.log(error),
      });
    this.getAuthors();
  }
}

import { Component } from '@angular/core';
import { Author } from '../interfaces';
import { AuthorService } from '../services/author.service';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-author',
  templateUrl: './admin-author.component.html',
  styleUrls: ['./admin-author.component.css']
})
export class AdminAuthorComponent {

// authorName: string;
imageFile!: File;
addingError:boolean=false;
addForm!:FormGroup;
editForm!:FormGroup;
currentAuthor!:Author;
firstName:string="lol";
registerError!: null;
registerSuccess!: boolean;
first:string="lol"; 
constructor(private _authService: AuthService,private _authorService:AuthorService,private fb:FormBuilder){}

authors:Author[]=[];

ngOnInit() {
  this._authorService.getAuthors().subscribe((authors=>{
    this.authors=[...authors];
  }));
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

attachValues(){
  if(this.editForm.value.firstName === "")
    this.editForm.value.firstName = this.currentAuthor.firstName;
  if(this.editForm.value.lastName === "")
    this.editForm.value.lastName = this.currentAuthor.lastName;
  if(this.editForm.value.dob === "")
    this.editForm.value.dob = this.currentAuthor.dob;
  if(this.editForm.value.imageUrl==="")
    this.editForm.value.imageUrl = this.currentAuthor.imageUrl;
}

addAuthor() {
  if(this.addForm.valid)
    // this.authors.push(this.addForm.value);
    {
      const formData = new FormData();
      formData.append('firstName', this.addForm.value.firstName);
      formData.append('lastName', this.addForm.value.lastName);
      formData.append('dob', this.addForm.value.dob);
      formData.append('image', this.imageFile);
      
      this._authorService.addAuthor(formData).subscribe({
        next: (author: Author) => {
          // registered successfully
          this.registerError = null;
          this.registerSuccess = true;
          // setTimeout(() => {
          //   this._Router.navigate(['/login']);
          // }, 1000);
        },
        error: (error) => {
          this.registerError = error;
        },
      });
    }

}

getSelectedAuthor(author:Author){
  this.currentAuthor={...author};
  console.log(this.currentAuthor);
  
}
editAuthor(author:Author){
  let authorIndex=this.authors.findIndex(a => a.id===author.id);
  this.authors[authorIndex]={
    firstName:this.editForm.value.firstName,
    lastName:this.editForm.value.lastName,
    dob:this.editForm.value.dob,
    imageUrl:this.editForm.value.imageUrl,
  };
}

deleteAuthor(author:Author){
//  this.authors=this.authors.filter(a=>a.id !== author.id);
//  console.log(author.id);
if(author.id)
  this._authorService.deleteAuthor(author.id)
}

}

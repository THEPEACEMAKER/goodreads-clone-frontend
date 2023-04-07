import { Component } from '@angular/core';
import { Book } from '../interfaces';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css'],
})
export class AdminBooksComponent {
  books: Book[] = [
    {
      name: 'The Shining',
      imageUrl: 'https://via.placeholder.com/150',
      category: [1],
      author: [1],
      avgRating: 4.5,
      reviews: [1, 2],
    },
    {
      name: "Harry Potter and the Philosopher's Stone",
      imageUrl: 'https://via.placeholder.com/150',
      category: [2],
      author: [2],
      avgRating: 4.8,
      reviews: [3, 4],
    },
    {
      name: "Harry Potter and the Philosopher's Stone",
      imageUrl: 'https://via.placeholder.com/150',
      category: [2],
      author: [2],
      avgRating: 4.8,
      reviews: [3, 4],
    },
    {
      name: "Harry Potter and the Philosopher's Stone",
      imageUrl: 'https://via.placeholder.com/150',
      category: [2],
      author: [2],
      avgRating: 4.8,
      reviews: [3, 4],
    },
    {
      name: "Harry Potter and the Philosopher's Stone",
      imageUrl: 'https://via.placeholder.com/150',
      category: [2],
      author: [2],
      avgRating: 4.8,
      reviews: [3, 4],
    },
    {
      name: "Harry Potter and the Philosopher's Stone",
      imageUrl: 'https://via.placeholder.com/150',
      category: [2],
      author: [2],
      avgRating: 4.8,
      reviews: [3, 4],
    },
  ];
}

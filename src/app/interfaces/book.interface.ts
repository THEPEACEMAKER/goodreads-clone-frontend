export interface Book {
  _id?: number;
  name: string;
  description: string;
  imageUrl?: string;
  category: number[] | []; // reference to Category
  author: number[] | []; // reference to Author
  avgRating?: number;
  reviews?: number[] | []; // reference to Review
}

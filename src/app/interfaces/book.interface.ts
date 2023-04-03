export interface Book {
  id?: number;
  name: string;
  imageUrl?: string;
  category: number[]; // reference to Category
  author: number[]; // reference to Author
  avgRating?: number;
  reviews?: number[]; // reference to Review
}

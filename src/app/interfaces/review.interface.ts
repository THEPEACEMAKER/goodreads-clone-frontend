export interface Review {
  id?: number;
  title: string;
  content: string;
  rating?: number;
  user: number; // reference to User
  book: number; // reference to Book
}

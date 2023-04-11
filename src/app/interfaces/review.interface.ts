export interface Review {
  _id?: number;
  title: string;
  content: string;
  user: number; // reference to User
  book: number; // reference to Book
}

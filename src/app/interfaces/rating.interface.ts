export interface Rating {
  _id?: number;
  score?: number;
  user: number; // reference to User
  book: number; // reference to Book
}

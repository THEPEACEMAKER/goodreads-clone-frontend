export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum BookShelf {
  WANT_TO_READ = 'WANT_TO_READ',
  READING = 'CURRENTLY_READING',
  READ = 'READ',
}
export interface BookSelection {
  book: number;
  shelf: BookShelf;
}

export interface User {
  _id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  imageUrl: string;
  role?: UserRole;
  books?: BookSelection[];
}

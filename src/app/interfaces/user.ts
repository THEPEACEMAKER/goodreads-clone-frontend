export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum BookShelf {
  WANT_TO_READ = 'WANT TO READ',
  READING = 'CURRENTLY READING',
  READ = 'READ',
}
export interface BookSelection {
  id: number;
  shelf: BookShelf;
}

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  imageUrl: string;
  role?: 'USER' | 'ADMIN'; // default is "user"
  books?: BookSelection[];
}

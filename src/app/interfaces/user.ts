export interface BookSelection {
  id: number;
  shelf: 'wantToRead' | 'reading' | 'read';
}

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  imageUrl: string;
  role?: 'user' | 'admin'; // default is "user"
  books?: BookSelection[];
}

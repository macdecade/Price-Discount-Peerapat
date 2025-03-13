export interface NavigationButtonProps {
  name: string;
  path: string;
  key: string;
}

export interface Objects {
  [key: string]: any;
}

export interface PageCriteria {
  page: number; // The current page number
  size: number; // The number of items per page
  totalItems?: number; // Optional: The total number of items (for server responses)
  totalPages?: number; // Optional: The total number of pages (if calculated on the server)
}

export interface Pagination<T> {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  items: T[];
}

export interface PaginationResponse<T>{
  page?: number;
  pageSize?: number;
  totalItems?: number;
  items: T[];
}

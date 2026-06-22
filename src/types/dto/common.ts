export interface Coords {
  lat: number;
  lng: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}

export type PaginatedResponse<T> = {
  items: T[];
  pagination: Pagination;
};

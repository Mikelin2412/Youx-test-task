export interface PaginatedUsers<T> {
  data: T[];
  meta: {
    total: number;
    currentPage: number;
    limit: number;
  };
}
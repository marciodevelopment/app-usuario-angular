export interface PageResponse<T> {
  content: Array<T>;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

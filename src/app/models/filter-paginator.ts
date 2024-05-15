import { PaginatorOptions } from './paginator-options';

export interface FilterPaginator<T> {
  filters?: T;
  paginatorOptions?: PaginatorOptions;
}

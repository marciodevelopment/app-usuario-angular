import { SearchItem } from './SearchItem';
import { TablePagination } from './TablePagination';

export class SearchQueryParams {
  constructor(
    private tablePagination: TablePagination,
    private searchItems: Array<SearchItem> = []
  ) {}

  public addSearchItem(name: string, value: string): SearchQueryParams {
    this.searchItems.push(new SearchItem(name, value));
    return this;
  }

  public getSearchItems(): Array<SearchItem> {
    this.searchItems.push(...this.tablePagination.getSearchItems());
    return this.searchItems;
  }
}

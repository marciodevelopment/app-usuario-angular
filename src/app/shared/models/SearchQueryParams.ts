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

  public getQueryString(): string {
    let queryString = '';
    if (this.tablePagination) {
      queryString += this.tablePagination.getQueryString();
    }

    let queryStringReduce = this.searchItems.reduce(
      (queryStr: string, searchItem) =>
        queryStr + `${searchItem.name}=${searchItem.value}`,
      ''
    );
    if (queryStringReduce) queryString = `${queryString}&${queryStringReduce}`;
    return queryString;
  }

  public static of(name: string, value: any): SearchQueryParams {
    return new SearchQueryParams(new TablePagination(1, 1), [
      new SearchItem(name, value),
    ]);
  }
}

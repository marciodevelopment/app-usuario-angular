import { query } from '@angular/animations';
import { SearchItem } from './SearchItem';

export class TablePagination {
  constructor(
    public page: number,
    public size: number,
    public sortField: string,
    public direction: string
  ) {}

  getSearchItems(): Array<SearchItem> {
    const searchItems: Array<SearchItem> = [];
    searchItems.push(new SearchItem('page', this.page.toString()));
    searchItems.push(new SearchItem('size', this.size.toString()));

    if (this.sortField) {
      searchItems.push(new SearchItem('sortField', this.sortField));
    }
    if (this.direction) {
      searchItems.push(new SearchItem('direction', this.direction));
    }
    return searchItems;
  }

  getQueryString(): string {
    let queryString = `page=${this.page}&size=${this.size}`;
    if (this.sortField) {
      queryString += `&sortField=${this.sortField}&direction=${this.direction}`;
    }
    return queryString;
  }
}

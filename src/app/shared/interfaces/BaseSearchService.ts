import { Observable } from 'rxjs';
import { SearchQueryParams } from '../models/SearchQueryParams';
import { PageResponse } from './PageResponse';

export interface BaseSearchService<SearchResponseType> {
  search(
    searchQueryParams: SearchQueryParams
  ): Observable<PageResponse<SearchResponseType>>;

  delete(id: number): Observable<string>;
}

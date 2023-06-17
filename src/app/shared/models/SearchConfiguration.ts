import { PageResponse } from '../interfaces/PageResponse';
import { SearchFieldConfiguration } from './SearchFieldConfiguration';
import { SearchQueryParams } from './SearchQueryParams';
import { Observable } from 'rxjs';

export class SearchConfiguration {
  constructor(
    public searchTitle: string,
    public searchFunction: (
      params: SearchQueryParams
    ) => Observable<PageResponse<any>>,
    public searchFieldConfiguration: Array<SearchFieldConfiguration>,
    public options?: {
      editPath?: string;
      deleteFunction?: (params: SearchQueryParams) => Observable<any>;
    }
  ) {}
}

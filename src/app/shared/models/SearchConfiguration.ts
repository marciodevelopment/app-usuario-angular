import { PageResponse } from '../interfaces/PageResponse';
import { SearchFieldConfiguration } from './SearchFieldConfiguration';
import { SearchQueryParams } from './SearchQueryParams';
import { Observable } from 'rxjs';

export class SearchConfiguration {
  constructor(
    public searchTitle: string,
    public searchFieldConfiguration: Array<SearchFieldConfiguration>,
    public editPath?: string
  ) {}
}

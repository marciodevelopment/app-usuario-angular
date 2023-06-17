import { Component, Input, OnInit } from '@angular/core';
import { SearchFieldConfiguration } from '../../models/SearchFieldConfiguration';
import { SearchConfiguration } from '../../models/SearchConfiguration';
import { DynamicFilter } from '../../models/DynamicFilter';
import { DynamicColum } from '../../models/DynamicColumn';
import { config, timer } from 'rxjs';
import { ItemSelectedDynamicTableAction } from '../../models/ItemSelectedDynamicTableAction';
import { TablePagination } from '../../models/TablePagination';
import { Table } from 'primeng/table';
import { SearchQueryParams } from '../../models/SearchQueryParams';
import { SearchItem } from '../../models/SearchItem';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input()
  public searchConfiguration!: SearchConfiguration;
  public searhFilters: Array<DynamicFilter> = [];
  public columns: Array<DynamicColum> = [];
  public loading = false;
  public items: any[] = [];
  public totalItens: number = 0;
  public pagination!: TablePagination;
  public filters: Array<DynamicFilter> = [];

  ngOnInit(): void {
    const searchFieldConfiguration =
      this.searchConfiguration.searchFieldConfiguration;

    if (searchFieldConfiguration) {
      this.searhFilters = searchFieldConfiguration
        .filter((config) => config.filter)
        .map((config) => new DynamicFilter(config.header, config.field));
      searchFieldConfiguration.map(
        (config) => new DynamicColum(config.field, config.header, config.width)
      );
      this.columns = searchFieldConfiguration.map(
        (config) => new DynamicColum(config.field, config.header, config.width)
      );
    }
  }

  public onChangePagination(pagination: TablePagination) {
    this.pagination = pagination;
    this.search();
  }

  public onClickFilter(event: Array<DynamicFilter>) {
    this.filters = event;
    this.search();
  }

  private search(): void {
    const queryParams = new SearchQueryParams(
      this.pagination,
      this.filters
        .filter((filter) => filter.value !== '')
        .map((filter) => new SearchItem(filter.name, filter.value as string))
    );
    this.loading = true;
    this.searchConfiguration.searchFunction(queryParams).subscribe({
      next: (response) => (this.items = response.content),
      complete: () => (this.loading = false),
    });
  }

  public onClickItem(event: ItemSelectedDynamicTableAction) {
    console.log('item selected', event);
  }
}

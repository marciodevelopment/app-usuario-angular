import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { SearchConfiguration } from '../../models/SearchConfiguration';
import { DynamicFilter } from '../../models/DynamicFilter';
import { DynamicColum } from '../../models/DynamicColumn';
import { TablePagination } from '../../models/TablePagination';
import { SearchQueryParams } from '../../models/SearchQueryParams';
import { SearchItem } from '../../models/SearchItem';
import { PageResponse } from '../../interfaces/PageResponse';
import { SearchDeleteAction } from '../../interfaces/SearchDeleteAction';
import { TableButtomType } from '../../enums/TableButtomType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterContentChecked {
  @Input()
  public searchConfiguration!: SearchConfiguration;
  @Input()
  public showButtons: TableButtomType[] = [];
  @Output()
  public clickSearch = new EventEmitter<SearchQueryParams>();
  @Output()
  public clickSelectItem = new EventEmitter<any>();
  @Output()
  public clickDeleteItem = new EventEmitter<any>();
  @Output()
  public clickEditItem = new EventEmitter<any>();

  public searhFilters: Array<DynamicFilter> = [];
  public columns: Array<DynamicColum> = [];
  public loading = true;
  public items: any[] = [];
  public totalItens = 0;
  public pagination!: TablePagination;
  public filters: Array<DynamicFilter> = [];

  constructor(private ref: ChangeDetectorRef, private router: Router) {}

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

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
    if (!this.pagination) {
      return;
    }
    this.loading = true;
    const queryParams = new SearchQueryParams(
      this.pagination,
      this.filters
        .filter((filter) => filter.value !== '')
        .map((filter) => new SearchItem(filter.field, filter.value as string))
    );

    this.clickSearch.emit(queryParams);
  }

  @Input()
  public set pageResponse(pageResponse: PageResponse<any>) {
    this.loading = false;
    if (pageResponse) {
      this.items = pageResponse.content;
      this.totalItens = pageResponse.totalElements;
    }
  }

  onClickSelectItem(itemSelected: any) {
    this.clickSelectItem.emit(itemSelected);
  }

  onClickEditItem(itemSelected: any) {
    this.clickEditItem.emit(itemSelected);
  }

  onClickNew() {
    this.router.navigate([this.router.url, 'new']);
  }

  onClickDeleteItem(itemSelected: any): void {
    this.loading = true;
    const deleteAction: SearchDeleteAction = {
      itemSelected: itemSelected,
      onDeleteComplete: () => {
        this.search();
      },
    };
    this.clickDeleteItem.emit(deleteAction);
  }
}

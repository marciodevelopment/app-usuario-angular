import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
import { PageResponse } from '../../interfaces/PageResponse';
import { ActionDynamicTable } from '../../models/ActionDynamicTable';
import { SearchDeleteAction } from '../../interfaces/SearchDeleteAction';
import { TableButtomType } from '../../enums/TableButtomType';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input()
  public searchConfiguration!: SearchConfiguration;
  @Input()
  public showButtons: TableButtomType[] = [];
  @Output()
  public onSearch = new EventEmitter<SearchQueryParams>();
  @Output()
  public onSelectItem = new EventEmitter<any>();
  @Output()
  public onDeleteItem = new EventEmitter<any>();
  @Output()
  public onEditItem = new EventEmitter<any>();

  public searhFilters: Array<DynamicFilter> = [];
  public columns: Array<DynamicColum> = [];
  public loading = true;
  public items: any[] = [];
  public totalItens: number = 0;
  public pagination!: TablePagination;
  public filters: Array<DynamicFilter> = [];

  constructor(private ref: ChangeDetectorRef) {}

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

    this.onSearch.emit(queryParams);
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
    this.onSelectItem.emit(itemSelected);
  }

  onClickEditItem(itemSelected: any) {
    this.onEditItem.emit(itemSelected);
  }

  onClickDeleteItem(itemSelected: any): void {
    this.loading = true;
    const deleteAction: SearchDeleteAction = {
      itemSelected: itemSelected,
      onDeleteComplete: () => {
        this.search();
      },
    };
    this.onDeleteItem.emit(deleteAction);
  }
}

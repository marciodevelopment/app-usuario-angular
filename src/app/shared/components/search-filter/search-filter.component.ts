import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicFilter } from '../../models/DynamicFilter';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
})
export class SearchFilterComponent implements OnInit {
  @Input()
  public filters: Array<DynamicFilter> = [];
  @Output()
  public clickFilter = new EventEmitter<Array<DynamicFilter>>();

  ngOnInit(): void {
    this.filters
      .filter((filter) => filter.entriesType)
      .forEach((filter) =>
        filter.entriesType?.unshift({ value: '', label: 'Selecione um filtro' })
      );
  }

  public onClickSearch(): void {
    this.clickFilter.emit(
      this.filters.filter((filter) => filter.value !== undefined)
    );
  }
}

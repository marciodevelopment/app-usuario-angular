import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicFilter } from '../../models/DynamicFilter';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
})
export class SearchFilterComponent {
  @Input()
  public filters: Array<DynamicFilter> = [];
  @Output()
  public onClickFilter = new EventEmitter<Array<DynamicFilter>>();

  public onClickSearch(): void {
    this.onClickFilter.emit(
      this.filters.filter((filter) => filter.value !== undefined)
    );
  }
}

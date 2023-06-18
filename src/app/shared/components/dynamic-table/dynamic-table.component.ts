import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ActionDynamicTable } from '../../models/ActionDynamicTable';
import { ItemSelectedDynamicTableAction } from '../../models/ItemSelectedDynamicTableAction';
import { DynamicColum } from '../../models/DynamicColumn';
import { TablePagination } from '../../models/TablePagination';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
})
export class DynamicTableComponent {
  @Input()
  public items: any[] = [];
  @Input()
  public loading: boolean = false;
  @Input()
  public columns: Array<DynamicColum> = [];
  @Output()
  public onSelectItem = new EventEmitter<ItemSelectedDynamicTableAction>();
  @Output()
  public onDeleteItem = new EventEmitter<ItemSelectedDynamicTableAction>();
  @Output()
  public onEditItem = new EventEmitter<ItemSelectedDynamicTableAction>();

  @Output()
  public onChangePagination = new EventEmitter<TablePagination>();
  @Input()
  public totalItens: number = 0;

  public showSelectButton = true;
  public showDeleteButton = true;
  public showEditButton = true;
  public itemSelected: any;

  onClickSelectItem(itemSelected: any) {
    this.onSelectItem.emit(itemSelected);
  }

  onClickEditItem(itemSelected: any) {
    this.onEditItem.emit(itemSelected);
  }

  onClickDeleteItem(itemSelected: any): void {
    this.onDeleteItem.emit(itemSelected);
  }

  loadData(event: LazyLoadEvent) {
    let page: number = 0;
    let size: number = 10;
    let direction: string = '';
    let sortField: string = '';

    if (event.first && event.rows) {
      page = event.first / event.rows;
      page += 1;
    }
    if (event.rows) size = event.rows;
    if (event.sortField) {
      sortField = event.sortField;
      direction = event.sortOrder == -1 ? 'desc' : 'asc';
    }
    this.onChangePagination.emit(
      new TablePagination(page, size, sortField, direction)
    );
  }
}

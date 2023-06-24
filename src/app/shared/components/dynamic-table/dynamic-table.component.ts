import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ItemSelectedDynamicTableAction } from '../../models/ItemSelectedDynamicTableAction';
import { DynamicColum } from '../../models/DynamicColumn';
import { TablePagination } from '../../models/TablePagination';
import { TableButtomType } from '../../enums/TableButtomType';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
})
export class DynamicTableComponent {
  @Input()
  public items: any[] = [];
  @Input()
  public loading = false;
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
  public totalItens = 0;
  @Input()
  public showButtons: TableButtomType[] = [];

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
    let page = 0;
    let size = 10;
    let direction = '';
    let sortField = '';

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

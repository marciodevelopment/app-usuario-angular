import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { TableButtomType } from '../../enums/TableButtomType';

@Component({
  selector: 'app-table-buttons',
  templateUrl: './table-buttons.component.html',
  styleUrls: ['./table-buttons.component.scss'],
})
export class TableButtonsComponent implements OnInit {
  public showSelectButton = true;
  public showDeleteButton = true;
  public showEditButton = true;

  @Input()
  public item: any;
  @Input()
  public showButtons: TableButtomType[] = [];

  @Output()
  public onSelectItem = new EventEmitter<any>();
  @Output()
  public onDeleteItem = new EventEmitter<any>();
  @Output()
  public onEditItem = new EventEmitter<any>();

  constructor(private confirmDialogService: ConfirmDialogService) {}

  ngOnInit(): void {
    this.showEditButton =
      this.onEditItem.observed &&
      this.showButtons.indexOf(TableButtomType.EDIT) >= 0;
    this.showSelectButton =
      this.onSelectItem.observed &&
      this.showButtons.indexOf(TableButtomType.SELECT) >= 0;
    this.showDeleteButton =
      this.onDeleteItem.observed &&
      this.showButtons.indexOf(TableButtomType.DELETE) >= 0;
  }

  onClickSelectItem() {
    this.onSelectItem.emit(this.item);
  }

  onClickEditItem() {
    this.onEditItem.emit(this.item);
  }

  onClickDeleteItem() {
    this.confirmDialogService.deleteConfirmation(() =>
      this.onDeleteItem.emit(this.item)
    );
  }
}

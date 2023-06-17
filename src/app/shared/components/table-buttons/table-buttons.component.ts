import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';

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

  @Output()
  public onSelectItem = new EventEmitter<any>();
  @Output()
  public onDeleteItem = new EventEmitter<any>();
  @Output()
  public onEditItem = new EventEmitter<any>();

  constructor(private confirmDialogService: ConfirmDialogService) {}

  ngOnInit(): void {
    this.showEditButton = this.onEditItem.observed;
    this.showSelectButton = this.onSelectItem.observed;
    this.showDeleteButton = this.onDeleteItem.observed;
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

import { OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PageResponse } from 'src/app/shared/interfaces/PageResponse';
import { SearchDeleteAction } from 'src/app/shared/interfaces/SearchDeleteAction';
import { SearchConfiguration } from 'src/app/shared/models/SearchConfiguration';
import { SearchFieldConfiguration } from 'src/app/shared/models/SearchFieldConfiguration';
import { SearchQueryParams } from 'src/app/shared/models/SearchQueryParams';
import { ToastService } from 'src/app/shared/services/toast.service';
import { TableButtomType } from '../enums/TableButtomType';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

export abstract class BaseSearchComponent<T> {
  public pageResponse!: PageResponse<T>;
  private toastService: ToastService = inject(ToastService);
  private router: Router = inject(Router);
  private dialogRefConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
  private dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  constructor(
    private service: any,
    private titleMessage: string,
    public _showButtons: TableButtomType[]
  ) {}

  private isDialog(): boolean {
    return Object.keys(this.dialogRefConfig).length > 0;
  }

  public onSelectItem(event: any) {
    this.dialogRef.close(event);
  }

  public onSearch(event: SearchQueryParams) {
    this.service.pesquisar(event).subscribe({
      next: (response: any) => {
        return (this.pageResponse = response);
      },
      error: (err: any) => console.log('error', err),
    });
  }

  public onDeleteItem(deleteAction: SearchDeleteAction) {
    this.service
      .delete(deleteAction.itemSelected[this.searchConfiguration.idFieldName])
      .subscribe({
        next: () => {
          this.toastService.toastDeleteItem(this.titleMessage);
          deleteAction.onDeleteComplete();
        },
      });
  }

  public onEditItem(itemSelected: any) {
    const idItem = itemSelected[this.searchConfiguration.idFieldName];
    this.router.navigate([this.router.url, 'edit', idItem]);
  }

  public get showButtons(): TableButtomType[] {
    if (this.isDialog()) {
      return [TableButtomType.SELECT];
    }
    return this._showButtons;
  }

  public abstract get searchConfiguration(): SearchConfiguration;
}

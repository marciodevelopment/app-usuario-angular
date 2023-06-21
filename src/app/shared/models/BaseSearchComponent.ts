import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { PageResponse } from 'src/app/shared/interfaces/PageResponse';
import { SearchDeleteAction } from 'src/app/shared/interfaces/SearchDeleteAction';
import { SearchConfiguration } from 'src/app/shared/models/SearchConfiguration';
import { SearchQueryParams } from 'src/app/shared/models/SearchQueryParams';
import { ToastService } from 'src/app/shared/services/toast.service';
import { TableButtomType } from '../enums/TableButtomType';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseSearchService } from '../interfaces/BaseSearchService';

export abstract class BaseSearchComponent<SearchResponseType> {
  public pageResponse!: PageResponse<SearchResponseType>;
  private toastService: ToastService = inject(ToastService);
  private router: Router = inject(Router);
  private dialogRefConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
  private dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  constructor(
    private service: BaseSearchService<SearchResponseType>,
    private titleMessage: string,
    public _showButtons: TableButtomType[]
  ) {}

  private isDialog(): boolean {
    return Object.keys(this.dialogRefConfig).length > 0;
  }

  public onSelectItem(event: SearchResponseType) {
    this.dialogRef.close(event);
  }

  public onSearch(event: SearchQueryParams) {
    this.service.search(event).subscribe({
      next: (response: PageResponse<SearchResponseType>) => {
        return (this.pageResponse = response);
      },
      error: (err) => console.log('error', err),
    });
  }

  public onDeleteItem(deleteAction: SearchDeleteAction) {
    this.service
      .delete(deleteAction.itemSelected[this.searchConfiguration.idFieldName])
      .subscribe({
        next: () => {
          this.toastService.toastItemDeleted(this.titleMessage);
          deleteAction.onDeleteComplete();
        },
      });
  }

  public onEditItem(itemSelected: SearchResponseType) {
    const idItem =
      itemSelected[
        this.searchConfiguration.idFieldName as keyof SearchResponseType
      ];
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

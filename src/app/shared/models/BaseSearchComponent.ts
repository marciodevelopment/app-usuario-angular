import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { PageResponse } from 'src/app/shared/interfaces/PageResponse';
import { SearchDeleteAction } from 'src/app/shared/interfaces/SearchDeleteAction';
import { SearchConfiguration } from 'src/app/shared/models/SearchConfiguration';
import { SearchFieldConfiguration } from 'src/app/shared/models/SearchFieldConfiguration';
import { SearchQueryParams } from 'src/app/shared/models/SearchQueryParams';
import { ToastService } from 'src/app/shared/services/toast.service';
import { TableButtomType } from '../enums/TableButtomType';

export abstract class BaseSearchComponent {
  public pageResponse!: PageResponse<any>;
  private toastService: ToastService = inject(ToastService);
  private router: Router = inject(Router);

  constructor(private service: any, private titleMessage: string) {}

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

  public abstract get searchConfiguration(): SearchConfiguration;
  public abstract get showButtons(): TableButtomType[];
}

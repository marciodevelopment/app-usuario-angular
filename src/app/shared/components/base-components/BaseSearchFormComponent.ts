import { Type, inject } from '@angular/core';
import { take } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SearchQueryParams } from 'src/app/shared/models/SearchQueryParams';
import { ControlValueAccessor } from '@angular/forms';
import { BaseSearchService } from 'src/app/shared/interfaces/BaseSearchService';

export abstract class BaseSearchFormComponent<SearchResponseType>
  implements ControlValueAccessor
{
  public selectedItem: SearchResponseType | undefined;
  /* eslint-disable */
  public onChangeFormControl!: any;
  /* eslint-enable */
  private ref!: DynamicDialogRef;
  private dialogService = inject(DialogService);

  constructor(
    private header: string,
    private searchField: string,
    /* eslint-disable */
    private componentType: Type<any>,
    /* eslint-enable */
    private service: BaseSearchService<SearchResponseType>
  ) {}

  private search(value: string) {
    this.service
      .search(SearchQueryParams.of(this.searchField, value))
      .subscribe({
        next: (resp) => {
          if (resp.content.length > 0) {
            this.selectedItem = resp.content[0];
            this.onChangeFormControl(
              this.selectedItem[this.searchField as keyof SearchResponseType]
            );
          }
        },
      });
  }

  changeEvent(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.selectedItem = undefined;
    this.onChangeFormControl(undefined);
    if (value) {
      this.search(value);
    }
  }

  clickSearch() {
    this.ref = this.dialogService.open(this.componentType, {
      header: this.header,
      width: '95%',
      height: '95%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 1000,
      maximizable: true,
      position: 'center',
      modal: true,
    });
    this.ref.onClose.pipe(take(1)).subscribe({
      next: (resp) => {
        this.selectedItem = resp;
        if (resp) {
          this.onChangeFormControl(
            resp[this.searchField as keyof SearchResponseType]
          );
        } else {
          this.writeValue;
          this.onChangeFormControl(undefined);
        }
      },
    });
  }

  writeValue(value: string): void {
    if (value) {
      this.search(value);
    }
  }
  /* eslint-disable */
  registerOnChange(onChange: any): void {
    this.onChangeFormControl = onChange;
  }
  registerOnTouched(onTouched: any): void {}
  /* eslint-enable */
  onInit(id?: string) {
    if (id) {
      this.search(id);
    }
  }
}

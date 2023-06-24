import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Location } from '@angular/common';
import { FormGroupUtils } from 'src/app/shared/utils/FormGroupUtils';

import { Observable } from 'rxjs';

import { BaseFormService } from 'src/app/shared/interfaces/BaseFormService';
import { SexoType } from 'src/app/modules/usuario/types/SexoType';
export abstract class BaseFormComponent<
  NewRequestType,
  UpdateRequestType,
  EditResponseType
> {
  private toastService: ToastService = inject(ToastService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private location: Location = inject(Location);
  private idEdit!: number;
  public executeSave = this.saveNew;
  public isSaving = false;

  constructor(
    private messageTitle: string,
    private service: BaseFormService<
      NewRequestType,
      UpdateRequestType,
      EditResponseType
    >
  ) {}

  OnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.executeSave = this.saveEdit;
      this.idEdit = this.route.snapshot.paramMap.get('id') as unknown as number;
      this.service.findById(this.idEdit).subscribe({
        next: (resp: EditResponseType) =>
          FormGroupUtils.copyToFormGroup(resp, this.form),
      });
    }
  }

  onClickSubmit() {
    this.isSaving = true;
    this.executeSave().subscribe({
      next: () => {
        this.toastService.toastItemSaved('Usuário');
        this.clickBack();
      },
      error: () => (this.isSaving = false),
    });
  }

  saveNew(): Observable<string> {
    const newRequest: NewRequestType =
      FormGroupUtils.generateInterfaceFormGroup<NewRequestType>(this.form);
    return this.service.save(newRequest);
  }

  saveEdit(): Observable<string> {
    const updateRequest: UpdateRequestType =
      FormGroupUtils.generateInterfaceFormGroup<UpdateRequestType>(this.form);
    return this.service.update(this.idEdit, updateRequest);
  }

  clickBack() {
    this.location.back();
  }

  abstract get form(): FormGroup;
}

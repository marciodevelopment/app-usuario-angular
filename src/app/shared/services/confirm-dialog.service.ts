import { Injectable } from '@angular/core';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private confirmationDialogSubject = new BehaviorSubject<Confirmation>({});

  constructor(private confirmationService: ConfirmationService) {}

  /**
   * Should use
   * @param accpet
   * @param reject
   */
  public deleteConfirmation(accpet: Function, reject?: Function): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar este item ?',
      header: 'Confirmação de exclusão',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: accpet,
      reject: reject,
    });
  }

  private setConfirmation(confirmation: Confirmation) {
    if (this.confirmationDialogSubject == null) {
      this.confirmationDialogSubject = new BehaviorSubject<Confirmation>(
        confirmation
      );
    }
    this.confirmationDialogSubject.next(confirmation);
  }

  getConfirmation() {
    return this.confirmationDialogSubject.asObservable();
  }
}

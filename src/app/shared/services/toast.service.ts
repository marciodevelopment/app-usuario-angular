import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SeverityType } from '../enums/SeverityType';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private TOAST_LIFE = 2500;
  constructor(private messageService: MessageService) {}

  successToast(detail?: string, summary = 'Sucesso'): void {
    this.toast(SeverityType.SUCCESS, summary, detail);
  }

  errorToast(detail?: string, summary = 'Erro'): void {
    this.toast(SeverityType.ERROR, summary, detail);
  }

  toast(severity: SeverityType, summary?: string, detail?: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: this.TOAST_LIFE,
    });
  }

  toastItemDeleted(itemDescription: string): void {
    this.successToast(`${itemDescription} excluído com sucesso.`);
  }

  toastItemSaved(itemDescription: string): void {
    this.successToast(`${itemDescription} salvo com sucesso.`);
  }

  toastItemUpdated(itemDescription: string): void {
    this.successToast(`${itemDescription} atualizado com sucesso.`);
  }
}

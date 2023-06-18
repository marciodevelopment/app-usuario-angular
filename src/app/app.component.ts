import { Component, OnInit } from '@angular/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { ConfirmDialogService } from './shared/services/confirm-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'usuario-app';

  constructor(
    private primengConfig: PrimeNGConfig,
    private confirmDialogService: ConfirmDialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.primengConfig.setTranslation({
      apply: 'Aplicar',
      clear: 'Limpar',
    });

    this.confirmDialogService.getConfirmation().subscribe({
      next: (confirmationMessage) =>
        Object.keys(confirmationMessage).length !== 0 &&
        this.confirmationService.confirm(confirmationMessage),
    });
  }
}

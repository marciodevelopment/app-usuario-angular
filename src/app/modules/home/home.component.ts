import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { SearchFieldConfiguration } from 'src/app/shared/models/SearchFieldConfiguration';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public searchConfigurationItens: Array<SearchFieldConfiguration> = [];

  constructor(
    private confirmDialogService: ConfirmDialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.confirmDialogService.getConfirmation().subscribe({
      next: (confirmationMessage) =>
        Object.keys(confirmationMessage).length !== 0 &&
        this.confirmationService.confirm(confirmationMessage),
    });

    /*
    this.searchConfigurationItens.push(
      new SearchFieldConfiguration('code', 'Code', '10%', true),
      new SearchFieldConfiguration('name', 'Name', '40%', true),
      new SearchFieldConfiguration('category', 'Category', '40%', true),
      new SearchFieldConfiguration('quantity', 'Quantity', '10%', false)
    );
    */
  }
}

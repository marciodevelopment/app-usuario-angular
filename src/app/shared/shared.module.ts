import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { ButtonModule } from 'primeng/button';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { TooltipModule } from 'primeng/tooltip';
import { TableButtonsComponent } from './components/table-buttons/table-buttons.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { HttpServiceService } from './services/http-service.service';

@NgModule({
  declarations: [
    DynamicTableComponent,
    SearchFilterComponent,
    SearchComponent,
    TableButtonsComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    ConfirmDialogModule,
  ],
  exports: [SearchComponent],
  providers: [ConfirmationService],
})
export class SharedModule {}
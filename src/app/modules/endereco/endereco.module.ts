import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ENDERECO_ROUTES } from './endereco.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { CidadePesquisaFormComponent } from './cidade-pesquisa-form/cidade-pesquisa-form.component';
import { CidadePesquisaComponent } from './cidade-pesquisa/cidade-pesquisa.component';

import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

@NgModule({
  declarations: [CidadePesquisaComponent, CidadePesquisaFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ENDERECO_ROUTES),
    SharedModule,
    InputTextModule,
    CardModule,
    TooltipModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
    DynamicDialogModule,
    InputNumberModule,
  ],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig],
  exports: [CidadePesquisaFormComponent],
})
export class EnderecoModule {}

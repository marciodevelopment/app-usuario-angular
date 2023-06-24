import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
} from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';

import { SharedModule } from 'src/app/shared/shared.module';
import { USUARIO_ROUTES } from './usuario.routing';
import { UsuarioPesquisaComponent } from './usuario/usuario-pesquisa/usuario-pesquisa.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { EnderecoModule } from '../endereco/endereco.module';

@NgModule({
  declarations: [UsuarioPesquisaComponent, UsuarioFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,
    CalendarModule,

    RouterModule.forChild(USUARIO_ROUTES),
    SharedModule,
    EnderecoModule,
  ],
  providers: [DialogService, DynamicDialogConfig],
  exports: [],
})
export class UsuarioModule {}

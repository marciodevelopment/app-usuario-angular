import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioPesquisaComponent } from './usuario/usuario-pesquisa/usuario-pesquisa.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { USUARIO_ROUTES } from './usuario.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { ButtonModule } from 'primeng/button';
import { CidadePesquisaComponent } from '../endereco/cidade-pesquisa/cidade-pesquisa.component';
import { EnderecoModule } from '../endereco/endereco.module';
import { CardModule } from 'primeng/card';

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

@NgModule({
  declarations: [UsuarioPesquisaComponent, UsuarioFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(USUARIO_ROUTES),
    SharedModule,
    EnderecoModule,

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
  ],
  providers: [DialogService, DynamicDialogConfig],
  exports: [],
})
export class UsuarioModule {}

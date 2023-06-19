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
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

@NgModule({
  declarations: [UsuarioPesquisaComponent, UsuarioFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(USUARIO_ROUTES),
    SharedModule,
    ButtonModule,
    EnderecoModule,
    CardModule,
    DynamicDialogModule,
  ],
  providers: [DialogService, DynamicDialogConfig],
  exports: [],
})
export class UsuarioModule {}

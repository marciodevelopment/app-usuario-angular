import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioPesquisaComponent } from './usuario/usuario-pesquisa/usuario-pesquisa.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { USUARIO_ROUTES } from './usuario.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [UsuarioPesquisaComponent, UsuarioFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(USUARIO_ROUTES),
    SharedModule,
    ButtonModule,
  ],
  exports: [],
})
export class UsuarioModule {}

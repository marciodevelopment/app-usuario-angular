import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { USUARIO_ROUTES } from './usuario.routing';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuarioService } from './services/usuario.service';
@NgModule({
  declarations: [UsuarioPesquisaComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(USUARIO_ROUTES),
    SharedModule,
  ],
  exports: [],
})
export class UsuarioModule {}

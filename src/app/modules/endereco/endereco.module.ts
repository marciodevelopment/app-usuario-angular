import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CidadePesquisaComponent } from './cidade-pesquisa/cidade-pesquisa.component';
import { HttpClientModule } from '@angular/common/http';
import { ENDERECO_ROUTES } from './endereco.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CidadePesquisaComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ENDERECO_ROUTES),
    SharedModule,
  ],
})
export class EnderecoModule {}

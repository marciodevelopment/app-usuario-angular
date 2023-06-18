import { Routes } from '@angular/router';
import { CidadePesquisaComponent } from './cidade-pesquisa/cidade-pesquisa.component';

export const ENDERECO_ROUTES: Routes = [
  {
    path: 'cidades',
    component: CidadePesquisaComponent,
  },
];

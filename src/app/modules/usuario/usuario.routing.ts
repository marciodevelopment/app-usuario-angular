import { Routes } from '@angular/router';
import { UsuarioPesquisaComponent } from './usuario/usuario-pesquisa/usuario-pesquisa.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';

export const USUARIO_ROUTES: Routes = [
  {
    path: '',
    component: UsuarioPesquisaComponent,
  },
  {
    path: 'edit/:id',
    component: UsuarioFormComponent,
  },
  {
    path: 'new',
    component: UsuarioFormComponent,
  },
];

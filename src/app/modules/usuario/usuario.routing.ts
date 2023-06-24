import { Routes } from '@angular/router';
import { UsuarioPesquisaComponent } from './usuario/usuario-pesquisa/usuario-pesquisa.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';

export const USUARIO_ROUTES: Routes = [
  {
    path: 'usuarios',
    component: UsuarioPesquisaComponent,
  },
  {
    path: 'usuarios/edit/:id',
    component: UsuarioFormComponent,
  },
  {
    path: 'usuarios/new',
    component: UsuarioFormComponent,
  },
];

import { Injectable } from '@angular/core';
import { UsuarioPesquisaResponse } from '../interfaces/response/UsuarioPesquisaResponse';
import { UsuarioResponse } from '../interfaces/response/UsuarioResponse';
import { UsuarioAtualizacaoRequest } from '../interfaces/request/UsuarioAtualizacaoRequest';
import { UsuarioNovoRequest } from '../interfaces/request/UsuarioNovoRequest';
import { CrudService } from 'src/app/shared/services/CrudService';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends CrudService<
  UsuarioNovoRequest,
  UsuarioPesquisaResponse,
  UsuarioResponse,
  UsuarioAtualizacaoRequest
> {
  constructor() {
    super('usuarios');
  }
}

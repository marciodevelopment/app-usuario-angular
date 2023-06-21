import { Injectable } from '@angular/core';
import { CidadePesquisaReponse } from '../interfaces/CidadePesquisaReponse';
import { CrudService } from 'src/app/shared/services/CrudService';

@Injectable({
  providedIn: 'root',
})
export class CidadeService extends CrudService<
  null,
  CidadePesquisaReponse,
  null,
  null
> {
  constructor() {
    super('cidades');
  }
}

import { Component } from '@angular/core';
import { SearchConfiguration } from 'src/app/shared/models/SearchConfiguration';
import { UsuarioService } from '../../services/usuario.service';
import { SearchFieldConfiguration } from 'src/app/shared/models/SearchFieldConfiguration';
import { UsuarioPesquisaResponse } from '../../interfaces/response/UsuarioPesquisaResponse';
import { BaseSearchComponent } from '../../../../shared/models/BaseSearchComponent';
import { TableButtomType } from 'src/app/shared/enums/TableButtomType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.scss'],
})
export class UsuarioPesquisaComponent extends BaseSearchComponent<UsuarioPesquisaResponse> {
  constructor(private usuarioService: UsuarioService, public route: Router) {
    super(usuarioService, 'Usuário', [
      TableButtomType.DELETE,
      TableButtomType.EDIT,
    ]);
  }

  public override get searchConfiguration(): SearchConfiguration {
    return new SearchConfiguration('cdUsuario', 'Pesquisa Usuários', [
      new SearchFieldConfiguration('cdUsuario', 'Cód. usuário', true, '10%'),
      new SearchFieldConfiguration('nmUsuario', 'Nome usuário', true),
      new SearchFieldConfiguration('nmMae', 'Nome Mãe', true),
      new SearchFieldConfiguration('sexo', 'Sexo', true),
      new SearchFieldConfiguration('nrCpf', 'Nr. CPF', true, '10%'),
    ]);
  }
}

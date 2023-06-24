import { Component } from '@angular/core';
import { SearchConfiguration } from 'src/app/shared/models/SearchConfiguration';
import { UsuarioService } from '../../services/usuario.service';
import { SearchFieldConfiguration } from 'src/app/shared/models/SearchFieldConfiguration';
import { UsuarioPesquisaResponse } from '../../interfaces/response/UsuarioPesquisaResponse';
import { BaseSearchComponent } from '../../../../shared/components/base-components/BaseSearchComponent';
import { TableButtomType } from 'src/app/shared/enums/TableButtomType';
import { Router } from '@angular/router';
import { SexoType } from '../../types/SexoType';
import { EnumUtil } from '../../../../shared/utils/EnumUtil';

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
      new SearchFieldConfiguration('cdUsuario', 'Cód. usuário'),
      new SearchFieldConfiguration('nmUsuario', 'Nome usuário', {
        filter: true,
        width: '12',
      }),
      new SearchFieldConfiguration('nmMae', 'Nome Mãe', {
        filter: true,
        width: '12',
      }),
      new SearchFieldConfiguration('sexo', 'Sexo', {
        filter: true,
        width: '6',
        entriesType: EnumUtil.convertToComboboxValues(SexoType),
      }),
      new SearchFieldConfiguration('nrCpf', 'Nr. CPF', {
        filter: true,
        width: '6',
      }),
    ]);
  }
}

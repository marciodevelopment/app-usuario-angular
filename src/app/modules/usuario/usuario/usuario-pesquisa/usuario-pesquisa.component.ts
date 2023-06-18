import { Component, OnInit } from '@angular/core';
import { SearchConfiguration } from 'src/app/shared/models/SearchConfiguration';
import { UsuarioService } from '../../services/usuario.service';
import { SearchFilterComponent } from 'src/app/shared/components/search-filter/search-filter.component';
import { SearchFieldConfiguration } from 'src/app/shared/models/SearchFieldConfiguration';
import { Observable, filter } from 'rxjs';
import { SearchQueryParams } from 'src/app/shared/models/SearchQueryParams';
import { PageResponse } from 'src/app/shared/interfaces/PageResponse';
import { UsuarioPesquisaResponse } from '../../interfaces/response/UsuarioPesquisaResponse';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SearchDeleteAction } from 'src/app/shared/interfaces/SearchDeleteAction';
import { BaseSearchComponent } from '../../../../shared/models/BaseSearchComponent';
import { TableButtomType } from 'src/app/shared/enums/TableButtomType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.scss'],
})
export class UsuarioPesquisaComponent extends BaseSearchComponent {
  constructor(private usuarioService: UsuarioService) {
    super(usuarioService, 'Usuário');
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

  public override get showButtons(): TableButtomType[] {
    return [TableButtomType.DELETE, TableButtomType.EDIT];
  }
}

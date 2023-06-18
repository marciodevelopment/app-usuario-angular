import { Component, OnInit } from '@angular/core';
import { BaseSearchComponent } from 'src/app/shared/models/BaseSearchComponent';
import { CidadeService } from '../services/cidade.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';
import { SearchConfiguration } from 'src/app/shared/models/SearchConfiguration';
import { SearchFieldConfiguration } from 'src/app/shared/models/SearchFieldConfiguration';
import { TableButtomType } from 'src/app/shared/enums/TableButtomType';

@Component({
  selector: 'app-cidade-pesquisa',
  templateUrl: './cidade-pesquisa.component.html',
})
export class CidadePesquisaComponent extends BaseSearchComponent {
  private buttons: TableButtomType[] = [];

  constructor(private cidadeService: CidadeService) {
    super(cidadeService, 'Cidade');
  }

  public get searchConfiguration(): SearchConfiguration {
    return new SearchConfiguration('cdCidade', 'Cidades', [
      new SearchFieldConfiguration('cdCidade', 'Cód. Cidade', false, '10%'),
      new SearchFieldConfiguration('nmCidade', 'Nome Cidade', true),
    ]);
  }

  public override get showButtons(): TableButtomType[] {
    return [TableButtomType.SELECT];
  }
}

import { Component, OnInit } from '@angular/core';
import { SearchConfiguration } from 'src/app/shared/models/SearchConfiguration';
import { UsuarioService } from '../services/usuario.service';
import { SearchFilterComponent } from 'src/app/shared/components/search-filter/search-filter.component';
import { SearchFieldConfiguration } from 'src/app/shared/models/SearchFieldConfiguration';
import { filter } from 'rxjs';
import { SearchQueryParams } from 'src/app/shared/models/SearchQueryParams';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.scss'],
})
export class UsuarioPesquisaComponent implements OnInit {
  public searchConfiguration!: SearchConfiguration;

  constructor(private usuarioService: UsuarioService) {}
  ngOnInit(): void {}
  /*
  ngOnInit(): void {
    this.searchConfiguration = new SearchConfiguration(
      'Pesquisa Usuários',
      this.usuarioService.pesquisar,
      this.getSearchFieldsConfiguration()
    );
  }

  getSearchFieldsConfiguration(): Array<SearchFieldConfiguration> {
    return [
      new SearchFieldConfiguration('cdUsuario', 'Cód. usuário', true),
      new SearchFieldConfiguration('nmUsuario', 'Nome usuário', true),
      new SearchFieldConfiguration('nmMae', 'Nome Mãe', true),
      new SearchFieldConfiguration('sexo', 'Sexo', true),
      new SearchFieldConfiguration('nrCpf', 'Nr. CPF', true),
    ];
  }
  */

  pesquisar() {
    this.usuarioService.pesquisar2().subscribe({
      next: (response) => console.log('response', response),
      error: (err) => console.log('error', err),
    });
  }
}

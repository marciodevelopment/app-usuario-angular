import { Component, OnInit } from '@angular/core';
import { SearchConfiguration } from 'src/app/shared/models/SearchConfiguration';
import { UsuarioService } from '../services/usuario.service';
import { SearchFilterComponent } from 'src/app/shared/components/search-filter/search-filter.component';
import { SearchFieldConfiguration } from 'src/app/shared/models/SearchFieldConfiguration';
import { Observable, filter } from 'rxjs';
import { SearchQueryParams } from 'src/app/shared/models/SearchQueryParams';
import { PageResponse } from 'src/app/shared/interfaces/PageResponse';
import { UsuarioPesquisaResponse } from '../interfaces/response/UsuarioPesquisaResponse';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.scss'],
})
export class UsuarioPesquisaComponent implements OnInit {
  public pageResponse!: PageResponse<UsuarioPesquisaResponse>;

  public searchConfiguration!: SearchConfiguration;

  constructor(public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.searchConfiguration = new SearchConfiguration(
      'Pesquisa Usuários',
      this.getSearchFieldsConfiguration()
    );
  }

  public delete(usuario: UsuarioPesquisaResponse) {
    console.log('delete', usuario);
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

  onSearch(event: SearchQueryParams) {
    this.usuarioService.pesquisar(event).subscribe({
      next: (response) => {
        return (this.pageResponse = response);
      },
      error: (err) => console.log('error', err),
    });
  }
}

import { Inject, Injectable, inject } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

import { UsuarioPesquisaResponse } from '../interfaces/response/UsuarioPesquisaResponse';

import { PageResponse } from '../../../shared/interfaces/PageResponse';
import { SearchQueryParams } from '../../../shared/models/SearchQueryParams';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioResponse } from '../interfaces/response/UsuarioResponse';
import { UsuarioAtualizacaoRequest } from '../interfaces/request/UsuarioAtualizacaoRequest';
import { UsuarioNovoRequest } from '../interfaces/request/UsuarioNovoRequest';

export class CrudService<NewRequestType, SearchResponseType> {
  private httpService = inject(HttpService);
  private http = inject(HttpClient);

  constructor(private url: string) {}

  search(
    searchQueryParams: SearchQueryParams
  ): Observable<PageResponse<SearchResponseType>> {
    const params = new HttpParams({
      fromString: searchQueryParams.getQueryString(),
    });
    return this.httpService.get<PageResponse<SearchResponseType>>(this.url, {
      params: params,
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private SERVICE_URL = 'usuarios';

  constructor(private httpService: HttpService, private http: HttpClient) {}

  pesquisar(
    searchQueryParams: SearchQueryParams
  ): Observable<PageResponse<UsuarioPesquisaResponse>> {
    const params = new HttpParams({
      fromString: searchQueryParams.getQueryString(),
    });
    return this.httpService.get<PageResponse<UsuarioPesquisaResponse>>(
      this.SERVICE_URL,
      {
        params: params,
      }
    );
  }

  deletar(cdUsuario: number): Observable<string> {
    return this.httpService.delete(this.SERVICE_URL, cdUsuario);
  }

  buscarPor(cdUsuario: number): Observable<UsuarioResponse> {
    return this.httpService.getById<UsuarioResponse>(
      this.SERVICE_URL,
      cdUsuario
    );
  }

  atualizar(
    cdUsuario: number,
    usuarioAtualizacao: UsuarioAtualizacaoRequest
  ): Observable<string> {
    return this.httpService.put<UsuarioAtualizacaoRequest>(
      this.SERVICE_URL,
      cdUsuario,
      usuarioAtualizacao
    );
  }

  salvar(usuarioNovo: UsuarioNovoRequest): Observable<string> {
    return this.httpService.post<UsuarioNovoRequest>(
      this.SERVICE_URL,
      usuarioNovo
    );
  }
}

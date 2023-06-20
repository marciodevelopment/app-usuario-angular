import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

import { UsuarioPesquisaResponse } from '../interfaces/response/UsuarioPesquisaResponse';

import { PageResponse } from '../../../shared/interfaces/PageResponse';
import { SearchQueryParams } from '../../../shared/models/SearchQueryParams';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioResponse } from '../interfaces/response/UsuarioResponse';
import { UsuarioAtualizacaoRequest } from '../interfaces/request/UsuarioAtualizacaoRequest';
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

  delete(cdUsuario: number): Observable<Object> {
    return this.httpService.delete(this.SERVICE_URL, cdUsuario);
  }

  getById(cdUsuario: string): Observable<UsuarioResponse> {
    return this.httpService.getById<UsuarioResponse>(
      this.SERVICE_URL,
      cdUsuario
    );
  }

  salvarAtualizacao(
    cdUsuario: number,
    usuarioAtualizacao: UsuarioAtualizacaoRequest
  ): Observable<Object> {
    return this.httpService.put<UsuarioAtualizacaoRequest>(
      this.SERVICE_URL,
      cdUsuario,
      usuarioAtualizacao
    );
  }
}

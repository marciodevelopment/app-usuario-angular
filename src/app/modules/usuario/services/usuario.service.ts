import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

import { UsuarioPesquisaResponse } from '../interfaces/response/UsuarioPesquisaResponse';

import { PageResponse } from '../../../shared/interfaces/PageResponse';
import { SearchQueryParams } from '../../../shared/models/SearchQueryParams';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}

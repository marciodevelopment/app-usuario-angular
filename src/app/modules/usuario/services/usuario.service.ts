import { Injectable } from '@angular/core';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';

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

  constructor(
    private httpService: HttpServiceService,
    private http: HttpClient
  ) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      //Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  pesquisar2(): Observable<PageResponse<UsuarioPesquisaResponse>> {
    console.log('passou no pesquisa');
    /*
    const params = new HttpParams();
    searchQueryParams
      .getSearchItems()
      .forEach((search) => params.append(search.name, search.value));
    */
    return this.http.get<any>(`http://localhost:8080/usuarios`);
  }

  pesquisar(
    searchQueryParams: SearchQueryParams
  ): Observable<PageResponse<UsuarioPesquisaResponse>> {
    console.log('passou no pesquisa');
    /*
    const params = new HttpParams();
    searchQueryParams
      .getSearchItems()
      .forEach((search) => params.append(search.name, search.value));
    */
    this.http
      .get<PageResponse<UsuarioPesquisaResponse>>(
        `http://localhost:8080/usuarios?page=0&size=10&nmUsuario=Mar`,
        this.httpOptions
      )
      .subscribe({
        next: (response) => console.log('response', response),
        error: (err) => console.log('error', err),
      });
    console.log('passou no http');
    return this.http.get<PageResponse<UsuarioPesquisaResponse>>(
      `http://localhost:8080/usuarios?page=0&size=10&nmUsuario=Mar`,
      this.httpOptions
    );

    /*
    return this.httpService.get<PageResponse<UsuarioPesquisaResponse>>(
      this.SERVICE_URL,
      {
        params: params,
      }
    );*/
  }
}

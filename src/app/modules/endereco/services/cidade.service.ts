import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchQueryParams } from 'src/app/shared/models/SearchQueryParams';
import { HttpService } from 'src/app/shared/services/http.service';
import { CidadePesquisaReponse } from '../interfaces/CidadePesquisaReponse';
import { PageResponse } from 'src/app/shared/interfaces/PageResponse';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CidadeService {
  private URL_SERVICE = 'cidades';
  constructor(private httpService: HttpService) {}

  pesquisar(
    searchQueryParams: SearchQueryParams
  ): Observable<PageResponse<CidadePesquisaReponse>> {
    return this.httpService.search(this.URL_SERVICE, searchQueryParams);
  }
}

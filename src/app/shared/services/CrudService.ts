import { inject } from '@angular/core';
import { BaseFormService } from '../interfaces/BaseFormService';
import { SearchQueryParams } from '../models/SearchQueryParams';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpService } from './http.service';
import { PageResponse } from '../interfaces/PageResponse';
import { Observable } from 'rxjs';

export class CrudService<
  SearchResponseType,
  EditResponseType,
  NewRequestType,
  UpdateRequestType
> implements
    BaseFormService<NewRequestType, UpdateRequestType, EditResponseType>
{
  private httpService = inject(HttpService);
  private http = inject(HttpClient);

  constructor(public baseUrl: string) {}

  search(
    searchQueryParams: SearchQueryParams
  ): Observable<PageResponse<SearchResponseType>> {
    const params = new HttpParams({
      fromString: searchQueryParams.getQueryString(),
    });
    return this.httpService.get<PageResponse<SearchResponseType>>(
      this.baseUrl,
      {
        params: params,
      }
    );
  }

  delete(id: number): Observable<string> {
    return this.httpService.delete(this.baseUrl, id);
  }

  findById(id: number): Observable<EditResponseType> {
    return this.httpService.getById<EditResponseType>(this.baseUrl, id);
  }

  update(id: number, updateRequest: UpdateRequestType): Observable<string> {
    return this.httpService.put<UpdateRequestType>(
      this.baseUrl,
      id,
      updateRequest
    );
  }

  save(newRequest: NewRequestType): Observable<string> {
    return this.httpService.post<NewRequestType>(this.baseUrl, newRequest);
  }
}

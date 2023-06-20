import {
  HttpClient,
  HttpContext,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioPesquisaResponse } from 'src/app/modules/usuario/interfaces/response/UsuarioPesquisaResponse';
import { SearchQueryParams } from '../models/SearchQueryParams';
import { PageResponse } from '../interfaces/PageResponse';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private BASE_URL = 'http://localhost:8080/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      //Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient) {}

  get<T>(
    url: string,
    options?: {
      params?: HttpParams;
    }
  ): Observable<T> {
    return this.http.get<T>(this.BASE_URL.concat(url), {
      ...this.httpOptions,
      params: options?.params,
    });
  }

  delete(url: string, id: number): Observable<Object> {
    return this.http.delete(
      `${this.BASE_URL.concat(url)}/${id}`,
      this.httpOptions
    );
  }

  put<T>(url: string, id: number, request: T): Observable<Object> {
    return this.http.put(
      `${this.BASE_URL.concat(url)}/${id}`,
      request,
      this.httpOptions
    );
  }

  getById<T>(url: string, id: string): Observable<T> {
    return this.http.get<T>(
      `${this.BASE_URL.concat(url)}/${id}`,
      this.httpOptions
    );
  }

  search<T>(
    url: string,
    searchQueryParams: SearchQueryParams
  ): Observable<PageResponse<T>> {
    const params = new HttpParams({
      fromString: searchQueryParams.getQueryString(),
    });
    return this.get<PageResponse<T>>(url, {
      params: params,
    });
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  delete(url: string, id: number): Observable<string> {
    return this.http.delete(`${this.BASE_URL.concat(url)}/${id}`, {
      ...this.httpOptions,
      responseType: 'text',
    });
  }

  post<T>(url: string, request: T): Observable<string> {
    return this.http.post(this.BASE_URL.concat(url), request, {
      ...this.httpOptions,
      responseType: 'text',
    });
  }

  put<T>(url: string, id: number, request: T): Observable<string> {
    return this.http.put(`${this.BASE_URL.concat(url)}/${id}`, request, {
      ...this.httpOptions,
      responseType: 'text',
    });
  }

  getById<T>(url: string, id: number): Observable<T> {
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

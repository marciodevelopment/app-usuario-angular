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

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
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
}

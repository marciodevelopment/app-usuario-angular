import { Observable } from 'rxjs';

export interface BaseFormService<
  NewRequestType,
  UpdateRequestType,
  EditResponseType
> {
  update(id: number, updateRequest: UpdateRequestType): Observable<string>;
  save(newRequest: NewRequestType): Observable<string>;
  findById(id: number): Observable<EditResponseType>;
}

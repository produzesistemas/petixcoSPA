import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { Categoria } from '../_model/categoria-model';

@Injectable({ providedIn: 'root' })

export class CategoriaService extends GenericHttpService<any> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
        return this.postAll('categoria/filter', filter);
      }

    get(id: any) {
        return this.http.get<Categoria>(`${this.getUrlApi()}categoria/${id}`);
    }

    deleteById(id) {
        return this.delete(`categoria/${id}`);
  }

  active(entity) {
    return this.post('categoria/active', entity);
 }

 save(entity) {
    return this.post('categoria/save', entity);
 }

}

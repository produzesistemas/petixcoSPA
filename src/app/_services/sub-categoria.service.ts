import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { SubCategoria } from '../_model/sub-categoria-model';

@Injectable({ providedIn: 'root' })

export class SubCategoriaService extends GenericHttpService<SubCategoria> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
        return this.postAll('subCategoria/filter', filter);
      }

    get(id: any) {
        return this.http.get<SubCategoria>(`${this.getUrlApi()}subCategoria/${id}`);
    }

    deleteById(id) {
        return this.delete(`subCategoria/${id}`);
  }

  active(entity) {
    return this.post('subCategoria/active', entity);
 }

 save(entity) {
    return this.post('subCategoria/save', entity);
 }

}

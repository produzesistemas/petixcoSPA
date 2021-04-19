import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../_model/produto-model';
import { GenericHttpService } from './genericHttpService';

@Injectable({ providedIn: 'root' })

export class ProdutoService extends GenericHttpService<Produto> {

    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('produto/filter', filter);
    }

    getByLoja(filter: any) {
      return this.postAll('produto/getByLoja', filter);
  }

  getBySubCategoria(filter: any) {
    return this.postAll('produto/getBySubCategoria', filter);
}
    save(entity) {
      return this.post('produto/save', entity);
   }

  deleteById(id) {
          return this.delete(`produto/${id}`);
    }

    get(id: any) {
      return this.http.get<Produto>(`${this.getUrlApi()}produto/${id}`);
  }

  active(entity) {
    return this.post('produto/active', entity);
 }

}

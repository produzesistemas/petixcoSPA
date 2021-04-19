import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { LojaCEP } from 'src/app/_model/loja-cep-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class LojaCEPService extends GenericHttpService<LojaCEP> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
        return this.postAll('lojaCep/filter', filter);
      }

      save(entity) {
        return this.post('lojaCep/save', entity);
     }

    deleteById(id) {
            return this.delete(`lojaCep/${id}`);
      }

      get(id: any) {
        return this.http.get<LojaCEP>(`${this.getUrlApi()}lojaCep/${id}`);
    }

    active(entity) {
      return this.post('lojaCep/active', entity);
   }

   getSelected() {
    return new BehaviorSubject<any>(JSON.parse(localStorage.getItem('petixco_cep'))).getValue();
}

removeSelected() {
    localStorage.removeItem('petixco_cep');
}

addSelected(cep: any) {
    localStorage.setItem('petixco_cep', JSON.stringify(cep));
}




}

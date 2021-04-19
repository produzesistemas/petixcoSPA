import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Endereco } from '../_model/endereco';
import { GenericHttpService } from './genericHttpService';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class EnderecoService extends GenericHttpService<any>{
     constructor(private http: HttpClient) {
          super(http);
      }

   set(address: Endereco) {
        localStorage.setItem('petixco_address', JSON.stringify(address));
   }

   remove() {
    localStorage.removeItem('petixco_address');
   }

   load() {
    return new BehaviorSubject<any>(JSON.parse(localStorage.getItem('petixco_address'))).getValue();
   }

   getByUser() {
     return this.http.get<Endereco>(`${this.getUrlApi()}endereco/getByUser`);
 }


}

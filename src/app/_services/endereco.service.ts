import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Endereco } from '../_model/endereco';

@Injectable({ providedIn: 'root' })

export class EnderecoService {

    constructor() {

    }

   confirm(address: Endereco) {
        localStorage.setItem('petixco_address', JSON.stringify(address));
   }

   remove() {
    localStorage.removeItem('petixco_address');
   }

   load() {
    return new BehaviorSubject<any>(JSON.parse(localStorage.getItem('petixco_address'))).getValue();
   }

}

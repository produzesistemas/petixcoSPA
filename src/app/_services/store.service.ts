import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../_model/store';
import { GenericHttpService } from './genericHttpService';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class StoreService extends GenericHttpService<Store> {

    constructor(private http: HttpClient) {
        super(http);
    }

    getStoreByCep(cep: any) {
        return this.http.get<any[]>(`${this.getUrlApi()}getStoreByCep/${cep}`);
    }

    loadStoreSelected() {
        return new BehaviorSubject<any>(JSON.parse(localStorage.getItem('petixco_storecategoryproduct'))).getValue();
    }

    removeStoreSelected() {
        localStorage.removeItem('petixco_storecategoryproduct');
    }

    addStoreSelected(productDTO: any) {
        localStorage.setItem('petixco_storecategoryproduct', JSON.stringify(productDTO));
    }

}

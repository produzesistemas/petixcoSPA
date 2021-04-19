import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Loja } from 'src/app/_model/loja-model';

@Injectable({ providedIn: 'root' })

export class LojaService extends GenericHttpService<Loja> {
    protected baseUrl = `${environment.urlApi}`;
    constructor(private http: HttpClient) {
        super(http);
    }

    get() {
        return this.http.get<any>(`${this.getUrlApi()}loja`);
    }

    loadStoreSelected() {
        return new BehaviorSubject<any>(JSON.parse(localStorage.getItem('petixco_store'))).getValue();
    }

    removeStoreSelected() {
        localStorage.removeItem('petixco_store');
    }

    addStoreSelected(loja: any) {
        localStorage.setItem('petixco_store', JSON.stringify(loja));
    }

    save(entity) {
        return this.post('loja/save', entity);
     }

}

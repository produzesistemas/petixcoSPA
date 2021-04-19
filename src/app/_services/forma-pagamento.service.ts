import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';

@Injectable({ providedIn: 'root' })

export class FormaPagamentoService extends GenericHttpService<any> {
    constructor(private http: HttpClient) {
        super(http);
    }

      getAll() {
        return this.http.get<any>(`${this.getUrlApi()}formaPagamento`);
    }
}

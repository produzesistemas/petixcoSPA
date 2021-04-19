import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../_model/pedido-model';
import { GenericHttpService } from './genericHttpService';

@Injectable({ providedIn: 'root' })

export class PedidoService extends GenericHttpService<Pedido> {

    constructor(private http: HttpClient) {
        super(http);
    }

    save(entity) {
        return this.post('pedido/save', entity);
     }

     getByUser(filter: any) {
        return this.postAll('pedido/getByUser', filter);
      }

      setPaymentOk(filter: any) {
        return this.postAll('pedido/setPaymentOk', filter);
      }

      getByPartner(filter: any) {
        return this.postAll('pedido/getByPartner', filter);
      }

    getAllStatusPedido() {
        return this.http.get<any>(`${this.getUrlApi()}statusPedido`);
    }

    getPedido(id: number) {
      return this.http.get<any>(`${this.getUrlApi()}pedido/${id}`);
    }

}

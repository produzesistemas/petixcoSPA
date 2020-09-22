import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pedido } from '../_model/pedido';
import { GenericHttpService } from './genericHttpService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })

export class PedidoService extends GenericHttpService<Pedido> {
    protected baseUrl = `${environment.urlApi}`;
    
    constructor(private http: HttpClient) {
        super(http);
    }

    callServer(data: {content: Pedido}): Observable<any> {
        return this.http.post(this.baseUrl + 'insertPedido', data);
    }

    insert(pedido: Pedido) {
        console.log(JSON.stringify(pedido));
        return this.http.post(this.baseUrl + 'insertPedido', pedido,
         { headers: new HttpHeaders().set('Content-Type', 'application/json')})
            .pipe(map(user => {
            if (user) {
               
                      }
            return user;
        }));
    }

    getByFilter(filter) {
        return this.postAll('values/filter', filter);
    }

    

}

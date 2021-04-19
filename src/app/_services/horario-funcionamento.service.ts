import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { HorarioFuncionamento } from 'src/app/_model/horario-funcionamento'

@Injectable({ providedIn: 'root' })

export class HorarioFuncionamentoService extends GenericHttpService<HorarioFuncionamento> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
        return this.postAll('horarioFuncionamento/filter', filter);
      }

      save(entity) {
        return this.post('horarioFuncionamento/save', entity);
     }

    deleteById(id) {
            return this.delete(`horarioFuncionamento/${id}`);
      }

      get(id: any) {
        return this.http.get<HorarioFuncionamento>(`${this.getUrlApi()}horarioFuncionamento/${id}`);
    }

    active(entity) {
      return this.post('horarioFuncionamento/active', entity);
   }

   getByLoja(filter: any) {
    return this.postAll('horarioFuncionamento/getByLoja', filter);
}

}

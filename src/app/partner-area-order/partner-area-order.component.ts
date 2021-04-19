import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Pedido } from 'src/app/_model/pedido-model';
import { PedidoService } from 'src/app/_services/pedido.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterDefaultModel } from '../_model/filter-default-model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-partner-area-order',
  templateUrl: './partner-area-order.component.html'
})

export class PartnerAreaOrderComponent implements OnInit {
  modalRef: BsModalRef;
  modalDetails: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  produto: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;
  public pedido: Pedido = new Pedido();
  public lstStatusPedido: any[];
 
  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private pedidoService: PedidoService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      dataPedido: [null]
    });
    this.onSubmit(null);
  }

  get f() { return this.form.controls; }

  getImage(nomeImage) {
    return environment.urlImagesLojas + nomeImage;
}

  onSubmit(e) {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    if ((e !== null) && (Number(e.target.value) > 0)) {
      filter.id = Number(e.target.value);
    }

    forkJoin(
      this.pedidoService.getByPartner(filter),
      this.pedidoService.getAllStatusPedido()
    ).subscribe(result => {
      this.lst = result[0];
      this.lstStatusPedido = result[1];
    });

    this.pedidoService.getByUser(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  closeDetails() {
  this.modalDetails.hide();
  }

  pay(obj: Pedido) {
    
  }

getImageProduct(nomeImage) {
    return environment.urlImagesProducts + nomeImage;
}

getSubtotal(item) {
    return item.valorProduto * item.qtd;
    }

getTotalItems() {
        let totalValue = 0;
        this.pedido.pedidoProdutos.forEach((item) => {
            totalValue += (item.valorProduto * item.qtd);
        });
        return totalValue;
    }

getStatusAcompanhamento(id) {
    return this.pedido.pedidoAcompanhamentos.find(x => x.statusPedidoId === id) ? true : false;
}

getDataAcompanhamento(id) {
    const find = this.pedido.pedidoAcompanhamentos.find(x => x.statusPedidoId === id);
    if (find) {
        return find.data;
    }
}

openDetails(template: TemplateRef<any>, item: Pedido) {
  this.pedido = item;
  this.modalDetails = this.modalService.show(template, { class: 'modal-lg' });
}

}

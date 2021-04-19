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
import { ClientAreaPaymentComponent } from 'src/app/client-area-payment/client-area-payment.component';

@Component({
  selector: 'app-client-area-order',
  templateUrl: './client-area-order.component.html'
})

export class ClientAreaOrderComponent implements OnInit {
  modalRef: BsModalRef;
  modalPay: BsModalRef;
  modalDetails: BsModalRef;
  // form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  produto: any;
  payment: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;
  public pedido: Pedido = new Pedido();
  public lstStatusPedido: any[];

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private pedidoService: PedidoService,
    private router: Router
  ) {
  }

  ngOnInit() {
    // this.form = this.formBuilder.group({
    //   dataPedido: [null]
    // });
    this.onSubmit(null);
  }

  // get f() { return this.form.controls; }

  getImage(nomeImage) {
    return environment.urlImagesLojas + nomeImage;
}

  onSubmit(e) {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    if ((e !== null) && (Number(e.target.value) > 0)) {
      filter.id = Number(e.target.value);
    }
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
      const initialState = {
          pedido: obj
        };
      this.modalPay = this.modalService.show(ClientAreaPaymentComponent,
           { initialState, class: 'inmodal modal-md' });
      this.modalPay.content.action.subscribe((edited) => {
            if (edited) {
              this.onSubmit(null);
            }
          });
  }

  checkPay(item) {
    return item.pedidoAcompanhamentos.find(x => x.statusPagamentoPedidoId === 2) ? false : true;
  }

getImageProduct(nomeImage) {
    return environment.urlImagesProducts + nomeImage;
}

getSubtotal(item) {
    return item.valorProduto * item.qtd;
    }

getTotalItems() {
        return this.pedido.pedidoProdutos.reduce((sum, current) => sum + (current.valorProduto * current.qtd), 0);
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

getStatusAtual(pedido) {
  return pedido.pedidoAcompanhamentos[0].statusPagamentoPedido.descricao;
}

getTotalPedido(item) {
  const tot = item.pedidoProdutos.reduce((sum, current) => sum + (current.valorProduto * current.qtd), 0) + item.valorTaxa;
  return tot;
}

openDetails(template: TemplateRef<any>, item: Pedido) {
  this.pedido = item;
  if (item.paymentId) {
    this.pedidoService.getCielo(item.paymentId).subscribe(payment => {
      this.payment = payment;
      this.modalDetails = this.modalService.show(template, { class: 'modal-lg' });
    });
  } else {
    this.modalDetails = this.modalService.show(template, { class: 'modal-lg' });
  }

}

}

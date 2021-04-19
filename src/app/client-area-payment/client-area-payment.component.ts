import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidoService } from '../_services/pedido.service';
import { Pedido } from '../_model/pedido-model';
import { CreditCard } from '../_model/credit-card-model';
import { Payment } from '../_model/payment-model';
import { MerchantOrder } from '../_model/merchant-order-model';
import { FilterDefaultModel } from '../_model/filter-default-model';
import { PaymentCieloService } from '../_services/payment-cielo.service';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-client-area-payment',
    templateUrl: './client-area-payment.component.html'
})

export class ClientAreaPaymentComponent implements OnInit {
    @Output() action = new EventEmitter();
     form: FormGroup;
     isSubmitted = false;
     public pedido: Pedido;
     totalValue: number;
    constructor(
                private toastr: ToastrService,
                private pedidoService: PedidoService,
                private paymentCieloService: PaymentCieloService,
                private formBuilder: FormBuilder,
                public bsModalRef: BsModalRef) {
    }

    ngOnInit() {
        if (this.pedido == null || this.pedido.id == null) {
            this.toastr.error('Pedido não informado para exibição!', '');
            this.bsModalRef.hide();
          }
        this.form = this.formBuilder.group({
            cardNumber: ['4024.0071.5376.3191', [Validators.required]],
            expirationDate: ['12/2021', [Validators.required]],
            holder: ['Teste Holder', [Validators.required]],
            securityCode: ['123', [Validators.required]],
            valorPedido: [this.getTotalPedido() + this.pedido.valorTaxa]
        });
        this.disableForm();
    }

    get f() { return this.form.controls; }
    formatDt(dt: Date, fmt: string) {
        return moment(dt).format(fmt);
      }

    onConfirm() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        const creditCard = new CreditCard();
        creditCard.Brand = 'Visa';
        creditCard.CardNumber = this.form.controls.cardNumber.value;
        creditCard.ExpirationDate = this.form.controls.expirationDate.value;
        creditCard.Holder = this.form.controls.holder.value;
        creditCard.SecurityCode = this.form.controls.securityCode.value;
        const payment = new Payment();
        payment.Amount = this.form.controls.valorPedido.value;
        payment.CreditCard = creditCard;
        payment.Installments = 1;
        payment.Provider = 'Simulado';
        payment.SoftDescriptor = 'petixco';
        payment.Type = 'CreditCard';
        const merchantOrder = new MerchantOrder();
        merchantOrder.MerchantOrderId = this.pedido.id.toString();
        merchantOrder.Payment = payment;
        this.paymentCieloService.sendCielo(merchantOrder).subscribe(result => {
            const filter: FilterDefaultModel = new FilterDefaultModel();
            filter.id = this.pedido.id;
            filter.name = result.Payment.PaymentId;
            this.pedidoService.setPaymentOk(filter).subscribe(res => {
                this.toastr.success('Pagamento aprovado com sucesso');
                this.closeSuccess();
            });
        });
    }

    close() {
        this.bsModalRef.hide();
        this.action.emit(false);
    }

    closeSuccess() {
        this.bsModalRef.hide();
        this.action.emit(true);
    }

        getTotalPedido() {
            return this.pedido.pedidoProdutos.reduce((sum, current) => sum + (current.valorProduto * current.qtd), 0);
          }

    disableForm() {
        this.form.controls.cardNumber.disable();
        this.form.controls.expirationDate.disable();
        this.form.controls.holder.disable();
        this.form.controls.securityCode.disable();
    }


}


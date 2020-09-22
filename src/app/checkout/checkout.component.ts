import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { ProductService } from '../_services/product.service';
import { StoreService } from '../_services/store.service';
import { EnderecoService } from '../_services/endereco.service';
import { PedidoService } from '../_services/pedido.service';
import { Endereco } from '../_model/endereco';
import { Pedido } from '../_model/pedido';
import { AuthenticationService } from '../_services/authentication.service';

import * as moment from 'moment';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html'
})

export class CheckoutComponent implements OnInit {
    isSubmitted = false;
    public productDTO;
    public currentUser;
    public address;
    public products = [];
    public daysWeek = [];
    public shoppingCart: any[] = [];
    private pedido: Pedido = new Pedido();
    public itemCart;
    public totalValue: number;
    form: FormGroup;
    constructor(private storeService: StoreService,
                private toastr: ToastrService,
                private enderecoService: EnderecoService,
                private productService: ProductService,
                private spinner: NgxSpinnerService,
                private pedidoService: PedidoService,
                private authenticationService: AuthenticationService,
                private router: Router,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.currentUser = this.authenticationService.loadUser();
        this.productDTO = this.storeService.loadStoreSelected();
        if (this.productDTO === null) {
            return this.router.navigate(['/index']);
        }
        this.shoppingCart = this.productService.loadCart();
        if ((this.shoppingCart !== null) && (!this.shoppingCart.find(x => x.lojaId === this.productDTO.store.id))) {
            this.shoppingCart = [];
        }

        this.form = this.formBuilder.group({
            tipoPedidoId: ['', [Validators.required]],
            formaPagamentoId: ['', [Validators.required]],
            obs: [''],
            dataEntrega: ['']
        });

        if (this.productDTO.store.lojatipopedido.length === 1) {
            this.form.controls.tipoPedidoId.setValue(String(this.productDTO.store.lojatipopedido[0].tipoPedido.id));
        }

        if (this.productDTO.store.lojaformapagamento.length === 1) {
            this.form.controls.formaPagamentoId.setValue(String(this.productDTO.store.lojaformapagamento[0].formaPagamento.id));
        }

        this.address = this.enderecoService.load();
        if (this.address === null) {
            return this.router.navigate(['/address']);
        }

        this.form.controls.dataEntrega.setValue(this.getDeliveryForecast());

    }

    getImage(item) {
        return environment.urlImagesProducts + this.productDTO.produtos.find(x => x.id === item.produtoId).nomeImagem;
    }

    getCepSelected() {
        return this.productDTO.cep;
    }

    getDeliveryForecast() {
        const datetimeActual = new Date();
        let hoursIncrement = 24;
        datetimeActual.setHours(datetimeActual.getHours() + this.productDTO.store.horaPreparacaoEntrega);
        let dayDelivery = datetimeActual.getDay();
        if (this.productDTO.store.lojahorariofuncionamento.length > 0) {
            const dayexist = this.productDTO.store.lojahorariofuncionamento.filter(x => x.horarioFuncionamento)
                .filter(x => x.horarioFuncionamento.dia === dayDelivery);
            if (dayexist.length > 0) {
                return datetimeActual;
            } else {
                const startOfWeek = moment(datetimeActual).startOf('week');
                const endOfWeek = moment(datetimeActual).endOf('week');
                const days = [];
                let day = startOfWeek;
                while (day <= endOfWeek) {
                    days.push(day.toDate());
                    day = day.clone().add(1, 'd');
                }

                days.forEach(d => {
                    dayDelivery++;
                    const findDay = this.productDTO.store.lojahorariofuncionamento.filter(x => x.horarioFuncionamento)
                    .filter(x => x.horarioFuncionamento.dia === dayDelivery);
                    if (findDay.length > 0) {
                        datetimeActual.setHours(datetimeActual.getHours() + hoursIncrement);
                    }
                    hoursIncrement = hoursIncrement + 24;
                });
            }

        }

        return datetimeActual;
    }

    getDescription(item) {
        return this.productDTO.produtos.find(x => x.id === item.produtoId).descricao;
    }

    getQuantityItems() {
        if (this.shoppingCart !== null) {
            return this.shoppingCart.length;

        } else {
            return 0;
        }
    }

    getTotalItems() {
        this.totalValue = 0;
        this.shoppingCart.forEach((item) => {
            this.totalValue += (item.valor * item.quantidade);
        });
        return this.totalValue;
    }

    getValueMinimum() {
        return this.productDTO.store.valorMinimoProduto;
    }

    getTax() {
        return this.productDTO.store.valorTaxaEntrega;
    }

    getSubtotal(item) {
        return item.valor * item.quantidade;
    }

    getImageStore(nomeImage) {
        return environment.urlImagesLojas + nomeImage;
    }

    get f() { return this.form.controls; }
    formatDt(dt: Date, fmt: string) {
        return moment(dt).format(fmt);
      }
    onSubmit() {
        this.isSubmitted = true;
        if (!this.form.valid) {
            return false;
        }

        // this.form.controls.dataEntrega.enable();
        // this.pedido = new Pedido(this.form.value);
        // this.pedido.endereco = this.enderecoService.load();
        this.pedido.lojaId = this.productDTO.store.id;
        // this.pedido.dataPedido = new Date();
        // this.pedido.valorTaxa = this.productDTO.store.valorTaxaEntrega;
        // this.pedido.pedidoProdutos = this.shoppingCart;
        this.spinner.show();

        // const formData = new FormData();

        // formData.append('pedido', JSON.stringify(this.pedido));

        // this.pedidoService.callServer({content: this.pedido}).subscribe(result => {

        //     this.spinner.hide();
        // }, (error: any) => {
        //     this.spinner.hide();
        //     return this.toastr.error(error.error.error_description);
        // });
     
        this.pedidoService.getByFilter(this.pedido).subscribe(result => {

            this.spinner.hide();
        }, (error: any) => {
            this.spinner.hide();
            return this.toastr.error(error.error.error_description);
        });


    }

}


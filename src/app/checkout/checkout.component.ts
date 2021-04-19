import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { EnderecoService } from '../_services/endereco.service';
import { PedidoService } from '../_services/pedido.service';
import { Pedido } from '../_model/pedido-model';
import { FilterDefaultModel } from '../_model/filter-default-model';
import { AuthenticationService } from '../_services/authentication.service';
import { LojaService } from '../_services/loja.service';
import { HorarioFuncionamentoService } from '../_services/horario-funcionamento.service';
import { FormaPagamentoService } from '../_services/forma-pagamento.service';
import { CarrinhoComprasService} from '../_services/carrinho-compras.service';
import { LojaCEPService } from '../_services/loja-cep.service';
import { NgxViacepService } from '@brunoc/ngx-viacep';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { Endereco } from '../_model/endereco';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PedidoProduto } from '../_model/pedido-produto-model';
import { ClientAreaPaymentComponent } from '../client-area-payment/client-area-payment.component';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html'
})

export class CheckoutComponent implements OnInit {
    modalRef: BsModalRef;
    modalPay: BsModalRef;
    isSubmitted = false;
    indexTab: number = 0;
    public cep;
    public currentUser;
    public address;
    public products = [];
    public daysWeek = [];
    public formasPagamento = [];
    public horariosFuncionamento = [];
    public shoppingCart: any[] = [];
    private pedido: Pedido = new Pedido();
    private pedidoProdutos: PedidoProduto[] = [];
    public itemCart;
    public totalValue: number;
    form: FormGroup;
    formCard: FormGroup;
    formAdress: FormGroup;
    @ViewChild('modalPedido', { read: TemplateRef }) modalPedido: TemplateRef<any>;
    @ViewChild('modalPay', { read: TemplateRef }) templateRefPay: TemplateRef<any>;
    constructor(
                private toastr: ToastrService,
                private enderecoService: EnderecoService,
                private pedidoService: PedidoService,
                private horarioFuncionamentoService: HorarioFuncionamentoService,
                private formaPagamentoService: FormaPagamentoService,
                private lojaService: LojaService,
                private authenticationService: AuthenticationService,
                private router: Router,
                private lojacepService: LojaCEPService,
                private carrinhoComprasService: CarrinhoComprasService,
                private formBuilder: FormBuilder,
                private modalService: BsModalService,
                private viacep: NgxViacepService) {
    }

    ngOnInit() {
        this.currentUser = this.authenticationService.getCurrentUser();
        this.cep = this.lojaService.loadStoreSelected();
        if (this.cep === null) {
            return this.router.navigate(['/searchStore']);
        }
        this.shoppingCart = this.carrinhoComprasService.loadCart();
        if ((this.shoppingCart !== null) && (!this.shoppingCart.find(x => x.lojaId === this.cep.loja.id))) {
            this.shoppingCart = [];
        }

        const endereco = this.enderecoService.load();

        this.form = this.formBuilder.group({
            formaPagamentoId: ['', [Validators.required]],
            obs: [''],
            dataEntrega: ['']
        });

        this.formAdress = this.formBuilder.group({
            descricao: ['', Validators.required],
            numero: ['', Validators.required],
            nomeCidade: ['', Validators.required],
            uf: ['', Validators.required],
            bairro: ['', Validators.required],
            pontoReferencia: [''],
            complemento: [''],
            cep: [this.cep.cep, Validators.required]
        });
        this.formAdress.controls.cep.disable();

        this.formCard = this.formBuilder.group({
            cardNumber: ['4024.0071.5376.3191', [Validators.required]],
            expirationDate: ['12/2021', [Validators.required]],
            holder: ['Teste Holder', [Validators.required]],
            securityCode: ['123', [Validators.required]]
        });
        this.disableForm();

        const filter: FilterDefaultModel = new FilterDefaultModel();
        filter.lojaId = this.cep.loja.id;
        forkJoin(
        this.formaPagamentoService.getAll(),
        this.horarioFuncionamentoService.getByLoja(filter),
        this.enderecoService.getByUser()
        ).subscribe(result => {
            this.formasPagamento = result[0];
            this.horariosFuncionamento = result[1];
            if (result[2] === null) {
                this.searchAdress();
            } else {
            this.setAdressByUser(result[2]);
            }
        });
    }

    searchAdress() {
        this.viacep.buscarPorCep(this.cep.cep).then(result => {
            if (result !== undefined) {
                this.setAdressViaCep(result);
            }
        });
    }

    setAdressViaCep(endereco) {
            this.formAdress.controls.descricao.setValue(endereco.logradouro);
            this.formAdress.controls.uf.setValue(endereco.uf);
            this.formAdress.controls.nomeCidade.setValue(endereco.localidade);
            this.formAdress.controls.bairro.setValue(endereco.bairro);
            this.disableControls();
    }

    setAdressByUser(endereco) {
            this.formAdress.controls.descricao.setValue(endereco.descricao);
            this.formAdress.controls.nomeCidade.setValue(endereco.cidade.nome);
            this.formAdress.controls.uf.setValue(endereco.cidade.estado.nome);
            this.formAdress.controls.bairro.setValue(endereco.bairro);
            this.formAdress.controls.numero.setValue(endereco.numero);
            this.disableControls();
    }

    disableControls() {
        this.formAdress.controls.descricao.disable();
        this.formAdress.controls.uf.disable();
        this.formAdress.controls.nomeCidade.disable();
        this.formAdress.controls.bairro.disable();
    }

    enableControls() {
        this.formAdress.controls.descricao.enable();
        this.formAdress.controls.uf.enable();
        this.formAdress.controls.nomeCidade.enable();
        this.formAdress.controls.bairro.enable();
    }

    getImage(nomeImage) {
        return environment.urlImagesProducts + nomeImage;
    }

    getCepSelected() {
        return this.lojacepService.getSelected();
    }

    getDeliveryForecast() {
        const datetimeActual = new Date();
        let hoursIncrement = 24;
        datetimeActual.setHours(datetimeActual.getHours());
        let dayDelivery = datetimeActual.getDay();
        if (this.horariosFuncionamento.length > 0) {
            const dayexist = this.horariosFuncionamento.filter(x => x.horarioFuncionamento)
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
                    const findDay = this.horariosFuncionamento.filter(x => x.horarioFuncionamento)
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
        // return this.productDTO.produtos.find(x => x.id === item.produtoId).descricao;
    }

    getQuantityItems() {
        if (this.shoppingCart !== null) {
            return this.shoppingCart.map(x => {
                return x
            }).reduce((sum, current) => sum + (current ? current.quantidade : 0), 0);
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
        return this.cep.loja.valorMinimoProduto;
    }

    getTax() {
        return this.cep.valorFrete;
    }

    getSubtotal(item) {
        return item.valor * item.quantidade;
    }

    getImageStore(nomeImage) {
        return environment.urlImagesLojas + nomeImage;
    }

    get f() { return this.formAdress.controls; }
    get fm() { return this.form.controls; }
    formatDt(dt: Date, fmt: string) {
        return moment(dt).format(fmt);
      }

    onSubmit() {

        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        if (this.formAdress.invalid) {
            return;
        }
        this.enableControls();

        const endereco = new Endereco();
        endereco.cep = this.getCepSelected();
        endereco.bairro = this.formAdress.controls.bairro.value;
        endereco.descricao = this.formAdress.controls.descricao.value;
        endereco.numero = this.formAdress.controls.numero.value;
        endereco.nomeCidade = this.formAdress.controls.nomeCidade.value;
        endereco.uf = this.formAdress.controls.uf.value;
        endereco.pontoReferencia = this.formAdress.controls.pontoReferencia.value;
        endereco.complemento = this.formAdress.controls.complemento.value;
        endereco.cep = this.formAdress.controls.cep.value;

        // this.enderecoService.set(endereco);
        const pedido = new Pedido();
        pedido.formaPagamentoId = this.form.controls.formaPagamentoId.value;
        pedido.obs = this.form.controls.obs.value;
        pedido.endereco = endereco;
        pedido.dataPrevistaEntrega = this.getDeliveryForecast();
        pedido.valorTaxa = Number(this.getTax());
        pedido.lojaId = this.cep.loja.id;
        this.shoppingCart.forEach(cart => {
            pedido.pedidoProdutos.push({
                produtoId: cart.produtoId,
                valorProduto: cart.valor,
                qtd: cart.quantidade,
                nomeImagem: null,
                descricao: null,
                produto: null
            });
        });
        this.pedidoService.save(pedido).subscribe(result => {
            this.carrinhoComprasService.clearCart();
            this.pedido = result;
            if (result != null) {
                this.modalRef = this.modalService.show(this.modalPedido, { class: 'modal-md' });
            }
        });


    }

    payNow() {
        const initialState = {
            pedido: this.pedido
          };
        this.modalPay = this.modalService.show(ClientAreaPaymentComponent,
             { initialState, class: 'inmodal modal-xl', ignoreBackdropClick: true });
        this.modalPay = this.modalService.show(this.templateRefPay, { class: 'modal-md' });
    }

    payLater() {
        this.modalRef.hide();
        return this.router.navigate(['/storecategoryproduct']);
    }

    disableForm() {
        this.formCard.controls.cardNumber.disable();
        this.formCard.controls.expirationDate.disable();
        this.formCard.controls.holder.disable();
        this.formCard.controls.securityCode.disable();
    }

    selectTab(index) {
        this.indexTab = index;
    }


}


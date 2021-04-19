import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CarrinhoComprasService} from '../_services/carrinho-compras.service';
import { LojaService } from '../_services/loja.service';
import { AuthenticationService } from '../_services/authentication.service';
import { EnderecoService } from '../_services/endereco.service';
import { LojaCEPService } from '../_services/loja-cep.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html'
})

export class ShoppingCartComponent implements OnInit {

    public cep;
    public currentUser;
    public shoppingCart: any[] = [];
    public itemCart;
    public totalValue: number;
    form: FormGroup;
    public submitted = false;
    constructor( private toastr: ToastrService,
                 private lojaService: LojaService,
                 private enderecoService: EnderecoService,
                 private carrinhoComprasService: CarrinhoComprasService,
                 private authenticationService: AuthenticationService,
                 private lojacepService: LojaCEPService,
                 private formBuilder: FormBuilder,
                 private router: Router) {
    }

    ngOnInit() {
     this.cep = this.lojaService.loadStoreSelected();
     if (this.cep === null) {
            return this.router.navigate(['/index']);
            }
     this.shoppingCart = this.carrinhoComprasService.loadCart();
     if ((this.shoppingCart !== null) && (!this.shoppingCart.find(x => x.lojaId === this.cep.loja.id))) {
                this.shoppingCart = [];
            }
     this.currentUser = this.authenticationService.getCurrentUser();
     this.form = this.formBuilder.group({
        valueMinimum: ['']
    });
    }

    getImage(nomeImage) {
        return environment.urlImagesProducts + nomeImage;
    }

    getCepSelected() {
        return this.cep.cep;
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
       return this.cep.loja.valorMinimoProduto;
    }

   getTax() {
    return this.cep.valorFrete;
    }

    clearCart() {
        this.carrinhoComprasService.clearCart();
        return this.router.navigate(['/store-category-product']);
    }

    finishCart() {
        if (this.checkFinishCart()) {
            this.submitted = true;
            return this.form.controls.valueMinimum.setErrors({incorrect: true})
        }

        if (this.currentUser) {
            return this.router.navigate(['/checkout']);
        }

        if (!this.currentUser) {
            return this.router.navigate(['/login/1']);
        }

        // if ((this.currentUser) && (!this.enderecoService.load())) {
        //     return this.router.navigate(['/address/1']);
        // }
    }

    checkFinishCart() {
        if (this.cep.loja.valorMinimoProduto < (this.getTotalItems() + this.getTax())) {
            return false;
        }
        return true;
    }

    getSubtotal(item) {
        return item.valor * item.quantidade;
        }

    getImageStore(nomeImage) {
        return environment.urlImagesLojas + nomeImage;
    }

    deleteItemCart(item) {
        this.carrinhoComprasService.removeCartProduct(item);
        this.shoppingCart = this.carrinhoComprasService.loadCart();
    }

    incrementItemCart(item) {
                item.quantidade = item.quantidade + 1;
                this.carrinhoComprasService.updateCart(this.shoppingCart);
                this.shoppingCart = this.carrinhoComprasService.loadCart();
    }

    decrementItemCart(item) {
        item.quantidade = item.quantidade - 1;
        if (item.quantidade === 0) {
            this.deleteItemCart(item);
            return this.shoppingCart = this.carrinhoComprasService.loadCart();
        }
        this.carrinhoComprasService.updateCart(this.shoppingCart);
        this.shoppingCart = this.carrinhoComprasService.loadCart();
}



}


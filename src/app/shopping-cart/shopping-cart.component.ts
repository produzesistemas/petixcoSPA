import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { ProductService} from '../_services/product.service';
import { StoreService } from '../_services/store.service';
import { AuthenticationService } from '../_services/authentication.service';
import { EnderecoService } from '../_services/endereco.service';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html'
})

export class ShoppingCartComponent implements OnInit {

    public productDTO;
    public currentUser;
    public products = [];
    public shoppingCart: any[] = [];
    public itemCart;
    public totalValue: number;
    constructor( private storeService: StoreService,
                 private enderecoService: EnderecoService,
                 private productService: ProductService,
                 private authenticationService: AuthenticationService,
                 private router: Router) {
    }

    ngOnInit() {
     this.productDTO = this.storeService.loadStoreSelected();
     if (this.productDTO === null) {
            return this.router.navigate(['/index']);
            }
     this.shoppingCart = this.productService.loadCart();
     if ((this.shoppingCart !== null) && (!this.shoppingCart.find(x => x.lojaId === this.productDTO.store.id))) {
                this.shoppingCart = [];
            }
     this.currentUser = this.authenticationService.loadUser();

    }

    getImage(item) {
        return environment.urlImagesProducts + this.productDTO.produtos.find(x => x.id === item.produtoId).nomeImagem;
        }

    getCepSelected() {
        return this.productDTO.store.cep;
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

    clearCart() {
        this.productService.clearCart();
        return this.router.navigate(['/storecategoryproduct']);
    }

    finishCart() {
        if ((this.currentUser) && (this.enderecoService.load())) {
            return this.router.navigate(['/checkout']);
        }

        if (!this.currentUser) {
            return this.router.navigate(['/login/1']);
        }

        if ((this.currentUser) && (!this.enderecoService.load())) {
            return this.router.navigate(['/address/1']);
        }

    }

    getSubtotal(item) {
        return item.valor * item.quantidade;
        }

    getImageStore(nomeImage) {
        return environment.urlImagesLojas + nomeImage;
    }

    deleteItemCart(item) {
        this.productService.removeCartProduct(item);
        this.shoppingCart = this.productService.loadCart();
    }

    incrementItemCart(item) {
                item.quantidade = item.quantidade + 1;
                this.productService.updateCart(this.shoppingCart);
                this.shoppingCart = this.productService.loadCart();
    }

    decrementItemCart(item) {
        item.quantidade = item.quantidade - 1;
        if (item.quantidade === 0) {
            this.deleteItemCart(item);
            return this.shoppingCart = this.productService.loadCart();
        }
        this.productService.updateCart(this.shoppingCart);
        this.shoppingCart = this.productService.loadCart();
}



}


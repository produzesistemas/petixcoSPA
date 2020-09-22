import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductService} from '../_services/product.service';
import { StoreService } from '../_services/store.service';

@Component({
    selector: 'app-store-category-product',
    templateUrl: './store-category-product.component.html',
    styleUrls: ['./store-category-product.component.css']
})

export class StoreCategoryProductComponent implements OnInit {
    public state$: Observable<{ [key: string]: any }>;
    public storeCategoryProduct = {};
    public productDTO: any;
    public products = [];
    public shoppingCart: any[] = [];
    public itemCart;
    public storeSelected;
    constructor( private toastr: ToastrService,
                 private storeService: StoreService,
                 private productService: ProductService,
                 private router: Router) {
    }

    ngOnInit() {
    this.productDTO = this.storeService.loadStoreSelected();
    if (this.productDTO === null) {
        return this.router.navigate(['/index']);
        }
    this.products = this.productDTO.produtos.filter(x => x.promocao || x.destaque);
    this.shoppingCart = this.productService.loadCart();
    if ((this.shoppingCart !== null) && (!this.shoppingCart.find(x => x.lojaId === this.productDTO.store.id))) {
        this.shoppingCart = [];
    }
}

    filterSubCategory(subcategory) {
        this.products = this.productDTO.produtos.filter(x => x.subCategoriaId === subcategory.id);
        return this.products;
    }

    getImage(nomeImage) {
        return environment.urlImagesProducts + nomeImage;
    }

    getQuantityItems() {
        if (this.shoppingCart !== null) {
            return this.shoppingCart.length;
        } else {
            return 0;
        }
    }

    getImageStore(nomeImage) {
        return environment.urlImagesLojas + nomeImage;
    }

    addShoppingCart(product) {
        this.shoppingCart = this.productService.loadCart();
        if (this.shoppingCart !== null) {
            const item = this.shoppingCart.find(x => x.produtoId === product.id && x.lojaId === this.productDTO.store.id);
            if (item) {
                item.quantidade = item.quantidade + 1;
                this.productService.updateCart(this.shoppingCart);
            } else {
                this.itemCart = {};
                this.itemCart.produtoId = product.id;
                this.itemCart.quantidade = 1;
                this.itemCart.lojaId = this.productDTO.store.id;
                this.itemCart.valor = product.valor;
                this.itemCart.obs = product.obs;
                this.shoppingCart.push(this.itemCart);
                this.productService.updateCart(this.shoppingCart);
            }
        } else {
            this.shoppingCart = [];
            this.itemCart = {};
            this.itemCart.produtoId = product.id;
            this.itemCart.quantidade = 1;
            this.itemCart.lojaId = this.productDTO.store.id;
            this.itemCart.valor = product.valor;
            this.itemCart.obs = product.obs;
            this.shoppingCart.push(this.itemCart);
            this.productService.updateCart(this.shoppingCart);
        }
    }

openShoppingCart(){
    if ((this.shoppingCart === null) ||
    (this.shoppingCart === undefined) ||
     (this.shoppingCart.length === 0)) {
        return this.toastr.error('O Carrinho está vazio. Adicione produtos');
    }
    this.router.navigate(['/shoppingcart']);
}


}


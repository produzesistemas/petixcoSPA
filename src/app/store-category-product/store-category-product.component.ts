import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CarrinhoComprasService } from '../_services/carrinho-compras.service';
import { LojaService } from '../_services/loja.service';
import { ProdutoService } from '../_services/produto.service';
import { CategoriaService } from '../_services/categoria.service';
import { FilterDefaultModel } from '../_model/filter-default-model';
import { PlatformLocation } from '@angular/common';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
    selector: 'app-store-category-product',
    templateUrl: './store-category-product.component.html'
})

export class StoreCategoryProductComponent implements OnInit {
    public state$: Observable<{ [key: string]: any }>;
    public storeCategoryProduct = {};
    public loja: any;
    public produtos = [];
    public title: any;
    public categorias = [];
    public slides = [];
    public lstProdutos = [];
    public shoppingCart: any[] = [];
    public isFilterCategory: boolean = false;
    logo: any;
    public itemCart;
    public storeSelected;
    public currentUser;
    constructor(private toastr: ToastrService,
        private lojaService: LojaService,
        private produtoService: ProdutoService,
        private categoriaService: CategoriaService,
        private carrinhoComprasService: CarrinhoComprasService,
        private authenticationService: AuthenticationService,
        private router: Router, location: PlatformLocation) {
    }

    ngOnInit() {
        this.title = 'Ofertas e destaques';
        // this.lojaCep = this.lojaService.loadStoreSelected();
        // if (this.lojaCep === null) {
        //     return this.router.navigate(['/searchstore']);
        // }
        this.currentUser = this.authenticationService.getCurrentUser();
        this.shoppingCart = this.carrinhoComprasService.loadCart();
        // if ((this.shoppingCart !== null) && (!this.shoppingCart.find(x => x.lojaId === this.lojaCep.loja.id))) {
        //     this.shoppingCart = [];
        // }
        this.loadProdutos();
    }

    filterSubCategory(subcategory) {
        const filter: FilterDefaultModel = new FilterDefaultModel();
        filter.id = subcategory.id;
        this.produtoService.getBySubCategoria(filter).subscribe(result => {
            if (result.length === 0) {
                return this.toastr.info('Nenhum produto encontrado para essa SubCategoria');
            }
            this.produtos = result;
            this.isFilterCategory = true;
            this.title = this.categorias.find(x => x.id === subcategory.categoriaId).descricao + ' / ' + subcategory.descricao;
        });
    }

    getImage(nomeImage) {
        return environment.urlImagesProducts + nomeImage;
    }

    addShoppingCart(product) {
        this.shoppingCart = this.carrinhoComprasService.loadCart();
        if (this.shoppingCart !== null) {
            const item = this.shoppingCart.find(x => x.produtoId === product.id);
            if (item) {
                item.quantidade = item.quantidade + 1;
                this.carrinhoComprasService.updateCart(this.shoppingCart);
            } else {
                this.itemCart = {};
                this.itemCart.produtoId = product.id;
                this.itemCart.quantidade = 1;
                this.itemCart.valor = product.valor;
                this.itemCart.obs = product.obs;
                this.itemCart.descricao = product.descricao;
                this.itemCart.nomeImagem = product.nomeImagem;
                this.shoppingCart.push(this.itemCart);
                this.carrinhoComprasService.updateCart(this.shoppingCart);
            }
        } else {
            this.shoppingCart = [];
            this.itemCart = {};
            this.itemCart.produtoId = product.id;
            this.itemCart.quantidade = 1;
            this.itemCart.valor = product.valor;
            this.itemCart.obs = product.obs;
            this.itemCart.descricao = product.descricao;
            this.itemCart.nomeImagem = product.nomeImagem;
            this.shoppingCart.push(this.itemCart);
            this.carrinhoComprasService.updateCart(this.shoppingCart);
        }
    }

    loadProdutos() {
        this.lojaService.get().subscribe(result => {
            this.loja = result;
            this.lojaService.removeStoreSelected();
            this.lojaService.addStoreSelected(this.loja);
        });
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

    openShoppingCart() {
        if ((this.shoppingCart === null) ||
            (this.shoppingCart === undefined) ||
            (this.shoppingCart.length === 0)) {
            return this.toastr.error('O Carrinho está vazio. Adicione produtos');
        }
        this.router.navigate(['/shoppingcart']);
    }

    isFilter() {
        return this.isFilterCategory;
    }

}


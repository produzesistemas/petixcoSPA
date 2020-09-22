import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ProductService} from '../_services/product.service';
import { StoreService } from '../_services/store.service';
import { ShoppingCart } from '../_model/shopping-cart';

@Component({
    selector: 'app-search-store',
    templateUrl: './search-store.component.html'
})

export class SearchStoreComponent implements OnInit {

    public stores;
    public storeCategoryProduct = {};
    private urlImagesStores = environment.urlImagesLojas;
    form: FormGroup;
    public submitted = false;
    public productDTO: any;
    public products = [];
    public shoppingCart: ShoppingCart[] = [];
    public itemCart;
    public storeSelected;

    constructor( private toastr: ToastrService,
                 private storeService: StoreService,
                 private productService: ProductService,
                 private spinner: NgxSpinnerService,
                 private router: Router,
                 private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            cep: ['', Validators.required]
        });
        if (this.storeService.loadStoreSelected() !== null) {
            this.router.navigate(['/storecategoryproduct']);
        }
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        const formControls = this.form.controls;
        this.spinner.show();
        this.storeService.getStoreByCep(formControls.cep.value).subscribe(result => {
        this.spinner.hide();
        if (result.length === 0 ) {
            this.stores = [];
            return this.toastr.error('Nenhum encontrado');
        }
        this.stores = result;
         });
  }

  RowSelected(event: any, store: any) {
    this.spinner.show();
    this.productService.getProductsByStore(store.id).subscribe(result => {
    this.spinner.hide();
    if (result.length === 0) {
        return this.toastr.error('Não existem produtos cadastrados para essa loja!');
    }
    this.productDTO = result;
    this.productDTO.store = store;
    this.storeService.removeStoreSelected();
    this.storeService.addStoreSelected(this.productDTO);
    this.router.navigate(['/storecategoryproduct']);
    });
    }

    getImage(nomeImage) {
        return environment.urlImagesLojas + nomeImage;
    }

    isSearch(){
        if (this.stores) {
            return true;
        } else {
            return false;
        }
    }
}


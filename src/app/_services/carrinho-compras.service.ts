import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarrinhoCompras } from '../_model/carrinho-compras-model';
import { GenericHttpService } from './genericHttpService';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class CarrinhoComprasService extends GenericHttpService<CarrinhoCompras> {

    constructor(private http: HttpClient) {
        super(http);
    }

    getProductsByStore(id: any) {
        // return this.http.get<ProdutoDTO[]>(`${this.getUrlApi()}/getProductsByStore/${id}`);
    }

    // Adding new Product to cart db if logged in else localStorage
  addToCart(item: any): void {

  }

  removeCartProduct(item: CarrinhoCompras) {
    const cart = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('petixco_shopping_cart'))).getValue();
    const index: number = cart.indexOf(item);
    cart.splice(index, 1);
    localStorage.removeItem('petixco_shopping_cart');
    localStorage.setItem('petixco_shopping_cart', JSON.stringify(cart));
  }

  loadCart() {
      return new BehaviorSubject<any>(JSON.parse(localStorage.getItem('petixco_shopping_cart'))).getValue();
  }

  updateCart(item) {
    localStorage.removeItem('petixco_shopping_cart');
    localStorage.setItem('petixco_shopping_cart', JSON.stringify(item));
  }

  clearCart() {
    localStorage.removeItem('petixco_shopping_cart');
  }

}

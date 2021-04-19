import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LojaService } from '../../_services/loja.service';
import { environment } from '../../../environments/environment';
import { CarrinhoComprasService} from '../../_services/carrinho-compras.service';
@Component({
  selector: 'app-store-header',
  templateUrl: './store-header.component.html'
})
export class StoreHeaderComponent implements OnInit {
  public categorias = [];
  public currentUser;
  public lojaCep: any;
  public shoppingCart: any[] = [];
  logo: any;
  public itemCart;
  public storeSelected;
  constructor(
    private router: Router,
     private toastr: ToastrService,
     private authenticationService: AuthenticationService,
     private lojaService: LojaService,
     private carrinhoComprasService: CarrinhoComprasService
     ) { }

  ngOnInit() {
    // this.lojaCep = this.lojaService.loadStoreSelected();
    // if (this.lojaCep === null) {
    //     return this.router.navigate(['/searchstore']);
    //     }
    // this.logo = environment.urlImagesLojas + this.lojaCep.loja.nomeImagem;
    // this.shoppingCart = this.carrinhoComprasService.loadCart();
    // if ((this.shoppingCart !== null) && (!this.shoppingCart.find(x => x.lojaId === this.lojaCep.loja.id))) {
    //     this.shoppingCart = [];
    // }
    this.currentUser = this.authenticationService.getCurrentUser();
  }

  logout() {
    this.authenticationService.logout();
    this.currentUser = this.authenticationService.getCurrentUser();
  }

  logged() {
    if (this.currentUser === null) {
        return false;
    } else {
        return true;
    }
   }

   onLogin() {
       return this.router.navigate(['/login/0']);
   }

//    getQuantityItems() {
//     if (this.shoppingCart !== null) {
//         return this.shoppingCart.length;
//     } else {
//         return 0;
//     }
// }

// openShoppingCart(){
//   if ((this.shoppingCart === null) ||
//   (this.shoppingCart === undefined) ||
//   (this.shoppingCart.length === 0)) {
//       return this.toastr.error('O Carrinho está vazio. Adicione produtos');
//   }
//   this.router.navigate(['/shoppingcart']);
// }

// changeStore() {
//   this.lojaService.removeStoreSelected();
//   return this.router.navigate(['/searchstore']);
// }

clientArea() {
  return this.router.navigate(['/clientarea/order']);
}



}

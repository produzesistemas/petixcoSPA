import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LojaService } from '../../_services/loja.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html'
})
export class ClientHeaderComponent implements OnInit {

  public menus: any[];
  public currentUser;
  public lojaCep: any;
  public shoppingCart: any[] = [];
  logo: any;
  public itemCart;
  public storeSelected;
  constructor(  private authenticationService: AuthenticationService,
                private router: Router,
                private lojaService: LojaService,
                private toastr: ToastrService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser();
    if (!this.currentUser) {
      this.logout();
    }
    this.lojaCep = this.lojaService.loadStoreSelected();
    if (this.lojaCep === null) {
        return this.router.navigate(['/searchstore']);
        }
    this.logo = environment.urlImagesLojas + this.lojaCep.loja.nomeImagem;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['index']);
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

   getQuantityItems() {
    if (this.shoppingCart !== null) {
        return this.shoppingCart.length;
    } else {
        return 0;
    }
}

changeStore() {
  this.lojaService.removeStoreSelected();
  return this.router.navigate(['/searchstore']);
}

}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LojaService } from '../../_services/loja.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {

  public menus: any[];
  public currentUser;
  public loja: any;
  logo: any;
  constructor(  private authenticationService: AuthenticationService,
                private router: Router,
                private lojaService: LojaService,
                private toastr: ToastrService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser();
    if (!this.currentUser) {
      this.logout();
    }
    this.loja = this.lojaService.loadStoreSelected();
    if (this.loja) {
        this.logo = environment.urlImagesLojas + this.loja.nomeImagem;
      }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['index']);
  }

}

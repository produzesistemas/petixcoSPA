import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LojaService } from '../_services/loja.service';

@Component({
    selector: 'app-partner-area-exchange-policy.component',
    templateUrl: './partner-area-exchange-policy.component.html'
})

export class PartnerAreaExchangePolicyComponent implements OnInit {
    public lojaCep: any;
    constructor( 
                 private router: Router,
                 private lojaService: LojaService) {
    }

    ngOnInit() {
        this.lojaCep = this.lojaService.loadStoreSelected();
        if (this.lojaCep === null) {
            return this.router.navigate(['/store-category-product']);
            }
    }

    



}


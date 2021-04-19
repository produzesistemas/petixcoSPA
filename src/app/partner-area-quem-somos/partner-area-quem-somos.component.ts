import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LojaService } from '../_services/loja.service';

@Component({
    selector: 'app-partner-area-quem-somos.component',
    templateUrl: './partner-area-quem-somos.component.html'
})

export class PartnerAreaQuemSomosComponent implements OnInit {
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


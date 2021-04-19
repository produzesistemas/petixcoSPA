import { NgModule } from '@angular/core';
import { PartnerAreaExchangePolicyComponent } from './partner-area-exchange-policy.component';
import { SharedModule } from '../share.module';
import { PartnerAreaExchangePolicyRoutingModule} from './partner-area-exchange-policy-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        PartnerAreaExchangePolicyRoutingModule,
        NgbModule
      ],
    declarations: [
        PartnerAreaExchangePolicyComponent
    ],
    exports: [ PartnerAreaExchangePolicyComponent ]
})
export class PartnerAreaExchangePolicyModule { }

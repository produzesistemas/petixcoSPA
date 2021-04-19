import { NgModule } from '@angular/core';
import { PartnerAreaDeliveryPolicyComponent } from './partner-area-delivery-policy.component';
import { SharedModule } from '../share.module';
import { PartnerAreaDeliveryPolicyRoutingModule} from './partner-area-delivery-policy-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        PartnerAreaDeliveryPolicyRoutingModule,
        NgbModule
      ],
    declarations: [
        PartnerAreaDeliveryPolicyComponent
    ],
    exports: [ PartnerAreaDeliveryPolicyComponent ]
})
export class PartnerAreaDeliveryPolicyModule { }

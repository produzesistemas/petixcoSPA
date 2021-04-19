import { NgModule } from '@angular/core';
import { ClientAreaOrderComponent } from './client-area-order.component';
import { SharedModule } from '../share.module';
import { ClientAreaOrderRoutingModule} from './client-area-order-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientAreaPaymentModule } from '../client-area-payment/client-area-payment.module';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        ClientAreaOrderRoutingModule,
        NgbModule,
        ClientAreaPaymentModule
      ],
    declarations: [
        ClientAreaOrderComponent
    ],
    exports: [ ClientAreaOrderComponent,
     ]
})
export class ClientAreaOrderModule { }

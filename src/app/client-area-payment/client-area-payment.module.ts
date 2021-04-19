import { NgModule } from '@angular/core';
import { ClientAreaPaymentComponent } from './client-area-payment.component';
import { SharedModule } from '../share.module';
import { ClientAreaPaymentRoutingModule} from './client-area-payment-routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        ClientAreaPaymentRoutingModule
      ],
    declarations: [
        ClientAreaPaymentComponent
    ],
    exports: [ ClientAreaPaymentComponent ]
})
export class ClientAreaPaymentModule { }

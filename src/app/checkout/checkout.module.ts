import { NgModule } from '@angular/core';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from '../share.module';
import { CheckoutRoutingModule} from './checkout-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        CheckoutRoutingModule,
        NgbModule
      ],
    declarations: [
        CheckoutComponent
    ],
    exports: [ CheckoutComponent ]
})
export class CheckoutModule { }

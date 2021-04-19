import { NgModule } from '@angular/core';
import { PartnerAreaOrderComponent } from './partner-area-order.component';
import { SharedModule } from '../share.module';
import { PartnerAreaOrderRoutingModule} from './partner-area-order-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        PartnerAreaOrderRoutingModule,
        NgbModule
      ],
    declarations: [
        PartnerAreaOrderComponent
    ],
    exports: [ PartnerAreaOrderComponent ]
})
export class PartnerAreaOrderModule { }

import { NgModule } from '@angular/core';
import { PartnerAreaQuemSomosComponent } from './partner-area-quem-somos.component';
import { SharedModule } from '../share.module';
import { PartnerAreaQuemSomosRoutingModule} from './partner-area-quem-somos-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        PartnerAreaQuemSomosRoutingModule,
        NgbModule
      ],
    declarations: [
        PartnerAreaQuemSomosComponent
    ],
    exports: [ PartnerAreaQuemSomosComponent ]
})
export class PartnerAreaQuemSomosModule { }

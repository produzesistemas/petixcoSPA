import { NgModule } from '@angular/core';
import { PartnerAreaComponent } from './partner-area.component';
import { SharedModule } from '../share.module';
import { PartnerAreaRoutingModule} from './partner-area-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        PartnerAreaRoutingModule,
        NgbModule
      ],
    declarations: [
        PartnerAreaComponent
    ],
    exports: [ PartnerAreaComponent ]
})
export class PartnerAreaModule { }

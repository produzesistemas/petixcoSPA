import { NgModule } from '@angular/core';
import { PartnerAreaDeliveryRegionComponent } from './partner-area-delivery-region.component';
import { SharedModule } from '../share.module';
import { PartnerAreaDeliveryRegionRoutingModule} from './partner-area-delivery-region-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PartnerAreaDeliveryRegionRoutingModule,
        NgbModule,
        NgxMaskModule.forRoot(options)
      ],
    declarations: [
        PartnerAreaDeliveryRegionComponent
    ],
    exports: [ PartnerAreaDeliveryRegionComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class PartnerAreaDeliveryRegionModule { }

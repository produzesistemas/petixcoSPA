import { NgModule } from '@angular/core';
import { PartnerAreaDeliveryRegionFormComponent } from './partner-area-delivery-region-form.component';
import { SharedModule } from 'src/app/share.module';
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
        NgbModule,
        NgxMaskModule.forRoot(options),
      ],
    declarations: [
        PartnerAreaDeliveryRegionFormComponent
    ],
    exports: [ PartnerAreaDeliveryRegionFormComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class PartnerAreaDeliveryRegionFormModule { }

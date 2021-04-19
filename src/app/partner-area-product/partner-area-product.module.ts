import { NgModule } from '@angular/core';
import { PartnerAreaProductComponent } from './partner-area-product.component';
import { SharedModule } from '../share.module';
import { PartnerAreaProductRoutingModule} from './partner-area-product-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PartnerAreaProductRoutingModule,
        NgbModule
      ],
    declarations: [
        PartnerAreaProductComponent
    ],
    exports: [ PartnerAreaProductComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class PartnerAreaProductModule { }

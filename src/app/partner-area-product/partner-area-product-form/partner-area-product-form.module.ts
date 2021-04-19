import { NgModule } from '@angular/core';
import { PartnerAreaProductFormComponent } from './partner-area-product-form.component';
import { SharedModule } from 'src/app/share.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
      ],
    declarations: [
        PartnerAreaProductFormComponent
    ],
    exports: [ PartnerAreaProductFormComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class PartnerAreaProductFormModule { }

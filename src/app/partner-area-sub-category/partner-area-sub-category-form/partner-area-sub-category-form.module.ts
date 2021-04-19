import { NgModule } from '@angular/core';
import { PartnerAreaSubCategoryFormComponent } from './partner-area-sub-category-form.component';
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
        PartnerAreaSubCategoryFormComponent
    ],
    exports: [ PartnerAreaSubCategoryFormComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class PartnerAreaSubCategoryFormModule { }

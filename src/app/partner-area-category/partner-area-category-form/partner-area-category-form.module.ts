import { NgModule } from '@angular/core';
import { PartnerAreaCategoryFormComponent } from './partner-area-category-form.component';
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
        PartnerAreaCategoryFormComponent
    ],
    exports: [ PartnerAreaCategoryFormComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class PartnerAreaCategoryFormModule { }

import { NgModule } from '@angular/core';
import { PartnerAreaOpeningHoursFormComponent } from './partner-area-opening-hours-form.component';
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
        PartnerAreaOpeningHoursFormComponent
    ],
    exports: [ PartnerAreaOpeningHoursFormComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class PartnerAreaOpeningHoursFormModule { }

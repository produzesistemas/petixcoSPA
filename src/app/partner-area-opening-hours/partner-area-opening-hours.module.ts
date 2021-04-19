import { NgModule } from '@angular/core';
import { PartnerAreaOpeningHoursComponent } from './partner-area-opening-hours.component';
import { SharedModule } from '../share.module';
import { PartnerAreaOpeningHoursRoutingModule} from './partner-area-opening-hours-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PartnerAreaOpeningHoursRoutingModule,
        NgbModule
      ],
    declarations: [
        PartnerAreaOpeningHoursComponent
    ],
    exports: [ PartnerAreaOpeningHoursComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class PartnerAreaOpeningHoursModule { }

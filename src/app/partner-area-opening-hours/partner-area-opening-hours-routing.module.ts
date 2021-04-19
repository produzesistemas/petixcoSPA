import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerAreaOpeningHoursComponent } from './partner-area-opening-hours.component';
import { PartnerAreaOpeningHoursFormComponent } from './partner-area-opening-hours-form/partner-area-opening-hours-form.component';
import { PartnerAreaOpeningHoursFormModule } from './partner-area-opening-hours-form/partner-area-opening-hours-form.module';

const routes: Routes = [
    {
        path: '',
        component: PartnerAreaOpeningHoursComponent
    },
    {
        path: ':id/:isEdit',
        component: PartnerAreaOpeningHoursFormComponent,
        children: [
            { path: 'partnerareaopeninghoursform', loadChildren: () => PartnerAreaOpeningHoursFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnerAreaOpeningHoursRoutingModule { }

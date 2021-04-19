import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerAreaDeliveryRegionComponent } from './partner-area-delivery-region.component';
import { PartnerAreaDeliveryRegionFormComponent } from './partner-area-delivery-region-form/partner-area-delivery-region-form.component';
import { PartnerAreaDeliveryRegionFormModule } from './partner-area-delivery-region-form/partner-area-delivery-region-form.module';

const routes: Routes = [
    {
        path: '',
        component: PartnerAreaDeliveryRegionComponent
    },
    {
        path: ':id/:isEdit',
        component: PartnerAreaDeliveryRegionFormComponent,
        children: [
            { path: 'partnerAreaDeliveryRegionForm', loadChildren: () => PartnerAreaDeliveryRegionFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnerAreaDeliveryRegionRoutingModule { }

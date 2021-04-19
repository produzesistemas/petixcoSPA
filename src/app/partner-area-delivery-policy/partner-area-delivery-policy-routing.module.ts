import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerAreaDeliveryPolicyComponent } from './partner-area-delivery-policy.component';

const routes: Routes = [
    {
        path: '',
        component: PartnerAreaDeliveryPolicyComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnerAreaDeliveryPolicyRoutingModule { }



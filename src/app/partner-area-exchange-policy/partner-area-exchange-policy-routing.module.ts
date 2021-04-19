import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerAreaExchangePolicyComponent } from './partner-area-exchange-policy.component';

const routes: Routes = [
    {
        path: '',
        component: PartnerAreaExchangePolicyComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnerAreaExchangePolicyRoutingModule { }



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerAreaOrderComponent } from './partner-area-order.component';

const routes: Routes = [
    {
        path: '',
        component: PartnerAreaOrderComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnerAreaOrderRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientAreaPaymentComponent } from './client-area-payment.component';

const routes: Routes = [
    {
        path: '',
        component: ClientAreaPaymentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientAreaPaymentRoutingModule { }



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerAreaStoreComponent } from './partner-area-store.component';

const routes: Routes = [
    {
        path: '',
        component: PartnerAreaStoreComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnerAreaStoreRoutingModule { }

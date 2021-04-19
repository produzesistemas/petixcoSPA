import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerAreaQuemSomosComponent } from './partner-area-quem-somos.component';

const routes: Routes = [
    {
        path: '',
        component: PartnerAreaQuemSomosComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnerAreaQuemSomosRoutingModule { }



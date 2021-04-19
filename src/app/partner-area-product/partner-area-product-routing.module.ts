import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerAreaProductComponent } from './partner-area-product.component';
import { PartnerAreaProductFormComponent } from './partner-area-product-form/partner-area-product-form.component';
import { PartnerAreaProductFormModule } from './partner-area-product-form/partner-area-product-form.module';

const routes: Routes = [
    {
        path: '',
        component: PartnerAreaProductComponent
    },
    {
        path: ':id/:isEdit',
        component: PartnerAreaProductFormComponent,
        children: [
            { path: 'partnerAreaProductForm', loadChildren: () => PartnerAreaProductFormComponent },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnerAreaProductRoutingModule { }

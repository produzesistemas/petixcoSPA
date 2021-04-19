import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerAreaSubCategoryComponent } from './partner-area-sub-category.component';
import { PartnerAreaSubCategoryFormComponent } from './partner-area-sub-category-form/partner-area-sub-category-form.component';
import { PartnerAreaSubCategoryFormModule } from './partner-area-sub-category-form/partner-area-sub-category-form.module';

const routes: Routes = [
    {
        path: '',
        component: PartnerAreaSubCategoryComponent
    },
    {
        path: ':id/:isEdit',
        component: PartnerAreaSubCategoryFormComponent,
        children: [
            { path: 'partner-area-sub-category-form', loadChildren: () => PartnerAreaSubCategoryFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnerAreaSubCategoryRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerAreaCategoryComponent } from './partner-area-category.component';
import { PartnerAreaCategoryFormComponent } from './partner-area-category-form/partner-area-category-form.component';
import { PartnerAreaCategoryFormModule } from './partner-area-category-form/partner-area-category-form.module';

const routes: Routes = [
    {
        path: '',
        component: PartnerAreaCategoryComponent
    },
    {
        path: ':id/:isEdit',
        component: PartnerAreaCategoryFormComponent,
        children: [
            { path: 'partner-area-category-form', loadChildren: () => PartnerAreaCategoryFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnerAreaCategoryRoutingModule { }

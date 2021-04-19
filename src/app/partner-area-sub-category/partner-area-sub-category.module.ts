import { NgModule } from '@angular/core';
import { PartnerAreaSubCategoryComponent } from './partner-area-sub-category.component';
import { SharedModule } from '../share.module';
import { PartnerAreaSubCategoryRoutingModule} from './partner-area-sub-category-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PartnerAreaSubCategoryRoutingModule,
        NgbModule
      ],
    declarations: [
        PartnerAreaSubCategoryComponent
    ],
    exports: [ PartnerAreaSubCategoryComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class PartnerAreaSubCategoriaModule { }

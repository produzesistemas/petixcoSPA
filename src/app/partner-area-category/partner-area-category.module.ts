import { NgModule } from '@angular/core';
import { PartnerAreaCategoryComponent } from './partner-area-category.component';
import { SharedModule } from '../share.module';
import { PartnerAreaCategoryRoutingModule} from './partner-area-category-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PartnerAreaCategoryRoutingModule,
        NgbModule
      ],
    declarations: [
        PartnerAreaCategoryComponent
    ],
    exports: [ PartnerAreaCategoryComponent,
        FormsModule,
        ReactiveFormsModule ]
})
export class PartnerAreaCategoriaModule { }

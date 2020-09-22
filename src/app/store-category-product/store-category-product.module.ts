import { NgModule } from '@angular/core';
import { StoreCategoryProductComponent } from './store-category-product.component';
import { SharedModule } from '../share.module';
import { StoreCategoryProductRoutingModule} from './store-category-product-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        StoreCategoryProductRoutingModule,
        NgbModule
      ],
    declarations: [
        StoreCategoryProductComponent
    ],
    exports: [ StoreCategoryProductComponent ]
})
export class StoreCategoryProductModule { }

import { NgModule } from '@angular/core';
import { StoreCategoryProductComponent } from './store-category-product.component';
import { SharedModule } from '../share.module';
import { StoreCategoryProductRoutingModule} from './store-category-product-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        StoreCategoryProductRoutingModule,
        NgbModule,
        NgxMaskModule.forRoot(options),
      ],
    declarations: [
        StoreCategoryProductComponent
    ],
    exports: [ StoreCategoryProductComponent ]
})
export class StoreCategoryProductModule { }

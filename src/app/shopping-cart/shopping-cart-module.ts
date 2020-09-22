import { NgModule } from '@angular/core';
import { ShoppingCartComponent } from './shopping-cart.component';
import { SharedModule } from '../share.module';
import { ShoppingCartRoutingModule} from './shopping-cart-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        ShoppingCartRoutingModule,
        NgbModule
      ],
    declarations: [
        ShoppingCartComponent
    ],
    exports: [ ShoppingCartComponent ]
})
export class ShoppingCartModule { }

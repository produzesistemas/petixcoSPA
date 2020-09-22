import { NgModule } from '@angular/core';
import { AddressComponent } from './address.component';
import { SharedModule } from '../share.module';
import { AddressRoutingModule} from './address-routing.module';
import { CommonModule } from '@angular/common';
import { IConfig, NgxMaskModule } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        AddressRoutingModule,
        NgxMaskModule.forRoot(options),
      ],
    declarations: [
        AddressComponent    ],
    exports: [ AddressComponent ]
})
export class AddressModule { }

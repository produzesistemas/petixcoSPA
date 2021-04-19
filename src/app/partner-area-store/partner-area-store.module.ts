import { NgModule } from '@angular/core';
import { PartnerAreaStoreComponent } from './partner-area-store.component';
import { SharedModule } from '../share.module';
import { PartnerAreaStoreRoutingModule} from './partner-area-store-routing.module';
import { CommonModule } from '@angular/common';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxViacepModule } from '@brunoc/ngx-viacep';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        PartnerAreaStoreRoutingModule,
        NgxMaskModule.forRoot(options),
        NgxViacepModule
      ],
    declarations: [
        PartnerAreaStoreComponent
    ],
    exports: [ PartnerAreaStoreComponent ]
})
export class PartnerAreaStoreModule { }

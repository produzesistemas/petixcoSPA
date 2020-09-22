import { NgModule } from '@angular/core';
import { SearchStoreComponent } from './search-store.component';
import { SharedModule } from '../share.module';
import { SearchStoreRoutingModule} from '../search-store/search-store-routing.module';
import { CommonModule } from '@angular/common';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
    SearchStoreRoutingModule,
    NgxMaskModule.forRoot(options),
      ],
    declarations: [
        SearchStoreComponent
    ],
    exports: [ SearchStoreComponent ]
})
export class SearchStoreModule { }

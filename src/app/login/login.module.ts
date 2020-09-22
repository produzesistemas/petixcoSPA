import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { SharedModule } from '../share.module';
import { LoginRoutingModule} from '../login/login-routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        LoginRoutingModule
      ],
    declarations: [
        LoginComponent    ],
    exports: [ LoginComponent ]
})
export class LoginModule { }

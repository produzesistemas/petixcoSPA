import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
    {
        path: '',
        component: ShoppingCartComponent
    },
    // {
    //     path: ':isEdit',
    //     component: LoginComponent,
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }



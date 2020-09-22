import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchStoreModule } from './search-store/search-store.module';
import { StoreCategoryProductModule } from './store-category-product/store-category-product.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart-module';
import { CheckoutModule } from './checkout/checkout.module';
import { LoginModule } from './login/login.module';
import { AddressModule } from './address/address.module';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', loadChildren: () => SearchStoreModule },
  { path: 'storecategoryproduct', loadChildren: () => StoreCategoryProductModule },
  { path: 'shoppingcart', loadChildren: () => ShoppingCartModule },
  { path: 'login', loadChildren: () => LoginModule },
  { path: 'checkout', loadChildren: () => CheckoutModule },
  { path: 'address', loadChildren: () => AddressModule },
];

@NgModule({
  imports: [
RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

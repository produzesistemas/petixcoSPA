import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SearchStoreModule } from './search-store/search-store.module';
import { StoreCategoryProductModule } from './store-category-product/store-category-product.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart-module';
import { CheckoutModule } from './checkout/checkout.module';
import { LoginModule } from './login/login.module';
// import { AddressModule } from './address/address.module';
import { StoreLayoutComponent } from 'src/app/_layouts/store-layout/store-layout.component';
import { AccessDeniedComponent } from 'src/app/access-denied/access-denied.component';
import { AppLayoutComponent } from 'src/app/_layouts/app-layout/app-layout.component';
import { ClientLayoutComponent } from 'src/app/_layouts/client-layout/client-layout.component';
import { PartnerAreaModule } from 'src/app/partner-area/partner-area.module';
import { ClientAreaModule } from 'src/app/client-area/client-area.module';
import { ClientAreaOrderModule } from 'src/app/client-area-order/client-area-order.module';
import { PartnerAreaStoreModule } from 'src/app/partner-area-store/partner-area-store.module';
import { PartnerAreaOrderModule } from 'src/app/partner-area-order/partner-area-order.module';
import { PartnerAreaOpeningHoursModule } from 'src/app/partner-area-opening-hours/partner-area-opening-hours.module';
import { PartnerAreaDeliveryRegionModule } from 'src/app/partner-area-delivery-region/partner-area-delivery-region.module';
import { PartnerAreaProductModule } from 'src/app/partner-area-product/partner-area-product.module';
import { PartnerAreaCategoriaModule } from 'src/app/partner-area-category/partner-area-category.module';
import { PartnerAreaSubCategoriaModule } from 'src/app/partner-area-sub-category/partner-area-sub-category.module';
import { PartnerAreaLoginModule } from 'src/app/partner-area-login/partner-area-login.module';
// import { PetixcoLayoutComponent } from './_layouts/petixco-layout/petixco-layout.component';
import { LoginLayoutComponent } from './_layouts/login-layout/login-layout.component';
import { AuthGuard } from '../app/_guard/auth.guard';
// import { QuemSomosModule } from 'src/app/quem-somos/quem-somos.module';
import { PartnerAreaQuemSomosModule } from 'src/app/partner-area-quem-somos/partner-area-quem-somos.module';
import { PartnerAreaDeliveryPolicyModule } from 'src/app/partner-area-delivery-policy/partner-area-delivery-policy.module';
import { PartnerAreaExchangePolicyModule } from 'src/app/partner-area-exchange-policy/partner-area-exchange-policy.module';

const routes: Routes = [
  // {
  //   path: '',
  //   component: PetixcoLayoutComponent,
  //   children: [
  //     { path: '', redirectTo: 'index', pathMatch: 'full'},
  //     { path: 'index', loadChildren: () => SearchStoreModule },
  //     { path: 'searchstore', loadChildren: () => SearchStoreModule },
  //     { path: 'quem-somos', loadChildren: () => QuemSomosModule }
  //   ]
  // },

  {
    path: '',
    component: StoreLayoutComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full'},
      { path: 'index', loadChildren: () => StoreCategoryProductModule },
      // { path: 'storecategoryproduct', loadChildren: () => StoreCategoryProductModule },
      { path: 'shoppingcart', loadChildren: () => ShoppingCartModule },
      { path: 'checkout', loadChildren: () => CheckoutModule },
      // { path: 'address', loadChildren: () => AddressModule },
      { path: 'login', loadChildren: () => LoginModule },
      { path: 'partner-area-quem-somos', loadChildren: () => PartnerAreaQuemSomosModule },
      { path: 'partner-area-delivery-policy', loadChildren: () => PartnerAreaDeliveryPolicyModule },
      { path: 'partner-area-exchange-policy', loadChildren: () => PartnerAreaExchangePolicyModule }
    ]
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      // { path: 'partner-area-login', loadChildren: () => PartnerAreaLoginModule },
      { path: 'partner-area', loadChildren: () => PartnerAreaModule },
      { path: 'partner-area-store', loadChildren: () => PartnerAreaStoreModule },
      { path: 'partner-area-opening-hours', loadChildren: () => PartnerAreaOpeningHoursModule },
      { path: 'partner-area-delivery-region', loadChildren: () => PartnerAreaDeliveryRegionModule },
      { path: 'partner-area-product', loadChildren: () => PartnerAreaProductModule },
      { path: 'partner-area-order', loadChildren: () => PartnerAreaOrderModule },
      { path: 'partner-area-category', loadChildren: () => PartnerAreaCategoriaModule },
      { path: 'partner-area-sub-category', loadChildren: () => PartnerAreaSubCategoriaModule }
     ],
     canActivate: [AuthGuard],
     data: { expectedRole: ['Parceiro'] }
  },
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: 'client-area', loadChildren: () => ClientAreaModule },
      { path: 'client-area-order', loadChildren: () => ClientAreaOrderModule }
     ],
     canActivate: [AuthGuard],
     data: { expectedRole: ['Cliente'] }
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'partner-area-login', loadChildren: () => PartnerAreaLoginModule },
    ]
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  }
  ];

@NgModule({
  imports: [
RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

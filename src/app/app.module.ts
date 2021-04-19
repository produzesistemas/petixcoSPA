import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from '../app/_helpers/auth-Interceptor';
import { HttpRequestInterceptor } from '../app/_helpers/http-request.interceptor';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';

import { AppLayoutComponent } from './_layouts/app-layout/app-layout.component';
import { AppHeaderComponent } from './_layouts/app-header/app-header.component';
import { StoreLayoutComponent } from './_layouts/store-layout/store-layout.component';
// import { PetixcoLayoutComponent } from './_layouts/petixco-layout/petixco-layout.component';
import { LoginLayoutComponent } from './_layouts/login-layout/login-layout.component';
import { StoreHeaderComponent } from './_layouts/store-header/store-header.component';
// import { SearchStoreComponent } from './search-store/search-store.component';
import { ClientLayoutComponent } from './_layouts/client-layout/client-layout.component';
import { ClientHeaderComponent } from './_layouts/client-header/client-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AppHeaderComponent,
    ClientHeaderComponent,
    ClientLayoutComponent,
    StoreLayoutComponent,
    StoreHeaderComponent,
    // SearchStoreComponent,
    // PetixcoLayoutComponent,
    LoginLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    SocialLoginModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      {      provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [
            { id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider('37466574772-uanjds13i38snn9amvichb9mtkb9gvhv.apps.googleusercontent.com'),
            },
            { id: FacebookLoginProvider.PROVIDER_ID,
              provider: new FacebookLoginProvider('clientId'),
            },
            { id: AmazonLoginProvider.PROVIDER_ID,
              provider: new AmazonLoginProvider('clientId'),
            },
          ],
        } as SocialAuthServiceConfig ,
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }

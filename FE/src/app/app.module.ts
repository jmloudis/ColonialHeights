import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import { ProductCategoryMenuComponent } from './products/product-category-menu/product-category-menu.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ImgMagnifier} from "ng-img-magnifier";
import {NgxImgZoomModule} from "ngx-img-zoom";
import {NgxImageZoomModule} from "ngx-image-zoom";
import { CartStatusComponent } from './cart/cart-status/cart-status.component';
import { CartDetailsComponent } from './cart/cart-details/cart-details.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    NgbModule,
    ReactiveFormsModule,
    ImgMagnifier,
    NgxImgZoomModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

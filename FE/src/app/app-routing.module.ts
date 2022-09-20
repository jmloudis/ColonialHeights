import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from "./products/product-list/product-list.component";
import {ProductDetailsComponent} from "./products/product-details/product-details.component";
import {CartDetailsComponent} from "./cart/cart-details/cart-details.component";
import {CheckoutComponent} from "./cart/checkout/checkout.component";

const routes: Routes = [
  {path: "products", component: ProductListComponent},
  {path: "cart-details", component: CartDetailsComponent},
  {path: "checkout", component: CheckoutComponent},
  {path: "products/:id", component: ProductDetailsComponent},
  {path: "category/:id/:name", component: ProductListComponent},
  {path: "category", component: ProductListComponent},
  {path: "**", redirectTo: "products", pathMatch: "full" },
  {path: "", redirectTo: "products", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CheckoutComponent } from "./checkout/checkout.component";
import { OrderConfirmationComponent } from "./order-confirmation/order-confirmation.component";
import { StoreFrontComponent } from "./store-front/store-front.component";
import { PopulatedCartRouteGuard } from './shared/route-guards/populated-cart.route-guard';

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot([
      {
        canActivate: [PopulatedCartRouteGuard],
        component: CheckoutComponent,
        path: "checkout"
      },
      {
        canActivate: [PopulatedCartRouteGuard],
        component: OrderConfirmationComponent,
        path: "confirmed"
      },
      {
        component: StoreFrontComponent,
        path: "**"
      }
    ])
          ],
  declarations: [],
  providers: []
})
export class AppRoutingModule { }

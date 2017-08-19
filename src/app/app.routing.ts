import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CheckoutComponent } from "./checkout/checkout.component";
import { OrderConfirmationComponent } from "./order-confirmation/order-confirmation.component";
import { StoreFrontComponent } from "./store-front/store-front.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { PopulatedCartRouteGuard } from './shared/route-guards/populated-cart.route-guard';
import { AuthService } from "./shared/services/auth.service";
import { AuthGuardService } from "./shared/route-guards/auth-guard.service";


const appRoutes: Routes = [
  {
    canActivate: [PopulatedCartRouteGuard, AuthGuardService],
    component: CheckoutComponent,
    path: "checkout"
  },
  {
    canActivate: [PopulatedCartRouteGuard, AuthGuardService],
    component: OrderConfirmationComponent,
    path: "confirmed"
  },
  {
    canActivate: [AuthGuardService],
    component: StoreFrontComponent,
    path: "storefront"
  },
  {
        path: 'unauthorized',
        component: UnauthorizedComponent
  },
  {
    component: WelcomeComponent,
    path: "**"
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(appRoutes)
          ],
  declarations: [],
  providers: []
})
export class AppRoutingModule { }

export const authProviders = [
  AuthGuardService,
  AuthService
]

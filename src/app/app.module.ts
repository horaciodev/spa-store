import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app.routing';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { StoreFrontComponent } from './store-front/store-front.component';
import { PopulatedCartRouteGuard } from "./shared/route-guards/populated-cart.route-guard";
import { DeliveryOptionsDataService } from "./shared/services/delivery-options.service";
import { ProductsDataService } from "./shared/services/products.service";
import { ShoppingCartService } from "./shared/services/shopping-cart.service";
import { LocalStorageService, StorageService } from "./shared/services/storage.service";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    CheckoutComponent,
    OrderConfirmationComponent,
    StoreFrontComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    ProductsDataService,
    DeliveryOptionsDataService,
    PopulatedCartRouteGuard,
    LocalStorageService,
    { provide: StorageService, useClass: LocalStorageService },
    {
      deps: [StorageService, ProductsDataService, DeliveryOptionsDataService ],
      provide: ShoppingCartService,
      useClass: ShoppingCartService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

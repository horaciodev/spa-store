import { ChangeDetectionStrategy ,Component, OnDestroy ,OnInit } from '@angular/core';
import { Product } from "app/shared/models/product.model";
import { ShoppingCart } from "app/shared/models/shopping-cart.model";
import { ProductsDataService } from "app/shared/services/products.service";
import { ShoppingCartService } from "app/shared/services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/do";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  public products: Observable<Product[]>;
  public cart: Observable<ShoppingCart>;
  public itemCount: number;


  private cartSubscription: Subscription;

  constructor(private productsService: ProductsDataService,
              private shoppingCartService: ShoppingCartService) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public ngOnInit(): void {
    this.products = this.productsService.all(); //TODO: this may be a problem too
    this.cart = this.shoppingCartService.get();
    /*** UNDER TEST 09.02.2017**/
    /*
    let productIds = '';
    this.cart.do( c => productIds = c.getProductIdsFromCart());
    if(productIds.length>0)
        this.products = this.productsService.getMultipleById(productIds);
    */
    /****/
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x)=> x.quantity).reduce((p,n) => p + n, 0);
    });
  }

  public ngOnDestroy(): void {
    if(this.cartSubscription){
      this.cartSubscription.unsubscribe();
    }
  }

}

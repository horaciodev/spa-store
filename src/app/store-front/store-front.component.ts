import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from "app/shared/models/product.model";
import { ShoppingCart } from "app/shared/models/shopping-cart.model";
import { ProductsDataService } from "app/shared/services/products.service";
import { ShoppingCartService } from "app/shared/services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Component({
  selector: 'app-store-front',
  templateUrl: './store-front.component.html',
  styleUrls: ['./store-front.component.css']
})
export class StoreFrontComponent implements OnInit {
  public products: Observable<Product[]>;

  public constructor(private productsSvc: ProductsDataService,
              private shoppingCartSvc: ShoppingCartService) {
  }

  public addProductToCart(prod: Product): void {
    this.shoppingCartSvc.addItem(prod,1);
  }

  public removeProductFromCart(prod: Product): void {
    this.shoppingCartSvc.addItem(prod, -1);
  }

  public productInCart(prod: Product): boolean {
    return Observable.create((obs: Observer<boolean>) =>{
      const sub = this.shoppingCartSvc
                      .get()
                      .subscribe((cart)=> {
                        obs.next(cart.items.some((i) => i.productId == prod.id));
                        obs.complete();
                      });
      sub.unsubscribe();
    })
  }

  public ngOnInit():void  {
    this.products = this.productsSvc.all();
  }

}

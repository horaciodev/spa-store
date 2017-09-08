import { ChangeDetectionStrategy ,Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from "app/shared/models/cart-item.model";
import { DeliveryOption } from "app/shared/models/delivery-option.model";
import { Product } from "app/shared/models/product.model";
import { ShoppingCart } from "app/shared/models/shopping-cart.model";
import { DeliveryOptionsDataService } from "app/shared/services/delivery-options.service";
import { ProductsDataService } from "app/shared/services/products.service";
import { ShoppingCartService } from "app/shared/services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public deliveryOptions: Observable<DeliveryOption[]>;
  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;

  private products: Product[]
  private cartSubscription: Subscription;

  public constructor(private productsService: ProductsDataService,
                    private deliveryOptionsService: DeliveryOptionsDataService,
                    private shoppingCartService: ShoppingCartService) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public setDeliveryOption(option: DeliveryOption): void {
    this.shoppingCartService.setDeliveryOption(option);
  }

  public ngOnInit(): void {
    this.deliveryOptions = this.deliveryOptionsService.all();
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      let productIds = cart.getProductIdsFromCart();
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productsService.getMultipleById(productIds).subscribe((products) => {
        this.products = products;
        this.cartItems = cart.items
                           .map((item) => {
                              const product = this.products.find((p) => p.id === item.productId);
                              return {
                                ...item,
                                product,
                                totalCost: product.price * item.quantity };
                           });
      });
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}

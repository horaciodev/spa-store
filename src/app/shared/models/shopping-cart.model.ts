import { CartItem } from "app/shared/models/cart-item.model";

export class ShoppingCart {
  public items: CartItem[] = new Array<CartItem>();
  public deliveryOptionId: string;
  public grossTotal: number = 0;
  public deliveryTotal: number = 0;
  public itemsTotal: number = 0;

  public updateFrom(src: ShoppingCart) {
    this.items = src.items;
    this.deliveryOptionId = src.deliveryOptionId;
    this.grossTotal = src.grossTotal;
    this.deliveryTotal = src.deliveryTotal;
    this.itemsTotal = src.itemsTotal;
  }

  public getProductIdsFromCart(): string{
    let productIdsString = '';
    for(let item of this.items){
       productIdsString = productIdsString.concat(item.productId).concat(',');
    }
    if(productIdsString.length>0)
      productIdsString = productIdsString.substring(0,productIdsString.length-1);

    return productIdsString;
  }
}

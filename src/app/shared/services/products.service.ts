import { Injectable } from "@angular/core";
import { Product } from "app/shared/models/product.model";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { CachcingServiceBase } from "./caching.service";
import { AuthService } from  "./auth.service";

let count = 0;

@Injectable()
export class ProductsDataService extends CachcingServiceBase {

  private static readonly _productsApiUrl = "http://localhost:5001/api/v1/product/category/1";

  private products: Observable<Product[]>;

  public constructor(private authSvc: AuthService) {
    super();
  }

  public all(): Observable<Product[]> {
    return this.cache<Product[]>(() => this.products,
                                 (val: Observable<Product[]>) => this.products = val,
                                 () => this.authSvc.AuthGet(ProductsDataService._productsApiUrl)
                                           .map((response) => response.json()
                                                                      .map((item) => {
                                                                        let model = new Product();
                                                                        model.updateFrom(item);
                                                                        return model;
                                                                      })));

  }
}

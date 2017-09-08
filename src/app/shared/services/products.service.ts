import { Injectable } from "@angular/core";
import { Product } from "app/shared/models/product.model";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { CachcingServiceBase } from "./caching.service";
import { AuthService } from  "./auth.service";

let count = 0;

@Injectable()
export class ProductsDataService {

  private static readonly _productsApiUrl = "http://localhost:5001/api/v1/product/category/";
  private static readonly _productsByIdMultiApiUrl = "http://localhost:5001/api/v1/product/multi/";

  //private products: Observable<Product[]>;

  public constructor(private authSvc: AuthService) {
    //super();
  }

  public all(categoryId = "2"): Observable<Product[]> {
    //console.log('called service: ' + categoryId);
    return this.authSvc.AuthGet(ProductsDataService._productsApiUrl + categoryId)
                               .map((response) => response.json()
                                                          .map((item) => {
                                                            let model = new Product();
                                                            model.updateFrom(item);
                                                            return model;
                                                          }));
  }

  public getMultipleById(productIds : string): Observable<Product[]> {
    return this.authSvc.AuthGet(ProductsDataService._productsByIdMultiApiUrl + productIds)
    .map((response) => response.json()
                               .map((item) => {
                                 let model = new Product();
                                 model.updateFrom(item);
                                 return model;
                               }));
  }
}

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ProductCategory } from 'app/shared/models/product-category.model';
import "rxjs/add/operator/map";
import { CachcingServiceBase } from "./caching.service";
import { Observable } from "rxjs/Observable";


@Injectable()
export class ProductCategoryService extends CachcingServiceBase {

  private static readonly _productCategoriesApiUrl = "http://localhost:5001/api/v1/productCategory";

  private categories : Observable<ProductCategory[]>;

  public constructor(private http: Http){
    super();
  }

  public all() : Observable<ProductCategory[]>{
    return this.cache<ProductCategory[]>(()=> this.categories,
      (val: Observable<ProductCategory[]>) => this.categories = val,
      () => this.http
            .get(ProductCategoryService._productCategoriesApiUrl)
            .map((response) => response.json()
                                      .map((item) => {
                                        let model = new ProductCategory();
                                        model.updateFrom(item);
                                        return model;
                                      })));
  }


}

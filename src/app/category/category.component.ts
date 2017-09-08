import { Component, OnInit } from '@angular/core';
import { ProductCategory } from "app/shared/models/product-category.model";
import { ProductCategoryService } from "app/shared/services/product-category.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public productCategories: Observable<ProductCategory[]>;
  currentCategory: ProductCategory;

  constructor(private productCategorySvc: ProductCategoryService) {
  }

  public ngOnInit(): void {
    this.productCategories = this.productCategorySvc.all();
  }

  onSelect(prodCategory: ProductCategory): void{
    this.currentCategory = prodCategory;
    //console.log(prodCategory.description);
  }
}

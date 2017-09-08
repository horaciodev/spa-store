export class ProductCategory{
  public categoryId: string;
  public description: string;

  public updateFrom(src: any): void {
    this.categoryId = src.productCategoryId;
    this.description = src.categoryDescr;
  }
}

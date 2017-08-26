import { Feature } from "app/shared/models/feature.model";

export class Product {
  public id: string;
  public name: string;
  public description: string;
  public price: number;
  //public features: Feature[];

  public updateFrom(src: any): void {
    this.id = src.productId;
    this.name = src.productName;
    this.description = src.productDescr;
    this.price = src.price;
    /*
    this.features = src.features.map((i) => {
      let feature = new Feature();
      feature.updateFrom(i);
      return feature;
    });
    */
  }
}

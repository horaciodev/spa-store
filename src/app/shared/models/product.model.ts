import { Feature } from "app/shared/models/feature.model";

export class Product {
  public id: string;
  public name: string;
  public description: string;
  public price: number;
  public features: Feature[];

  public updateFrom(src: Product): void {
    this.id = src.id;
    this.name = src.name;
    this.description = src.description;
    this.price = src.price;
    this.features = src.features.map((i) => {
      let feature = new Feature();
      feature.updateFrom(i);
      return feature;
    });
  }
}

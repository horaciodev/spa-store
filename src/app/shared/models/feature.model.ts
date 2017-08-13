export class Feature {
  public name: string;
  public percentage: number;

  public updateFrom(src: Feature): void {
    this.name = src.name;
    this.percentage = src.percentage;
  }
}

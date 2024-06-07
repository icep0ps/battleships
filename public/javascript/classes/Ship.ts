export default class Ship {
  public size: number;
  private coordinates: string[];

  constructor(size: number) {
    this.size = size;
    this.coordinates = [];
  }
}

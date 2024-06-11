export default class Ship {
  public size: number;
  public _coordinates: string[];

  constructor(size: number) {
    this.size = size;
    this._coordinates = [];
  }

  get coordinates() {
    return this._coordinates;
  }

  set coordinates(coordinates: string[]) {
    const validCoordiantesFormat = new RegExp(/^[0-9],[0-9]$/);

    coordinates.forEach((coordinate) => {
      if (!coordinate.match(validCoordiantesFormat)) {
        throw new Error('Invalid coordiantes format');
      }

      if (this._coordinates.length > this.size) {
        throw new Error(
          `Too many coordinates ship is size ${this.size} but got more that ${this.size} coordinates`
        );
      }

      this._coordinates.push(coordinate);
    });
  }
}

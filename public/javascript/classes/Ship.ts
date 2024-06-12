import Coordiante from './Coordinate';

export default class Ship {
  public size: number;
  public _coordinates: Coordiante[];

  constructor(size: number) {
    this.size = size;
    this._coordinates = [];
  }

  get coordinates() {
    return this._coordinates;
  }

  set coordinates(coordinates: Coordiante[]) {
    const validCoordiantesFormat = new RegExp(/^[0-9],[0-9]$/);

    coordinates.forEach((coordinate) => {
      if (!coordinate.value.match(validCoordiantesFormat)) {
        throw new Error('Invalid coordiantes format, Got: ' + coordinates);
      }

      if (this._coordinates.length > this.size) {
        throw new Error(
          `Too many coordinates ship is size ${this.size} but got more that ${this.size} coordinates`
        );
      }

      this._coordinates.push(coordinate);
    });
  }

  destroyed() {
    return this.coordinates.every((coordinate) => coordinate.hit);
  }
}

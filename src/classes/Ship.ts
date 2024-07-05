import Coordinate from './Coordinate';

export default class Ship {
  public size: number;
  private __coordinates__: Coordinate[];

  constructor(size: number) {
    this.size = size;
    this.__coordinates__ = [];
  }

  get coordinates() {
    return this.__coordinates__;
  }

  set coordinates(coordinates: Coordinate[]) {
    const validCoordinatesFormat = new RegExp(/^[0-9],[0-9]$/);

    coordinates.forEach((coordinate) => {
      if (!coordinate.value.match(validCoordinatesFormat)) {
        throw new Error('Invalid coordinates format, Got: ' + coordinates);
      }

      if (this.__coordinates__.length > this.size) {
        throw new Error(
          `Too many coordinates ship is size ${this.size} but got more that ${this.size} coordinates`
        );
      }

      this.__coordinates__.push(coordinate);
    });
  }

  isDestroyed() {
    return this.coordinates.every((coordinate) => coordinate.hit);
  }
}

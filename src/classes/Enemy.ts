import DisplayController from './Display';
import Player from './Player';

class Computer extends Player {
  private coordinatesAttacked: string[];

  constructor() {
    super('ENEMY');
    this.coordinatesAttacked = [];
  }

  generateRandomCoordinates(max: number = this.board.size - 1) {
    let xaxis = Math.floor(Math.random() * max);
    let yaxis = Math.floor(Math.random() * max);
    let coordinates = `${xaxis},${yaxis}`;

    while (this.coordinatesAttacked.includes(coordinates)) {
      xaxis = Math.floor(Math.random() * max);
      yaxis = Math.floor(Math.random() * max);
      coordinates = `${xaxis},${yaxis}`;
    }

    this.coordinatesAttacked.push(coordinates);
    return coordinates;
  }
}
export default Computer;

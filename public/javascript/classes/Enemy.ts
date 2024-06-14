import DisplayController from './Display';
import Player from './Player';

class Computer extends Player {
  private coordinatesAttacked: string[];

  constructor() {
    super('ENEMY');
    this.coordinatesAttacked = [];
  }

  genarateRandomCoordinates(max: number = this.board.size - 1) {
    let xaxis = Math.floor(Math.random() * max);
    let yaxis = Math.floor(Math.random() * max);
    let coordiantes = `${xaxis},${yaxis}`;

    while (this.coordinatesAttacked.includes(coordiantes)) {
      xaxis = Math.floor(Math.random() * max);
      yaxis = Math.floor(Math.random() * max);
      coordiantes = `${xaxis},${yaxis}`;
    }

    this.coordinatesAttacked.push(coordiantes);
    return coordiantes;
  }
}
export default Computer;

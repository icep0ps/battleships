import DisplayController from './Display';
import Player from './Player';

class Computer extends Player {
  private coordinates: string[];
  private coordinatesAttacked: string[];

  constructor() {
    super('ENEMY');
    this.coordinates = [];
    this.coordinatesAttacked = [];
  }

  public placeShips() {
    this.board.ships.forEach((ship) => {
      const coordiantes = this.generateShipCoordinates();
      this.board.placeShip(coordiantes);
    });
  }

  generateShipCoordinates() {
    const boardSize = this.board.size - 1;
    const shipSize = this.board.ships[this.board.placedships].size;
    const shipCoordinates = [];

    const max = boardSize - shipSize;
    let xaxis = Math.floor(Math.random() * boardSize);
    let yaxis = Math.floor(Math.random() * max);
    let intialCoordiantes = `${xaxis},${yaxis}`;

    while (this.coordinates.includes(intialCoordiantes)) {
      xaxis = Math.floor(Math.random() * boardSize);
      yaxis = Math.floor(Math.random() * max);
      intialCoordiantes = `${xaxis},${yaxis}`;
    }

    for (let i = 0; i < shipSize; i++) {
      const coordiante = `${xaxis},${yaxis + i}`;
      shipCoordinates.push(coordiante);
      this.coordinates.push(coordiante);
    }
    return shipCoordinates;
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

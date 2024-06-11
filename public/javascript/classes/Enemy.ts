import DisplayController from './Display';
import Player from './Player';

class Computer extends Player {
  private coordinates: string[];

  constructor() {
    super('ENEMY');
    this.coordinates = [];
  }

  public placeShips() {
    this.board.ships.forEach((ship) => {
      const coordiantes = this.genarateRandomCoordinates();
      this.board.placeShip(coordiantes);
    });
  }

  genarateRandomCoordinates() {
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
}
export default Computer;

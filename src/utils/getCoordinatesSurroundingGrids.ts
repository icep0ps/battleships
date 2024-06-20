export default function getCoordinatesSurroundingGrids(coordiante: string) {
  const [positionX, positionY] = coordiante.split(',').map(Number);

  const top = `${positionX},${positionY - 1}`;
  const bottom = `${positionX},${positionY + 1}`;
  const left = `${positionX - 1},${positionY}`;
  const right = `${positionX + 1},${positionY}`;
  const topleft = `${positionX - 1},${positionY - 1}`;
  const topright = `${positionX + 1},${positionY - 1}`;
  const bottomleft = `${positionX - 1},${positionY + 1}`;
  const bottomright = `${positionX + 1},${positionY + 1}`;

  return [top, bottom, left, right, topleft, topright, bottomleft, bottomright];
}

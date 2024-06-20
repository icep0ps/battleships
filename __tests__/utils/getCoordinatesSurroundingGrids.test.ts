import getCoordinatesSurroundingGrids from '../../src/utils/getCoordinatesSurroundingGrids';

describe('getCoordinatesSurroundingGrids', () => {
  test('returns all eight grids', () => {
    const coordinates = getCoordinatesSurroundingGrids('1,1');
    expect(coordinates.length).toEqual(8);
  });

  test('does not include initial coordinate', () => {
    const coordinate = '1,1';
    const coordinates = getCoordinatesSurroundingGrids(coordinate);
    expect(coordinates).not.toContain(coordinate);
  });
});

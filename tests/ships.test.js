import { ship } from '../src/ships-factory';

test('ship hit', () => {
  const testShip = ship(5);
  testShip.hit(1);
  expect(testShip.shipHits).toContain(1);
});

test('is sink', () => {
  const testShip = ship(3);
  testShip.hit(1);
  testShip.hit(2);
  testShip.hit(3);
  expect(testShip.isSink()).toBeTruthy();
});

test('is sink 2', () => {
  const testShip = ship(2);
  testShip.hit(1);
  expect(testShip.isSink()).toBeFalsy();
});

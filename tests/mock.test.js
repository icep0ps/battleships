

test('mock funtion', () => {
  const isCollidingMock = jest.fn();
  expect(isCollidingMock).toBe(false);
});

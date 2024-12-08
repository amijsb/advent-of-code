export const outOfBounds = (x: number, y: number, maxX: number, maxY: number) =>
  x < 0 || y < 0 || x > maxX || y > maxY;

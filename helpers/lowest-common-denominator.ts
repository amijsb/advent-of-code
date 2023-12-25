export const findLCM = (numbers: number[]): number => {
  const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
  const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);
  return numbers.reduce(lcm);
};

export const numericalValues: { [key: string]: string } = {
  T: "10",
  J: "11",
  Q: "12",
  K: "13",
  A: "14",
};

export const availableHands = {
  [String([1, 1, 1, 1, 1])]: 1,
  [String([1, 1, 1, 2])]: 2,
  [String([1, 2, 2])]: 3,
  [String([1, 1, 3])]: 4,
  [String([2, 3])]: 5,
  [String([1, 4])]: 6,
  [String([5])]: 7,
};

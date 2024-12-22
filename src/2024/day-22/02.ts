import { getInput, secretPredictor } from "./01";

const getSequences = (secrets: number[]) =>
  secrets.reduce((acc: number[], curr, index) => {
    if (index + 1 > secrets.length - 1) return acc;

    const string = String(curr);
    const nextString = String(secrets[index + 1]);

    const difference =
      Number(nextString[nextString.length - 1]) - Number(string[string.length - 1]);

    return (acc = [...acc, difference]);
  }, []);

const getOnesDigits = (secrets: number[]) =>
  secrets.reduce((acc: number[], curr) => {
    const string = String(curr);
    Number(string[string.length - 1]);

    return (acc = [...acc, Number(string[string.length - 1])]);
  }, []);

const tradeBananas = (sequences: number[][], onesDigits: number[][]) => {
  const groups = sequences.map((sequence) =>
    sequence.reduce((acc: number[][], _, i) => {
      if (i + 3 <= sequence.length - 1)
        return (acc = [...acc, [sequence[i], sequence[i + 1], sequence[i + 2], sequence[i + 3]]]);
      else return acc;
    }, []),
  );

  const stringGroups = groups.map((group) => group.map((sequence) => JSON.stringify(sequence)));

  const findIndices = (toFind: number[]) =>
    stringGroups.map((stringGroup) => stringGroup.indexOf(JSON.stringify(toFind)));

  const uniqueSequences = new Set<string>();
  stringGroups.forEach((group) => group.forEach((sequence) => uniqueSequences.add(sequence)));

  const stack = [...uniqueSequences].map((sequence) => JSON.parse(sequence));

  let best = 0;

  while (stack.length > 0) {
    const sequence = stack.shift()!;

    const indices = findIndices(sequence);
    const bananas = indices.map((num, i) => (num === -1 ? 0 : onesDigits[i][num + 4]));

    const totalBananas = bananas.reduce((a, b) => a + b, 0);
    if (totalBananas > best) best = totalBananas;
  }

  return best;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const secrets = input.map((number) => secretPredictor(number).allSecrets);

  const sequences = secrets.map((secrets) => getSequences(secrets));
  const onesDigits = secrets.map((secrets) => getOnesDigits(secrets));

  return tradeBananas(sequences, onesDigits);
};

import { getInput } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);

  const pairs: Record<string, Set<string>> = {};
  const computers = new Set<string>();
  const allMaxCliques = new Set<Set<string>>();

  input.map((pair) => {
    const [left, right] = pair;

    if (!pairs[left]) pairs[left] = new Set();
    if (!pairs[right]) pairs[right] = new Set();

    pairs[left].add(right);
    pairs[right].add(left);

    computers.add(left);
    computers.add(right);
  });

  const bronKerbosch = (R: Set<string>, P: Set<string>, X: Set<string>) => {
    if (P.size === 0 && X.size === 0) {
      allMaxCliques.add(new Set(R));
      return;
    }

    P.forEach((v) => {
      bronKerbosch(
        new Set([...R, v]),
        new Set([...P].filter((n) => pairs[v]?.has(n))),
        new Set([...X].filter((n) => pairs[v]?.has(n))),
      );

      P.delete(v);
      X.add(v);
    });
  };

  bronKerbosch(new Set(), new Set(computers), new Set());

  const biggestClique = [...allMaxCliques].reduce((max, clique) =>
    clique.size > max.size ? clique : max,
  );

  return [...biggestClique].sort().join(",");
};

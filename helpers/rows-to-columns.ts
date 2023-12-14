export const rowsToColumns = (input: string[][]) => {
  const columns: string[][] = [[]];

  input.forEach((row, y) => {
    row.forEach((_, x) => {
      if (!columns[x]) {
        columns.push([]);
      }

      columns[x].push(input[y][x]);
    });
  });

  return columns;
};

import { readFileSync } from "fs";
import { Color, Turn } from "./types";

const limits = {
  blue: 14,
  green: 13,
  red: 12,
};

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const games = fileContent.split("\n").map((line) => line.split(": ")[1]);

  return games.map((game) =>
    game.split("; ").map((turn) => {
      let cubes: Turn = { blue: 0, green: 0, red: 0 };

      turn.split(", ").forEach((cube) => {
        const [number, color] = cube.split(" ");
        cubes[color as Color] = Number(number);
      });

      return cubes;
    }),
  );
};

const getPossibleGames = (input: Turn[][]) =>
  input.map((game, i) =>
    game.every(
      ({ red, green, blue }) => blue <= limits.blue && red <= limits.red && green <= limits.green,
    )
      ? i + 1
      : 0,
  );

export const part01 = (file: string) => {
  const input = getInput(file);
  const possibleGames = getPossibleGames(input);

  return possibleGames.reduce((a, b) => a + b, 0);
};

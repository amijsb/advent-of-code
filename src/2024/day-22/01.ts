import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map(Number);
};

const mixAndPrune = (value: number, secret: number) => ((value ^ secret) >>> 0) % 16777216;

export const secretPredictor = (secret: number, count = 2000) => {
  const allSecrets: number[] = [secret];

  while (count > 0) {
    secret = mixAndPrune(secret * 64, secret);
    secret = mixAndPrune(Math.floor(secret / 32), secret);
    secret = mixAndPrune(secret * 2048, secret);

    allSecrets.push(secret);
    count--;
  }

  return { allSecrets, secret };
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const secrets = input.map((number) => secretPredictor(number).secret);

  return secrets.reduce((a, b) => a + b, 0);
};

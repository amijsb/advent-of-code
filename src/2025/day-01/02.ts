import { getInput, getPassword } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);

  const { click } = getPassword(input);
  return click;
};

import { getInput, pushButton } from "./01";
import { findLCM } from "../../../helpers/lowest-common-denominator";

export const part02 = (file: string) => {
  const modules = getInput(file);

  const { findRx } = pushButton(modules, false);
  return findLCM([...findRx.values()]);
};

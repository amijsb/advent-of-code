import { part01 } from "./2022/day-10/01";
import { part02 } from "./2022/day-10/02";

const year = "2022";
const day = "day-10";

const input = `./input/${year}/${day}/input.txt`;
const testinput = `./input/${year}/${day}/test-input.txt`;

console.log(`The answer to part 1 is ${part01(input)}. The answer to part 2 is ${part02(input)}.`);

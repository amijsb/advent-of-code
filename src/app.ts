import { part01 } from "./2023/day-03/01";
import { part02 } from "./2023/day-03/02";

const day = "day-03";
const year = "2023";

const input = `./input/${year}/${day}/input.txt`;
const testinput = `./input/${year}/${day}/test-input.txt`;

console.time("part-01");
console.log(`The answer to part 1 is ${part01(process.argv[2] === "--test" ? testinput : input)}.`);
console.timeEnd("part-01");

console.time("part-02");
console.log(`The answer to part 2 is ${part02(process.argv[2] === "--test" ? testinput : input)}.`);
console.timeEnd("part-02");

import { part01 } from "./2024/day-08/01";
import { part02 } from "./2024/day-08/02";

const day = "day-08";
const year = "2024";

const input = `./input/${year}/${day}/input.txt`;
const testinput = `./input/${year}/${day}/test-input.txt`;

console.time("part-01");
console.log(`The answer to part 1 is ${part01(process.argv[2] === "--test" ? testinput : input)}.`);
console.timeEnd("part-01");

console.time("part-02");
console.log(`The answer to part 2 is ${part02(process.argv[2] === "--test" ? testinput : input)}.`);
console.timeEnd("part-02");

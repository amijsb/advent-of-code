import { readFileSync } from "fs";

type Mineral = "ore" | "clay" | "obsidian" | "geode";

interface Cost {
  [key: string]: {
    [key: string]: number;
  };
}

export type Blueprint = Cost[];

export interface Stack {
  robots: {
    [K in Mineral]: number;
  };
  collected: {
    [K in Mineral]: number;
  };
  minute: number;
}

// export interface Memory {
//   [key: string]: string;
// }

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n");
};

const parseRobots = (robot: string, vlaai: { [key: string]: { [key: string]: number } }) => {
  const substrings = robot.split("robot costs ");
  const name = substrings[0].split(" ")[1];
  const costs = substrings[1].split(" and ");

  if (!vlaai[name]) {
    vlaai = { ...vlaai, [name]: {} };
  }

  costs.forEach((cost) => {
    const bla = cost.split(" ");
    vlaai[name] = { ...vlaai[name], [bla[1].replace(".", "")]: Number(bla[0]) };
  });

  return vlaai;
};

export const parseInput = (input: string[]) => {
  const blueprints: any[] = input.map((el) => {
    const substrings = el.split(": ");
    const robots = substrings[1].split(". ");

    return robots.map((robot) => parseRobots(robot, {}));
  });

  return blueprints;
};

const qualityLevel = (id: number, geodes: number) => id * geodes;

const findAffordableRobots = (blueprint: Blueprint, collected: { [key: string]: number }) => {
  const vlaai = blueprint.filter((cost) => {
    const vroemies = Object.values(cost).map((munnie) => {
      const mineral = Object.keys(munnie);
      return mineral.every((m: string) => munnie[m] <= collected[m]);
    });
    return vroemies[0];
  });

  return vlaai.map((robot) => Object.keys(robot)[0]);
};

// ChatGPT:

// export const openGeodes = (
//   blueprint: Blueprint,
//   stack: Stack[],
//   memory: string[],
//   mostGeodes = 0,
//   totalMinutes = 24,
// ) => {
//   while (stack.length !== 0) {
//     let { robots, collected, minute } = stack.pop()!;
//     let { ore, clay, obsidian, geode } = collected;
//     const maxOre = Math.max(
//       blueprint[0].ore.ore,
//       blueprint[1].clay.ore,
//       blueprint[2].obsidian.ore,
//       blueprint[3].geode.ore,
//     );
//     const maxClay = blueprint[2].obsidian.clay;
//     const maxObs = blueprint[3].geode.obsidian;

//     if (minute === totalMinutes) {
//       mostGeodes = Math.max(mostGeodes, geode);
//       continue;
//     }

//     // if (ore > maxOre || clay > maxClay || obsidian > maxObs) continue;

//     const state = JSON.stringify({ robots, collected, minute });

//     if (memory.includes(state)) continue;

//     memory.push(state);

//     const affordableRobots = findAffordableRobots(blueprint, collected);

//     collected = {
//       ore: (ore += robots.ore),
//       clay: (clay += robots.clay),
//       obsidian: (obsidian += robots.obsidian),
//       geode: (geode += robots.geode),
//     };

//     affordableRobots?.forEach((robot) => {
//       const cost =
//         robot === "geode"
//           ? blueprint[3].geode
//           : robot === "obsidian"
//           ? blueprint[2].obsidian
//           : robot === "clay"
//           ? blueprint[1].clay
//           : blueprint[0].ore;
//       let newCollected = { ...collected };
//       Object.keys(cost).forEach((mineral) => {
//         //@ts-ignore
//         newCollected = { ...newCollected, [mineral]: newCollected[mineral] - cost[mineral] };
//       });
//       //@ts-ignore
//       const newRobots = { ...robots, [robot]: robots[robot] + 1 };
//       stack.push({ robots: newRobots, collected: newCollected, minute: minute + 1 });
//     });
//   }
//   return mostGeodes;
// };

export const openGeodes = (
  blueprint: Blueprint,
  stack: Stack[],
  memory: Set<string>,
  mostGeodes = 0,
  totalMinutes = 24,
) => {
  while (stack.length !== 0) {
    let { robots, collected, minute } = stack.pop()!;
    let { ore, clay, obsidian, geode } = collected;

    if (minute === totalMinutes) {
      geode > mostGeodes && (mostGeodes = geode);
      continue;
    }

    const entry = JSON.stringify({ collected, minute });

    if (memory.has(entry)) continue;

    memory.add(entry);

    const affordableRobots = findAffordableRobots(blueprint, collected);

    collected = {
      ore: (ore += robots.ore),
      clay: (clay += robots.clay),
      obsidian: (obsidian += robots.obsidian),
      geode: (geode += robots.geode),
    };

    stack.push({ robots, collected, minute: minute + 1 });

    affordableRobots?.forEach((robot) => {
      if (
        robot === "geode" ||
        (robot === "obsidian" && blueprint[3].geode.obsidian > robots.obsidian) ||
        (robot === "clay" && blueprint[2].obsidian.clay > robots.clay) ||
        (robot === "ore" && blueprint[1].clay.ore > robots.ore)
      ) {
        const cost =
          robot === "geode"
            ? blueprint[3].geode
            : robot === "obsidian"
            ? blueprint[2].obsidian
            : robot === "clay"
            ? blueprint[1].clay
            : blueprint[0].ore;

        let newCollected = collected;

        Object.keys(cost).forEach((mineral) => {
          newCollected = {
            ...newCollected,
            //@ts-ignore
            [mineral]: newCollected[mineral] - cost[mineral],
          };
        });

        let newRobots = { ...robots };

        newRobots = { ...newRobots, [robot]: newRobots[robot] + 1 };

        stack.push({ robots: newRobots, collected: newCollected, minute: minute + 1 });
      }
    });
  }

  return mostGeodes;
};

export const initialState: Stack = {
  robots: { ore: 1, clay: 0, obsidian: 0, geode: 0 },
  collected: { ore: 0, clay: 0, obsidian: 0, geode: 0 },
  minute: 0,
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const blueprints: Blueprint[] = parseInput(input);

  const geodes = blueprints.map((print) => openGeodes(print, [initialState], new Set()));

  const qualityLevels = geodes.map((geode, i) => qualityLevel(i + 1, geode));
  return qualityLevels.reduce((a, b) => a + b, 0);
};

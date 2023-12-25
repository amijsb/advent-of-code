import { readFileSync } from "fs";

type ModuleType = "broadcaster" | "&" | "%";

interface Modules {
  [key: string]: {
    type: ModuleType;
    directions: string[];
  };
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");

  let modules: Modules = {};

  lines
    .map((line) => line.split(" -> "))
    .forEach(([name, directions]) => {
      const parsedName = name.match(/(\w)+/g);
      const type = name.match(/([^\w])+/g);

      modules = {
        ...modules,
        [String(parsedName)]: {
          type: type ? (String(type) as ModuleType) : "broadcaster",
          directions: directions.split(", "),
        },
      };
    });

  return modules;
};

export const pushButton = (modules: Modules, part01 = true, pushes = 0, lows = 0, highs = 0) => {
  const memory = new Map<string, "on" | "off">();
  const conjunctionMemory = new Map<string, Map<string, "low" | "high">>();

  const queue = [];
  const findRx = new Map<string, number>();

  for (const module in modules) {
    if (modules[module].type === "%") memory.set(module, "off");
    if (modules[module].type === "&") {
      const connectedInputs = new Map();
      const name = module;

      for (const module in modules) {
        if (modules[module].directions.includes(name)) connectedInputs.set(module, "low");
      }

      conjunctionMemory.set(module, connectedInputs);
    }
  }

  for (const module in modules) {
    if (modules[module].directions.includes("rx")) {
      const keys = conjunctionMemory.get(module)!.keys();
      [...keys].forEach((key) => findRx.set(key, 0));
    }
  }

  while (true) {
    if (queue.length === 0) {
      if (pushes === 1000 && part01) break;
      pushes++;
      lows++;
      queue.push({
        ...modules["broadcaster"],
        name: "broadcaster",
        pulse: "low",
        source: "button",
      });
    }

    const { type, directions, name, pulse, source } = queue.shift()!;

    if (type === "broadcaster") {
      directions.forEach((dir) => {
        lows++;
        queue.push({ ...modules[dir], name: dir, pulse: "low", source: "broadcaster" });
      });
    }

    if (type === "&") {
      const connections = conjunctionMemory.get(name)!;
      connections.set(source, pulse as "low" | "high");

      const updatedConnections = conjunctionMemory.get(name)?.values()!;
      const newPulse = [...updatedConnections].every((value) => value === "high") ? "low" : "high";

      [...findRx.keys()].forEach((key) => {
        if (name === key && newPulse === "high") {
          findRx.set(key, pushes);
        }
      });

      if ([...findRx.values()].every((value) => value !== 0)) break;

      directions.forEach((dir) => {
        if (newPulse === "low") lows++;
        else highs++;

        queue.push({
          ...modules[dir],
          name: dir,
          pulse: newPulse,
          source: name,
        });
      });
    }

    if (type === "%") {
      let newPulse: "low" | "high";
      if (pulse === "high") continue;
      else {
        if (memory.get(name) === "off") {
          memory.set(name, "on");
          newPulse = "high";
        } else {
          memory.set(name, "off");
          newPulse = "low";
        }
      }

      directions.forEach((dir) => {
        if (newPulse === "low") lows++;
        else highs++;

        queue.push({ ...modules[dir], name: dir, pulse: newPulse, source: name });
      });
    }
  }

  return { highs, lows, findRx };
};

export const part01 = (file: string) => {
  const modules = getInput(file);
  const { highs, lows } = pushButton(modules);

  return highs * lows;
};

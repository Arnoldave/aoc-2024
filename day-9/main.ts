import { readFileSync } from "fs";

const inputPath = "./day-9/input.txt";

const getInput = () => {
  return readFileSync(inputPath).toString();
};

const isEven = (number: number) => {
  return number % 2 === 0;
};

const getMemory = (diskMap: string) => {
  let memory = "";
  for (var i = 0; i < diskMap.length; i++) {
    const size = Number(diskMap[i]);
    const id = isEven(i) ? `[${Math.floor(i / 2)}]` : ".";

    for (var j = 0; j < size; j++) {
      memory = `${memory}${id}`;
    }
  }

  return memory;
};

const getOptimizedMemory = (memory: string) => {
  while (true) {
    const ids = memory.match(/\[\d\]/g) ?? [];
    if (memory.indexOf(".") === -1) {
      break;
    }

    memory = memory.replace(".", ids[ids.length - 1]);
    console.log(ids, memory);
  }

  return memory;
};

const part1 = () => {
  const input = getInput();
  const memory = getMemory(input);
  console.log(memory);
  const optimizedMemory = getOptimizedMemory(memory);
  console.log(optimizedMemory);

  const fileSystemChecksums: number[] = [];
  for (var i = 0; i < optimizedMemory.length; i++) {
    if (optimizedMemory[i] === ".") {
      break;
    }

    const id = Number(optimizedMemory[i]);
    fileSystemChecksums.push(id * i);
  }

  return fileSystemChecksums.reduce((partialSum, a) => partialSum + a, 0);
};

console.log(part1());

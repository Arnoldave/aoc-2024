import { readFileSync } from "fs";

const inputPath = "./day-9/input.txt";

const getInput = () => {
  return readFileSync(inputPath).toString();
};

const isEven = (number: number) => {
  return number % 2 === 0;
};

const getMemory = (diskMap: string): (number | '.')[] => {
  let memory = [];
  for (var i = 0; i < diskMap.length; i++) {
    const size = Number(diskMap[i]);
    const id = isEven(i) ? Math.floor(i / 2) : ".";

    for (var j = 0; j < size; j++) {
      memory.push(id);
    }
  }

  return memory;
};

const optimize = (memory: (number | '.')[]) => {
  let firstSpace = memory.indexOf('.');
  let ids = memory.filter((x) => typeof x === 'number');
  let lastId = memory.lastIndexOf(ids[ids.length - 1]);

  while (firstSpace >= 0 && firstSpace < lastId) {
    console.log(firstSpace, lastId);

    memory[firstSpace] = memory[lastId];
    memory.splice(lastId, 1);

    firstSpace = memory.indexOf('.');
    ids = memory.filter((x) => typeof x === 'number');
    lastId = memory.lastIndexOf(ids[ids.length - 1]);
  }

  memory.splice(firstSpace);
}

const getFileSystemChecksum = (memory: number[]) => {
  return memory.reduce((partialSum, a, index) => partialSum + (a * index), 0);
}

const part1 = () => {
  const input = getInput();
  const memory = getMemory(input);
  optimize(memory);

  return getFileSystemChecksum(memory as number[]);
};

console.log(part1());

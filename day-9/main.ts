import { readFileSync } from "fs";

const inputPath = "./day-9/input.txt";

const getInput = () => {
  return readFileSync(inputPath).toString();
};

const isEven = (number: number) => {
  return number % 2 === 0;
};

const getMemory = (diskMap: string): (number | ".")[] => {
  let memory: (number | ".")[] = [];
  for (var i = 0; i < diskMap.length; i++) {
    const size = Number(diskMap[i]);
    const id = isEven(i) ? Math.floor(i / 2) : ".";

    for (var j = 0; j < size; j++) {
      memory.push(id);
    }
  }

  return memory;
};

const getMemoryBlocks = (diskMap: string): { id?: number; size: number }[] => {
  const memoryBlocks: { id?: number; size: number }[] = [];
  for (var i = 0; i < diskMap.length; i++) {
    const size = Number(diskMap[i]);
    const id = isEven(i) ? Math.floor(i / 2) : undefined;

    memoryBlocks.push({ id, size });
  }

  return memoryBlocks;
};

const optimize = (memory: (number | ".")[]) => {
  let firstSpace = memory.indexOf(".");
  let ids = memory.filter((x) => typeof x === "number");
  let lastId = memory.lastIndexOf(ids[ids.length - 1]);

  while (firstSpace >= 0 && firstSpace < lastId) {
    console.log(firstSpace, lastId);

    memory[firstSpace] = memory[lastId];
    memory.splice(lastId, 1);

    firstSpace = memory.indexOf(".");
    ids = memory.filter((x) => typeof x === "number");
    lastId = memory.lastIndexOf(ids[ids.length - 1]);
  }

  memory.splice(firstSpace);
};

const defragmentMemoryBlock = (
  memoryBlocks: { id?: number; size: number }[],
  index: number
) => {
  const memoryBlock = memoryBlocks[index];
  if (!memoryBlock.id) {
    return;
  }

  const firstSpaceIndex = memoryBlocks.findIndex(
    (block) => block.id === undefined && block.size >= memoryBlock.size
  );
  if (firstSpaceIndex === -1 || firstSpaceIndex > index) {
    return;
  }

  memoryBlocks.splice(index, 1, {
    size: memoryBlock.size,
  });

  const firstSpace = memoryBlocks[firstSpaceIndex];
  firstSpace.size -= memoryBlock.size;
  if (firstSpace.size === 0) {
    memoryBlocks.splice(firstSpaceIndex, 1);
  }

  memoryBlocks.splice(firstSpaceIndex, 0, memoryBlock);
};

const defragmentMemoryBlocks = (
  memoryBlocks: { id?: number; size: number }[]
) => {
  for (var i = Math.floor(memoryBlocks.length / 2); i >= 0; i--) {
    const index = memoryBlocks.findIndex((memoryBlock) => memoryBlock.id === i);
    defragmentMemoryBlock(memoryBlocks, index);
  }
};

const getFileSystemChecksum = (memory: number[]) => {
  return memory.reduce((partialSum, a, index) => partialSum + a * index, 0);
};

const getFileSystemChecksumOfMemoryBlocks = (
  memoryBlocks: { id?: number; size: number }[]
) => {
  let fileSystemChecksum = 0;
  var index = 0;
  for (var i = 0; i < memoryBlocks.length; i++) {
    const memoryBlock = memoryBlocks[i];
    for (var j = 0; j < memoryBlock.size; j++) {
      console.log(index, memoryBlock.id);
      fileSystemChecksum += (memoryBlock.id ?? 0) * index;
      index++;
    }
  }

  return fileSystemChecksum;
};

const part1 = () => {
  const input = getInput();
  const memory = getMemory(input);
  optimize(memory);

  return getFileSystemChecksum(memory as number[]);
};

const part2 = () => {
  const input = getInput();
  const memoryBlocks = getMemoryBlocks(input);
  defragmentMemoryBlocks(memoryBlocks);
  return getFileSystemChecksumOfMemoryBlocks(memoryBlocks);
};

console.log(part2());

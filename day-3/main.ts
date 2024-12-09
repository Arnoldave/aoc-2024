import fs from "fs";

const inputPath = "./day-3/input.txt";

const getInput = () => fs.readFileSync(inputPath).toString();

const multiply = (multiplyOperation: string) => {
  const [x, y] = multiplyOperation.match(/\d+/g)?.map(Number) ?? [0, 0];
  return x * y;
};

const part1 = () => {
  const input = getInput();

  const multiplyOperations = input.match(/mul\(\d+,\d+\)/g) ?? [];

  return multiplyOperations
    .map(multiply)
    .reduce((partialSum, a) => partialSum + a, 0);
};

const part2 = () => {
  const input = getInput();

  const operations =
    input.match(/(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g) ?? [];

  let total = 0;
  let enabled = true;
  for (let i in operations) {
    const operation = operations[i];

    if (operation === "do()") {
      enabled = true;
      continue;
    }

    if (operation === "don't()") {
      enabled = false;
      continue;
    }

    if (enabled) {
      total += multiply(operation);
    }
  }

  return total;
};

console.log(part2());

import { readFileSync } from "fs";

const inputPath = "./day-6/input.txt";
const movementPaths = [
  ([x, y]) => [x, y - 1],
  ([x, y]) => [x + 1, y],
  ([x, y]) => [x, y + 1],
  ([x, y]) => [x - 1, y],
];

const getInput = (): string[] => {
  const inputString = readFileSync(inputPath).toString();
  return inputString.split("\r\n");
};

const isOutOfBounds = ([x, y]: [number, number], input: string[]) => {
  if (y < 0 || y >= input.length) {
    return true;
  }

  if (x < 0 || x >= input[y].length) {
    return true;
  }

  return false;
};

const replaceAt = (
  input: string[],
  replaceWith: string,
  [x, y]: [number, number]
) => {
  const inputCopy = input.slice(0);

  inputCopy[y] =
    input[y].substring(0, x) +
    replaceWith +
    input[y].substring(x + replaceWith.length);

  return inputCopy;
};

const part1 = () => {
  let input = getInput();

  const startingRow = input.find((row) => row.includes("^"))!;

  let [x, y] = [startingRow.indexOf("^"), input.indexOf(startingRow)];
  let movementPathIndex = 0;

  while (true) {
    const [nextX, nextY] = movementPaths[movementPathIndex]([x, y]);

    input = replaceAt(input, "X", [x, y]);

    if (isOutOfBounds([nextX, nextY], input)) {
      break;
    }

    if (input[nextY][nextX] === "#") {
      movementPathIndex = movementPathIndex === 3 ? 0 : movementPathIndex + 1;
    } else {
      [x, y] = [nextX, nextY];
    }
  }

  return input
    .map((row) => (row.match(/X/g) ?? []).length)
    .reduce((partialSum, a) => partialSum + a, 0);
};

const isLooping = (input: string[]) => {
  const startingRow = input.find((row) => row.includes("^"))!;
  const [startX, startY] = [
    startingRow.indexOf("^"),
    input.indexOf(startingRow),
  ];

  let [x, y] = [startX, startY];
  let movementPathIndex = 0;
  let route: [[number, number], number][] = [[[x, y], movementPathIndex]];

  while (true) {
    const [nextX, nextY] = movementPaths[movementPathIndex]([x, y]);

    if (isOutOfBounds([nextX, nextY], input)) {
      return false;
    }

    if (input[nextY][nextX] === "#") {
      movementPathIndex = movementPathIndex === 3 ? 0 : movementPathIndex + 1;
    } else {
      [x, y] = [nextX, nextY];
    }

    if (
      route.find(
        ([[routeX, routeY], routeMovementPathIndex]) =>
          x === routeX &&
          y === routeY &&
          movementPathIndex === routeMovementPathIndex
      )
    ) {
      return true;
    }

    route.push([[x, y], movementPathIndex]);
  }
};

const part2 = () => {
  let input = getInput();

  let loopingCount = 0;

  for (var y = 0; y < input.length; y++) {
    for (var x = 0; x < input[y].length; x++) {
      console.log([x, y]);

      if (input[y][x] !== ".") {
        continue;
      }

      var tempInput = replaceAt(input, "#", [x, y]);
      if (isLooping(tempInput)) {
        loopingCount++;
      }
    }
  }
  return loopingCount;
};

console.log(part2());

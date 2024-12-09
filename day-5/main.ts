import { readFileSync } from "fs";

const inputPath = "./day-5/input.txt";

const getInput = (): [number[][], number[][]] => {
  const inputString = readFileSync(inputPath).toString();

  const [pageOrderingString, pageUpdatesString] = inputString.split(/\n\r\n/);

  const pageOrdering = pageOrderingString
    .split("\r\n")
    .map((row) => row.split("|").map(Number));

  const pageUpdates = pageUpdatesString
    .split("\r\n")
    .map((row) => row.split(",").map(Number));

  return [pageOrdering, pageUpdates];
};

const isInCorrectOrder = (
  pageOrdering: number[][],
  pageUpdatesRow: number[]
) => {
  if (!pageUpdatesRow.length) {
    return true;
  }

  for (var i = 0; i < pageUpdatesRow.length; i++) {
    if (
      pageOrdering.some(
        ([first, second]) =>
          first === pageUpdatesRow[i] && second === pageUpdatesRow[0]
      )
    ) {
      return false;
    }
  }

  return isInCorrectOrder(pageOrdering, pageUpdatesRow.slice(1));
};

const areValuesInCorrectOrder = (
  first: number,
  second: number,
  pageOrdering: number[][]
): boolean => {
  return pageOrdering.some(([a, b]) => a === first && b === second);
};

const part1 = () => {
  const [pageOrdering, pageUpdates] = getInput();

  let correctOrderPageUpdates: number[][] = [];
  for (var i = 0; i < pageUpdates.length; i++) {
    if (isInCorrectOrder(pageOrdering, pageUpdates[i])) {
      correctOrderPageUpdates.push(pageUpdates[i]);
    }
  }

  return correctOrderPageUpdates
    .map((row) => row[Math.floor(row.length / 2)])
    .reduce((partialSum, a) => partialSum + a, 0);
};

const part2 = () => {
  const [pageOrdering, pageUpdates] = getInput();

  const reorderedPageUpdates: number[][] = [];
  for (var i = 0; i < pageUpdates.length; i++) {
    if (isInCorrectOrder(pageOrdering, pageUpdates[i])) {
      continue;
    }

    pageUpdates[i].sort((a, b) =>
      areValuesInCorrectOrder(a, b, pageOrdering) ? -1 : 1
    );
    reorderedPageUpdates.push(pageUpdates[i]);
  }

  return reorderedPageUpdates
    .map((row) => row[Math.floor(row.length / 2)])
    .reduce((partialSum, a) => partialSum + a, 0);
};

console.log(part2());

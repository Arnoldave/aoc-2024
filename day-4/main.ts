import { readFileSync } from "fs";

const inputPath = "./day-4/input.txt";

const getInput = (): string[] => {
  const inputString = readFileSync(inputPath).toString();
  return inputString.split("\r\n");
};

const matches = (
  word: string,
  x: number,
  y: number,
  changeX: (x: number) => number,
  changeY: (y: number) => number,
  input: string[]
): boolean => {
  if (!word.length) {
    return true;
  }

  if (x < 0 || x === input.length || y < 0 || y === input.length) {
    return false;
  }

  if (input[x][y] !== word[0]) {
    return false;
  }

  return matches(
    word.slice(1),
    changeX(x),
    changeY(y),
    changeX,
    changeY,
    input
  );
};

const getMatches = (
  word: string,
  x: number,
  y: number,
  input: string[]
): number => {
  const operations = [
    (n: number) => n - 1,
    (n: number) => n,
    (n: number) => n + 1,
  ];

  let matchCount = 0;
  for (var i in operations) {
    for (var j in operations) {
      if (matches(word, x, y, operations[i], operations[j], input)) {
        matchCount++;
      }
    }
  }

  return matchCount;
};

const matchesCross = (
  word: string,
  x: number,
  y: number,
  input: string[]
): boolean => {
  const decrement = (n: number) => n - 1;
  const increment = (n: number) => n + 1;

  const spokeLength = Math.floor(word.length / 2);

  return (
    (matches(
      word,
      x - spokeLength,
      y - spokeLength,
      increment,
      increment,
      input
    ) ||
      matches(
        word,
        x + spokeLength,
        y + spokeLength,
        decrement,
        decrement,
        input
      )) &&
    (matches(
      word,
      x + spokeLength,
      y - spokeLength,
      decrement,
      increment,
      input
    ) ||
      matches(
        word,
        x - spokeLength,
        y + spokeLength,
        increment,
        decrement,
        input
      ))
  );
};

const part1 = () => {
  const input = getInput();
  const searchWord = "XMAS";

  let matches = 0;
  for (var x = 0; x < input.length; x++) {
    for (var y = 0; y < input.length; y++) {
      matches += getMatches(searchWord, x, y, input);
    }
  }

  return matches;
};

const part2 = () => {
  const input = getInput();
  const searchWord = "MAS";

  let matches = 0;
  for (var x = 0; x < input.length; x++) {
    for (var y = 0; y < input.length; y++) {
      if (matchesCross(searchWord, x, y, input)) {
        matches++;
      }
    }
  }

  return matches;
};

console.log(part2());

import { readFileSync } from "fs";

const inputPath = "./day-7/input.txt";

const getInput = (): [number, number[]][] => {
  const inputString = readFileSync(inputPath).toString();
  return inputString.split("\r\n").map((row) => {
    const [result, valuesString] = row.split(": ");
    return [Number(result), valuesString.split(" ").map(Number)];
  });
};

const getBaseNNumberStringOfLength = (
  n: number,
  base: number,
  length: number
) => {
  var binaryNumberString = n.toString(base);
  const missingZeroCount = length - binaryNumberString.length;
  for (var i = 0; i < missingZeroCount; i++) {
    binaryNumberString = "0" + binaryNumberString;
  }

  return binaryNumberString;
};

const canGetResult = (
  [result, values]: [number, number[]],
  operations: ((a: number, b: number) => number)[]
) => {
  for (var i = 0; i < Math.pow(operations.length, values.length - 1); i++) {
    var baseNNumberString = getBaseNNumberStringOfLength(
      i,
      operations.length,
      values.length - 1
    );

    var currentResult = values.slice(1).reduce((a, b, index) => {
      const operationIndex = Number(baseNNumberString[index]);
      const operation = operations[operationIndex];
      return operation(a, b);
    }, values[0]);

    if (currentResult === result) {
      return true;
    }
  }

  return false;
};

const part1 = () => {
  const input = getInput();
  const operations = [
    (a: number, b: number) => a + b,
    (a: number, b: number) => a * b,
  ];

  let validResultsTotal = 0;
  for (var i = 0; i < input.length; i++) {
    if (canGetResult(input[i], operations)) {
      validResultsTotal += input[i][0];
    }
  }

  return validResultsTotal;
};

const part2 = () => {
  const input = getInput();
  const operations = [
    (a: number, b: number) => a + b,
    (a: number, b: number) => a * b,
    (a: number, b: number) => Number(`${a}${b}`),
  ];

  let validResultsTotal = 0;
  for (var i = 0; i < input.length; i++) {
    if (canGetResult(input[i], operations)) {
      validResultsTotal += input[i][0];
    }
  }

  return validResultsTotal;
};

console.log(part2());

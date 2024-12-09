import fs from "fs";

const getLists = () => {
  const firstList: number[] = [];
  const secondList: number[] = [];

  const inputString = fs.readFileSync("./day-1/input.txt").toString();
  var inputLines = inputString.split("\r\n").filter((x) => x);

  for (var i in inputLines) {
    const inputLine = inputLines[i];
    const [first, second] = inputLine.split(/[ ]+/);

    firstList.push(Number(first));
    secondList.push(Number(second));
  }

  return [firstList, secondList];
};

const part1 = () => {
  const [firstList, secondList] = getLists();

  firstList.sort();
  secondList.sort();

  let total = 0;
  for (var i in firstList) {
    total += Math.abs(firstList[i] - secondList[i]);
  }

  return total;
};

const part2 = () => {
  const [firstList, secondList] = getLists();

  var similarityScore = 0;
  for (var i in firstList) {
    const firstListItem = firstList[i];
    const secondListCount = secondList.filter(
      (x) => x === firstListItem
    ).length;

    similarityScore += firstListItem * secondListCount;
  }

  return similarityScore;
};

console.log(part1());
console.log(part2());

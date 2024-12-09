import fs from "fs";

const inputPath = "./day-2/input.txt";

const getReports = (): number[][] => {
  const inputString = fs.readFileSync(inputPath).toString();
  const reportStrings = inputString.split(/[\n]/);
  return reportStrings.map((reportString) =>
    reportString.split(/[ ]/).map((levelString) => Number(levelString))
  );
};

const isReportSafePart1 = (report: number[]): boolean => {
  let lastDifference = 0;
  for (let i = 1; i < report.length; i++) {
    const difference = report[i] - report[i - 1];

    if (difference === 0) {
      console.log(report, "no difference");
      return false;
    }

    if (Math.abs(difference) > 3) {
      console.log(report, "too big");
      return false;
    }

    if (lastDifference * difference < 0) {
      console.log(report, "direction changed");
      return false;
    }

    lastDifference = difference;
  }

  console.log(report, true);
  return true;
};

const isReportSafePart2 = (report: number[]): boolean => {
  if (isReportSafePart1(report)) {
    return true;
  }

  for (let i = 0; i < report.length; i++) {
    if (isReportSafePart1(report.filter((_, index) => index !== i))) {
      return true;
    }
  }

  return false;
};

const part1 = (): number => {
  const reports = getReports();
  return reports.filter(isReportSafePart1).length;
};

const part2 = (): number => {
  const reports = getReports();
  return reports.filter(isReportSafePart2).length;
};

console.log("Safe count:", part2());

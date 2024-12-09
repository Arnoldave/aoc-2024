import { readFileSync } from "fs";

const inputPath = "./day-8/input.txt";

const getInput = () => {
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

const addNode = (
  nodes: { [key: string]: [number, number][] },
  key: string,
  [x, y]: [number, number]
) => {
  if (!nodes[key]) {
    nodes[key] = [];
  }

  nodes[key].push([x, y]);
};

const getNodes = (input: string[]) => {
  const nodes: { [key: string]: [number, number][] } = {};
  for (var y = 0; y < input.length; y++) {
    for (var x = 0; x < input[y].length; x++) {
      if (input[y][x] !== ".") {
        addNode(nodes, input[y][x], [x, y]);
      }
    }
  }

  return nodes;
};

const getPart1AntiNodes = (nodePositions: [number, number][]) => {
  const antiNodes: [number, number][] = [];
  for (var i = 0; i < nodePositions.length; i++) {
    const [x1, y1] = nodePositions[i];
    for (var j = i + 1; j < nodePositions.length; j++) {
      const [x2, y2] = nodePositions[j];
      const [distanceX, distanceY] = [x1 - x2, y1 - y2];

      const [antiNode1X, antiNode1Y]: [number, number] = [
        x1 + distanceX,
        y1 + distanceY,
      ];
      if (!antiNodes.some(([x, y]) => x === antiNode1X && y === antiNode1Y)) {
        antiNodes.push([antiNode1X, antiNode1Y]);
      }

      const [antiNode2X, antiNode2Y]: [number, number] = [
        x2 - distanceX,
        y2 - distanceY,
      ];
      if (!antiNodes.some(([x, y]) => x === antiNode2X && y === antiNode2Y)) {
        antiNodes.push([antiNode2X, antiNode2Y]);
      }
    }
  }

  return antiNodes;
};

const getPart2AntiNodes = (
  nodePositions: [number, number][],
  input: string[]
) => {
  const antiNodes: [number, number][] = nodePositions.slice(0);
  for (var i = 0; i < nodePositions.length; i++) {
    const [x1, y1] = nodePositions[i];
    for (var j = i + 1; j < nodePositions.length; j++) {
      const [x2, y2] = nodePositions[j];
      const [distanceX, distanceY] = [x1 - x2, y1 - y2];

      let [antiNodeX, antiNodeY]: [number, number] = [
        x1 + distanceX,
        y1 + distanceY,
      ];
      while (!isOutOfBounds([antiNodeX, antiNodeY], input)) {
        if (!antiNodes.some(([x, y]) => x === antiNodeX && y === antiNodeY)) {
          antiNodes.push([antiNodeX, antiNodeY]);
        }
        [antiNodeX, antiNodeY] = [antiNodeX + distanceX, antiNodeY + distanceY];
      }

      [antiNodeX, antiNodeY] = [x2 - distanceX, y2 - distanceY];
      while (!isOutOfBounds([antiNodeX, antiNodeY], input)) {
        if (!antiNodes.some(([x, y]) => x === antiNodeX && y === antiNodeY)) {
          antiNodes.push([antiNodeX, antiNodeY]);
        }
        [antiNodeX, antiNodeY] = [antiNodeX - distanceX, antiNodeY - distanceY];
      }
    }
  }

  return antiNodes;
};

const getAllPart1AntiNodes = (nodes: { [key: string]: [number, number][] }) => {
  const allAntiNodes: [number, number][] = [];
  Object.values(nodes).forEach((nodePositions) => {
    const antiNodes = getPart1AntiNodes(nodePositions);
    antiNodes.forEach(([antiNodeX, antiNodeY]) => {
      if (!allAntiNodes.some(([x, y]) => x === antiNodeX && y === antiNodeY)) {
        allAntiNodes.push([antiNodeX, antiNodeY]);
      }
    });
  });

  return allAntiNodes;
};

const getAllPart2AntiNodes = (
  nodes: { [key: string]: [number, number][] },
  input: string[]
) => {
  const allAntiNodes: [number, number][] = [];
  Object.values(nodes).forEach((nodePositions) => {
    const antiNodes = getPart2AntiNodes(nodePositions, input);
    antiNodes.forEach(([antiNodeX, antiNodeY]) => {
      if (!allAntiNodes.some(([x, y]) => x === antiNodeX && y === antiNodeY)) {
        allAntiNodes.push([antiNodeX, antiNodeY]);
      }
    });
  });

  return allAntiNodes;
};

const replaceAt = (
  input: string[],
  replaceWith: string,
  [x, y]: [number, number]
) => {
  input[y] =
    input[y].substring(0, x) +
    replaceWith +
    input[y].substring(x + replaceWith.length);
};

const part1 = () => {
  const input = getInput();
  const nodes = getNodes(input);
  const antiNodes = getAllPart1AntiNodes(nodes).filter(
    (antiNode) => !isOutOfBounds(antiNode, input)
  );

  for (var i = 0; i < antiNodes.length; i++) {
    const [x, y] = antiNodes[i];
    if (input[y][x] === ".") {
      replaceAt(input, "#", [x, y]);
    }
  }

  console.log(input);
  return antiNodes.length;
};

const part2 = () => {
  const input = getInput();
  const nodes = getNodes(input);
  const antiNodes = getAllPart2AntiNodes(nodes, input);

  for (var i = 0; i < antiNodes.length; i++) {
    const [x, y] = antiNodes[i];
    if (input[y][x] === ".") {
      replaceAt(input, "#", [x, y]);
    }
  }

  console.log(input.join("\r\n"));
  return antiNodes.length;
};

console.log(part2());

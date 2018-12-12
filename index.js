const fs = require("fs");

function splitInstructions(instructions) {
  // splitting the file down into usable parts
  const splitInstructions = instructions.split("\n");
  return {
    roomDimensions: splitInstructions[0].split(" ").map(i => parseInt(i, 10)),
    startPosition: splitInstructions[1]
      .split(" ")
      .map(item => parseInt(item, 10)),
    dirtyLocations: splitInstructions
      .slice(2, -1)
      .map(item => item.split(" ").map(i => parseInt(i, 10))),
    movements: splitInstructions[splitInstructions.length - 1].split("")
  };
}

function moveRobot(currentPosition, direction, roomDimensions) {
  // moves robot by one movement and returns new position
  const [roomX, roomY] = roomDimensions;
  let [x, y] = currentPosition;
  if (direction === "N") {
    y = y + 1 > roomY ? roomY : y + 1; // keep the robot within the walls
    return [x, y];
  } else if (direction === "E") {
    x = x + 1 > roomX ? roomX : x + 1;
    return [x, y];
  } else if (direction === "S") {
    y = y - 1 < 0 ? 0 : y - 1;
    return [x, y];
  } else if (direction === "W") {
    x = x - 1 < 0 ? 0 : x - 1;
    return [x, y];
  }
}

function cleanRoom(instructionData) {
  const {
    roomDimensions,
    startPosition,
    dirtyLocations,
    movements
  } = splitInstructions(instructionData); // destructures returned object

  let dirtyToCleaned = dirtyLocations;
  let currentPosition = startPosition;
  for (let i = 0; i < movements.length; i++) {
    currentPosition = moveRobot(currentPosition, movements[i], roomDimensions);
    dirtyToCleaned = dirtyToCleaned.filter(
      item => item.join("-") !== currentPosition.join("-") // joining the arrays seemed like the easiest way of comparing
    );
  }
  const cleanedCount = dirtyLocations.length - dirtyToCleaned.length;
  return { finishLocation: currentPosition, cleanedCount: cleanedCount };
}

function readFile(filePath) {
  var options = { encoding: "utf-8", flag: "r" };
  var buffer = fs.readFileSync(filePath, options);
  return buffer;
}

const instructionData = readFile("index.txt");
const output = cleanRoom(instructionData);

console.log(output.finishLocation.join(" "));
console.log(output.cleanedCount);

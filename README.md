# tray.io cleaning-test

### How to run

This code should be run in a terminal on a machine with node.js installed.

With both files (index.js and index.txt) in the same directory run:
node index.js

### index.js will:

- Read the input data file (index.txt)
- Split the file (function:splitInstructions) into roomDimensions, startPosition, dirtyLocations, movements
- Move the robot around the room (function:moveRobot)
- Clean the room (function:cleanRoom) and keep track of where the dirt has been cleaned (array:dirtyToCleaned)
- Calculate how many locations have been cleaned

The output will be the finish location (line 1), followed by the amount of positions cleaned on the given route (line 2).

#### eg.

1 3
1

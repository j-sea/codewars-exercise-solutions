snail = function(array) {
  // Create a snail friend object that can move around on the given trail.
  // Note: Utilizes closure to hide variables and functions from being
  //   accessible on the snail friend object. Only an object "interface"
  //   is provided for public usage.
  const createNewSnailFriend = (trail) => {
    const EAST = Object.freeze([1, 0]);
    const SOUTH = Object.freeze([0, 1]);
    const WEST = Object.freeze([-1, 0]);
    const NORTH = Object.freeze([0, -1]);
    const TRAIL_WIDTH = trail[0].length;
    const TRAIL_HEIGHT = (TRAIL_WIDTH !== 0) ? trail.length : 0;

    const snailPath = [];
    const traveledTrail = (() => {
      const newTrail = Array(trail.length);
      for (let i = 0, iEnd = newTrail.length; i < iEnd; i++) {
        newTrail[i] = Array(trail[i].length).fill(false);
      }
      return newTrail;
    })();
    let trailX = -1;
    let trailY = -1;
    
    const testSnailMove = ([x, y], relative = true) => {
      const testX = (relative) ? trailX + x : x;
      const testY = (relative) ? trailY + y : y;
      return (
        testX >= 0
        && testX < TRAIL_WIDTH
        && testY >= 0
        && testY < TRAIL_HEIGHT
        && !traveledTrail[testY][testX]
      );
    };
    const moveSnail = (location, relative = true) => {
      if (testSnailMove(location, relative)) {
        const [x, y] = location;
        trailX = (relative) ? trailX + x : x;
        trailY = (relative) ? trailY + y : y;
        snailPath.push(trail[trailY][trailX]);
        traveledTrail[trailY][trailX] = true;
        return true;
      }
      return false;
    }
    const travelSnail = (direction) => {
      let traveled = false;
      while (moveSnail(direction)) {
        if (!traveled) {
          traveled = true;
        }
      }
      return traveled;
    }
    
    return {
      beginTravel: (x = 0, y = 0) => moveSnail([x, y], false),
      stepEast: () => moveSnail(EAST),
      stepSouth: () => moveSnail(SOUTH),
      stepWest: () => moveSnail(WEST),
      stepNorth: () => moveSnail(NORTH),
      travelEast: () => travelSnail(EAST),
      travelSouth: () => travelSnail(SOUTH),
      travelWest: () => travelSnail(WEST),
      travelNorth: () => travelSnail(NORTH),
      getSnailPath: () => [...snailPath], // Only provide a copy of the array; so the original cannot be mutated
    }
  };

  const snailFriend = createNewSnailFriend(array);

  snailFriend.beginTravel();

  // Note: Expects to be started from the top left item
  //   in the 2D trail, as instructed in the original
  //   exercise. The travel commands would need to be
  //   rewritten to fit other use cases.
  while (snailFriend.travelEast()
    && snailFriend.travelSouth()
    && snailFriend.travelWest()
    && snailFriend.travelNorth()
  );

  return snailFriend.getSnailPath();
}
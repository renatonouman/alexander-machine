import { useState, useEffect } from "react";

const initState = [...Array(10)].map((row = [...Array(10)]) =>
  row.map(() => Math.random() <= 0.5)
);

const findSiblingOn = (array, [y, x]) => {
  const above = array[y - 1] && array[y - 1][x];
  const right = array[y][x + 1];
  const below = array[y + 1] && array[y + 1][x];
  const left = array[y] && array[y][x - 1];

  return above || right || below || left;
};

function bulbToggler(prevBulb, scenario, array, coordinates) {
  const toggleChance = Math.random() <= 0.5;

  switch (scenario) {
    case "connected":
      if (findSiblingOn(array, coordinates)) return toggleChance;
      break;
    case "disconnected":
      if (!prevBulb) return toggleChance;
      break;
    case "random":
      return toggleChance;
    default:
      break;
  }
  return prevBulb;
}

function useGrid(scenario, running) {
  const [grid, setGrid] = useState(initState);

  useEffect(() => {
    let allBulbsOn = grid.flat().every((bulb) => bulb === true);
    let toggleInterval;

    const gridSetter = () => {
      return grid.map((row, y) =>
        row.map((bulb, x) => (bulb = bulbToggler(bulb, scenario, grid, [y, x])))
      );
    };

    if (running && !allBulbsOn) {
      toggleInterval = setInterval(() => {
        setGrid(gridSetter());
      }, 1000);
    }

    return () => clearInterval(toggleInterval);
  }, [grid, running, scenario]);

  return grid;
}

export default useGrid;

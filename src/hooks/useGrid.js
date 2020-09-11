import { useState, useEffect } from "react";

const findSiblingOn = (array, [y, x]) => {
  const above = array[y - 1] && array[y - 1][x];
  const right = array[y][x + 1];
  const below = array[y + 1] && array[y + 1][x];
  const left = array[y] && array[y][x - 1];

  return above || right || below || left;
};

function bulbToggler(prevBulb, scenario, array, coordinates) {
  const toggleChance = Math.random() <= 0.5;

  const connectedCondition =
    scenario === "connected" && findSiblingOn(array, coordinates);
  const disconnectedCondition = scenario === "disconnected" && !prevBulb;
  const randomCondition = scenario === "random";

  if (connectedCondition) return toggleChance;
  if (disconnectedCondition) return toggleChance;
  if (randomCondition) return toggleChance;
  else return prevBulb;
}

const initState = [...Array(10)].map((row = [...Array(10)]) =>
  row.map(() => Math.random() <= 0.5)
);

function useGrid(scenario, running) {
  const [grid, setGrid] = useState(initState);

  useEffect(() => {
    setGrid(initState);
  }, [scenario]);

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
      }, 100);
    }

    return () => clearInterval(toggleInterval);
  }, [grid, running, scenario]);

  return grid;
}

export default useGrid;

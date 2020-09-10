import { useState, useEffect } from "react";

function useGrid(scenario, running, toggleFunction, initialState) {
  const [grid, setGrid] = useState(initialState);
  let allBulbsOn = grid.every((bulb) => bulb.state === "on");

  useEffect(() => {
    allBulbsOn = false;
  }, [scenario]);

  useEffect(() => {
    let toggleInterval;

    if (running && !allBulbsOn) {
      toggleInterval = setInterval(() => {
        setGrid(
          grid.map((bulb) => ({
            ...bulb,
            state: toggleFunction(bulb, scenario, grid),
          }))
        );
      }, 1000);
    }

    return () => clearInterval(toggleInterval);
  }, [allBulbsOn, grid, running, scenario, toggleFunction]);

  return grid;
}

export default useGrid;

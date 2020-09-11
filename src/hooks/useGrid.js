import { useState, useEffect, useRef } from "react";

const initialState = [...Array(10)].reduce((grid, _, rowIndex, array) => {
  return grid.concat(
    array.map((_, itemIndex) => ({
      coordinates: [rowIndex, itemIndex],
      key: `${rowIndex}${itemIndex}`,
      siblings: {
        up: [rowIndex - 1, itemIndex],
        right: [rowIndex, itemIndex + 1],
        bottom: [rowIndex + 1, itemIndex],
        left: [rowIndex, itemIndex - 1],
      },
      state: Math.random() <= 0.5 ? "on" : "off",
    }))
  );
}, []);

function checkArrayEquality(arr1, arr2) {
  return arr1.every((value, index) => value === arr2[index]);
}

const findSiblingStateOn = (bulb, array) => {
  const siblings = array.filter(
    (item) =>
      checkArrayEquality(item.coordinates, bulb.siblings.up) ||
      checkArrayEquality(item.coordinates, bulb.siblings.right) ||
      checkArrayEquality(item.coordinates, bulb.siblings.bottom) ||
      checkArrayEquality(item.coordinates, bulb.siblings.left)
  );

  const isSiblingOn = siblings.some((sibling) => sibling.state === "on");

  return isSiblingOn;
};

function bulbToggler(prevState, scenario, array) {
  const toggleChance = Math.random() <= 0.5 ? "on" : "off";

  switch (scenario) {
    case "connected":
      if (findSiblingStateOn(prevState, array)) return toggleChance;
      break;
    case "disconnected":
      if (prevState.state !== "on") return toggleChance;
      break;
    case "random":
      return toggleChance;
    default:
      break;
  }
  return prevState.state;
}
function useGrid(scenario, running) {
  const [grid, setGrid] = useState(initialState);
  let allBulbsOn = useRef(grid.every((bulb) => bulb.state === "on"));

  useEffect(() => {
    allBulbsOn.current = false;
  }, [scenario]);

  useEffect(() => {
    let toggleInterval;

    if (running && !allBulbsOn.current) {
      toggleInterval = setInterval(() => {
        setGrid(
          grid.map((bulb) => ({
            ...bulb,
            state: bulbToggler(bulb, scenario, grid),
          }))
        );
      }, 1000);
    }

    return () => clearInterval(toggleInterval);
  }, [allBulbsOn, grid, running, scenario]);

  return grid;
}

export default useGrid;

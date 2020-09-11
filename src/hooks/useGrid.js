import { useState, useEffect, useRef } from "react";

const initState = [...Array(10)].map((row = [...Array(10)]) =>
  row.map(() => Math.random() <= 0.5)
);
console.log(initState);

//const initialState = [...Array(10)].reduce((grid, _, rowIndex, array) => {
//  return grid.concat(
//    array.map((_, itemIndex) => ({
//      coordinates: [rowIndex, itemIndex],
//      key: `${rowIndex}${itemIndex}`,
//      siblings: {
//        up: [rowIndex - 1, itemIndex],
//        right: [rowIndex, itemIndex + 1],
//        bottom: [rowIndex + 1, itemIndex],
//        left: [rowIndex, itemIndex - 1],
//      },
//      state: Math.random() <= 0.5 ? "on" : "off",
//    }))
//  );
//}, []);

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

function bulbToggler(prevBulb, scenario, array) {
  const toggleChance = Math.random() <= 0.5;

  console.log("hit");
  switch (scenario) {
    case "connected":
      if (findSiblingStateOn(prevBulb, array)) return toggleChance;
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

    if (running && !allBulbsOn) {
      toggleInterval = setInterval(() => {
        setGrid(
          grid.map((row) =>
            row.map((bulb) => (bulb = bulbToggler(bulb, scenario, grid)))
          )
        );
      }, 100);
    }

    return () => clearInterval(toggleInterval);
  }, [grid, running, scenario]);

  return grid;
}

export default useGrid;

import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';
import { Bulb } from '.';
import initialState from '../helpers/initialState';

const GridStyle = styled.div`
  margin: 0 auto;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(10, 36px);
  grid-template-rows: repeat(10, 36px);
  justify-content: center;
`;

const left = (bulb, array) => array.find((b) => bulb.x === b.x - 1 && bulb.y === b.y);
const right = (bulb, array) => array.find((b) => bulb.x === b.x && bulb.y === b.y + 1);
const below = (bulb, array) => array.find((b) => bulb.x === b.x + 1 && bulb.y === b.y);
const above = (bulb, array) => array.find((b) => bulb.x === b.x && bulb.y === b.y - 1);

const findSiblingStateOn = (bulb, array) => {
  const siblings = [above(bulb, array), right(bulb, array), below(bulb, array), left(bulb, array)];

  return siblings.some((sibling) => sibling && sibling.on);
};

function bulbToggler(prevBulb, scenario, array) {
  const toggleChance = Math.random() <= 0.5;

  switch (scenario) {
    case 'connected':
      if (findSiblingStateOn(prevBulb, array)) return toggleChance;
      break;
    case 'disconnected':
      if (!prevBulb.on) return toggleChance;
      break;
    case 'random':
      return toggleChance;
    default:
      break;
  }
}

function useGrid(scenario, running, initialState) {
  const [grid, setGrid] = useState(initialState);
  let allBulbsOn = useRef(grid.every((bulb) => bulb.on));

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
            on: bulbToggler(bulb, scenario, grid),
          }))
        );
      }, 100);
    }

    return () => clearInterval(toggleInterval);
  }, [allBulbsOn, grid, running, scenario]);

  return grid;
}

const Grid = ({ running, scenario }) => {
  const grid = useGrid(scenario, running, initialState);

  return (
    <GridStyle>
      {grid.map(({ on, x, y }) => (
        <Bulb key={`${x}${y}`} on={on} />
      ))}
    </GridStyle>
  );
};

export default Grid;

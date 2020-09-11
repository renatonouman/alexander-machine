import React from "react";
import styled from "styled-components";

import useGrid from "../hooks/useGrid";
import { Bulb } from "../components";

const GridWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(10, 36px);
  grid-template-rows: repeat(10, 36px);
  justify-content: center;
`;

function Grid({ scenario, running }) {
  const grid = useGrid(scenario, running);

  return (
    <GridWrapper>
      {grid.map((row, y) =>
        row.map((bulb, x) => <Bulb $on={bulb} key={`${x}${y}`} />)
      )}
    </GridWrapper>
  );
}

export default Grid;

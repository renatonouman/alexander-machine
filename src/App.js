import React from "react";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";

import { Bulb, Button, Container, Grid } from "./components";

// base ensemble
// -------------
//
// 100 lights
// each light can be in one of 2 states: on / off
// any light which is on has a 50/50 chance of going off in the next second
// the system reach equilibrium and stops once all lights are off.
// how long would it take for the system to reach equilibrium?
//
// first scenario
// Connections are contructed so any light which is off has a 50/50 chance to go on in the next second, provided it is connected to a light the is on
// If the light is not connected to a light that is on it has no change of going on.
// If ever happens that al lights are off, then all lights stay off forever.
//
//
// second scenario
// there are no interconnections between lights.
// when a light goes off, it stays off forever.
//
//
// third scenario
// Lights can turn on or off as long as there is a single light on.
//

// 100 lightbulbs
//

// const bulbMachine = Machine({
//   id: "bulb",
//   initial: "flow",
//   states: {
//     flow: {
//       on: {
//         TOGGLE: {
//           target: "equilibrium",
//         },
//       },
//     },
//     equilibrium: {
//       type: "final",
//     },
//   },
// });

const App = () => {
  const [scenario, setScenario] = React.useState("connected");
  //  const [state, send] = useMachine(bulbMachine);

  const line = (lineIndex) =>
    [...Array(10)].reduce((line, _, index) => {
      line.push({
        coordinates: [lineIndex, index],
        state: Math.random() * 100 <= 10 ? "on" : "off",
        siblings: {
          up: [lineIndex - 1, index],
          right: [lineIndex, index + 1],
          bottom: [lineIndex + 1, index],
          left: [lineIndex, index - 1],
        },
      });
      return line;
    }, []);

  const grid = [...Array(10)].reduce((grid, _, index) => {
    grid.push(line(index));
    return grid;
  }, []);

  console.log(grid);
  console.log(grid[grid[3][6].siblings.up[0]][grid[3][6].siblings.up[1]]);
  return (
    <Container>
      <Button.Container>
        <Button
          type="button"
          onClick={() => setScenario("connected")}
          active={scenario === "connected"}
        >
          Connected
        </Button>
        <Button
          type="button"
          onClick={() => setScenario("disconnected")}
          active={scenario === "disconnected"}
        >
          Disconnected
        </Button>
        <Button
          type="button"
          onClick={() => setScenario("random")}
          active={scenario === "random"}
        >
          Random
        </Button>
      </Button.Container>
      <Grid>{grid.map((line) => line.map((bulb) => <Bulb {...bulb} />))}</Grid>
    </Container>
  );
};

export default App;

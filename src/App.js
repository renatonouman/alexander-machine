import React from "react";
// import { useMachine } from "@xstate/react";
// import { Machine } from "xstate";

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
//       // siblings: {
//       //   up: [lineIndex - 1, index],
//       //   right: [lineIndex, index + 1],
//       //   bottom: [lineIndex + 1, index],
//       //   left: [lineIndex, index - 1],
//       // },

const initialState = [...Array(10)].reduce((grid, _, rowIndex, array) => {
  return grid.concat(
    array.map((_, itemIndex) => ({
      coordinates: [rowIndex, itemIndex],
      key: `${rowIndex}${itemIndex}`,
      state: Math.random() * 100 <= 50 ? "on" : "off",
    }))
  );
}, []);

function bulbToggler(prevState, scenario) {
  console.log(prevState);
  if (scenario === "connected") {
    return null;
  }
  if (scenario === "disconnected") {
    if (prevState === "on") {
      return prevState;
    }
    return Math.random() * 100 <= 50 ? "on" : "off";
  }
  if (scenario === "random") {
    return Math.random() * 100 <= 50 ? "on" : "off";
  }
}

function reducer(state, action) {
  if (action.type === "toggle") {
    return state.reduce((newState, value) => {
      return newState.concat({
        ...value,
        state: bulbToggler(value.state, action.scenario),
      });
    }, []);
  }
  return state;
}

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [scenario, setScenario] = React.useState("connected");

  React.useEffect(() => {
    const toggleInterval = setInterval(() => {
      dispatch({ type: "toggle", scenario: scenario });
    }, 1000);
    return () => clearInterval(toggleInterval);
  }, [scenario]);

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
      <Grid>
        {state.map((bulb) => (
          <Bulb {...bulb} />
        ))}
      </Grid>
    </Container>
  );
};

export default App;

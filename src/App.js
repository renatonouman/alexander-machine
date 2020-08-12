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
      siblings: {
        up: [rowIndex - 1, itemIndex],
        right: [rowIndex, itemIndex + 1],
        bottom: [rowIndex + 1, itemIndex],
        left: [rowIndex, itemIndex - 1],
      },
      state: Math.random() * 100 <= 50 ? "on" : "off",
    }))
  );
}, []);

function bulbToggler(prevState, scenario, array) {
  const hasSiblingOff = Boolean(
    (array[(prevState.siblings.up[0], prevState.siblings.up[1])] &&
      array[(prevState.siblings.up[0], prevState.siblings.up[1])].state) ===
      "on" ||
      (array[(prevState.siblings.right[0], prevState.siblings.right[1])] &&
        array[(prevState.siblings.right[0], prevState.siblings.right[1])]
          .state) === "on" ||
      (array[(prevState.siblings.bottom[0], prevState.siblings.bottom[1])] &&
        array[(prevState.siblings.bottom[0], prevState.siblings.bottom[1])]
          .state) === "on" ||
      (array[(prevState.siblings.left[0], prevState.siblings.left[1])] &&
        array[(prevState.siblings.left[0], prevState.siblings.left[1])]
          .state) === "on"
  );
  if (scenario === "connected" && hasSiblingOff) {
    return Math.random() * 100 <= 50 ? "on" : "off";
  }
  if (scenario === "disconnected" && prevState.state !== "on") {
    return Math.random() * 100 <= 50 ? "on" : "off";
  }
  if (scenario === "random") {
    return Math.random() * 100 <= 50 ? "on" : "off";
  }
  return prevState.state;
}

function reducer(state, action) {
  if (action.type === "toggle") {
    return state.reduce((newState, value, _, array) => {
      return newState.concat({
        ...value,
        state: bulbToggler(value, action.scenario, array),
      });
    }, []);
  }
  return state;
}

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [scenario, setScenario] = React.useState("connected");

  // console.log(state);
  React.useEffect(() => {
    const toggleInterval = setInterval(() => {
      dispatch({ type: "toggle", scenario: scenario });
    }, 1000);
    return () => clearInterval(toggleInterval);
  }, [scenario]);

  return (
    <Container>
      <Button.Container>
        <button
          type="button"
          onClick={() => dispatch({ type: "toggle", scenario: "disconnected" })}
        >
          Dispatch
        </button>
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

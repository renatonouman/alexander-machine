import React from "react";

import { Bulb, Button, Container, Grid } from "./components";
import useGrid from "./hooks/useGrid";
import initialState from "./helpers/initialState";
import bulbToggler from "./helpers/bulbToggler";

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

// TODOS:
// - Add explainer text
// - Fix single action reducer
// - Decouple code from framework. Turn useEffect into pure functions.

// NOTES"
// - Coupled code is harder to test.
//
//

const App = () => {
  const [scenario, setScenario] = React.useState("connected");
  const [running, setRunning] = React.useState(false);
  const grid = useGrid(scenario, running, bulbToggler, initialState);

  // const [lapse, setLapse] = React.useState(0);

  //  React.useEffect(() => {
  //    setLapse(Date.now());
  //    dispatch({ type: "toggle", scenario: scenario });
  //    setRunning(true);
  //  }, [scenario]);
  //
  const handleClick = (id) => {
    setRunning(true);
    setScenario(id);
    if (scenario === id && running) {
      setRunning(false);
    }
  };

  return (
    <Container>
      <Button.Container>
        <button onClick={() => setRunning(!running)}>Run</button>
        <Button
          onClick={() => handleClick("connected")}
          active={scenario === "connected"}
        >
          Connected
        </Button>
        <Button
          onClick={() => handleClick("disconnected")}
          active={scenario === "disconnected"}
        >
          Disconnected
        </Button>
        <Button
          onClick={() => handleClick("random")}
          active={scenario === "random"}
        >
          Random
        </Button>
      </Button.Container>
      <Grid>
        {grid.map((bulb) => (
          <Bulb {...bulb} />
        ))}
      </Grid>
    </Container>
  );
};

export default App;

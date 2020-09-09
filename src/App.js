import React from "react";

import { Bulb, Button, Container, Grid } from "./components";
import useGrid from "./hooks/useGrid";
import initialState from "./helpers/initialState";
import bulbToggler from "./helpers/bulbToggler";

const App = () => {
  const [scenario, setScenario] = React.useState("");
  const [running, setRunning] = React.useState(false);
  const grid = useGrid(scenario, running, bulbToggler, initialState);

  const scenarios = ["connected", "disconnected", "random"];

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
        {scenarios.map((each) => (
          <Button
            key={each}
            onClick={() => handleClick(each)}
            active={scenario === each}
            children={each}
          />
        ))}
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

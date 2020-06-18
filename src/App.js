import React from "react";

import { Bulb, Button, Container, Grid } from "./components";

const App = () => {
  const [scenario, setScenario] = React.useState("connected");

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
      <Grid
        children={[...Array(100)].map((_, i) => (
          <Bulb id={i} scenario={scenario} />
        ))}
      />
    </Container>
  );
};

export default App;

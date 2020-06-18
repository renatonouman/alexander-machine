import React from "react";

import { Bulb, Container, Grid } from "./components";

const App = () => {
  const [scenario, setScenario] = React.useState("connected");
  return (
    <Container>
      <button type="button" onClick={() => setScenario("connected")}>
        Connected
      </button>
      <button type="button" onClick={() => setScenario("unilateral")}>
        Unilateral
      </button>
      <button type="button" onClick={() => setScenario("random")}>
        Random
      </button>
      <Grid
        children={[...Array(100)].map((_, i) => (
          <Bulb id={i} scenario={scenario} />
        ))}
      />
    </Container>
  );
};

export default App;

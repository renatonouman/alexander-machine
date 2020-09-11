import React from "react";

import { Container, Grid, Header } from "./components";

const App = () => {
  const [scenario, setScenario] = React.useState("");
  const [running, setRunning] = React.useState(false);

  const handleClick = (id) => {
    setRunning(true);
    setScenario(scenario === id ? "" : id);
    if (scenario === id && running) {
      setRunning(false);
    }
  };

  return (
    <Container>
      <Header scenario={scenario} handleClick={handleClick} />
      <Grid scenario={scenario} running={running} />
    </Container>
  );
};

export default App;

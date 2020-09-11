import React from "react";

import { Button, Container, Grid, Header, Paragraph } from "./components";
import DESCRIPTION from "./constants/DESCRIPTION";

const App = () => {
  const [scenario, setScenario] = React.useState("");
  const [running, setRunning] = React.useState(false);

  const scenarios = ["connected", "disconnected", "random"];

  const handleClick = (id) => {
    setRunning(true);
    setScenario(scenario === id ? "" : id);
    if (scenario === id && running) {
      setRunning(false);
    }
  };

  return (
    <Container>
      <Header>
        <h1>alexander-machine.</h1>
        <Paragraph>{DESCRIPTION}</Paragraph>
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
      </Header>
      <Grid scenario={scenario} running={running} />
    </Container>
  );
};

export default App;

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
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ maxWidth: "600px", marginBottom: "240px" }}>
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?"
        </p>

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
      </div>
      <Grid>
        {grid.map((bulb) => (
          <Bulb {...bulb} />
        ))}
      </Grid>
    </Container>
  );
};

export default App;

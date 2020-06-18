import React from "react";

import { Bulb, Container, Grid } from "./components";

const App = () => (
  <Container>
    <Grid
      children={[...Array(100)].map((_, i) => (
        <Bulb id={i} />
      ))}
    />
  </Container>
);

export default App;

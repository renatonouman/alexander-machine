import React from "react";

import { Bulb, Container, Grid } from "./components";

const App = () => (
  <Container>
    <Grid children={[...Array(100)].map(Bulb)} />
  </Container>
);

export default App;

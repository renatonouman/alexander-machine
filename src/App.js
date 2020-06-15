import React from "react";
import styled from "styled-components";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";

const Grid = styled.div`
  margin: 0 auto;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(10, 36px);
  grid-template-rows: repeat(10, 36px);
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Bulb = styled.div`
  border: 1px solid ${({ lit }) => (lit ? "white" : "black")};
  background-color: ${({ lit }) => (lit ? "black" : "white")};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-flex;
`;

const bulbMachine = Machine({
  id: "bulb",
  initial: "lit",
  context: {
    lock: false,
  },
  states: {
    lit: {
      on: {
        TOGGLE: {
          target: "unlit",
          cond: (context) => !context.lock,
        },
      },
    },
    unlit: {
      on: {
        TOGGLE: {
          target: "lit",
          cond: (context) => !context.lock,
        },
      },
    },
  },
});

function App() {
  const [state, send] = useMachine(bulbMachine);

  console.log(state, send);

  return (
    <Grid>
      {[...Array(100)].map(() => (
        <Bulb lit={false} />
      ))}
    </Grid>
  );
}

export default App;

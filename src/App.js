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

const BulbElement = styled.div`
  border: 1px solid ${({ state }) => (state === "lit" ? "white" : "black")};
  background-color: ${({ state }) => (state === "lit" ? "black" : "white")};
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
    locked: {},
    unlocked: {},
  },
});

const Bulb = () => {
  const [state, send] = useMachine(bulbMachine);

  const toggle = () => (Math.random() * 100 <= 50 ? send("TOGGLE") : null);

  // setInterval(() => toggle(), 1000);

  return <BulbElement state={state.value} />;
};

function App() {
  return (
    <Grid>
      {[...Array(100)].map(() => (
        <Bulb />
      ))}
    </Grid>
  );
}

export default App;

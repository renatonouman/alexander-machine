import React from "react";
import styled from "styled-components";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";

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

const Bulb = (props) => {
  const [state, send] = useMachine(bulbMachine);

  const getSibling = (id, magicNum) => {
    const sibling = document.getElementById((id + magicNum).toString());
    return sibling && sibling.dataset.state;
  };

  React.useEffect(() => {
    const siblings = {
      up: getSibling(props.id, -11),
      right: getSibling(props.id, 1),
      down: getSibling(props.id, 11),
      left: getSibling(props.id, -1),
    };
    console.log(siblings);
  }, [props.id, state.value]);

  // const toggle = () => (Math.random() * 100 <= 50 ? send("TOGGLE") : null);

  // setInterval(() => toggle(), 1000);

  return (
    <BulbElement id={props.id} data-state={state.value} state={state.value} />
  );
};

export default Bulb;

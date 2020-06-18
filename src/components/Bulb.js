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
  initial: "unilateral",
  context: {
    retries: 0,
  },
  states: {
    connected: {
      initial: "lit",
      context: {
        locked: false,
      },
      on: {
        SWITCH: "unilateral",
      },
      states: {
        lit: {
          on: {
            TOGGLE: {
              target: "unlit",
              cond: (context) => !context.locked,
            },
          },
        },
        unlit: {
          on: {
            TOGGLE: {
              target: "lit",
              cond: (context) => !context.locked,
            },
          },
        },
      },
    },
    unilateral: {
      initial: "lit",
      on: {
        SWITCH: "random",
      },
      states: {
        lit: {
          on: {
            TOGGLE: {
              target: "unlit",
              cond: (context) => !context.locked,
            },
          },
        },
        unlit: {
          on: {
            TOGGLE: {
              target: "lit",
              cond: (context) => !context.locked,
            },
          },
        },
      },
    },
    random: {
      initial: "lit",
      on: {
        SWITCH: "connected",
      },
      states: {
        lit: {
          on: {
            TOGGLE: {
              target: "unlit",
              cond: (context) => !context.locked,
            },
          },
        },
        unlit: {
          on: {
            TOGGLE: {
              target: "lit",
              cond: (context) => !context.locked,
            },
          },
        },
      },
    },
  },
});

const Bulb = (props) => {
  const [state, send] = useMachine(bulbMachine);

  console.log(state.value);
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

  React.useEffect(() => {
    console.log("Changed scenario");
    bulbMachine.transition(props.scenario, "SWITCH");
  }, [props.scenario]);

  // const toggle = () => (Math.random() * 100 <= 50 ? send("TOGGLE") : null);

  // setInterval(() => toggle(), 1000);

  return (
    <BulbElement
      id={props.id}
      data-state={state.value}
      state={state.value[props.scenario]}
    />
  );
};

export default Bulb;

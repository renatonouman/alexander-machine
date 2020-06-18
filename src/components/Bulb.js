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
const bulbMachine = Machine(
  {
    id: "bulb",
    initial: "connected",
    context: {
      retries: 0,
    },
    states: {
      connected: {
        initial: "unlit",
        context: {
          locked: false,
        },
        on: {
          SWITCH: {
            target: "unilateral",
            actions: ["unlock"],
          },
        },
        states: {
          lit: {
            type: "final",
          },
          unlit: {
            on: {
              TOGGLE: {
                target: "lit",
              },
            },
          },
        },
      },
      unilateral: {
        initial: "unlit",
        on: {
          SWITCH: {
            target: "random",
            actions: ["unlock"],
          },
        },
        states: {
          lit: {
            type: "final",
          },
          unlit: {
            on: {
              TOGGLE: {
                target: "lit",
              },
            },
          },
        },
      },
      random: {
        initial: "unlit",
        on: {
          SWITCH: {
            target: "connected",
            actions: ["unlock"],
          },
        },
        states: {
          lit: {
            on: {
              TOGGLE: {
                target: "unlit",
                cond: "isUnlocked",
              },
            },
          },
          unlit: {
            on: {
              TOGGLE: {
                target: "lit",
                cond: "isUnlocked",
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      lock: (context) => (context.locked = true),
      unlock: (context) => (context.locked = false),
    },
    guards: {
      isUnlocked: (context) => !context.locked,
    },
  }
);

const Bulb = (props) => {
  const [state, send] = useMachine(bulbMachine);

  const getSibling = (id, magicNum) => {
    const sibling = document.getElementById((id + magicNum).toString());
    return sibling && sibling.dataset.state;
  };

  const toggle = React.useCallback(() => {
    return Math.random() * 100 <= 50 ? send("TOGGLE") : null;
  }, [send]);

  React.useEffect(() => {
    const siblings = {
      up: getSibling(props.id, -11),
      right: getSibling(props.id, 1),
      down: getSibling(props.id, 11),
      left: getSibling(props.id, -1),
    };

    if (!Object.keys(state.value).includes(props.scenario)) {
      send("SWITCH");
    }

    if (props.scenario === "connected") {
      toggle();

      if (Object.values(siblings).includes("lit")) {
        setInterval(() => toggle(), 10);
      }
    }

    if (props.scenario === "unilateral") {
      setInterval(() => toggle(), 1000);
    }
  }, [
    props.id,
    props.scenario,
    send,
    state,
    state.initial,
    state.value,
    toggle,
  ]);

  console.log(props.scenario, state.value);

  return (
    <BulbElement
      id={props.id}
      data-state={state.value[props.scenario]}
      state={state.value[props.scenario]}
    />
  );
};

export default Bulb;

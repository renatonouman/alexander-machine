import React from "react";
import styled from "styled-components";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";

const BulbElement = styled.div`
  border: 1px solid ${({ state }) => (state === "on" ? "white" : "black")};
  background-color: ${({ state }) => (state === "on" ? "black" : "white")};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-flex;
`;
//const bulbMachine = Machine({
//  id: "bulb",
//  initial: "unlit",
//  states: {
//    lit: {
//      on: {
//        TOGGLE: {
//          target: "unlit",
//        },
//      },
//    },
//    unlit: {
//      on: {
//        TOGGLE: {
//          target: "lit",
//        },
//      },
//    },
//  },
//});

const Bulb = (props) => {
  //  const [state, send] = useMachine(bulbMachine);

  console.log(props);

  //  const getSibling = (id, magicNum) => {
  //    const sibling = document.getElementById((id + magicNum).toString());
  //    return sibling && sibling.dataset.state;
  //  };
  //
  //  const initialToggle = React.useCallback(() => {
  //    Math.random() * 100 <= 10 && send("TOGGLE");
  //  }, [send]);
  //
  //  const toggle = React.useCallback(
  //    (id) => {
  //      const chance = Math.random() * 100 <= 50;

  //      const siblings = {
  //        up: getSibling(id, -11),
  //        right: getSibling(id, 1),
  //        down: getSibling(id, 11),
  //        left: getSibling(id, -1),
  //      };

  //      const RANDOM_CHANCE = props.scenario === "random" && chance;
  //      const DISCONNECTED_CHANCE =
  //        props.scenario === "disconnected" && state.value !== "lit" && chance;
  //      const CONNECTED_CHANCE =
  //        props.scenario === "connected" &&
  //        Object.values(siblings).includes("lit") &&
  //        chance;

  //      if (RANDOM_CHANCE) {
  //        send("TOGGLE");
  //      } else if (DISCONNECTED_CHANCE) {
  //        send("TOGGLE");
  //      } else if (CONNECTED_CHANCE) {
  //        send("TOGGLE");
  //      }
  //    },
  //    [props.scenario, send, state.value]
  //  );

  //  React.useLayoutEffect(() => {
  //    initialToggle();
  //    const interval = setInterval(() => toggle(props.id), 1000);
  //
  //    return () => clearInterval(interval);
  //  }, [initialToggle, props.id, props.scenario, send, state.value, toggle]);
  //
  return <BulbElement id={props.id} state={props.state} />;
};

export default Bulb;

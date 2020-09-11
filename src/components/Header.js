import React from "react";
import styled from "styled-components";

import { Paragraph, Button } from ".";
import DESCRIPTION from "../constants/DESCRIPTION";

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = ({ scenario, handleClick }) => (
  <HeaderWrapper>
    <h1>alexander-machine.</h1>
    <Paragraph>{DESCRIPTION}</Paragraph>
    <Button.Container>
      <Button
        onClick={() => handleClick("connected")}
        active={scenario === "connected"}
      >
        connected
      </Button>
      <Button
        onClick={() => handleClick("disconnected")}
        active={scenario === "disconnected"}
      >
        disconnected
      </Button>
      <Button
        onClick={() => handleClick("random")}
        active={scenario === "random"}
      >
        random
      </Button>
    </Button.Container>
  </HeaderWrapper>
);

export default Header;

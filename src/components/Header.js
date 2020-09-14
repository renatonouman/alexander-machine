import React from "react";
import styled from "styled-components";

import logo from "../assets/am-logo.svg";
import DESCRIPTION from "../constants/DESCRIPTION";
import { Paragraph, Button } from ".";

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img.attrs({ src: logo, alt: "Alexander Machine logo" })`
  width: 150px;
`;

const Header = ({ scenario, handleClick }) => (
  <HeaderWrapper>
    <Logo />
    <h3>alexander-machine.</h3>
    <Paragraph dangerouslySetInnerHTML={{ __html: DESCRIPTION }} />
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

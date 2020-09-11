import styled from "styled-components";

const Bulb = styled.div`
  border: 1px solid ${({ $on }) => ($on ? "white" : "black")};
  background-color: ${({ $on }) => ($on ? "black" : "white")};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-flex;
`;

export default Bulb;

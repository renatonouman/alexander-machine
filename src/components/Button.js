import styled from "styled-components";

const Button = styled.button`
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 3px;
  margin: 0 8px;
  outline: none;

  ${({ active }) =>
    active &&
    `
      background-color: black;
      color: white;
  `}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

Button.Container = ButtonContainer;

export default Button;

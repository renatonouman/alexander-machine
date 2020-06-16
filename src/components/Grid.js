import styled from "styled-components";

const Grid = styled.div`
  margin: 0 auto;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(10, 36px);
  grid-template-rows: repeat(10, 36px);
  justify-content: center;
`;

export default Grid;

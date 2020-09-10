const initialState = [...Array(10)].reduce((grid, _, rowIndex, array) => {
  return grid.concat(
    array.map((_, itemIndex) => ({
      x: rowIndex,
      y: itemIndex,
      on: Math.random() <= 0.5,
    }))
  );
}, []);

export default initialState;

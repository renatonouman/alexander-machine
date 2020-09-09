const initialState = [...Array(10)].reduce((grid, _, rowIndex, array) => {
  return grid.concat(
    array.map((_, itemIndex) => ({
      coordinates: [rowIndex, itemIndex],
      key: `${rowIndex}${itemIndex}`,
      siblings: {
        up: [rowIndex - 1, itemIndex],
        right: [rowIndex, itemIndex + 1],
        bottom: [rowIndex + 1, itemIndex],
        left: [rowIndex, itemIndex - 1],
      },
      state: Math.random() <= 0.5 ? "on" : "off",
    }))
  );
}, []);

export default initialState;

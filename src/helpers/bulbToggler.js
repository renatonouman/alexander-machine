function checkArrayEquality(arr1, arr2) {
  return arr1.every((value, index) => value === arr2[index]);
}

function bulbToggler(prevState, scenario, array) {
  const toggleChance = Math.random() <= 0.5 ? "on" : "off";

  const findSiblingStateOn = (bulb, array) => {
    const siblings = array.filter(
      (item) =>
        checkArrayEquality(item.coordinates, bulb.siblings.up) ||
        checkArrayEquality(item.coordinates, bulb.siblings.right) ||
        checkArrayEquality(item.coordinates, bulb.siblings.bottom) ||
        checkArrayEquality(item.coordinates, bulb.siblings.left)
    );

    const isSiblingOn = siblings.some((sibling) => sibling.state === "on");

    return isSiblingOn;
  };

  switch (scenario) {
    case "connected":
      if (findSiblingStateOn(prevState, array)) return toggleChance;
      break;
    case "disconnected":
      if (prevState.state !== "on") return toggleChance;
      break;
    case "random":
      return toggleChance;
    default:
      break;
  }
  return prevState.state;
}

export default bulbToggler;


export const convertDMSStringToDecimal = (coordinate) => {
  if (!coordinate) return null;

  // Extract numeric value and direction
  const match = coordinate.match(/^([\d.]+)°?([NSEW])$/);
  if (!match) return null;

  // eslint-disable-next-line no-unused-vars
  let [_, value, direction] = match;
  let decimal = parseFloat(value);

  // Apply negative sign for S and W
  if (direction === 'S' || direction === 'W') {
    decimal *= -1;
  }

  return decimal;
};

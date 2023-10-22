const stringToNumber = (value: string | string[] | undefined): number => {
  return isNaN(Number(value)) ? 0 : Number(value);
};

export default stringToNumber;

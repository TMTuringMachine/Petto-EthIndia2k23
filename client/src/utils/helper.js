export const formatMetamaskAddress = (address) => {
  return `${address.slice(0, 5)}...${address.slice(
    address.length - 5,
    address.length,
  )}`;
};

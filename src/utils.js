/* eslint-disable no-unused-vars */
// eslint-disable-next-line consistent-return
const countObjectProperties = (obj) => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length;
  }
  return 0;
};

export default countObjectProperties;

import { errorMessages } from '../constants/errorMessages';

export const getErrorMessage = (error) => {
  error = error.split(':')[0];
  const code = error.match(/\d+/gm)[0];
  console.log(error.match(/\d+/gm));
  console.log(code);
  return `${error}: ` + errorMessages[code];
};

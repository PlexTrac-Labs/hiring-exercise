// Check string for an upper and lowercase letter
export const containsUpperAndLowercase = text => {
  return new RegExp(/^(?=.*[a-z])(?=.*[A-Z]).*$/).test(text);
};

// Check string to see if it contains a number
export const containsNumber = text => {
  return new RegExp(/^(?=.*\d).*$/).test(text);
};

// Check string to see if it contains any of the special characters -+_!@#$%^&*.,?
export const containsSpecialChar = text => {
  return new RegExp(/^(?=.*[-+_!@#$%^&*.,?]).*$/).test(text);
};

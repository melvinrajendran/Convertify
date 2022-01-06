/**
 * Parses the URL's hash parameters.
 * @returns {object} an object containing the parameters as key/value pairs
 */
export const getHashParameters = () => {
  const parameters = {};

  window.location.hash
    .substring(1)
    .split("&")
    .forEach((parameter) => {
      const key = parameter.split("=")[0],
        value = parameter.split("=")[1];
      parameters[key] = value;
    });

  return parameters;
};

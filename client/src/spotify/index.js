// Import Axios
import axios from "axios";

/**
 * SPOTIFY ACCESS TOKENS AND REFRESH TOKENS
 */

// The expiration time of an access token in milliseconds
const EXPIRATION_TIME = 3600 * 1000;

/**
 * Gets an access token from the window's local storage.
 * @returns {string} the local access token
 */
const getLocalAccessToken = () => window.localStorage.getItem("spotify_access_token");

/**
 * Sets the access token in the window's local storage.
 * @param {string} token the access token to be stored locally
 */
const setLocalAccessToken = (token) => {
  // Store the timestamp at which the token was stored locally
  setTokenTimestamp();
  window.localStorage.setItem("spotify_access_token", token);
};

/**
 * Gets a refresh token from the window's local storage.
 * @returns {string} the local refresh token
 */
const getLocalRefreshToken = () => window.localStorage.getItem("spotify_refresh_token");

/**
 * Sets the refresh token in the window's local storage.
 * @param {string} token the refresh token to be stored locally
 */
const setLocalRefreshToken = (token) => window.localStorage.setItem("spotify_refresh_token", token);

/**
 * Gets the time at which the local access token was brought into existence.
 * @returns {number} the local access token's timestamp
 */
const getTokenTimestamp = () => window.localStorage.getItem("spotify_token_timestamp");

/**
 * Sets the local access token's timestamp to the current time.
 */
const setTokenTimestamp = () => window.localStorage.setItem("spotify_token_timestamp", Date.now());

/**
 * Parses the URL's hash parameters.
 * @returns {object} an object containing the parameters as key/value pairs
 */
const getHashParameters = () => {
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

/**
 * Refreshes the local access token.
 */
const refreshAccessToken = async () => {
  try {
    // Perform a GET request to /refresh_token
    const { data } = await axios.get("/refresh_token?refresh_token=" + getLocalRefreshToken());
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
};

/**
 * Gets an access token to make API requests to the Spotify Web API from the browser. Called on application initialization.
 * @returns {string} an access token
 */
export const getAccessToken = () => {
  // Gets any error(s), an access token, and a refresh token from the URL's hash parameters
  const { error, access_token, refresh_token } = getHashParameters();

  // Handle any error(s)
  if (error) {
    console.log(error);
    refreshAccessToken();
  }

  // Handle an expired access token
  if (getTokenTimestamp() && Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn("Access token has expired, refreshing...");
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();

  // Store the tokens locally if they are not already
  if ((!localAccessToken || localAccessToken === "undefined") && access_token) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    // Return "access_token" from the URL hash parameters
    return access_token;
  }

  // Return the local access token if it already exists
  return localAccessToken;
};

export const token = getAccessToken();

/**
 * Log out the current user.
 */
export const logOut = () => {
  // Remove all data stored in the window's local storage
  window.localStorage.removeItem("spotify_access_token");
  window.localStorage.removeItem("spotify_refresh_token");
  window.localStorage.removeItem("spotify_token_timestamp");
};

/**
 * SPOTIFY WEB API REQUESTS
 * https://developer.spotify.com/documentation/web-api/reference/#/
 */

// HTTP headers to be used in all requests
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json"
};

/**
 * Gets the current user's profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
export const getUser = () => axios.get("https://api.spotify.com/v1/me", { headers });
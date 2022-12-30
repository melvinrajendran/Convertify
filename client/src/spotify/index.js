import axios from "axios";
import { getHashParameters } from "../utilities";

/**
 * SPOTIFY WEB API AUTHORIZATION
 * https://developer.spotify.com/documentation/general/guides/authorization/
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
  // Store the timestamp at which the token is stored locally
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
 * Refreshes the local access token.
 */
const refreshAccessToken = () => {
  // Perform a GET request to /refresh_token
  axios.get(`/refresh_token?refresh_token="${getLocalRefreshToken()}`)
    .then((response) => {
      const { data } = response;
      const { access_token } = data;
      setLocalAccessToken(access_token);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Gets an access token to make requests to the Spotify Web API from the browser. Called on application initialization.
 * @returns {string} an access token
 */
const getAccessToken = () => {
  // Gets any error(s), an access token, and a refresh token from the URL's hash parameters
  const { error, access_token, refresh_token } = getHashParameters();

  // Handle any error(s)
  if (error) {
    console.log(error);
    refreshAccessToken();
  }

  // Handle an expired access token
  if (getTokenTimestamp() && getTokenTimestamp() !== "undefined" && Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();

  // Store the tokens locally if they are not already
  if ((!localAccessToken || localAccessToken === "undefined") && access_token) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);

    // Return the access token from the URL hash parameters
    return access_token;
  }

  // Return the local access token if it already exists
  return localAccessToken;
};

export const token = getAccessToken();

/**
 * Logs out the current user.
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

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json"
};

/**
 * Gets the current user's profile.
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile
 */
export const getProfile = () => axios.get("https://api.spotify.com/v1/me", { headers });

/**
 * Gets the current user's followed artists.
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-followed
 */
export const getFollowedArtists = () => axios.get("https://api.spotify.com/v1/me/following?type=artist&limit=50", { headers });

/**
 * Gets the current user's playlists.
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists
 */
export const getPlaylists = () => axios.get("https://api.spotify.com/v1/me/playlists?limit=50", { headers });

/**
 * Gets the current user's Convertify profile.
 */
export const getConvertifyProfile = () => {
  return axios.all([getProfile(), getFollowedArtists(), getPlaylists()]).then(
    axios.spread((user, followedArtists, playlists) => ({
      user: user.data,
      followedArtists: followedArtists.data,
      playlists: playlists.data
    }))
  );
}

/**
 * Gets a specific playlist of the current user
 * @param {string} playlistId the ID of the playlist
 *
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist
 */
export const getPlaylist = (playlistId) => axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });

export const getDataByUrl = (url) => axios.get(url, { headers });

export const createPlaylist = (userId, name) => {
  const body = { name };
  return axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, body, { headers });
};

export const addTracksToPlaylist = (playlistId, uris) => {
  const body = { uris };
  return axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, body, { headers });
};

export const searchForTrack = (name, artist, album) => {
  return axios.get(`https://api.spotify.com/v1/search?q=${encodeURI(`${name} artist:${artist} album:${album}`)}&type=track&limit=50`, { headers });
};

export const convertPlaylist = (userId, playlistName, playlistItems, toClean) => {
  const uris = [];
  const promises = [];
  playlistItems.forEach((item) => {
    if (item.track.explicit) {
      promises.push(
        searchForTrack(item.track.name, item.track.artists[0].name, item.track.album.name).then((response) => {
          let tracks = response.data.tracks.items;
          tracks = tracks.filter(track => !track.explicit && track.name === item.track.name);
          if (tracks.length) {
            uris.push(tracks[0].uri);
          }
        })
      );
    } else {
      uris.push(item.track.uri);
    }
  });

  axios.all(promises).then(() => {
    if (uris.length) {
      createPlaylist(userId, `${playlistName} ${toClean ? `(Clean)` : `(Explicit)`}`).then((response) => {
        const newPlaylistId = response.data.id;
        addTracksToPlaylist(newPlaylistId, uris);
      });
    } else {
      // playlist could not be converted
    }
  });
};
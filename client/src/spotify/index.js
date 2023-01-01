import axios from "axios";
import { getHashParameters } from "../utilities";

/**
 * TODO
 *
 * Update UI to be meaningful
 * toasts for conversion
 * 404
 * remove switch if unnecessary
 * Fuzzy search?
 * optimize API requests w query params
 * work for other users -------- SUBMIT QUOTA EXTENSION ON DASHBOARD
 */

/**
 * SPOTIFY WEB API AUTHORIZATION
 * 
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
  axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`)
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
 * 
 * https://developer.spotify.com/documentation/web-api/reference/#/
 */

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json"
};

/**
 * Gets the data at a URL endpoint.
 * @param {string} url an endpoint
 */
export const getDataByUrl = (url) => axios.get(url, { headers });

/**
 * Gets the current user's profile.
 * 
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile
 */
export const getProfile = () => axios.get("https://api.spotify.com/v1/me", { headers });

/**
 * Gets the current user's followed artists.
 * 
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-followed
 */
export const getFollowedArtists = () => axios.get("https://api.spotify.com/v1/me/following?type=artist&limit=50", { headers });

/**
 * Gets the current user's playlists.
 * 
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists
 */
export const getPlaylists = () => axios.get("https://api.spotify.com/v1/me/playlists?limit=50", { headers });

/**
 * Gets the current user's Convertify profile.
 */
export const getConvertifyProfile = () => {
  return axios.all([getProfile(), getFollowedArtists(), getPlaylists()])
    .then(
      axios.spread(async (profile, followedArtists, playlists) => {
        // Chain GET requests to get all of the current user's playlists
        const playlistArr = [];
        let nextUrl = playlists.data.href;
        do {
          const nextPlaylists = await getDataByUrl(nextUrl);
          playlistArr.push(...nextPlaylists.data.items);
          nextUrl = nextPlaylists.data.next;
        } while (nextUrl !== null);

        return {
          profile: profile.data,
          followedArtists: followedArtists.data.artists.total,
          playlists: playlistArr
        };
      })
    )
    .catch((error) => {
      console.log(error);
    });
}

/**
 * Gets a specific playlist of the current user.
 * @param {string} playlistId the ID of the playlist
 * 
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist
 */
export const getPlaylist = (playlistId) => axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });

/**
 * Gets the items of a specific playlist.
 * @param {string} playlistId the ID of the playlist
 * 
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlists-tracks
 */
export const getPlaylistItems = (playlistId) => axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { headers });

/**
 * Gets the data to render the current user's playlist's converter.
 * @param {string} playlistId the ID of the playlist
 */
export const getPlaylistConverter = (playlistId) => {
  return axios.all([getProfile(), getPlaylist(playlistId), getPlaylistItems(playlistId)])
    .then(
      axios.spread(async (user, playlist, items) => {
        // Chain GET requests to get all of the playlist's tracks
        const itemArr = [];
        let nextUrl = items.data.href;
        do {
          const nextItems = await getDataByUrl(nextUrl);
          itemArr.push(...nextItems.data.items);
          nextUrl = nextItems.data.next;
        } while (nextUrl !== null);

        return {
          user: user.data,
          playlist: playlist.data,
          items: itemArr
        }
      })
    )
    .catch((error) => {
      console.log(error);
    })
}

/**
 * Searches for tracks that match a keyword string.
 * @param {string} name the track's name
 * @param {string} artist the track's artist
 * 
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/search
 */
export const searchForTracks = (name, artist) => axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(`${name} artist:${artist}`)}&type=track&limit=50`, { headers });

/**
 * Creates a playlist for a user.
 * @param {string} userId the ID of the user
 * @param {string} name the name of the playlist
 * 
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/create-playlist
 */
export const createPlaylist = (userId, name, description) => {
  const body = { name, description };
  return axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, body, { headers });
};

/**
 * Adds one or more items to a playlist.
 * @param {string} playlistId the ID of the playlist
 * @param {string} uris an array of Spotify URIs to add
 * 
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/add-tracks-to-playlist
 */
export const addItemsToPlaylist = (playlistId, uris) => {
  const body = { uris };
  return axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, body, { headers });
};

/**
 * Converts a playlist's tracks from explicit to clean (or vice versa).
 * @param {string} userId the ID of the user
 * @param {string} name the name of the playlist
 * @param {string} items the items in the playlist
 * @param {boolean} toClean the type to which the tracks will be converted
 * @returns {string} the ID of the converted playlist
 */
export const convertPlaylist = (userId, name, items, toClean) => {
  const uris = [];
  const promises = [];

  items.forEach((item) => {
    if ((toClean && item.track.explicit) || (!toClean && !item.track.explicit)) {
      promises.push(
        searchForTracks(item.track.name, item.track.artists[0].name)
          .then((response) => {
            let tracks = response.data.tracks.items;
            tracks = tracks.filter(track => track.explicit === !toClean && track.name === item.track.name);
            if (tracks.length) {
              uris.push(tracks[0].uri);
            } else if (!toClean) {
              uris.push(item.track.uri);
            }
          })
          .catch((error) => {
            console.log(error);
          })
      );
    } else {
      uris.push(item.track.uri);
    }
  });

  axios.all(promises)
    .then(() => {
      if (uris.length) {
        createPlaylist(userId, `${name} ${toClean ? `(Clean)` : `(Explicit)`}`, "This playlist was created using Convertify.")
          .then((response) => {
            const newPlaylistId = response.data.id;
            while (uris.length) {
              addItemsToPlaylist(newPlaylistId, uris.splice(0, 100));
            }

            return newPlaylistId;
          });

        // generate success toast
      } else {
        // playlist could not be converted -- generate failure toast

        return null;
      }
    })
    .catch((error) => {
      console.log(error);
    })
};

/**
 * Gets the data to render the current user's converted playlist.
 * @param {string} playlistId the ID of the playlist
 */
export const getConvertedPlaylist = (playlistId) => {
  return getPlaylistItems(playlistId)
    .then(async (response) => {
      // Chain GET requests to get all of the playlist's tracks
      const itemArr = [];
      let nextUrl = response.data.href;
      do {
        const nextItems = await getDataByUrl(nextUrl);
        itemArr.push(...nextItems.data.items);
        nextUrl = nextItems.data.next;
      } while (nextUrl !== null);

      return itemArr;
    })
    .catch((error) => {
      console.log(error);
    });
}
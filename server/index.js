/**
 * Spotify Web API Authorization Code Flow
 * https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
 */

require("dotenv").config();
const express = require("express");
const path = require("path");
const request = require("request");

const app = express();

// Initialize environment variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const PORT = process.env.PORT;

/**
 * Generates a random string containing numbers and letters.
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let result = "";

  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return result;
};

app.get("/", function (req, res) {
  res.render(path.resolve(__dirname, "../client/build/index.html"));
});

// Request user authorization
app.get("/login", function (req, res) {
  const state = generateRandomString(16);
  const scope = "user-read-private user-follow-read playlist-modify-private playlist-read-collaborative user-read-email playlist-read-private playlist-modify-public";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
      }).toString()
  );
});

// Request an access token
app.get("/callback", function (req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        new URLSearchParams({
          error: "state_mismatch"
        }).toString()
    );
  } else {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization: "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64")
      },
      json: true
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        // Pass the tokens to the browser to make API requests from there
        res.redirect(
          `${FRONTEND_URI}/#${new URLSearchParams({
            access_token,
            refresh_token
          }).toString()}`
        );
      } else {
        res.redirect("/#" + new URLSearchParams({ error: "invalid_token" }).toString());
      }
    });
  }
});

// Request a refreshed access token
app.get("/refresh_token", function (req, res) {
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: { Authorization: "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64") },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({ access_token: access_token });
    }
  });
});

// Handle all remaining requests within the React app
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/public", "index.html"));
});

// Listen on the port specified above
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

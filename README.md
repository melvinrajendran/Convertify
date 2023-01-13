# Convertify

<img width="1440" alt="Convertify" src="https://user-images.githubusercontent.com/44681827/211125867-bac28990-6035-42c3-bb0f-daed324bb358.png">

Convertify is a web application that enables Spotify users to easily convert their playlists between explicit and clean. The application is built using the Spotify Web API, which grants read/write access to users' profile information and playlists upon authentication. In addition, it uses an Express server to handle API requests and serve the files for the front-end, which uses React, responsive React Bootstrap components, and React Router for client-side routing.

## Background

This application was created to solve a problem that I often encountered during my time as a tutor for elementary and middle school students. I wanted to play my playlists while ensuring that all tracks were clean, but the filter in Spotify's mobile application only skipped (and still skips) all explicit tracks rather than searching for and playing their corresponding clean versions. This functionality is exactly what Convertify provides, and it is especially convenient for parents, teachers, DJs, and more who want to enjoy their favorite music while ensuring that it is clean.

## Features

* Can convert playlists to explicit or clean
* Can delete converted playlists
* Familiar Spotify user interface
* Retains login information between sessions using cookies

## Screenshots

### Logging In

<img width="1440" alt="Convertify-Login" src="https://user-images.githubusercontent.com/44681827/211128044-54bd4278-d7a3-4ced-88ed-d68f4fdcb3e7.png">

### Your Profile

<img width="1440" alt="Convertify-Profile" src="https://user-images.githubusercontent.com/44681827/211128049-4470dbfe-2d4f-42b2-9f09-f3e07713db98.png">

### The Playlist Converter

<img width="1440" alt="Convertify-Playlist-Converter" src="https://user-images.githubusercontent.com/44681827/211128061-ca7d5676-48fd-4db0-a276-007dffa90f7f.png">

### Converting a Playlist

<img width="1440" alt="Convertify-Converted-Playlist" src="https://user-images.githubusercontent.com/44681827/211128083-db95ebae-b316-4042-b972-47e150faa101.png">

### Deleting the Converted Playlist

<img width="1440" alt="Convertify-Deleted-Converted-Playlist" src="https://user-images.githubusercontent.com/44681827/211128093-1518b780-2f9c-4acb-b20d-51a95bef6c0d.png">

## Working with Convertify Locally

The Express server and React application must be run separately:
* Use the command `npm start` in the project's root directory to run the Express server.
* Use the command `npm start` in the project's client directory to run the React application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Available Scripts

In the project directory, you can run:

##### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

##### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

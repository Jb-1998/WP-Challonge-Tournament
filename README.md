# Challonge Tournament Platform

This project is called "Battle Of The Fans" platform. It is based on the Challonge API which allows the platform to create tournaments, add participants and start matches. Currently the game allows to create a tournament for limited number of game such as League of Legends Wild Rift, Valorant and DOTA. Small and community based tournaments can utilized the platform for their events and manage all participants who will be joining for the competitions.

## About Challonge 

Challonge, a Logitech Company, is a competition management technology that helps organizers streamline registration, progression and record keeping. Founded in 2009, Challonge offers more that 25 competition types as both a web-based software-as-a-service (SaaS) platform and as an API that can be integrated into websites, games, bots andother software applications.

## Challonge API

If you'd like to learn more on how to integrate the Challonge API to your system, please refer to this documentation.
[Challonge API](https://api.challonge.com/v1).

# Getting Started with the Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app and the proxy server in local development mode which allows the client to interact with Challonge API without any CORS related issues encountered.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**Note: You can view all API used by the application inside the index of server directory**
Proxy Server will run on [http://localhost:3001]

### `yarn server`

Runs only the server for local development testing of API. You can test all the API using postman to validate all response object coming for each request. 
Server will run on [http://localhost:3001]

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

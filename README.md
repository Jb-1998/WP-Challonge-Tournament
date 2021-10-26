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

## Setup and Install

### Clone the remote repository

You can clone the project using the this command `git clone https://github.com/Jb-1998/WP-Challonge-Tournament.git` to your local machine so that you can have access to all project files and codebase.

### Install all dependencies 

After the repository has been clone, you should install all the dependencies first from the package.json file. This is important so that the application will run based on the libary used for the project. Go to your root directory from your bash or command line and run `yarn install` command to install all dependencies.

### Create an .env file in the root directory of the project

Once all the dependencies has been installed. Create a .env file where we will store the API we will be using to create tournaments and other transactions with Challonge.com. If you don't have API, you can create an account to [Challonge.com](https://challonge.com/) and go to settings, then developers API tab, then generate an API Key. Once you have your API generated, copy the api and paste it on the .env file. Follow this format for creating an API_KEY variable inside your .env configuration`(e.g. API_KEY=yourapikey)`.

### Run the Application

Once all the requirements has been setup run the command `yarn dev` from your terminal and will run the server first at port 3001 then the web application first will automatically open on your browser at http://localhost:3000. 

**Note: Please note that after the server run, it will take a few seconds before the actual web application displays on your browser and run on http://localhost:300. **

### Happy Testing

If you have any questions or concerns about the project, please email me at jbstaromana.jbsr@gmail.com. Happy Testing.


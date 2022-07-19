# Website

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator. Development must be done from `website` folder.

## Installation

```console
npm install
```

## Local Development

To run in local, you should have a valid algolia search api key.
Create a .env file and add it in to get it started. You can follow the example in .env.example file.

_Note:_ Please ask around the team for OA documentation algolia search api key.

Once you have the api key, you will be able to run the following command:

```console
npm run start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.


## Env

For env variables, check with any of the devs.

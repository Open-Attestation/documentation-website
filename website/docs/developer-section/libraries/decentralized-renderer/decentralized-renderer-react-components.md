---
id: decentralized-renderer-react-components
title: React Components
sidebar_label: React Components
---

React components abstracting the communication with `Open Attestation` decentralized renderer. More information on this:

- [Opencerts v2 announcement](https://docs.opencerts.io/announcements/schema2_update.html)
- [Open Attestation](https://openattestation.com/)

## Features

- [**React**](http://reactjs.org/) - A JavaScript library for building user interfaces.
- [**Webpack**](https://webpack.js.org/) - Component bundler.
- [**React testing library**](https://testing-library.com/) - Simple and complete testing utilities that encourage good testing practices.
- [**Jest**](https://facebook.github.io/jest) - JavaScript testing framework used by Facebook.
- [**ESLint**](http://eslint.org/) - Make sure you are writing a quality code.
- [**Prettier**](https://prettier.io/) - Enforces a consistent style by parsing your code and re-printing it.
- [**Typescript**](https://www.typescriptlang.org/) - JavaScript superset, providing optional static typing
- [**Circle CI**](https://circleci.com/) - Automate tests and linting for every push or pull request.
- [**Storybook**](https://storybook.js.org/) - Tool for developing UI components in isolation with documentation.
- [**Semantic Release**](https://semantic-release.gitbook.io/semantic-release/) - Fully automated version management and package publishing.
- [**Debug**](https://github.com/visionmedia/debug) - JS debugging utility that works both in node.js and browsers.

## How it works

To begin with, makes sure you read the initial introduction and explanation about [decentralized renderer](https://docs.opencerts.io/docs/migrations/v1_to_v2)

In order to render a document, hosts will load the corresponding decentralized renderer (as specified by the document) and embed it using an iframe. Communication between host and iframe is made using [postMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) and has been designed using actions.

## Actions API

All actions follow the same structure and are composed of `type` and `payload`

- `type` indicates the kind of action being executed, for instance `RENDER_DOCUMENT` to render a document. The type of an action is _mandatory_
- `payload` indicates optional data associated to the type, for instance the content of the document to render.

Example:

```javascript
const renderDocumentAction = {
  type: "RENDER_DOCUMENT",
  payload: {
    document: documentToRender,
  },
};

const printAction = {
  type: "PRINT",
};
```

### From host to frame actions

The following list of actions are made for host to communicate to the iframe (and thus must be handled by application embed in the iframe):

- render a document:
  - type: `RENDER_DOCUMENT`
  - payload: object with 2 properties
    - document: (mandatory) document data as returned by `getData` method from [@govtechsg/open-attestation](https://github.com/Open-Attestation/open-attestation)
    - rawDocument: (optional) Open Attestation document

```javascript
const action = {
  type: "RENDER_DOCUMENT",
  payload: {
    document: getData(document),
    rawDocument: document,
  },
};
```

- select a template amongst the one provided by the decentralized renderer (A renderer may provide 1 to many different template to display a document):
  - type: "SELECT_TEMPLATE"
  - payload: (mandatory) template id to display

```javascript
const action = {
  type: "SELECT_TEMPLATE",
  payload: "CUSTOM_TEMPLATE",
};
```

- request for printing a document
  - type: "PRINT"

```javascript
const action = {
  type: "PRINT",
};
```

There is a 4th action that can be used in the context of react-native application (which doesn't use iframe under the hood)

- request for the list of templates for a document. The action directly return the list of templates
  - type: `GET_TEMPLATES`
  - payload: (mandatory) document data as returned by `getData` method from [@govtechsg/open-attestation](https://github.com/Open-Attestation/open-attestation)

```javascript
const action = {
  type: "GET_TEMPLATES",
  payload: getData(document),
};
```

### From frame to host actions

The following list of actions are made for iframe to communicate to the host (and thus must be handled by application embedding the iframe):

- provide the full content height of the iframe so that the host can adapt the automatically the size of the embedded iframe.
  - type: "UPDATE_HEIGHT"
  - payload: (mandatory) full content height of the iframe

```javascript
const action = {
  type: "UPDATE_HEIGHT",
  payload: 150,
};
```

- provide the name of a field on the document to obfuscate. The value must follow path property as handled by [lodash#get](https://lodash.com/docs/4.17.15#get)
  - type: "OBFUSCATE"
  - payload: (mandatory) path to the field

```javascript
const action = {
  type: "OBFUSCATE",
  payload: "a[0].b.c",
};
```

- provide the list of templates that can be used to render a document
  - type: "UPDATE_TEMPLATES"
  - payload: (mandatory) an array where each element is an object composed of a string and a label

```javascript
const action = {
  type: "UPDATE_TEMPLATES",
  payload: [
    {
      id: "certificate",
      label: "Certificate",
    },
    {
      id: "transcript",
      label: "Transcript",
    },
  ],
};
```

## How to use

The library provide 2 mains components

### FrameConnector

This component will create a frame and establish a connection with the provided decentralized renderer. Properties are:

- `source`: url to the decentralized renderer that will handle the document to display
- `dispatch`: function listening for actions triggered by the decentralized renderer
- `onConnected`: function called when the connection to the decentralized renderer has been established. The function will be provided as first parameter another which can be used to send actions to the iframe

Please check the code in `example/application` to see how to use this component. You can also start the example application using the command `npm run example:application`

### FramedDocumentRenderer

This component will establish a connection with a host embedding the application within an iframe. Properties are:

- `templateRegistry`: the configuration of the templates handled by the decentralized renderer. `templateRegistry` is an object where each key hold an array of `Template Configuration`. One `Template Configuration` consist of :
  - id: a unique (withing the current array) identifier of the template
  - label: a string to represent what's the template is,
  - template: a `Template`, that is to say a react component that will render a document
- `attachmentToComponent`: a function that map attachments to component depending on the attachment type. Currently the library exposes 2 functions:
  - `noAttachmentRenderer`: which uses `UnsupportedRenderer` (basically it's doing nothing)
  - `fullAttachmentRenderer`: which uses all the supported attachment type by the library (see the function).
    This property default to `noAttachmentRenderer`, to avoid bundles growing huge unnecessarily.

`FramedDocumentRenderer` handle all the logic around the communication with the hosted application and the renderer:

- it will automatically call `UPDATE_HEIGHT` action, when the iframe is resized or when there is a change within the iframe (using [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver))
- it will automatically call the `Template` to render depending on information provided by the host
- it will automatically provide the available templates when a document has been requested for rendering (i.e. it will call `UPDATE_TEMPLATES` action once the document has been renderer)
- it will automatically call `OBFUSCATE` action when requested by a `Template`

Please check the code in `example/decentralized-renderer` to see how to use this component. You can also start the example application using the command `npm run example:renderer`

#### Template (React component)

Each configured `Template` will be provided the following properties, when rendering a document:

- `document`: (mandatory) document data as returned by `getData` method from [@govtechsg/open-attestation](https://github.com/Open-Attestation/open-attestation)
- `rawDocument`: (optional) Open Attestation document
- `handleObfuscation`: (mandatory) A function to call to handle obfuscation in the document. The value provided must follow path property as handlded by [lodash#get](https://lodash.com/docs/4.17.15#get)

## Development

- `npm run storybook`: to start storybook, create stories and visualize the different component
- `npm run test`: to run tests
- `npm run lint`: to run lint
- `npm run example:application`: to run the example build with the library to develop an hosting application. Don't forget to update the example if you update this library.
- `npm run example:renderer`: to run the example build with the library to develop a decentralized renderer. Don't forget to update the example if you update this library.

We also provided a [github template](https://github.com/Open-Attestation/decentralized-renderer-react-template) to build your own decentralized-renderer based on this library

## Penpal

There is compatibility [issues](https://github.com/Aaronius/penpal/issues/52) between penpal version ^5 and ^4. In the event that penpal version ^4 must be used, use this version [4.1.1](https://github.com/Aaronius/penpal/releases/tag/v4.1.1)

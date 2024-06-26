---
id: decentralized-renderer-react-components
title: React components for decentralized renderer
hide_title: true
sidebar_label: React components for decentralized renderer
---

# React Components

[React components](https://github.com/Open-Attestation/decentralized-renderer-react-components) are used for abstracting the communication with OpenAttestation decentralized renderer. See more information below:

- [OpenCerts V2 announcement](https://docs.opencerts.io/docs/migrations/v1_to_v2#announcements)
- [OpenAttestation](https://openattestation.com/)
<!-- TODO: Add V4 / Svg support announcement -->

## Features

- [**Debug**](https://github.com/visionmedia/debug) - A JS debugging utility that works in both node.js and browsers
- [**ESLint**](http://eslint.org/) - With this tool, you write quality code.
- [**Jest**](https://jestjs.io/) - A JavaScript testing framework used by Facebook
- [**Prettier**](https://prettier.io/) - It enforces a consistent style by parsing your code and re-printing it.
- [**React**](http://reactjs.org/) - A JavaScript library for building user interfaces
- [**React testing library**](https://testing-library.com/) - Simple and complete testing utilities that encourage good testing practices
- [**TypeScript**](https://www.typescriptlang.org/) - A JavaScript superset that provides optional static typing
- [**Semantic Release**](https://semantic-release.gitbook.io/semantic-release/) - A fully automated version management and package publishing tool
- [**Storybook**](https://storybook.js.org/) - A tool for developing UI components in isolation with documentation
- [**Webpack**](https://webpack.js.org/) - A component bundler

## Installation

<!--Flag: The "Installation" section was added based on similar steps in the "react-template" readme.-->

To install the React components for the decentralized renderer, download or `git clone` [this repository](https://github.com/Open-Attestation/decentralized-renderer-react-components):

```sh
$ git clone https://github.com/Open-Attestation/decentralized-renderer-react-components.git my-components
$ cd my-components
$ rm -rf .git
$ npm install
```

Be sure to edit the following files according to your module information:

- `package.json` (module name and version)
- `README.md`
- `LICENSE`
- Add your own template (in the `src` folder) and configure the template registry (in the `src/index.tsx` file).
<!--Flag: The folder and file names above need confirmation.-->

## How it works

> [!TIP]  
> OpenAttestation now supports SVG rendering. Click [here](#svg-rendering) for more info.

To begin with, be sure to read the initial introduction and explanation about the [decentralized renderer](https://docs.opencerts.io/docs/migrations/v1_to_v2).

To render a document, hosts will load the corresponding decentralized renderer (as the document specifies) and embed it using an iframe. Communication between the host and iframe is achieved using the [postMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) and has been designed using actions.

## Actions API

All actions follow the same structure. They are composed of `type` and `payload`:

- `type` indicates the kind of action being executed, for instance, `RENDER_DOCUMENT` means rendering a document. The type of an action is _mandatory_.
- `payload` indicates optional data associated to the type, for instance, the content of the document to render.

The following is a code example:

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

The following shows a list of actions made for the host to communicate to the iframe, and thus must be handled by the application embedded in the iframe:

- Render a document:

  - type: `RENDER_DOCUMENT`
  - payload: An object with two properties
    - document: (mandatory) document data as returned by `getData` method from [@govtechsg/open-attestation](https://github.com/Open-Attestation/open-attestation)
    - rawDocument: (optional) OpenAttestation document

  The following is a code example:

```javascript
const action = {
  type: "RENDER_DOCUMENT",
  payload: {
    document: getData(document),
    rawDocument: document,
  },
};
```

- Select a template among those provided by the decentralized renderer (A renderer may provide one to many different templates to display a document):

  - type: `SELECT_TEMPLATE`
  - payload: (mandatory) The template ID to display

  The following is a code example:

```javascript
const action = {
  type: "SELECT_TEMPLATE",
  payload: "CUSTOM_TEMPLATE",
};
```

- Request for printing a document

  - type: `PRINT`

  The following is a code example:

```javascript
const action = {
  type: "PRINT",
};
```

There is a fourth action that can be used in the context of React Native application (which doesn't use iframe under the hood)

- Request for the list of templates for a document. The action directly returns the list of templates

  - type: `GET_TEMPLATES`
  - payload: (mandatory) document data as returned by the `getData` method from [@govtechsg/open-attestation](https://github.com/Open-Attestation/open-attestation)

  The following is a code example:

```javascript
const action = {
  type: "GET_TEMPLATES",
  payload: getData(document),
};
```

### From frame to host actions

The following shows a list of actions made for the iframe to communicate to the host (and thus must be handled by the application which embeds the iframe):

- Provide the full content height of the iframe, so that the host can adapt automatically to the embedded iframe size.

  - type: `UPDATE_HEIGHT`
  - payload: (mandatory) full content height of the iframe

  The following is a code example:

```javascript
const action = {
  type: "UPDATE_HEIGHT",
  payload: 150,
};
```

- Provide the name of a field on the document to obfuscate. The value must follow the path property as handled by [lodash#get](https://lodash.com/docs/4.17.15#get)

  - type: `OBFUSCATE`
  - payload: (mandatory) path to the field

  The following is a code example:

```javascript
const action = {
  type: "OBFUSCATE",
  payload: "a[0].b.c",
};
```

- Provide the list of templates that can be used to render a document

  - type: `UPDATE_TEMPLATES`
  - payload: (mandatory) an array where each element is an object composed of a string and a label

  The following is a code example:

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

## Usage

The library provide two mains components, including `FrameConnector` and `FramedDocumentRenderer`.

### FrameConnector

This component will create a frame and establish a connection with the provided decentralized renderer. Its properties include:

- `source`: url to the decentralized renderer that will handle the document to display
- `dispatch`: function listening for actions triggered by the decentralized renderer
- `onConnected`: function called when the connection to the decentralized renderer has been established. The function will be provided as first parameter another which can be used to send actions to the iframe
- `onConnectionFailure`: optional property that accepts a function. In the event of a connection failure / timeout, the default renderer will display an error message. If this optional property is defined along with the document, the raw document will be displayed.

Please check the code in `example/application` to see how to use this component. You can also start the example application using the command `npm run example:application`

### FramedDocumentRenderer

This component will establish a connection with a host embedding the application within an iframe. Its properties include:

- `templateRegistry`: The configuration of the templates handled by the decentralized renderer. `templateRegistry` is an object where each key holds an array of `Template Configuration`.

  One `Template Configuration` consists of:

  - `id`: A unique identifier within the current array of the template
  - `label`: A string to represent what the template is (used when verifiers display tabs)
  - `template`: A `Template`, i.e. a React component that will render a document

- `attachmentToComponent`: A function that maps attachments to the component depending on the attachment type.

  Currently the library exposes two functions:

  1. `noAttachmentRenderer`: Uses `UnsupportedRenderer`
  1. `fullAttachmentRenderer`: Uses all the supported attachment types by the library (see the function).

     This property defaults to `noAttachmentRenderer` to avoid the bundles from growing unnecessarily huge.

`FramedDocumentRenderer` handles all the logic around the communication with the hosted application and the renderer:

- It will automatically call the `UPDATE_HEIGHT` action, when the iframe is resized or when there is a change within the iframe (using [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)).
- It will automatically call the `Template` to render the document, depending on the information provided by the host.
- It will automatically provide the available templates when a document has been requested for rendering (i.e. it will call the `UPDATE_TEMPLATES` action once the document has been rendered).
- it will automatically call the `OBFUSCATE` action when it is requested by a `Template`.

You need to check the code in `example/decentralized-renderer` to see how to use this component. You can also start the example application using the command `npm run example:renderer`

#### Template (React component)

When a document is being rendered, each configured `Template` will be provided with the following properties:

- `document`: (mandatory) Document data as returned by the `getData` method from [@govtechsg/open-attestation](https://github.com/Open-Attestation/open-attestation)
- `rawDocument`: (optional) OpenAttestation document
- `handleObfuscation`: (mandatory) A function to call that will handle obfuscation in the document. The value provided must follow the path property as handled by [lodash#get](https://lodash.com/docs/4.17.15#get).

## Development

Run the following commands for different development tasks:

- `npm run storybook`: to start a storybook, create stories, and visualize the different components
- `npm run test`: to run tests
- `npm run lint`: to run lint
- `npm run example:application`: to run an example application built with this library

  Be sure to update the example if you update this library.

- `npm run example:renderer`: to run an example decentralized renderer built with this library

  Be sure to update the example if you update this library.

You can also build your own decentralized-renderer based on this [React template](https://github.com/Open-Attestation/decentralized-renderer-react-template).

## Penpal

There are compatibility [issues](https://github.com/Aaronius/penpal/issues/52) between Penpal version ^5 and ^4. If you must use Penpal version ^4, get version [4.1.1](https://github.com/Aaronius/penpal/releases/tag/v4.1.1).

# SVG Rendering

The implementation for SVG rendering is based on the [W3C draft](https://w3c-ccg.github.io/vc-render-method/#render-svgrenderingtemplate2023).

## How it works

SVG renderering is an alternative to the existing embedded renderer method that can be achieved without creating a decentralized renderer.

Instead, an SVG image needs to be provided either by directly embedded it inside an OA document, or by providing a publicly accessible link that dereferences to an SVG image. In order to correctly display data, the provided SVG should include [handlebars expressions](https://handlebarsjs.com/guide/expressions.html).

At the point of display, the document to be rendered is passed to the SvgRenderer component in order for the final output to be compiled.

## Usage

The library provides the `SvgRenderer` component.

### SvgRenderer

This component only has one mandatory property `document`.

- `document`: OA document in the form of an object with the corresponding fields to display.
- `style?`: To style the iframe element.
- `className?`: To set the className for the iframe.
- `onResult?`: Callback function containing the DisplayResult once the SVG is loaded.
- `ref?`: A ref of type HTMLImageElement can be passed which will expose the DOM node of the rendered element.

### renderMethod property

The array of objects to be included in the OA doc, for more information refer to the [w3c specification](https://w3c-ccg.github.io/vc-render-method/#svgrenderingtemplate2023).

Currently the SvgRenderer in this library only accepts single SVG templates. It will iterate through all renderMethod objects provided within the document and display the first one of type `SvgRenderingTemplate2023`.`

## Example

Illustrated example for SVG rendering. For simplicity we will not be specifying a `digestMultibase`.

### Step 1 - Prepare your template SVG

```
<svg width="340" height="110" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="5" width="330" height="100" fill="#d4d4d4" stroke="orange" stroke-width="8" rx="10" ry="10" />
  <text x="170" y="45" font-family="Arial" font-size="15" fill="black" text-anchor="middle">Congratulations for achieving {{qualification}}!</text>
  <text x="170" y="70" font-family="Arial" font-size="12" fill="black" text-anchor="middle">Awarded to: {{recipient.name}}</text>
</svg>
```

Preview of the template SVG:

<img src="https://github.com/Open-Attestation/decentralized-renderer-react-components/blob/master/example/application/fixtures/images/demo-cert.svg?raw=true" alt="demo template svg" />

Ensure that the data fields referenced by the SVG are within the raw/unwrapped OA document, the SVG can be hosted or embedded directly.

### Step 2 - Create Sample Raw/Unwrapped OpenAttestation doc

Sample A - v2 doc with hosted SVG:

> [!NOTE]  
> Using SVG rendering with OA v2 requires the `renderMethod` property instead of `$template`.

```
{
  <!-- Issuers field -->
  "renderMethod": [{
    "id": "http://example.com/static/svg_test.svg",  // Put SVG data here to embed it directly
    "type": "SvgRenderingTemplate2023",
    "name": "SVG Demo",
  }],
  "qualification": "SVG rendering",
  "recipient": {
    "name": "Yourself"
  }
}
```

Sample B - v2 doc with embedded SVG:

```
{
  <!-- Issuers field -->
  "renderMethod": [{
    "id": `<svg width="340" height="110" xmlns="http://www.w3.org/2000/svg">
<rect x="5" y="5" width="330" height="100" fill="#d4d4d4" stroke="orange" stroke-width="8" rx="10" ry="10" />
<text x="170" y="45" font-family="Arial" font-size="15" fill="black" text-anchor="middle">Congratulations for achieving {{qualification}}!</text>
<text x="170" y="70" font-family="Arial" font-size="12" fill="black" text-anchor="middle">Awarded to: {{recipient.name}}</text>
</svg>`,
    "type": "SvgRenderingTemplate2023",
    "name": "SVG Demo",
  }],
  "qualification": "SVG rendering",
  "recipient": {
    "name": "Yourself"
  }
}
```

### Step 3 - Basic Usage of the SvgRenderer

For non-production trials, an adapter component is provided to allow OA v2 documents to be rendered using SVGs. WARNING: This is an experimental option meant for users who want to try SVG rendering before OA v4. This component will not be actively maintained.

```
import React, { useRef } from "react";
import { __unsafe__not__for__production__v2__SvgRenderer } from "@govtechsg/decentralized-renderer-react-components";

// Your renderer component
const export DocumentRenderer: React.FC<RendererProps> = ({ rawDocument }) => {
  const svgRef = useRef<HTMLImageElement>(null)

  return
    < __unsafe__not__for__production__v2__SvgRenderer
      document={rawDocument}
      svgRef={svgRef}
    />
}
```

When compiled, the final rendered image should look something like:

<img src="https://github.com/Open-Attestation/decentralized-renderer-react-components/blob/master/example/application/fixtures/images/demo-cert-compiled.png?raw=true" alt="demo compiled template svg" />

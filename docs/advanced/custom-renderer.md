---
id: custom-renderer
title: Creating Document Renderer
sidebar_label: Creating Document Renderer
---

OA documents are both readable by machines as well as by humans. Every OA document file is stored in a `.json` format, allowing any application to process the content within. To present the data file in a human-readable format, a renderer needs to be written.

In this guide, we will build and deploy the renderer to display data from a 📜 Certificate of Completion.

This renderer is a static website that will be embedded in compliant OA viewer. It will take in the OA document in the raw form and generates the corresponding HTML code for rendering.

## Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/)
- [GitHub account](https://github.com/)
- [Netlify account](https://www.netlify.com/)
- [Basic React.js and TypeScript knowledge](https://reactjs.org/)

## Clone Decentralized Renderer React Template

A template for building your own document renderer has been created for you at [our GitHub template repository](https://github.com/Open-Attestation/decentralized-renderer-react-template).

### Clone code repository locally

```sh
git clone https://github.com/Open-Attestation/decentralized-renderer-react-template.git
cd decentralized-renderer-react-template
rm -rf .git
```

### Clean the template

In order to fully understand how developing a renderer work, we will start by cleaning it a bit:
- remove the folder `src/templates/customTemplate`
- remove the folder `src/integration`

Once you have finished the tutorial feel free to clone the repository again and have a look into the deleted files.

### Install code dependencies

```sh
npm install
```

### Run development preview

```sh
npm run storybook
```

### Development environment

![Default Story Book View](/docs/advanced/custom-renderer/default-storybook.png)

After running the Storybook, you should be able to see the templates samples provided at `http://localhost:6006/`.

This is a live preview where you can see the changes when you:

1. edit the raw document data in the `Knobs` tab
1. edit the template code to render the data

## Developing the Document Renderer

Now that we have set up the development environment, we can start writing our document renderer. We will first define the data structure of our 📜 Certificate of Completion (COC), followed by writing the renderer to render the HTML code corresponding to the data provided.

### Update sample document data and type

To update the raw document data and the corresponding data type, you will need to update the data definition file in `src/templates/samples/customTemplateSample.ts`:

```typescript jsx
import { v2 } from "@govtechsg/decentralized-renderer-react-components";

export interface CocTemplateCertificate extends v2.OpenAttestationDocument {
  name: string;
  recipient: {
    name: string;
  };
}

export const cocTemplateCertificate: CocTemplateCertificate = {
  name: "OpenAttestation Tutorial Certificate of Completion",
  issuers: [
    {
      name: "My name",
      documentStore: "0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b",
      identityProof: {
        location: "few-green-cat.sandbox.openattestation.com",
        type: v2.IdentityProofType.DNSTxt
      }
    }
  ],
  recipient: {
    name: "John Doe"
  },
  $template: {
    name: "COC",
    type: v2.TemplateType.EmbeddedRenderer,
    url: "http://localhost:3000"
  }
};

```

### Document objects explained

In the above OA document, you will see four root objects:

#### `$template`

The `$template` key to describe the template name used to render this display. It should have the following keys:

- `$template.name` is the name of the template used to render a given OA document. This allows a single document renderer to render for multiple types of OA documents; each with a different template name.

- `$template.type` will always take the value of `EMBEDDED_RENDERER` for documents rendered in this manner.

- `$template.url` will be the remote URL where your OA decentralized renderer resides. For now, we set it to `https://localhost:3000` but we will change this value later on in the [Deploying Document Renderer](#deploying-document-renderer) section.

#### `name`

The `name` key is a compulsory key to describe the type of OA document. In this case, we are creating an `OpenAttestation Tutorial Certificate of Completion`.

#### `recipient`

OA documents do not have a strict data structure and allows issuers of documents to define their own data schema. The `recipient` object is a user-defined object that describes who the certificate is conferred to. In this case, you may replace `John Doe` with your name.

In the next section, you will learn more about the OA document schema and how you may define your own data structure. For this guide, we will stick to this simple document.

#### `issuers`
See [Creating Raw Document](/docs/verifiable-document/raw-document#creating-raw-document).

### Developing the COC Template View

Now that the structure of the data has been defined, we may proceed to style our 📜 Certificate of Completion.

To change how the data is being rendered, we simply create a React component that takes in the raw document in the `document` props and render the corresponding HTML code.

For our 📜 Certificate of Completion, we will simply display the following text:

```text
OpenAttestation Tutorial Certificate of Completion
awarded to
John Doe
```

The first step consist of creating a file `src/templates/coc/template.tsx` with the following content:

```jsx harmony
import React, { FunctionComponent } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { css } from "@emotion/core";
import { CocTemplateCertificate } from "../samples/customTemplateSample";

const containerStyle = css`
  background-color: #324353;
  color: #ffffff;
  padding: 15px;
  margin: auto;
  width: 80%;
  text-align: center;
`;

export const CocTemplate: FunctionComponent<
  TemplateProps<CocTemplateCertificate> & { className?: string }
> = ({ document, className = "" }) => {
  return (
    <div css={containerStyle} className={className} id="custom-template">
      <h1>{document.name}</h1>
      <div>awarded to</div>
      <h2>{document.recipient.name}</h2>
    </div>
  );
};
```

Now that the component has been created, we can add a story to view it. Next to `src/templates/coc/template.tsx` create a file called `template.stories.mdx` with the following content:

```markdown
import { Meta, Preview, Props, Description, Story } from "@storybook/addon-docs/blocks";
import { object } from "@storybook/addon-knobs";
import { CocTemplate } from "./template";
import { cocTemplateCertificate } from "../samples/customTemplateSample";

<Meta title="MDX|CocTemplate" component={CocTemplate} />

# CocTemplate component

<Description of={CocTemplate} />

# Props

<Props of={CocTemplate} />

# Usage

<Preview>
  <Story name="basic sample">
    <CocTemplate document={object("document", cocTemplateCertificate)} />
  </Story>
</Preview>
```

We can now [start storybook](#run-development-preview) and make sure our component looks like expected.

![Completed Story Book View](/docs/advanced/custom-renderer/completed-storybook.png)

### Certificate of Completion template configuration

An OA document may have multiple views, each of them rendered in separate tabs. For example, an OA document that is a degree certificate may have the actual certificate as one view, and the transcript as another view in a single template. A demo of the multiple views feature can be found [here](https://opencerts.io/?q={%22type%22:%22DOCUMENT%22,%22payload%22:{%22uri%22:%22https://opencerts.io/static/demo/homestead.opencert%22,%22permittedActions%22:[%22STORE%22],%22redirect%22:%22https://opencerts.io%22}}).

For our 📜 Certificate of Completion, we will only use a single view. Create a file `src/templates/coc/index.tsx` with the following content:

```js
import { CocTemplate } from "./template";

export const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: CocTemplate
  }
];
```

- `templates` must be an array where each element correspond to a view (or a tab). Here we need only one view.
- Each view must define the following property:
  - `id` which must be a uniq identifier for this template configuration.
  - `label` which will be displayed by tab in the application loading the renderer.
  - `template` which is is the component that will be displayed.

### Renderer template configuration

`src/templates/index.tsx` is a file containing the configuration of all the templates available in this renderer.

To register a new template, simply add it as a key to the `registry` constant. Take note that the key is case sensitive and must match the `$template.name` value defined in the [document data](#template).

Replace `src/templates/index.tsx` with the following code to add the new `COC` template:

```js
import { TemplateRegistry } from "@govtechsg/decentralized-renderer-react-components";
import { templates } from "./coc";

export const registry: TemplateRegistry<any> = {
  COC: templates
};
```

If you open `src/index.tsx` you will notice that the `registry` defined above is used and provided to a component called `FramedDocumentRenderer`. This component will handle automatically the connection to the application and will display the correct component depending on your configuration. You can find more information in [this github repository](https://github.com/Open-Attestation/decentralized-renderer-react-components)

Now, your document renderer is ready to be built and deployed online.

## Deploying Document Renderer

### Push code to GitHub

Create a new repository in GitHub and push the code to the new repository. For a step-by-step guide to import source code to GitHub, you may read [this guide](https://help.github.com/en/github/importing-your-projects-to-github/adding-an-existing-project-to-github-using-the-command-line).

### Deploy site onto Netlify

Once you have your code on GitHub, you may build and deploy the site onto [Netlify](https://netlify.com).

![Create a new site on netlify](/docs/advanced/custom-renderer/netlify-new.png)

Select "New Site From Git" and then "GitHub".

![Build settings](/docs/advanced/custom-renderer/netlify-build.png)

On the build page, enter `npm run build` as the "Build command" and `dist` as the "Publish Directory" and click on "Deploy Site".

![Sample Deployed URL](/docs/advanced/custom-renderer/netlify-deployed.png)

Once the site has been deployed, you will obtain the URL to the document renderer site. In the above example, the URL is `https://frosty-joliot-c02c3d.netlify.com/`.

Note that the website will be an empty page when viewed directly. **This is normal because it is not meant to be viewed directly through a web browser.**

> Save the website url for future reference. You should also update the `$template.url` in your OA document.

## Additional Note for Production Document Renderer

It is recommended to use a custom domain you own for the document renderer website in production. This prevents locking in to any specific third party hosting provider.

If you are using Netlify, we recommend you to check out [how to enable custom domains](https://docs.netlify.com/domains-https/custom-domains/).

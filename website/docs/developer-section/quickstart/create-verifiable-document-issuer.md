---
id: create-verifiable-document-issuer
title: Creating Verifiable Document Issuer
sidebar_label: Creating Verifiable Document Issuer
---

A verifiable document is a digital document that can be issued and verified using blockchain technology.

Examples of verifiable documents include, but are not limited to, receipts, bills of sale, titles, certificates of title, purchase agreements, shipping manifests, work orders, etc.

In this guide, we will build a verifiable document issuer which would allow for the creation and issuing of a verifiable document.

## Prerequisites

### React

You should have a basic understanding of [React.js](https://react.dev/) in order to complete this tutorial.

### MetaMask

You should also have had MetaMask installed in your browser and created a wallet. If not, follow the steps below:

1. [Download MetaMask](https://metamask.io/download/).
   - After successfully downloading MetaMask, open the extension and the application will guide you with wallet creation.
2. Transfer some test ethers from any of your prefered testing networks to your created wallet address.

### Verifiable Document Components

Before starting on this code tutorial, it would be beneficial to develop an understanding of the components involved in the creation, issuance and verification of a verifiable document.

You can read more about the components [here](/docs/integrator-section/verifiable-document/ethereum/document-store-overview).

## Overview

We will be building a single-page application which allows a user to:

1. Deploy their own Document Store.
2. Bind their own domain name to their verifiable document.
3. Create and wrap a raw document.
4. Issue, download and then verify the wrapped document.

## Setup

First, we'll use [Create React App](https://github.com/facebook/create-react-app) to create a new single-page application.

```
npm create vite@latest verifiable-document-issuer --template react-ts
cd verifiable-document-issuer
```

We'll also need the following packages to interact with the blockchain.

```
npm i @govtechsg/document-store @govtechsg/open-attestation ethers
```

And these extra packages for the application's miscellaneous functions.

```
npm i file-saver @types/file-saver
```

That's all for the setup!

```
npm start
```

## Getting started

Now that we have a basic React application set up and the necessary dependencies installed, let's get started!

### Initialising MetaMask

When you [installed MetaMask](/docs/developer-section/quickstart/create-verifiable-document-issuer#metamask) on your browser, it injected a [global API](https://docs.metamask.io/guide/ethereum-provider.html) into the web application at `window.etherem`. We use this API to get a [Signer](https://docs.ethers.io/v5/api/signer/) so that we can interact with smart contracts on the Ethereum blockchain.

We'll create separate files for our API calls. For example, in `services/account.tsx`:

```tsx
import { ethers } from "ethers";

export const getAccount = async () => {
  const { ethereum } = window;

  const provider = new ethers.providers.Web3Provider(ethereum);
  await provider.send("eth_requestAccounts", []);

  return {
    providerSigner: await provider.getSigner(),
    providerNetwork: await provider.getNetwork(),
  };
};
```

This function connects you to the Ethereum network and returns a _Signer_, an abstraction of an Ethereum account that can be used to sign transactions that you will make later on.

Now, in `App.tsx`, replace the file's contents

```tsx
import { JsonRpcSigner } from "@ethersproject/providers";
import { useEffect, useState } from "react";
import { getAccount } from "../services/account";

const App = () => {
  const [signer, setSigner] = useState<JsonRpcSigner>(null);

  useEffect(() => {
    const init = async () => {
      const { providerSigner } = await getAccount();
      setSigner(providerSigner);
    };

    init();
  }, []);

  return null;
};

export default App;
```

When you reload the app, the MetaMask extension should prompt you for your password and ask for permission to allow the site access to your accounts.

### Deploying Document Store

With the `signer` object set in state, we can now deploy a document store. Similar to the previous section, we create a function in `services/document-store.tsx` which would handle the logic of deploying a document store.

```tsx
import { JsonRpcSigner } from "@ethersproject/providers";
import { DocumentStoreFactory } from "@govtechsg/document-store";

export const deployDocumentStore = async (signer: JsonRpcSigner) => {
  const factory = new DocumentStoreFactory(signer);
  const documentStore = await factory.deploy("My Document Store", await signer.getAddress());
  await documentStore.deployTransaction.wait();
  return documentStore.address;
};
```

This function deploys a Document Store from a `DocumentStoreFactory` and returns the address of the deployed Document Store. Typically, once the Document Store is deployed, we can save this address in a persistent storage and reuse it whenever we run the application. In order to keep things light-weight however, we will simply want to store this address in state.

For convenience sake, we will create a file `AppContext.tsx` to house all the "global" states, while `AccountContext.tsx` for all metamask related states. You should look into other state management tools once your application scales up.

```tsx
import { createContext } from "react";
import { documentStoreAddress } from "../types";

export const AppContext = createContext<{
  documentStoreAddress: documentStoreAddress;
  setDocumentStoreAddress: (documentStoreAddress: documentStoreAddress) => void;
}>({
  documentStoreAddress: null,
  setDocumentStoreAddress: () => null,
});
```

```tsx
import { JsonRpcSigner } from "@ethersproject/providers";
import { createContext } from "react";
import { signer, network } from "../types";

export const AccountContext = createContext<{
  signer: signer;
  setSigner: (signer: JsonRpcSigner) => void;
}>({
  signer: null,
  setSigner: () => null,
});
```

We can import `AppContext` and `AccountContext.tsx` into `App.tsx` so that the next few components we create have easy access to the `signer`, `documentStoreAddress` and any other values they might need.

In `App.tsx`

```tsx
import { JsonRpcSigner } from "@ethersproject/providers";
import { useEffect, useState } from "react";
import { getAccount } from "../services/account";
import { deployDocumentStore } from "../services/document-store";
import { AppContext } from "./contexts/AppContext";
import { AccountContext } from "./contexts/AccountContext";

const App = () => {
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [documentStoreAddress, setDocumentStoreAddress] = useState<string>();

  const onDeploy = async () => {
    try {
      const documentStoreAddress = await deployDocumentStore(signer!);
      setDocumentStoreAddress(documentStoreAddress);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const init = async () => {
      const { providerSigner } = await getAccount();
      setSigner(providerSigner);
    };

    init();
  }, []);

  return (
    <AppContext.Provider
      value={{
        documentStoreAddress,
        setDocumentStoreAddress,
      }}
    >
      <AccountContext.Provider
        value={{
          signer,
          setSigner,
        }}
      >
        <main>
          <button onClick={onDeploy}>Deploy</button>
        </main>
      </AccountContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
```

Congrats on this simple demo!

---

### Full verifiable document issuer flow

Now we can move on to creating a basic full flow from connecting your metamask wallet to creating your own custom document.

We'll be doing up a simple wizard UI to display on screen. As transaction times on the Ethereum network are **typically much longer than people are used to, visual feedback is very important**.

First, let's create a `components` folder to store all our component files. Next, create a file called `Steps.tsx`.

```tsx
// all the relevant imports here

const Step = ({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: React.ReactElement;
}) => {
  return (
    <>
      <h2>
        {index + 1}. {title}
      </h2>
      {body}
    </>
  );
};

export const Steps = () => {
  ...

  const steps: {
    key: step;
    title: string;
    body: React.ReactElement;
  }[] = [
    {
      key: "connect",
      title: "Connect Metamask Extension",
      body: <Button buttonText="Connect" onHandler={onConnect} />,
    },
    {
      key: "deploy",
      title: "Deploy Document Store",
      body: <Button buttonText="Deploy" onHandler={onDeploy} />,
    },
    {
      key: "dns",
      title: "Domain Name Configuration",
      body: <Dns />,
    },
    {
      key: "document",
      title: "Edit Document Form",
      body: <DocumentForm />,
    },
    {
      key: "download",
      title: "Download & Verify",
      body: (
        <>
          <Button buttonText="Download" onHandler={onDownload} />
          <a
            href="https://dev.tradetrust.io/verify"
            target="_blank"
            rel="noreferrer noopener"
            style={{ margin: "0 8px 8px 0" }}
          >
            <button>Verify</button>
          </a>
          <Button buttonText="Create Another" onHandler={onCreateAnother} />
        </>
      ),
    },
  ];

  return (
    <>
      {steps.map(
        (step, index) =>
          currentStep === step.key && <Step {...{ index, ...step }} />,
      )}
    </>
  );
};

```

In this component, we are breaking down the steps and presenting it as a wizard. Namely:

1. Connect Metamask Extension.
   - We connect to metamask to get signer and networkId on click of the `Connect` button.
2. Deploy Document Store.
   - We deploy the Document Store on click of the `Deploy` button.
3. Domain Name Configuration.
   - A verifiable document requires a DNS as proof of identity, which is checked during the verification phase.
   - However, as configuring one's own DNS might be challenging, we can give the user instructions to get a temporary DNS from the Open Attestation CLI.
   - `documentStoreAddress` is set within the application state on click of the `Confirm` button.
4. Edit Document Form.
   - We would need to provide an interface for our users to change the values of the documents that they want to issue.
   - For the sake of brevity, this tutorial only includes a few fields in the form. Feel free to extend on this tutorial and complete the form to match the schema of the _SIMPLE_COO_ template, which is an example of Certificate of Origin (COO).
   - `wrapDocument` and `issueDocument` is called on click of the `Submit` button. Thereafter, `wrappedDocument` is set within the application state at this point.
     - The `$template` field specifies the template to be used to render the verifiable document. You can learn how to create your own document renderer [here](docs/developer-section/quickstart/create-custom-renderer).
     - The `issuers` field specifies the identity proof and document store address of the issuers.
     - Wrapping a document enables the non-tampering feature of the verifiable document.
     - Once the document has been issued, it can be verified.
5. Download & Verify.
   - After successful issuing of the document, we allow the user to download the `wrappedDocument` to be submitted for verification.
     1. `Download` allows the user to download the `wrappedDocument` and save it on their machine.
     2. `Verify` links to the verification site where the user can upload and verify the issued `wrappedDocument`.
     3. `Create Another` restarts the issuing process and allows the user to create and issue another `wrappedDocument`.

Congrats! You've created your very own Verifiable Document Issuer!

## Github Code

You can clone the complete repository for the demo [here](https://github.com/Open-Attestation/demo-verifiable-document-issuer).

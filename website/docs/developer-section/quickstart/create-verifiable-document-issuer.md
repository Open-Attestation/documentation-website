---
id: create-verifiable-document-issuer
title: Creating Verifiable Document Issuer
sidebar_label: Creating Verifiable Document Issuer
---

A verifiable document is a digital document, which you can issue and verify using blockchain technology.

Examples of verifiable documents include, but are not limited to the following:

* Receipts
* Bills of sale
* Titles
* Certificates of title
* Purchase agreements
* Shipping manifests
* Work orders

In this guide, you will build a verifiable document issuer, which will help the user create and issue a verifiable document.

## Prerequisites

### React

You need a basic understanding of [React.js](https://react.dev/) to complete this tutorial.

### MetaMask

You should also have installed MetaMask in your browser and created a wallet. 

If not, follow the steps below:

1. [Download MetaMask](https://metamask.io/download/).
   
2. Open the extension in your browser. 

    The application will guide you through the wallet creation process.

3. Transfer some test ethers from any of your preferred testing networks to your wallet address.

### Verifiable document components

Before starting on this code tutorial, it will be helpful to understand the components involved in the creation, issuance and verification of a verifiable document.

You can read more about the components [here](/docs/integrator-section/verifiable-document/ethereum/document-store-overview).

## Overview

You will build a single-page application, which helps the user perform the following:

1. Connect to their MetaMask wallet.
2. Deploy their own document store.
3. Bind their own domain name to their verifiable document.
4. Create and wrap a raw document.
5. Issue, download, and then verify the wrapped document.

## Setup

1. Use [Create Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite) to create a new single-page application from the `react-ts` template.

```
npm create vite@latest verifiable-document-issuer --template react-ts
cd verifiable-document-issuer
```

2. Install the following packages to let the application interact with the blockchain.

```
npm i @govtechsg/document-store @govtechsg/open-attestation ethers
```

3. Install these extra packages for the application's miscellaneous functions.

```
npm i file-saver @types/file-saver
```

4. Once completing the setup, start the application.

```
npm start
```

## Getting started

Once you have set up a basic React application and installed the necessary dependencies, get started on the task below.

### Initializing MetaMask

When you [installed MetaMask](/docs/developer-section/quickstart/create-verifiable-document-issuer#metamask) in your browser, it injected a [global API](https://docs.metamask.io/guide/ethereum-provider.html) into the web application at `window.ethereum`. Use this API to get a [Signer](https://docs.ethers.io/v5/api/signer/), so that your application can interact with smart contracts on the Ethereum blockchain.

You will create separate files for the API calls. For example, in `services/account.tsx`:

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

This function connects your application to the Ethereum network and returns a _Signer_, an abstraction of an Ethereum account that can be used to sign transactions that you will make later on.

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

With the `signer` object set in state, deploy a document store. Similar to the previous section, you can create a function in `services/document-store.tsx` which will handle the logic of deploying a document store.

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

This function deploys a document store from a `DocumentStoreFactory` and returns the address of the deployed document store. Typically, once the document store is deployed, save this address in a persistent storage and reuse it whenever you run the application. To keep things lightweight however, you need to store this address in state.

You will create a file `DocumentStoreContext.tsx` to house all the document store related states, and another file `AccountContext.tsx` for all the MetaMask related states.

```tsx
import { createContext } from "react";
import { documentStoreAddress } from "../types";

export const DocumentStoreContext = createContext<{
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

You can now import `DocumentStoreContext` and `AccountContext.tsx` into `App.tsx`, so that the next few components you create will have easy access to the `signer`, `documentStoreAddress`, and any other values they need.

In `App.tsx`:

```tsx
import { JsonRpcSigner } from "@ethersproject/providers";
import { useEffect, useState } from "react";
import { getAccount } from "../services/account";
import { deployDocumentStore } from "../services/document-store";
import { DocumentStoreContext } from "./contexts/DocumentStoreContext";
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
    <DocumentStoreContext.Provider
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
    </DocumentStoreContext.Provider>
  );
};

export default App;
```

>**Note:** See the [demo repo](https://github.com/Open-Attestation/demo-verifiable-document-issuer) of the multiple contexts technique. Otherwise, reference other state management tools as your application scales.

You have deployed the document store successfully.


### Full verifiable document issuer flow

Next, create a basic flow from connecting your MetaMask wallet to creating a custom document.

You will work out a simple wizard UI to display on screen. As the transaction time on the Ethereum network is often much longer than users' expectation, the visual feedback is very important.

1. Create a `components` folder to store all the component files. 

2. Create a file named `Steps.tsx` with its content similar to the following:

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
      title: "Connect MetaMask Extension",
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

3. In the next step, create a UI to break down the following steps and present the scenario in a wizard:

  a. Connect the MetaMask extension.
  
    * Connect to MetaMask to get `signer` and `networkId` by clicking **Connect**.
    
  b. Deploy the document store.
    * Deploy the document store by clicking **Deploy**.

  c. Configure the domain name.
    
    * A verifiable document requires a DNS as the proof of identity, which is checked during the verification phase.
    
    * However, as configuring the DNS might be challenging, you can give the user instructions to get a temporary DNS from the OpenAttestation CLI.
    
    * Set `documentStoreAddress` within the application state by clicking **Confirm**.

  d. Edit the document form.

    * You need to provide an interface for the users to change the values of the documents that they want to issue.

    * To keep it simple, this tutorial only includes a few fields in the form. You can extend it based on this tutorial and complete the form to match the schema of the _SIMPLE_COO_ template, which is an example of the Certificate of Origin (COO).
        
    * Call `wrapDocument` and `issueDocument` by clicking **Submit**. Thereafter, it will set `wrappedDocument` within the application state.
        
    * The `$template` field specifies the template to be used to render the verifiable document. You can learn how to create your own document renderer [here](docs/developer-section/quickstart/create-custom-renderer).
        
    * The `issuers` field specifies the identity proof and document store address of the issuers.
  
    * Wrapping a document prevents the verifiable document from being tampered.
        
    * Once the document has been issued, the user can verify the document.

  e. Download and verify.
        
    * After successfully issuing the document, you can let the user download the `wrappedDocument` to be submitted for verification.
        
    * `Download` allows the user to download the `wrappedDocument` and save it on their devices.
        
    * `Verify` links to the verification site where the user can upload and verify the issued `wrappedDocument`.
        
    * `Create Another` restarts the issuing process and lets the user create and issue another `wrappedDocument`.

You have created your own verifiable document issuer successfully.

## Github code

You can clone the complete repository for the demo [here](https://github.com/Open-Attestation/demo-verifiable-document-issuer).

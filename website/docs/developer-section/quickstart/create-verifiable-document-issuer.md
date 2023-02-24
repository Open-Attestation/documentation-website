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

You should have a basic understanding of [React.js](https://reactjs.org/) in order to complete this tutorial.

### MetaMask

You should also have had MetaMask installed in your browser and created a wallet. If not, follow the steps below:

1. [Download MetaMask](https://metamask.io/)
2. Create a MetaMask Wallet

   After successfully downloading MetaMask, open the extension and the application will guide you through wallet creation.

3. Get some test ethers from any of these faucets:
   - https://goerlifaucet.com/
   - https://goerli-faucet.pk910.de/

### Verifiable Document Components

Before starting on this code tutorial, it would be beneficial to develop an understanding of the components involved in the creation, issuing and verification of a verifiable document.

You can read more about the components [here](/docs/integrator-section/verifiable-document/overview).

## Overview

We will be building a single-page application which allows a user to

1. Deploy their own document store
2. Bind their own DNS to their verifiable document
3. Create and wrap a raw document
4. Issue, download and then verify the wrapped document

## Setup

First, we'll use [Create React App](https://github.com/facebook/create-react-app) to create a new single-page application.

```
npx create-react-app verifiable-document-issuer --template typescript
cd verifiable-document-issuer
```

We'll also need the following packages to interact with the blockchain

```
npm i @govtechsg/document-store @govtechsg/open-attestation ethers
```

and these extra packages for the application's design and miscellaneous functions

```
npm i antd @ant-design/icons file-saver
```

That's all for the setup!

```
npm start
```

## Getting started

Now that we have a basic React application set up and the necessary dependencies installed, let's get started!

### Initialising MetaMask

When you [installed MetaMask](/docs/developer-section/quickstart/create-verifiable-document-issuer#metamask) on your browser, it injected a [global API](https://docs.metamask.io/guide/ethereum-provider.html) into the web application at `window.etherem`. We use this API to get a [Signer](https://docs.ethers.io/v5/api/signer/) so that we can interact with smart contracts on the Ethereum blockchain.

We'll create a separate file for our API calls and call it `services.tsx`. In this file, we can add the initialization function

```tsx
import { JsonRpcSigner } from "@ethersproject/providers";
import { ethers } from "ethers";

export const initializeMetaMask = async () => {
  const { ethereum } = window as any;

  await ethereum.enable();
  const web3provider = new ethers.providers.Web3Provider(ethereum);
  const signer: JsonRpcSigner = web3provider.getSigner();
  return signer;
};
```

This function connects you to the Ethereum network and returns a _Signer_, an abstraction of an Ethereum account that can be used to sign transactions that you will make later on.

Now, in `App.tsx`, replace the file's contents

```tsx
import { JsonRpcSigner } from "@ethersproject/providers";
import { useEffect, useState } from "react";
import "./App.css";
import { initializeMetaMask } from "./services";

function App() {
  const [signer, setSigner] = useState<JsonRpcSigner>();

  useEffect(() => {
    const init = async () => {
      const signer = await initializeMetaMask();
      setSigner(signer);
    };

    init();
  }, []);

  return null;
}

export default App;
```

When you reload the app, the MetaMask extension should prompt you for your password and ask for permission to allow the site access to your accounts.

### Deploying Document Store

With the `signer` object set in state, we can now deploy a document store. Similar to the previous section, we create a function in `services.tsx` which would handle the logic of deploying a document store

```tsx
export const deployDocumentStore = async (signer: JsonRpcSigner) => {
  const factory = new DocumentStoreFactory(signer);
  const documentStore = await factory.deploy("DEMO_DOCUMENT_STORE");
  await documentStore.deployTransaction.wait();
  return documentStore.address;
};
```

This function deploys a document store from a `DocumentStoreFactory` and returns the address of the deployed document store. Typically, once the document store is deployed, we can save this address in a persistent storage and reuse it whenever we run the application. In order to keep things light-weight however, we will simply want to store this address in state.

To do so, we will create a file `AppContext.tsx`

```tsx
import { JsonRpcSigner } from "@ethersproject/providers";
import { createContext } from "react";

interface IAppContext {
  signer?: JsonRpcSigner;
  documentStoreAddress?: string;
  setDocumentStoreAddress: (documentStoreAddress: string) => void;
}

export const AppContext = createContext<IAppContext>({
  setDocumentStoreAddress: () => null,
});
```

We can import `AppContext` into `App.tsx` so that the next few components we create have easy access to the `signer`, `documentStoreAddress` and any other values they might need.

In `App.tsx`

```tsx
import { JsonRpcSigner } from "@ethersproject/providers";
import { useEffect, useState } from "react";
import "./App.css";
import { initializeMetaMask } from "./services";

function App() {
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [documentStoreAddress, setDocumentStoreAddress] = useState<string>();

  useEffect(() => {
    const init = async () => {
      const signer = await initializeMetaMask();
      setSigner(signer);
    };

    init();
  }, []);

  return (
    <AppContext.Provider
      value={{
        signer,
        documentStoreAddress,
        setDocumentStoreAddress,
      }}
    ></AppContext.Provider>
  );
}

export default App;
```

Now we can move on to creating something to display on screen which notifies the user of the status of the deployment. As transaction times on the Ethereum network are typically much longer than people are used to, visual feedback is very important.

First, let's create a `components` folder to store all our component files. Next, create a file called `DocumentStoreDeploy.tsx`.

```tsx
import { Button, message } from "antd";
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { deployDocumentStore } from "../services";

export const DocumentStoreDeploy = () => {
  const { signer, documentStoreAddress, setDocumentStoreAddress } = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const documentStoreAddress = await deployDocumentStore(signer!);
      setLoading(false);
      setDocumentStoreAddress(documentStoreAddress);
      message.success("Document store successfully deployed");
    } catch (e: any) {
      setLoading(false);
      message.error(e.message);
    }
  };

  return (
    <div>
      {documentStoreAddress ? (
        <p>Document store deployed at {documentStoreAddress}</p>
      ) : (
        <p>No document store deployed</p>
      )}
      <Button
        disabled={!signer}
        loading={loading}
        type={documentStoreAddress ? "default" : "primary"}
        onClick={onClick}
      >
        Deploy
      </Button>
    </div>
  );
};
```

In this component, we deploy the document store on click of the `Deploy` button. We also initialize a loader which triggers the loading animation on the button when we begin to deploy the document store. Also, notice that the `Button` is disabled when the `signer` object is undefined. This is because we need a `signer` to sign the transaction which deploys the document store to the blockchain.

To see this component on screen, import it into `App.tsx`

```tsx

import { DocumentStoreDeploy } from "./components/DocumentStoreDeploy";

...

  return (
    <AppContext.Provider
      value={{
        signer,
        documentStoreAddress,
        setDocumentStoreAddress,
      }}
    >
      <DocumentStoreDeploy/>
    </AppContext.Provider>
  );


```

### Step by Step

Notice that in order to deploy the document store, you would have to first get a `signer` object. Similarly, to complete the next few actions, you would need to depend on previously retrieved values. It would be good to first create a display that mirrors this flow before continuing.

Fortunately, [AntDesign](https://ant.design) provides a pre-built component called `Steps`, which indicates to the user which step they are currently on. For our application, we would require four steps

1. Deployment of Document Store
2. Domain name configuration
3. Filling in the document form
4. Further actions after issuing the document

We can create a state variable `currentStep` and a list of components that we render depending on the `currentStep`.

Firstly, to use AntDesign in our application, add this line to the top of `App.css`

```css
@import "~antd/dist/antd.css";
```

Then in `App.tsx`

```tsx

...

import { Card, Col, Row, Steps } from "antd";
import {
  ShopOutlined,
} from "@ant-design/icons";

import { DocumentStoreDeploy } from "./components/DocumentStoreDeploy";

const { Step } = Steps;

function App() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [documentStoreAddress, setDocumentStoreAddress] = useState<string>();

...

  const steps = [
    {
      title: "Deploy Document Store",
      component: <DocumentStoreDeploy />,
      icon: <ShopOutlined />
    }
  ];

  return (
    <AppContext.Provider
      value={{
        signer,
        documentStoreAddress,
        setDocumentStoreAddress,
        currentStep,
        setCurrentStep,
      }}
    >
      <Row style={{ height: "100vh" }} justify="center" align="middle">
        <Row
          gutter={24}
          style={{
            width: 1000,
            minHeight: 400,
            margin: "auto",
          }}
        >
          <Col span={18}>
            <Card
              title={`${currentStep + 1}. ${steps[currentStep].title}`}
              style={{ height: "100%" }}
            >
              {steps[currentStep].component}
            </Card>
          </Col>
          <Col span={6}>
            <Steps
              direction="vertical"
              style={{ marginBottom: 24, height: "100%" }}
              current={currentStep}
            >
              {steps.map((step) => (
                <Step
                  key={step.title}
                  title={step.title}
                  icon={step.icon}
                />
              ))}
            </Steps>
          </Col>
        </Row>
      </Row>
    </AppContext.Provider>
  );
}

export default App;

```

We can now see two columns, one which contains the main component and one which contains the `Steps`. More components can be added into the `steps` list of components and can be rendered by changing the `currentStep` variable.

We can try this with the `DocumentStoreDeploy` component and add a `Next` button which would allow the user to move on to the next step, once the current step is complete.

```tsx
  ...

  const {
    signer,
    documentStoreAddress,
    setDocumentStoreAddress,
    setCurrentStep,
    currentStep,
  } = useContext(AppContext);

...

  return (
    <div>
      {documentStoreAddress ? (
        <p>Document store deployed at {documentStoreAddress}</p>
      ) : (
        <p>No document store deployed</p>
      )}
      <Row gutter={12}>
        <Col>
          <Button
            disabled={!signer}
            loading={loading}
            type={documentStoreAddress ? "default" : "primary"}
            onClick={onClick}
          >
            Deploy
          </Button>
        </Col>
        {documentStoreAddress && (
          <Col>
            <Button
              type="primary"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );

```

Let's move on!

### DNS Configuration

A verifiable document requires a DNS as proof of identity, which is checked during the verification phase. For this application, we will create a simple `Input` component for the user to input their own domain name.

However, as configuring one's own DNS might be challenging, we can give the user instructions to get a temporary DNS from the Open Attestation CLI.

First, we have to add the variables `setDns` and `dns` to our `AppContext`

```tsx
import { JsonRpcSigner } from "@ethersproject/providers";
import { createContext } from "react";

interface IAppContext {
  signer?: JsonRpcSigner;
  documentStoreAddress?: string;
  setDocumentStoreAddress: (documentStoreAddress: string) => void;
  dns?: string;
  setDns: (dns: string) => void;
}

export const AppContext = createContext<IAppContext>({
  setDocumentStoreAddress: () => null,
  setDns: () => null,
});
```

and create a new state variable in `App.tsx`

```tsx
...

function App() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [documentStoreAddress, setDocumentStoreAddress] = useState<string>();
  const [dns, setDns] = useState<string>();

...
```

We can now create a new file `DnsConfig.tsx` which provides a link to download the Open Attestation CLI and the command to run in order to get a temporary DNS. We also provide an `Input` component for the user to input their DNS. The `dns` is then set in the context state.

```tsx
import { CopyOutlined } from "@ant-design/icons";
import { Button, Col, Input, message, Row } from "antd";
import { FunctionComponent, useContext, useRef } from "react";
import { AppContext } from "../AppContext";

export const DnsConfig: FunctionComponent = () => {
  const { documentStoreAddress, setDns, dns, setCurrentStep, currentStep } = useContext(AppContext);

  const dnsRef = useRef<any>();

  const onCopy = (e: any) => {
    navigator.clipboard.writeText(e.target.innerText);
    message.success("Successfully copied!");
  };

  const onConfirm = () => {
    setDns(dnsRef.current.state.value as string);
  };

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        Install the{" "}
        <a target="_blank" rel="noreferrer" href="https://www.openattestation.com/docs/component/open-attestation-cli">
          Open Attestation CLI
        </a>
        &nbsp; here and paste the command below into a terminal to get a temporary DNS
      </div>
      <Row
        align="top"
        style={{
          fontFamily: "monospace",
          backgroundColor: "#011627",
          padding: 12,
          borderRadius: 6,
          color: "white",
          cursor: "copy",
          marginBottom: 16,
        }}
        onClick={onCopy}
      >
        <Col span={23}>
          <div>
            open-attestation dns txt-record create --address&nbsp;
            {documentStoreAddress} --network-id 3
          </div>
        </Col>
        <Col style={{ textAlign: "end" }} span={1}>
          <CopyOutlined />
        </Col>
      </Row>
      <div>
        <Input
          defaultValue={dns}
          style={{ marginBottom: 12 }}
          ref={dnsRef}
          placeholder="few-green-cat.sandbox.openattestation.com"
        />
        <Row gutter={12}>
          <Col>
            <Button type={dns ? "default" : "primary"} onClick={onConfirm}>
              Confirm
            </Button>
          </Col>
          {dns && (
            <Col>
              <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
                Next
              </Button>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};
```

### Verifiable Document Form

We would need to provide an interface for our users to change the values of the documents that they want to issue. We can do so by easily creating a form by using the `Form` component provided by AntDesign.

Create a new file `DocumentForm.js` with the following code:

> For the sake of brevity, this tutorial only includes a few fields in the form. Feel free to extend on this tutorial and complete the form to match the schema of the _SIMPLE_COO_ template!

```tsx
import { Form, Input, Button, Row, message, Col } from "antd";
import { FunctionComponent, useContext, useState } from "react";
import { AppContext } from "../AppContext";

export const DocumentForm: FunctionComponent = () => {
  const [form] = Form.useForm();

  const { signer, documentStoreAddress, dns, setCurrentStep, currentStep } = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (formValues: any) => {
    console.log(formValues);
  };

  const labelCol = { span: 24 };

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item
        labelCol={labelCol}
        name="documentName"
        label="Document Name"
        initialValue="Form for Free Trade Agreement"
      >
        <Input />
      </Form.Item>

      <Form.Item
        labelCol={labelCol}
        name="issueDateAndTime"
        label="Issued Date &amp; Time"
        initialValue="21 September 2021, 3:05pm"
      >
        <Input />
      </Form.Item>

      <Form.Item labelCol={labelCol} name="issueIn" label="Issued In" initialValue="Singapore">
        <Input />
      </Form.Item>

      <Form.Item labelCol={labelCol} name="cooId" label="Coo Id" initialValue="123456">
        <Input />
      </Form.Item>

      <Form.Item labelCol={labelCol}>
        <Row gutter={12}>
          <Col>
            <Button loading={loading} type={issued ? "default" : "primary"} htmlType="submit">
              Submit
            </Button>
          </Col>
          {issued && (
            <Col>
              <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
                Next
              </Button>
            </Col>
          )}
        </Row>
      </Form.Item>
    </Form>
  );
};

export default DocumentForm;
```

Once we have the `formValues`, we can being to create a raw document, wrap and issue. Let's create the appropriate services for these functions.

In `services.tsx`

```tsx
import { wrapDocument } from "@govtechsg/open-attestation";
import { WrappedDocument } from "@govtechsg/open-attestation/dist/types/2.0/types";

...

export const getRawDocument = ({
  formValues,
  documentStoreAddress,
  dns,
}: {
  formValues: Record<string, any>;
  documentStoreAddress: string;
  dns: string;
}) => {
  return {
    $template: {
      name: "SIMPLE_COO",
      type: "EMBEDDED_RENDERER",
      url: "https://generic-templates.tradetrust.io",
    },
    issuers: [
      {
        name: "Demo Issuer",
        documentStore: documentStoreAddress,
        identityProof: {
          type: "DNS-TXT",
          location: dns,
        },
      },
    ],
    ...formValues,
  };
};

export const getWrappedDocument = (rawDocument: any) => {
  const wrappedDocument = wrapDocument(rawDocument);
  return wrappedDocument;
};

export const issueDocument = async ({
  wrappedDocument,
  documentStoreAddress,
  signer,
}: {
  wrappedDocument: WrappedDocument;
  documentStoreAddress: string;
  signer: JsonRpcSigner;
}) => {
  const {
    signature: { targetHash },
  } = wrappedDocument;
  const documentStore = DocumentStoreFactory.connect(
    documentStoreAddress,
    signer
  );
  const receipt = await documentStore.issue(`0x${targetHash}`);
  await receipt.wait();
};

```

#### getRawDocument

`getRawDocument` receives `formValues`, the `documentStoreAddress` and the `dns`, and returns an object with additional `$template` and `issuers` fields.

The `$template` field specifies the template to be used to render the verifiable document. You can learn how to create your own document renderer [here](docs/developer-section/quickstart/create-custom-renderer).

The `issuers` field specifies the identity proof and document store address of the issuers.

#### getWrappedDocument

`getWrappedDocument` receives a `rawDocument` and calls the `wrapDocument` function from `@govtechsg/open-attestation`. Wrapping a document enables the non-tampering feature of the verifiable document.

#### issueDocument

`issueDocument` receives a `wrappedDocument`, the `documentStoreAddress` and a `signer` to issue the `wrappedDocument`. Once the document has been issued, it can be verified.

We can now call these services sequentially in `DocumentForm.tsx` when the form is submitted

```tsx
const onFinish = async (formValues: any) => {
  try {
    setLoading(true);
    const rawDocument = getRawDocument({
      formValues,
      documentStoreAddress: documentStoreAddress!,
      dns: dns!,
    });

    const wrappedDocument = getWrappedDocument(rawDocument);
    setWrappedDocument(wrappedDocument);

    await issueDocument({
      wrappedDocument,
      signer: signer!,
      documentStoreAddress: documentStoreAddress!,
    });

    setIssued(true);
    setLoading(false);

    message.success("Document successsfully issued");
  } catch (e: any) {
    setLoading(false);
    message.error(e.message);
  }
};
```

We also set the `loading` variable to notify the user of the status of the transaction, and set the `wrappedDocument` in state. After successful issuing of the document, we can allow the user to download the `wrappedDocument` to be submitted for verification.

### Further Actions

Once the document has been issued, we can give the users the options to download the issued `wrappedDocument`, go to the verification site or to issue another document. We can create another file `Actions.tsx` to provide these components.

1. `Download` allows the user to download the `wrappedDocument` and save it on their machine

2. `Verify` links to the verification site where the user can upload and verify the issued `wrappedDocument`

3. `Create Another` restarts the issuing process and allows the user to create and issue another `wrappedDocument`

```tsx
import { Button, Col, Row } from "antd";
import { FunctionComponent, useContext } from "react";
import { AppContext } from "../AppContext";
import { saveAs } from "file-saver";

export const Actions: FunctionComponent = () => {
  const { wrappedDocument, setCurrentStep, currentStep, setIssued } = useContext(AppContext);

  const download = () => {
    const blob = new Blob([JSON.stringify(wrappedDocument)], {
      type: "text/json;charset=utf-8",
    });
    saveAs(blob, `SIMPLE_COO_DOCUMENT.tt`);
  };

  const onCreateAnother = () => {
    setCurrentStep(currentStep - 1);
    setIssued(false);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col>
          <Button type="primary" onClick={download}>
            Download
          </Button>
        </Col>
        <Col>
          <Button type="primary" ghost target="_blank" rel="noreferrer" href="https://dev.tradetrust.io/verify">
            Verify
          </Button>
        </Col>
        <Col>
          <Button onClick={onCreateAnother}>Create Another</Button>
        </Col>
      </Row>
    </div>
  );
};
```

Finally, we should import the `DnsConfig`, `DocumentForm` and `Actions` components into `App.tsx` and add them as components to our list of steps. We should also add the necessary variables to our context and state.

In `AppContext.tsx`

```tsx
import { WrappedDocument } from "@govtechsg/open-attestation/dist/types/2.0/types";
import { JsonRpcSigner } from "@ethersproject/providers";
import { createContext } from "react";

interface IAppContext {
  signer?: JsonRpcSigner;
  documentStoreAddress?: string;
  setDocumentStoreAddress: (documentStoreAddress: string) => void;
  dns?: string;
  setDns: (dns: string) => void;
  wrappedDocument?: WrappedDocument;
  setWrappedDocument: (wrappedDocument: WrappedDocument) => void;
  issued?: boolean;
  setIssued: (issued: boolean) => void;
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
}

export const AppContext = createContext<IAppContext>({
  currentStep: 0,
  setCurrentStep: () => null,
  setDocumentStoreAddress: () => null,
  setDns: () => null,
  setWrappedDocument: () => null,
  setIssued: () => null,
});
```

In `App.tsx`

```tsx
...
import { DnsConfig } from "./components/DnsConfig";
import { DocumentForm } from "./components/DocumentForm";
import { Actions } from "./components/Actions";
...

  const [wrappedDocument, setWrappedDocument] = useState<WrappedDocument>();
  const [dns, setDns] = useState<string>();
  const [issued, setIssued] = useState<boolean>();

  const steps = [
    {
      title: "Deploy Document Store",
      component: <DocumentStoreDeploy />,
      icon: <ShopOutlined />
    },
    {
      title: "Domain Name Configuration",
      component: <DnsConfig />,
      icon: <CloudServerOutlined />
    },
    {
      title: "Document Form",
      component: <DocumentForm />,
      icon: <FormOutlined />
    },
    {
      title: "Download & Verify",
      component: <Actions />,
      icon: <CheckCircleOutlined />
    },
  ];


...
return (
      <AppContext.Provider
      value={{
        signer,
        wrappedDocument,
        setWrappedDocument,
        documentStoreAddress,
        setDocumentStoreAddress,
        dns,
        setDns,
        issued,
        setIssued,
        currentStep,
        setCurrentStep,
      }}
    >
      <Row style={{ height: "100vh" }} justify="center" align="middle">
        <Row
          gutter={24}
          style={{
            width: 1000,
            minHeight: 400,
            margin: "auto",
          }}
        >
          <Col span={18}>
            <Card
              title={`${currentStep + 1}. ${steps[currentStep].title}`}
              style={{ height: "100%" }}
            >
              {steps[currentStep].component}
            </Card>
          </Col>
          <Col span={6}>
            <Steps
              direction="vertical"
              style={{ marginBottom: 24, height: "100%" }}
              current={currentStep}
            >
              {steps.map((step) => (
                <Step
                  key={step.title}
                  title={step.title}
                  icon={step.icon}
                />
              ))}
            </Steps>
          </Col>
        </Row>
      </Row>
    </AppContext.Provider>
)

```

As an optional feature, we can also allow the user to go back to a previous component, if a certain condition has been met, by clicking on the corresponding step. We do this by setting a `clickable` flag in the `steps` array. For example, the step _Deploy Document Store_ is clickable only if a document store has been deployed and the `documentStoreAddress` has been set.

```tsx
const steps = [
  {
    title: "Deploy Document Store",
    component: <DocumentStoreDeploy />,
    icon: <ShopOutlined />,
    clickable: documentStoreAddress !== undefined,
  },
  {
    title: "Domain Name Configuration",
    component: <DnsConfig />,
    icon: <CloudServerOutlined />,
    clickable: dns !== undefined,
  },
  {
    title: "Document Form",
    component: <DocumentForm />,
    icon: <FormOutlined />,
    clickable: issued,
  },
  {
    title: "Download & Verify",
    component: <Actions />,
    icon: <CheckCircleOutlined />,
    clickable: issued,
  },
];
```

We can then disable the `Step` component based on the `clickable` flag

```tsx
<Step
  key={step.title}
  disabled={!step.clickable}
  title={step.title}
  icon={step.icon}
  onStepClick={step.clickable ? (nextStep) => setCurrentStep(nextStep) : undefined}
/>
```

Congrats! You've created your very own Verifiable Document Issuer!

## Github Code

You can clone the complete repository for the demo [here](https://github.com/waynewee/verifiable-document-issuer-demo).

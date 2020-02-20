---
id: document-store
title: Deploying Document Store Smart Contract
sidebar_label: Deploying Document Store
---

The document store is a smart contract on the Ethereum network that records the issuance and revocation status of OA documents. In this guide, we will deploy a document store smart contract on the Ethereum `ropsten` network which is a test network that does not require actual ethers for transactions.

## Pre-requisite

- Chrome browser
- Metamask setup

A guide to setting up metamask is available in ["Test Account Setup"](/docs/appendix/ropsten-setup) in the appendix.

## Deploying via Web Application

![Admin Interface](/docs/verifiable-document/document-store/interface.png)

We have provided a web interface to deploy the document store smart contract at https://admin.tradetrust.io/.

### 1. Change Metamask Network to Ropsten

![Connecting Metamask to Ropsten](/docs/verifiable-document/document-store/ropsten.png)

Connect metamask to the `ropsten` network by selecting "Ropsten Test Network" in the chrome plugin's header. You may be asked to log in at this step if you have not done so.

### 2. Connect Metamask to Web Application

![Admin Interface](/docs/verifiable-document/document-store/interface.png)

To interact with the decentralize application (Dapp), you will need to connect your metamask wallet to the webpage. Select "Metamask" on the web app to connect the Dapp to your wallet provider, metamask.

![Metamask Connection Request](/docs/verifiable-document/document-store/connection-request.png)

Click on "Connect" to allow the web app to interact with metamask wallet.

### 3. Deploying Document Store Smart Contract

![Filling in Organization name](/docs/verifiable-document/document-store/deploy.png)

You may enter your organization name as the "Issuer Name" and click "Deploy" to deploy the smart contract.

![Confirming Transaction](/docs/verifiable-document/document-store/confirmation.png)

After clicking on "Deploy", you will be asked to confirm the transaction in a separate popup. Click "Confirm" to continue.

![Successful deployment](/docs/verifiable-document/document-store/success.png)

Once your document store smart contract has been successfully deployed, you will see the success message with the `Store Address`.

> Save this value for future reference.

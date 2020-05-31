---
id: document-store
title: Deploying Document Store Smart Contract
sidebar_label: Deploying Document Store
---

The document store is a smart contract on the Ethereum network that records the issuance and revocation status of OA documents. In this guide, we will deploy a document store smart contract on the Ethereum `ropsten` network, which is a test network that does not require actual [ethers] for transactions.

## Prerequisites

- Google Chrome web browser
- Metamask setup, refer to the [Test Account Setup](/docs/appendix/ropsten-setup) section for the setup guide

## Deployment Methods

Currently, we provide two ways of deploying the document store smart contract onto Ethereum:

- [TradeTrust Admin Portal](https://admin.tradetrust.io/), a web app
- [Open Attestation CLI](https://github.com/Open-Attestation/open-attestation-cli), a command line tool

They are both decentralized apps (Dapps) as both enable you to interact with smart contracts on the Ethereum blockchain.

In this guide however, we will only be using the web app since it provides a no-code option to deploy the document store.

![Admin Interface](/docs/verifiable-document/document-store/interface.png)

### Change Metamask Network to Ropsten

![Connecting Metamask to Ropsten](/docs/verifiable-document/document-store/ropsten.png)

Connect Metamask to the Ethereum `ropsten` network by selecting _Ropsten Test Network_ in the Google Chrome plugin's header. You may be asked to log in at this step if you have not done so.

### Connect Metamask to Web App

![Admin Interface](/docs/verifiable-document/document-store/interface.png)

To interact with the TradeTrust Admin Portal web app, you will need to connect your Metamask wallet. Select _Metamask_ on the web app to connect it to your Metamask wallet.

![Metamask Connection Request](/docs/verifiable-document/document-store/connection-request.png)

Click on _Connect_ to allow the web app to interact with Metamask wallet.

### Deploying Document Store Smart Contract

![Filling in Organization name](/docs/verifiable-document/document-store/deploy.png)

Enter your organization name as the _Issuer Name_ and click _Deploy_ to deploy the document store as an Ethereum smart contract.

![Confirming Transaction](/docs/verifiable-document/document-store/confirmation.png)

After clicking on _Deploy_, you will be asked to confirm the transaction in a separate popup. Click _Confirm_ to continue.

![Successful deployment](/docs/verifiable-document/document-store/success.png)

Once your document store smart contract has been successfully deployed, you will see the success message with the document store address. In the example above, the document store address is `0xED2E50434Ac3623bAD763a35213DAD79b43208E4` and is **NOT** the Transaction ID.

**Please save this address in your notepad as the web app does not keep track of your document store addresses.** You will need this address to complete the tutorial.

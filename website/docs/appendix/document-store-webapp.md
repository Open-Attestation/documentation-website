---
id: document-store-webapp
title: Deploying Document Store with Web app
sidebar_label: Deploying Document Store with Web app
---

This guide will help you to deploy a document store using one of the available web application. You will find more details about document store on the [main guide page](/docs/verifiable-document/document-store)

Currently, there exists 2 web application:

- [TradeTrust Admin Portal](https://admin.tradetrust.io/)
- [OpenCerts Admin Portal](https://admin.opencerts.io/)

## Prerequisites

- Google Chrome web browser
- Metamask setup, refer to the [Test Account Setup](/docs/appendix/ropsten-setup) section for the setup guide

![Admin Interface](/docs/appendix/document-store-webapp/interface.png)

## Change Metamask Network to Ropsten

![Connecting Metamask to Ropsten](/docs/appendix/document-store-webapp/ropsten.png)

Connect Metamask to the Ethereum `ropsten` network by selecting _Ropsten Test Network_ in the Google Chrome plugin's header. You may be asked to log in at this step if you have not done so.

## Connect Metamask to Web App

![Admin Interface](/docs/appendix/document-store-webapp/interface.png)

To interact with the TradeTrust Admin Portal web app, you will need to connect your Metamask wallet. Select _Metamask_ on the web app to connect it to your Metamask wallet.

![Metamask Connection Request](/docs/appendix/document-store-webapp/connection-request.png)

Click on _Connect_ to allow the web app to interact with Metamask wallet.

## Deploying Document Store Smart Contract

![Filling in Organization name](/docs/appendix/document-store-webapp/deploy.png)

Enter your organization name as the _Issuer Name_ and click _Deploy_ to deploy the document store as an Ethereum smart contract.

![Confirming Transaction](/docs/appendix/document-store-webapp/confirmation.png)

After clicking on _Deploy_, you will be asked to confirm the transaction in a separate popup. Click _Confirm_ to continue.

![Successful deployment](/docs/appendix/document-store-webapp/success.png)

Once your document store smart contract has been successfully deployed, you will see the success message with the document store address. In the example above, the document store address is `0xED2E50434Ac3623bAD763a35213DAD79b43208E4`, please do **NOT** use the Transaction ID.

**Save the document store address somewhere as the web app does not keep track of your document store addresses.**

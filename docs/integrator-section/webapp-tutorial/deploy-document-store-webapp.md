---
id: deploy-document-store-webapp
title: Deploy Document Store with Web app
sidebar_label: Deploy Document Store
---

This guide will help you to deploy a document store using one of the available web application. You will find more details about document store on the [main guide page](/docs/integrator-section/verifiable-document/ethereum/document-store)

Currently, there exists 2 web application:

- [OpenCerts Admin Portal](https://admin.opencerts.io/)
- [TradeTrust Admin Portal](https://admin.tradetrust.io/)

## Prerequisites

- Google Chrome web browser
- Metamask setup

![Admin Interface](/docs/integrator-section/webapp-tutorial/document-store-webapp/interface.png)

## Change Metamask Network to Sepolia

![Connecting Metamask to Sepolia](/docs/integrator-section/webapp-tutorial/document-store-webapp/sepolia.png)

Connect Metamask to the Ethereum `sepolia` network by selecting _Sepolia Test Network_ in the Google Chrome plugin's header. You may be asked to log in at this step if you have not done so.

## Connect Metamask to Web App

![Admin Interface](/docs/integrator-section/webapp-tutorial/document-store-webapp/interface.png)

To interact with the OpenCerts Admin Portal web app, you will need to connect your Metamask wallet. Select _Metamask_ on the web app to connect it to your Metamask wallet.

![Metamask Connection Request](/docs/integrator-section/webapp-tutorial/document-store-webapp/select-wallet.png)

Click on _Connect_ to allow the web app to interact with Metamask wallet.

## Deploying Document Store Smart Contract

![Filling in Organization name](/docs/integrator-section/webapp-tutorial/document-store-webapp/deploy.png)

Enter your organization name as the _Issuer Name_ and click _Deploy_ to deploy the document store as an Ethereum smart contract.

![Confirming Transaction](/docs/integrator-section/webapp-tutorial/document-store-webapp/confirmation.png)

After clicking on _Deploy_, you will be asked to confirm the transaction in a separate popup. Click _Confirm_ to continue.

![Successful deployment](/docs/integrator-section/webapp-tutorial/document-store-webapp/success.png)

Once your document store smart contract has been successfully deployed, you will see the success message with the document store address. In the example above, the document store address is `0x56Fffcd6A79b65d911ee42Bc077DE8cFe9fAdeD4`, please do **NOT** use the Transaction ID.

**Save the document store address somewhere as the web app does not keep track of your document store addresses.**

---
id: deploy-document-store-webapp
title: Deploying Document Store with Web App
sidebar_label: Deploying Document Store
---

This guide will help you deploy a document store using one of the available web applications. 

Currently, there are 2 web applications:

- [OpenCerts Admin Portal](https://admin.opencerts.io/)
- [TradeTrust Admin Portal](https://admin.tradetrust.io/)

In this tutorial, we will use the first web app.

## Prerequisites

- Google Chrome web browser
- MetaMask extension in Google Chrome

## Change MetaMask network

<!-- #Flag# This section may need updating to reflect the new version of https://admin.opencerts.io/ -->

Perform these steps to connect MetaMask to the network you want to use:
1. Open the [OpenCerts Admin Portal](https://admin.opencerts.io/) in Google Chrome. On the Welcome page, click **MetaMask**.

![Admin Interface](/docs/integrator-section/webapp-tutorial/document-store-webapp/interface.png)

2. On the Chrome address bar, click **Extensions**. Select **MetaMask**.

    If prompted, log in with your user credentials.

3. Choose **Show test networks**.
4. Select **Sepolia** from the list.

![MetaMask](/docs/integrator-section/webapp-tutorial/document-store-webapp/sepolia.png)

## Connect MetaMask to web app

To interact with the OpenCerts Admin Portal web app, you will need to connect your MetaMask wallet. 

1. Open the [OpenCerts Admin Portal](https://admin.opencerts.io/) in Google Chrome. On the Welcome page, click **MetaMask**.

![Admin Interface](/docs/integrator-section/webapp-tutorial/document-store-webapp/interface.png)

2. On the Chrome address bar, click **Extensions**. Select **MetaMask**.
    
    If prompted, log in with your user credentials.

3. Select a wallet and click **Next**.

![MetaMask Connection Request](/docs/integrator-section/webapp-tutorial/document-store-webapp/select-wallet.png)

4. Click **Connect** to allow the web app to interact with the MetaMask wallet.

## Deploying Document Store Smart Contract

1. In the [OpenCerts Admin Portal](https://admin.opencerts.io/), enter your organization name into the **Issuer Name** field. 

![Filling in Organization name](/docs/integrator-section/webapp-tutorial/document-store-webapp/deploy.png)

2. Click **Deploy** to deploy the document store as an Ethereum smart contract.

3. After that, you will be asked to confirm the transaction in a pop-up dialog. Click **Confirm** to continue.

![Confirming Transaction](/docs/integrator-section/webapp-tutorial/document-store-webapp/confirmation.png)

4. Once your document store smart contract has been successfully deployed, a success message **"New store deployed at..."** will display with the document store address. 

    In the example below, the document store address is `0x56Fffcd6A79b65d911ee42Bc077DE8cFe9fAdeD4`. Do **not** use the Transaction ID.

>**Important:** Save the document store address somewhere, as the web app does not keep track of your document store addresses.

![Successful deployment](/docs/integrator-section/webapp-tutorial/document-store-webapp/success.png)

## Additional reading
You will find more details about document store on [this page](/docs/integrator-section/verifiable-document/ethereum/document-store).
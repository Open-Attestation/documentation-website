---
id: web-app-deploy
title: Deploy document store with web app
sidebar_label: Deploy document store with web app
---

This guide shows how to deploy a document store using one of the available web applications.

Currently, there are two web applications:

- [OpenCerts Admin Portal](https://admin.opencerts.io/)
- [TradeTrust Admin Portal](https://admin.tradetrust.io/)

In this tutorial, you will use the first web app.

## Prerequisites

- Google Chrome web browser
- MetaMask extension in Google Chrome

## Change MetaMask network

<!-- #Flag# This section may need updating to reflect the new version of https://admin.opencerts.io/ -->

Perform these steps to connect MetaMask to the network you want to use:
1. Open the [OpenCerts Admin Portal](https://admin.opencerts.io/) in Google Chrome. On the Welcome page, click **MetaMask**.

![Admin Interface](/docs/guides-section/web-app-deploy/interface.png)

2. On the Chrome address bar, click **Extensions**. Select **MetaMask**.

    If prompted, log in with your user credentials.

3. Choose **Show test networks**.
4. Select **Sepolia** from the list.

![MetaMask](/docs/guides-section/web-app-deploy/sepolia.png)

## Connect MetaMask to web app

To interact with the OpenCerts Admin Portal web app, you will need to connect your MetaMask wallet. 

1. Open the [OpenCerts Admin Portal](https://admin.opencerts.io/) in Google Chrome. On the Welcome page, click **MetaMask**.

![Admin Interface](/docs/guides-section/web-app-deploy/interface.png)

2. On the Chrome address bar, click **Extensions**. Select **MetaMask**.
    
    If prompted, log in with your user credentials.

3. Select a wallet and click **Next**.

![MetaMask Connection Request](/docs/guides-section/web-app-deploy/select-wallet.png)

4. Click **Connect** to make the web app interact with the MetaMask wallet.

## Deploying Document Store Smart Contract

1. In the [OpenCerts Admin Portal](https://admin.opencerts.io/), enter your organization name into the **Issuer Name** field. 

![Filling in Organization name](/docs/guides-section/web-app-deploy/deploy.png)

2. Click **Deploy** to deploy the document store as an Ethereum smart contract.

3. After that, you will be asked to confirm the transaction in a pop-up dialog. Click **Confirm** to continue.

![Confirming Transaction](/docs/guides-section/web-app-deploy/confirmation.png)

4. Once your document store smart contract has been successfully deployed, a success message **"New store deployed at..."** will display with the document store address. 

    In the example below, the document store address is `0x56Fffcd6A79b65d911ee42Bc077DE8cFe9fAdeD4`. Do **not** use the Transaction ID.

>**Important:** Save the document store address somewhere, as the web app does not keep track of your document store addresses.

![Successful deployment](/docs/guides-section/web-app-deploy/success.png)

## Additional reading
You will find more details about document store on [this page](/docs/ethereum-section/document-store).
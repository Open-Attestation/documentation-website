---
id: revoke-document-store-webapp
title: Revoking Document with Web App
sidebar_label: Revoking Document
---

This guide will help you revoke a hash using one of the available web applications. 

Currently, there are 2 web applications:

- [OpenCerts Admin Portal](https://admin.opencerts.io/)
- [TradeTrust Admin Portal](https://admin.tradetrust.io/)

In this tutorial, we will use the first web app.

## Prerequisites

- Google Chrome web browser
- MetaMask extension in Google Chrome
- A document store
- A merkle root

## Revoking the document

1. After connecting with MetaMask, open the [OpenCerts Admin Portal](https://admin.opencerts.io/) in Google Chrome. On the Welcome page, click **MetaMask**.

2. Enter the `document store smart contract address` from the [deployment guide](/docs/integrator-section/webapp-tutorial/deploy-document-store-webapp/) into the **Store address** field. 

![Revoking Interface](/docs/integrator-section/webapp-tutorial/revoking-webapp/revoking.png)

3. Select **Revoke certificate** on the left navigation.

4. Paste the value of `merkleRoot` from the document into the field. Click **Revoke**. 

    A pop-up message may display, asking **"Are you sure you want to revoke this hash?"**. Click **OK**. 

    ![Admin Portal message](/docs/integrator-section/webapp-tutorial/revoking-webapp/admin-portal-message.png)

    You will also need to confirm your transaction in the MetaMask extension.

5. Once the `merkleRoot` has been issued, a success message **"Revoked certificate batch"** will display.

![Revoke Success](/docs/integrator-section/webapp-tutorial/revoking-webapp/success.png)

## Additional reading
You will find more details about revoking on [this page](/docs/integrator-section/verifiable-document/ethereum/revoking-document).

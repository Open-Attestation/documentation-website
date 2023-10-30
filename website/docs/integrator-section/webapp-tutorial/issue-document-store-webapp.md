---
id: issue-document-store-webapp
title: Issuing Document with Webapp
sidebar_label: Issuing Document Store
---

This guide will help you issue a hash using one of the available web applications. You will find more details about issuing on [this page](/docs/integrator-section/verifiable-document/ethereum/issuing-document).

Currently, there are 2 web applications:

- [OpenCerts Admin Portal](https://admin.opencerts.io/)
- [TradeTrust Admin Portal](https://admin.tradetrust.io/)

In this tutorial, we will use the first webapp.

## Prerequisites

- Google Chrome web browser
- MetaMask extension in Google Chrome
- A document store
- A merkle root

## Issuing the document

1. After connecting with MetaMask, open the [OpenCerts Admin Portal](https://admin.opencerts.io/) in Google Chrome. On the Welcome page, click **MetaMask**.

2. Enter the `document store smart contract address` from the [deployment guide](/docs/integrator-section/webapp-tutorial/deploy-document-store-webapp/) into the **Store address** field. 

![Issuing Interface](/docs/integrator-section/webapp-tutorial/issuing-webapp/issuing.png)

3. Select **Issue certificate batch** on the left navigation.

4. Paste the `merkleRoot` value from the document into the **Issue certificates with the Merkle Root Hash** field. Click **Issue**. 

  You will also need to confirm your transaction in the MetaMask extension.

  The following shows an example. For this document, `76a934e2ce9db63cb5e54bed8ac965a8937ee9e823b894ccf6569141187a475c` is the value you need to issue.

```json
  "signature": {
    "type": "SHA3MerkleProof",
    "targetHash": "aca8c3aac94fcdb68b504b38fda22633c798d76c744e5ac37f945c314f03637a",
    "proof": [
      "e27b0fac7c5e59c76a8d719a5dc46971cd43c23a5825fcb78aafeb5abd3f5ffa",
      "802ad0e0a625c8c12a61c9fc42ffd6bdd50dfeac10fd7929a4ff93ef97622ede"
    ],
    "merkleRoot": **"76a934e2ce9db63cb5e54bed8ac965a8937ee9e823b894ccf6569141187a475c"**
  }
```

5. Once the merkle root has been issued, a success message **"Batch has been issued"** will display.

![Issuance Success](/docs/integrator-section/webapp-tutorial/issuing-webapp/success.png)



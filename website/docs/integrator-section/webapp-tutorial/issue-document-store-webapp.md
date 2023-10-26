---
id: issue-document-store-webapp
title: Issuing Document with Web app
sidebar_label: Issuing Document Store
---

This guide will help you to issue a hash using one of the available web application. You will find more details about issuing on the [main guide page](/docs/integrator-section/verifiable-document/ethereum/issuing-document)

Currently, there are 2 web applications:

- [OpenCerts Admin Portal](https://admin.opencerts.io/)
- [TradeTrust Admin Portal](https://admin.tradetrust.io/)

## Prerequisites

- Google Chrome web browser
- MetaMask extension set up in Google Chrome
- A document store
- A merkle root

## Issuing the document

![Issuing Interface](/docs/integrator-section/webapp-tutorial/issuing-webapp/issuing.png)

After connecting MetaMask, you will be logged into the web application. First, you need to enter the `document store smart contract address` from the [previous guide](/docs/integrator-section/webapp-tutorial/deploy-document-store-webapp/) into the "Store address" field. Then, select "Issue Document Batch" on the navigation on the left.

Paste the value of `merkleRoot` from the document into the field and click on "Issue". You will need to confirm your transaction on MetaMask.

Example:

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

For this document, `76a934e2ce9db63cb5e54bed8ac965a8937ee9e823b894ccf6569141187a475c` is the value you need to issue.

![Issuance Success](/docs/integrator-section/webapp-tutorial/issuing-webapp/success.png)

Once the merkle root has been issued, you will see the success message "Batch has been issued".

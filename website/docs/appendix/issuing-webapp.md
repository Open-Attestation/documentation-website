---
id: issuing-webapp
title: Issuing Document with Web app
sidebar_label: Issuing Document with Web app
---

This guide will help you to issue a hash using one of the available web application. You will find more details about issuing on the [main guide page](/docs/verifiable-document/issuing-document)

Currently, there exists 2 web application:

- [TradeTrust Admin Portal](https://admin.tradetrust.io/)
- [OpenCerts Admin Portal](https://admin.opencerts.io/)

## Prerequisites

- Google Chrome web browser
- Metamask setup, refer to the [Test Account Setup](/docs/appendix/ropsten-setup) section for the setup guide
- A document store
- A merkle root

## Issuing the document

![Issuing Interface](/docs/appendix/issuing-webapp/issuing.png)

After connecting Metamask, you will be logged into the web application. First, you need to enter the `document store smart contract address` from the [previous guide](/docs/verifiable-document/document-store/) into the "Store address" field. Then, select "Issue Document Batch" on the navigation on the left.

Paste the value of `merkleRoot` from the document into the field and click on "Issue". You will need to confirm your transaction on Metamask.

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

![Issuance Success](/docs/appendix/issuing-webapp/success.png)

Once the merkle root has been issued, you will see the success message "Batch has been issued".

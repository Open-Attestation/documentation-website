---
id: issuing-document
title: Issuing Documents
sidebar_label: Issuing Documents
---

After wrapping the documents and obtaining a merkle root, the documents are ready to be issued on the document store smart contract. To issue a batch of documents, we will use the merkle root that will be appended to the list of issued documents on the document store. This issuance only needs to be done once for all documents in a batch.

In this guide, we will make use of a web application to issue the documents.

## Pre-requisite

- Chrome browser
- Metamask setup

## Issuing via Web Application

To issue the documents, we will use the application that we previously used when we created the document store smart contract: https://admin.tradetrust.io.

![Issuing Interface](/docs/verifiable-document/issuing-document/issuing.png)

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

![Issuance Success](/docs/verifiable-document/issuing-document/success.png)

Once the merkle root has been issued, you will see the success message "Batch has been issued".

At this point, all the documents in the same batch will become valid OpenAttestation documents. You may drop any of the documents that was generated in the `wrapped-documents` folder during the [previous step](/docs/verifiable-document/document-data) into a valid OA compliant website connected to the **_ropsten_** test network like https://dev.tradetrust.io or https://dev.opencerts.io to view it.

🎉 Congratulations, you have completed the getting started guide to create your own Verifiable Document! You may wish to visit the topic on "[Next Steps](/docs/verifiable-document/next-steps)" to learn how to issue verifiable documents in the production environment.

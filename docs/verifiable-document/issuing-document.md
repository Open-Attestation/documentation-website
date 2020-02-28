---
id: issuing-document
title: Issuing Documents
sidebar_label: Issuing Documents
---

After wrapping the documents and obtaining the merkle root. The documents are now ready to be issued on the document store smart contract. To issue a document, the merkle root is simply appended to the list of issued documents on the document store.

In this guide, we will make use of a web application to issue the documents.

## Pre-requisite

- Chrome browser
- Metamask setup

## Issuing via Web Application

We will use the same web application used to create the document store smart contract, https://admin.tradetrust.io, to issue the documents.

![Issuing Interface](/docs/verifiable-document/issuing-document/issuing.png)

Upon logging into web application via Metamask, enter the `document store smart contract address` from the [previous guide](/docs/verifiable-document/document-store/) into the "Store address" field and select "Issue Document Batch" on the navigation on the right.

Paste the `merkle root` of the document into the field and click on "Issue". You will need to confirm your transaction on Metamask.

![Issuance Success](/docs/verifiable-document/issuing-document/success.png)

Once the merkle root has been issued, you wil see the success message "Batch has been issued".

At this point in time, all the documents in the same batch will become valid OpenAttestation document. You may drop any of the documents in the `wrapped-documents` folder in the [previous step](/docs/verifiable-document/document-data) into a valid OA compliant website connected to the **_ropsten_** test network like https://dev.tradetrust.io or https://dev.opencerts.io to view it.

Congratulation, you have completed the getting started guide to create your own Verifiable Document! You may wish to visit the topic on "[Next Steps](/docs/verifiable-document/next-steps)" to learn how to issue verifiable documents in production environment.

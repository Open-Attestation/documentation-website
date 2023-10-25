---
title: Wrapping Documents
sidebar_label: Wrapping Documents
---
import WrapSingleDocument from "/src/reusables/_wrap-single-document.mdx";

This task is same with the one [in the Ethereum tutorial](/docs/integrator-section/verifiable-document/ethereum/wrapping-document).

>**Note:** If you are using both the Ethereum and DID methods, use different folders to contain the wrapped documents. This will prevent the files from being overwritten.

## Running the wrap command

From the folder containing the `raw-documents-did` folder, run the command:

```sh
open-attestation wrap raw-documents-did --output-dir wrapped-documents-did
```

## Getting the response

In the response, you will see the success message with the `Batch Document Root`. 

```sh
✔  success   Batch Document Root: 0x80cc53b77c0539fc383f8d434ac5ffad281f3d64ae5a0e59e9f36f19548e1fff
```

## Saving the merkle root
In the above sample, the batch document root (also known as "merkle root") is `0x80cc53b77c0539fc383f8d434ac5ffad281f3d64ae5a0e59e9f36f19548e1fff`, you will definitely have a different value.

Save this value for future reference.

## Viewing the wrapped documents

At the same time, you will notice that another directory `wrapped-documents-did` has been created:

```text
wallet.json
raw-documents-did
  |-- certificate-1.json
  |-- certificate-2.json
wrapped-documents-did
  |-- certificate-1.json
  |-- certificate-2.json
```

In the `wrapped-documents-did` directory, you will find the wrapped document which can be sent to the recipient later, once the `merkleRoot` has been issued to the document store.

## Wrapping a single document
This is an alternative way. Instead of wrapping all documents in a folder in a batch, you can also wrap a single document at a time.

<WrapSingleDocument />

<!-- Reuse the steps to wrap a single document -->
---
id: wrapping-document-did
title: Wrapping Documents
sidebar_label: Wrapping Documents
---
import WrapSingleDocument from "/src/reusables/_wrap-single-document.mdx";
import WrapDocumentsInBatch from "/src/reusables/_wrap-documents-in-batch.mdx";

This task is same with the one [in the Ethereum tutorial](/docs/integrator-section/verifiable-document/ethereum/wrapping-document).

>**Note:** If you are using both the Ethereum and DID methods, use different folders to contain the wrapped documents. This will prevent the files from being overwritten.

## Replacing folder names

Before running the command below, replace the folder names. For example:

* Replace `<RAW_DOCUMENTS_FOLDER>` with `raw-documents-did`
* Replace `<WRAPPED_DOCUMENTS_FOLDER>` with `wrapped-documents-did`

<WrapDocumentsInBatch />

<!--
This file is mostly duplicated with the same content at the following locations:
1. docs/integrator-section/verifiable-document/did/wrapping-document-did.md
2. docs/integrator-section/verifiable-document/ethereum/wrapping-document.md
 -->

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
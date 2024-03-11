---
id: wrap-document-eth
title: Wrap documents
sidebar_label: Wrap documents
---
import RawDocument from "/src/reusables/_raw-document.mdx";
import WrapDocumentIntro from "/src/reusables/_wrap-document-intro.mdx";
import WrapSingleDocument from "/src/reusables/_wrap-single-document.mdx";
import WrapDocumentsInBatch from "/src/reusables/_wrap-documents-in-batch.mdx";

<RawDocument />

<WrapDocumentIntro />

>**Note:** Creating a single checksum is especially useful when using document store on the Ethereum blockchain to lower the transaction cost and time.

## Replacing folder names

>**Important:** If you are using both the Ethereum and DID methods, use different folders to contain the wrapped documents. This will prevent the files from being overwritten.

Before running the command below, replace the folder names. For example:

* Replace `<RAW_DOCUMENTS_FOLDER>` with `raw-documents`
* Replace `<WRAPPED_DOCUMENTS_FOLDER>` with `wrapped-documents`

<WrapDocumentsInBatch />

<!--
This file is mostly duplicated with the same content at the following locations:
1. docs/did-section/wrap-document-did.md
2. docs/ethereum-section/wrap-document-eth.md
 -->

## Viewing the wrapped documents

At the same time, you will notice that another directory `wrapped-documents` has been created:

```text
wallet.json
raw-documents
  |-- certificate-1.json
  |-- certificate-2.json
wrapped-documents
  |-- certificate-1.json
  |-- certificate-2.json
```

In the `wrapped-documents` directory, you will find the wrapped documents that will be issued on the document store using `merkleRoot` in the next article. 

## Wrapping a single document
This is an alternative way. Instead of wrapping all documents in a folder in a batch, you can also wrap a single document at a time.

<WrapSingleDocument />

<!-- Reuse the steps to wrap a single document -->
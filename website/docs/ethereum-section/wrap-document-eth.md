---
id: wrap-document-eth
title: Wrap documents
sidebar_label: Wrap documents
---
import WrapSingleDocument from "/src/reusables/_wrap-single-document.mdx";
import WrapDocumentsInBatch from "/src/reusables/_wrap-documents-in-batch.mdx";

Every OA document has a checksum that provides it a tamper-proof property. At the same time, because the checksum can be used to uniquely identify a document, the checksum (or its derived value) is stored onto the document store as evidence of issuance. To compute the checksum, a `raw document` goes through a process known as `wrapping` to become a `wrapped document`. Only then, the document is ready to be issued onto the blockchain.

Multiple documents can be wrapped at the same time in a single batch operation, creating a single checksum for the entire batch of raw documents. This is especially useful when using document store on the Ethereum blockchain to lower the transaction cost and time.

In this task, you will learn how to generate the checksum by running the `wrapping` process.

You will use the CLI tool to read all the files in the `raw-documents` folder, wrap them, and then output the files in another directory `wrapped-documents`.

A `merkleRoot`, a 64 character long string prepended with `0x` will be generated. The `merkleRoot` is the only information that will be stored onto the Blockchain to verify the issuance status of an OA document.

## Replacing folder names
Before running the command below, replace the folder names. For example:

* Replace `<RAW_DOCUMENTS_FOLDER>` with `raw-documents`
* Replace `<WRAPPED_DOCUMENTS_FOLDER>` with `wrapped-documents`

<WrapDocumentsInBatch />

<!--
This file is mostly duplicated with the same content at the following locations:
1. docs/integrator-section/verifiable-document/did/wrapping-document-did.md
2. docs/integrator-section/verifiable-document/ethereum/wrapping-document.md
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

In the `wrapped-documents` directory, you will find the wrapped document which can be sent to the recipient later, once the `merkleRoot` has been issued to the document store.

## Wrapping a single document
This is an alternative way. Instead of wrapping all documents in a folder in a batch, you can also wrap a single document at a time.

<WrapSingleDocument />

<!-- Reuse the steps to wrap a single document -->
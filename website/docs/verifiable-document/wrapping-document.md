---
id: wrapping-document
title: Wrapping Documents
sidebar_label: Wrapping Documents
---

Every OA document has a checksum that provides it a tamper-proof property. At the same time, because the checksum can be used to uniquely identify a document, the checksum (or its derived value) is stored onto the document store as evidence of issuance. To compute the checksum, a `raw document` goes through a process known as `wrapping` to become a `wrapped document`. Only then, the document is ready to be issued onto the blockchain.

Multiple documents can be wrapped at the same time in a single batch operation, creating a single checksum for the entire batch of raw documents. This is especially useful when using document store on the Ethereum blockchain to lower the transaction cost and time.

In this guide, we will learn how to generate the checksum by running the `wrapping` process.

We will use the CLI tool to read all the files in the `raw-documents` folder, wrap them and then output the files in another directory `wrapped-documents`.

A `merkleRoot`, a 64 character long string prepended with `0x` will be generated. The `merkleRoot` is the only information that will be stored onto the Blockchain to verify the issuance status of an OA document.

From the folder containing the `raw-documents` folder, run:

```sh
open-attestation wrap raw-documents --output-dir wrapped-documents
✔  success   Batch Document Root: 0x80cc53b77c0539fc383f8d434ac5ffad281f3d64ae5a0e59e9f36f19548e1fff
```

After running the CLI you will see the success message with the `Batch Document Root`. In the above sample, the document root (also known as merkle root) is `0x80cc53b77c0539fc383f8d434ac5ffad281f3d64ae5a0e59e9f36f19548e1fff`, you will definitely have a different value.

> Save this value for future reference.

At the same time, you will notice that another directory, `wrapped-document`, has been created:

```text
wallet.json
raw-documents
  |-- certificate-1.json
  |-- certificate-2.json
wrapped-documents
  |-- certificate-1.json
  |-- certificate-2.json
```

In the `wrapped-document` directory, you will find the wrapped document which can be sent to the recipient later once the `merkleRoot` has been issued to the document store.

---
id: wrapping-document
title: Wrapping Document
sidebar_label: Wrapping Document
---

Every OA document has a checksum that provides it a tamper-proof property. At the same time, because the checksum can be used to uniquely identify a document, the checksum (or its derived value) is stored onto the document store as evidence of issuance. To compute the checksum, a `raw document` goes through a process known as `wrapping` to become a `wrapped document`. Only then, the document is ready to be issued onto the blockchain.

Multiple documents can be wrapped at the same time in a single batch operation, creating a single checksum for the entire batch of raw documents. This is especially useful when using document store on the Ethereum blockchain to lower the transaction cost and time.

In this guide, we will learn how to generate the checksum by running the `wrapping` process.

## Prerequisites

- [OpenAttestation CLI](../component/open-attestation-cli) installed
- [Understanding the OA Document Schema](/docs/verifiable-document/document-data)

## Wrapping

[In the previous guide](/docs/verifiable-document/document-data) we have learnt how to create one raw document. We will now learn how to use the CLI to wrap it. In this step, we will issue an additional Certificate of Completion to another person at the same time to see how the CLI tool can wrap multiple unwrapped documents concurrently.

### Creating the raw document file

In a directory of your choice, create a folder named `raw-documents`:

```sh
mkdir raw-documents
cd raw-documents
```

Create a file named `coc-1.json` and paste the validated JSON from the previous guide into the file:

`coc-1.json`

```text
{
  "name": "OpenAttestation Tutorial Certificate of Completion",
  "$template": {
    "name": "COC",
    "type": "EMBEDDED_RENDERER",
    "url": "http://localhost:3000"
  },
  "recipient": {
    "name": "John Doe"
  },
  "issuers": [
    {
      "name": "Demo Issuer",
      "documentStore": "0x0000000000000000000000000000000000000000",
      "identityProof": {
        "type": "DNS-TXT",
        "location": "demo.openattestation.com"
      }
    }
  ]
}
```

Create another file named `coc-2.json` and paste the same validated JSON into the file, changing the `recipient.name` from your name to another person's name.

At this point in time, your directory should look like the following:

```text
raw-documents
  |-- coc-1.json
  |-- coc-2.json
```

### Wrapping the documents with the CLI tool

Now that we have all the raw documents in a single folder, we will use the CLI tool to read all the files in that folder, wrap documents and then output the files in another directory `wrapped-documents`.

At the same time a `merkleRoot`, a 64 character long string prepended with `0x` will be generated. The `merkleRoot` is the only information that will be stored onto the Blockchain to verify the issuance status of an OA document.

From the folder containing the `raw-documents` folder, run:

```sh
open-attestation wrap raw-documents --output-dir wrapped-documents
✔  success   Batch Document Root: 0x80cc53b77c0539fc383f8d434ac5ffad281f3d64ae5a0e59e9f36f19548e1fff
```

After running the CLI you will see the success message with the `Batch Document Root`. In the above sample, the document root (also known as merkle root) is `0x80cc53b77c0539fc383f8d434ac5ffad281f3d64ae5a0e59e9f36f19548e1fff`, you will definitely have a different value.

> Save this value for future reference.

At the same time, you will notice that another directory, `wrapped-document`, has been created:

```text
raw-documents
  |-- coc-1.json
  |-- coc-2.json
wrapped-documents
  |-- coc-1.json
  |-- coc-2.json
```

In the `wrapped-document` directory, you will find the wrapped document which can be sent to the recipient later once the document has been issued in the document store in the [next guide](/docs/verifiable-document/issuing-document).

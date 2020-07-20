---
id: preparing-transferable-record
title: Preparing Transferable Record
sidebar_label: Preparing Transferable Record
---

In this section, we will prepare the DNS and the content of the transferable record to be issued.

## DNS Configuration

Similar to [binding the document store to a domain name](../verifiable-document/document-store), you will have to bind the identity of the token registry to a domain name.

To do that simply create a `TXT` record on your domain with the following entry:

```txt
openatts net=ethereum netId=3 addr=0x8431012Bc040942B59e3C5bf428221eab0b2f723
```

You will need to replace the token registry address `0x8431012Bc040942B59e3C5bf428221eab0b2f723` with the address you've got from the previous step.

If you like to use our sandbox DNS for the purpose of the exercise, you may instead run the following command, following the instructions from [earlier](../verifiable-document/dns-proof/):

```sh
open-attestation dns txt-record create --address 0x8431012Bc040942B59e3C5bf428221eab0b2f723 --network-id 3
```

If you like more detailed setup instructions, you may refer to the [documentation for configuring DNS](../advanced/configuring-dns/).

> Take note of the domain you are inserting the records on, you will need this later

## Creating Raw Transferable Document

Similar to creating a verifiable document, you will need to create a raw JSON file with the content of the transferable record first.

Create a file `sample.json` in a folder `raw-documents`:

```json
{
  "$template": {
    "name": "main",
    "type": "EMBEDDED_RENDERER",
    "url": "https://tutorial-renderer.openattestation.com"
  },
  "recipient": {
    "name": "John Doe"
  },
  "issuers": [
    {
      "name": "Demo Issuer",
      "tokenRegistry": "0x8431012Bc040942B59e3C5bf428221eab0b2f723",
      "identityProof": {
        "type": "DNS-TXT",
        "location": "automatic-orange-grouse.sandbox.openattestation.com"
      }
    }
  ]
}
```

Remember to replace the `tokenRegistry` value with your token registry smart contract address from previous section and `location` with the domain you are issuing this document from.

Notice the difference between a transferable record and a verifiable document is the use of `tokenRegistry` instead of `documentStore` in declaring the smart contract address.

> For transferable record, you may not batch process it with other documents. Your directory `raw-documents` may only contain one file.

## Wrapping Transferable Document

With the raw transferable document, you are not ready to issue the document. Simple run the following command to wrap the `sample.json` and output it in another directory `wrapped-documents`:

```sh
open-attestation wrap raw-documents --output-dir wrapped-documents
```

You will see a familiar output with the merkle root of the transferable record after running the command:

```txt
✔  success   Batch Document Root: 0x0d9839a8034cb783d98bd57bcbaafb4dc3614c4193d2edf8a655c1ec6635b7ea
```

> Keep this value, the merkle root, for later steps.

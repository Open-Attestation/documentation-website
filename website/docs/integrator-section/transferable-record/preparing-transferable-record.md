---
id: preparing-transferable-record
title: Preparing Transferable Record
sidebar_label: Preparing Transferable Record
---
import WrapSingleDocument from "/src/reusables/_wrap-single-document.mdx";

In this section, we will prepare the DNS and the content of the transferable record to be issued.

## DNS Configuration

Similar to [binding the document store to a domain name](/docs/integrator-section/verifiable-document/ethereum/document-store), you will have to bind the identity of the token registry to a domain name.

To do that, create a `TXT` record on your domain with the following entry:

```txt
openatts net=ethereum netId=11155111 addr=0x8431012Bc040942B59e3C5bf428221eab0b2f723
```

You will need to replace the token registry address `0x8431012Bc040942B59e3C5bf428221eab0b2f723` with the address you get from the previous step.

If you want to use our sandbox DNS for the purpose of the exercise, run the following command instead following the instructions from [earlier](/docs/integrator-section/verifiable-document/ethereum/dns-proof):

```sh
open-attestation dns txt-record create --address 0x8431012Bc040942B59e3C5bf428221eab0b2f723 --network-id 11155111
```

If you want to view more detailed setup instructions, see the [documentation for configuring DNS](/docs/developer-section/quickstart/configure-dns).

>**Important:** Take note of the domain where you are inserting the records, because you will need the domain name later.

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

Remember to replace the `tokenRegistry` value with your token registry smart contract address from [previous section](/docs/integrator-section/transferable-record/token-registry) and `location` with the domain you are issuing this document from.

Notice the difference between a transferable record and a verifiable document is the use of `tokenRegistry` instead of `documentStore` in declaring the smart contract address.

>**Note:** For transferable record, you may not batch process it with other documents. Your directory `raw-documents` should contain only one file.

## Wrapping Transferable Document
Choose one of the following methods to wrap the Transferable Document.

### Wrapping the document from a folder

With the raw transferable document, you are not ready to issue the document. 

Run the following command to wrap the `sample.json` and generate output for it in another directory `wrapped-documents`:

```sh
open-attestation wrap raw-documents --output-dir wrapped-documents
```

After running the above command, you will see an output with the merkle root of the transferable record:

```txt
✔  success   Batch Document Root: 0x0d9839a8034cb783d98bd57bcbaafb4dc3614c4193d2edf8a655c1ec6635b7ea
```

>**Note:** Save the merkle root somewhere for later steps.

### Wrapping the document as a single file
This is an alternative way to wrap the Transferable Record.

<WrapSingleDocument />

<!-- Reuse the steps to wrap a single document -->

>**Note:** Save the merkle root somewhere for later steps.
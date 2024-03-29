---
id: prepare-transferable-record
title: Prepare transferable records
sidebar_label: Prepare transferable records
---
import WrapSingleDocument from "/src/reusables/_wrap-single-document.mdx";

In this section, you will prepare the DNS and the content of the transferable record to be issued.

## DNS configuration

Similar to [binding the document store to a domain name](/docs/ethereum-section/document-store), you will have to bind the identity of the token registry to a domain name. To do that, perform one of the following methods:

1. create a `TXT` record on your domain with the following entry value:

  | Type | Domain      | Entry Value                                                     |
  | ---- | ----------- | --------------------------------------------------------------- |
  |`TXT` | example.com | "openatts net=`ethereum` netId=`11155111` addr=`0x8431012Bc040942B59e3C5bf428221eab0b2f723`" |

  You will need to replace the token registry address `0x8431012Bc040942B59e3C5bf428221eab0b2f723` with the address you get from the [previous step](/docs/transferable-section/token-registry).

2. If you want to use our sandbox DNS for the purpose of exercise, run the following command instead:

  ```sh
  open-attestation dns txt-record create --address 0x8431012Bc040942B59e3C5bf428221eab0b2f723 --network-id 11155111
  ```


3. If you want to view more detailed setup instructions, see the <a href="/docs/guides-section/configure-dns" target="_blank">documentation for configuring DNS</a>.

>**Important:** Take note of the domain where you are inserting the records, because you will need the domain name later.

## Creating a raw transferable document

Similar to creating a verifiable document, first of all, you will need to create a raw JSON file with the content of the transferable record.

Create a file `sample.json` in a folder `raw-documents-transferable`:

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

Replace the `tokenRegistry` value with your token registry smart contract address from [previous section](/docs/transferable-section/token-registry) and `location` with the domain where you are issuing this document.

The difference between a transferable record and a verifiable document is the use of `tokenRegistry` instead of `documentStore` in declaring the smart contract address.

>**Note:** For a transferable record, you may not batch process it with other documents. Your directory `raw-documents-transferable` should contain only one file.

## Wrapping the transferable document
Choose one of the following methods to wrap the Transferable Document.

### Wrapping the document from a folder

With the raw transferable document, you are not ready to issue the document. 

Run the following command to wrap the `sample.json` and generate output for it in another directory `wrapped-documents-transferable`:

```sh
open-attestation wrap raw-documents-transferable --output-dir wrapped-documents-transferable
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

## Additional reading
You will find more details about configuring DNS on [this page](/docs/ethereum-section/dns-proof).
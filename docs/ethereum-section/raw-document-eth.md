---
id: raw-document-eth
title: Create raw documents
sidebar_label: Create raw documents
custom_edit_url: null
---

import RawDocument from "/src/reusables/_raw-document.mdx";
import SchemaValidator from "/src/reusables/_schema-validator.mdx";

<RawDocument />

In this guide, you will create a raw document for issuance via Ethereum. It will conform to the OpenAttestation v2.0 schema.

<SchemaValidator />

## Creating raw document

To create data for your document, paste the following JSON data into the right panel of the JSON schema validator tool:

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
      "documentStore": "0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b",
      "identityProof": {
        "type": "DNS-TXT",
        "location": "few-green-cat.sandbox.openattestation.com"
      }
    }
  ]
}
```

To makes things simple, you will use an existing renderer at [here](https://tutorial-renderer.openattestation.com). However you will still need to replace the following values in your own document, including the issuer's document store and the identity proof location.

### Replacing the issuer's document store

Replace the value of `issuers[0].documentStore` from `0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b` to the smart contract address of your document store in the [previous step](/docs/ethereum-section/document-store).

### Replacing the identity proof location

Replace the value of `issuers[0].identityProof.location` from `few-green-cat.sandbox.openattestation.com` to the dns name used to bind the document store's identity in the [previous step](/docs/ethereum-section/dns-proof).

![Validator Completed](/docs/ethereum-section/document-data/validator-completed.png)


## Verification
Once all the values are configured and the raw document conforms to the schema, you will see the message `No errors found. JSON validates against the schema`.

## Saving the raw document
To save the raw document:

1. At the same level with the `wallet.json` file, create a folder named `raw-documents`. 

2. Inside that folder create a file named `certificate-1.json` and paste the validated JSON from above.

3. Create another file named `certificate-2.json`. 

4. Paste the same validated JSON into the `certificate-2.json` file. Change the `recipient.name` to a different name.

  At this point in time, your directory should look like the following:

  ```text
  wallet.json
  raw-documents
    |-- certificate-1.json
    |-- certificate-2.json
  ```

  You are now ready to wrap the documents.

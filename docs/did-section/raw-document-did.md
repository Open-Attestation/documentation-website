---
id: raw-document-did
title: Create raw documents
sidebar_label: Create raw documents
custom_edit_url: null
---

import RawDocument from "/src/reusables/_raw-document.mdx";
import SchemaValidator from "/src/reusables/_schema-validator.mdx";

<RawDocument />

In this guide, you will create a raw document for DID. It will conform to the OpenAttestation v2.0 schema.

<SchemaValidator />

## Creating raw document

Let's create our document:

```json
{
  "recipient": {
    "name": "John Doe"
  },
  "$template": {
    "name": "main",
    "type": "EMBEDDED_RENDERER",
    "url": "https://tutorial-renderer.openattestation.com"
  },
  "issuers": [
    {
      "id": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D",
      "name": "Demo Issuer",
      "revocation": {
        "type": "NONE"
      },
      "identityProof": {
        "type": "DNS-DID",
        "location": "intermediate-sapphire-catfish.sandbox.openattestation.com",
        "key": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller"
      }
    }
  ]
}
```

### Replacing the issuers ID

Change the value of `issuers[0].id` from `did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D` to the wallet address created from the [previous step](/docs/did-section/create). 

> **Note:** Keep `did:ethr:` in front of the wallet address.

### Replacing the identity proof location

Change the value of `issuers[0].identityProof.location` from `intermediate-sapphire-catfish.sandbox.openattestation.com` to the DNS name used to bind the wallet address in the [previous step](/docs/did-section/dns).

### Replacing the identity proof key

Change the value of `issuers[0].identityProof.key` from `did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller` to the public key used to bind the wallet address in the [previous step](/docs/did-section/dns).

## Verification
Once all the values are configured and the raw document conforms to the schema, you will see the message `No errors found. JSON validates against the schema`.

## Saving the raw document

To save the raw document: 

1. At the same level with the `wallet.json` file, create a folder named `raw-documents-did`. 

2. Inside that folder create a file named `certificate-1.json` and paste the validated JSON from above.

3. Create another file named `certificate-2.json`. 

4. Paste the same validated JSON into the `certificate-2.json` file. Change the `recipient.name` to a different name.

  At this point in time, your directory should look like the following:

  ```text
  wallet.json
  raw-documents-did
    |-- certificate-1.json
    |-- certificate-2.json
  ```

  You are now ready to wrap the documents.



---
title: Creating Raw Document
sidebar_label: Creating Raw Document
---

For the explanation about raw document purpose and format, see [the Ethereum tutorial](/docs/integrator-section/verifiable-document/ethereum/raw-document).

We will create the raw document for DID.

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

Change the value of `issuers[0].id` from `did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D` to the wallet address created from the [previous step](/docs/integrator-section/verifiable-document/did/create). 

> **Note:** Keep `did:ethr:` in front of the wallet address.

### Replacing the identity proof location

Change the value of `issuers[0].identityProof.location` from `intermediate-sapphire-catfish.sandbox.openattestation.com` to the dns name used to bind the wallet address in the [previous step](/docs/integrator-section/verifiable-document/did/dns).

### Replacing the identity proof key

Change the value of `issuers[0].identityProof.key` from `did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller` to the public key used to bind the wallet address in the [previous step](/docs/integrator-section/verifiable-document/did/dns).

## Verification
Once all the values are configured and the raw document conforms to the schema, you will see the message `No errors found. JSON validates against the schema`.

## Saving the raw document

Near the `wallet.json` file, create a folder named `raw-documents-did`. Inside that folder create a filename `certificate-1.json` and paste the validated JSON from above.

Create another file named `certificate-2.json` and paste the same validated JSON into the file, changing the `recipient.name` to a different name.

At this point in time, your directory should look like the following:

```text
wallet.json
raw-documents-did
  |-- certificate-1.json
  |-- certificate-2.json
```

We are now ready to wrap the documents.



---
title: Creating Raw Document
sidebar_label: Creating Raw Document
---

For the explanation about raw document purpose and format, see [the Ethereum tutorial](/docs/integrator-section/verifiable-document/ethereum/raw-document).

We will adapt the raw document.

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

### Replace the issuers ID

Change the value of `issuers[0].id` from `did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D` to the wallet address created from the [previous steps](/docs/integrator-section/verifiable-document/did/create). 

> **Note:** Keep `did:ethr:` in front of the wallet address.

### Replace the identity proof location

Change the value of `issuers[0].identityProof.location` from `intermediate-sapphire-catfish.sandbox.openattestation.com` to the dns name used to bind the wallet address in the [previous step](/docs/integrator-section/verifiable-document/did/dns).

### Replace the identity proof key

Change the value of `issuers[0].identityProof.key` from `did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller` to the public key used to bind the wallet address in the [previous step](/docs/integrator-section/verifiable-document/did/dns)

> Follow the same file structure like the one [in the Ethereum tutorial](/docs/integrator-section/verifiable-document/ethereum/raw-document#saving-the-raw-document).

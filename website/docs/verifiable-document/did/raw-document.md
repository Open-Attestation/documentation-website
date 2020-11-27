---
title: Creating Raw Document
sidebar_label: Creating Raw Document
---

The explanation about raw document purpose and format are available [in the Ethereum tutorial](/docs/verifiable-document/raw-document).

We will just adapt the raw document.

### Creating raw document

Let's create our certificate:

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

#### 1. issuers[0].id

Replace the value of `issuers[0].id` from `did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D` to use the wallet address created from the [previous steps](/docs/verifiable-document/did/create). Keep `did:ethr:` in front of the wallet address.

#### 1. issuers[0].identityProof.location

Replace the value of `issuers[0].identityProof.location` from `intermediate-sapphire-catfish.sandbox.openattestation.com` to the dns name used to bind the wallet address in the [previous steps](/docs/verifiable-document/did/dns)

#### 1. issuers[0].identityProof.key

Replace the value of `issuers[0].identityProof.key` from `did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller` to the public key used to bind the wallet address in the [previous steps](/docs/verifiable-document/did/dns)

> Follow the same file structure like [in the Ethereum tutorial](/docs/verifiable-document/raw-document#saving-the-raw-document).

---
id: quick-start
title: Quick Start (V3 Beta)
sidebar_label: Quick Start
---

In this guide, we will attempt to issue an driving license in the OpenAttestation Version 3 format. We will be using the document store to issue this document with `DNS-TXT` as the method to identify the issuer using DNS.

_The document will not be rendered yet as we have yet to create demo renderer_

> For a full range of documents (beside document store + DNS-TXT), you may look at the different types of document supported [here](/docs/advanced/v3/different-files)

## Document Store Setup

If you have not already deployed a document store, you may do so by following the guides listed below:

1. [Creating a wallet](/docs/verifiable-document/wallet)
1. [Deploying Document Store](/docs/verifiable-document/document-store)
1. [Configuring DNS](/docs/verifiable-document/dns-proof)

## Creating Raw Document

We will now create the data for the driving license. Create a file `licence.json` with the following data:

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schemata.openattestation.com/com/openattestation/1.0/DrivingLicenceCredential.json",
    "https://schemata.openattestation.com/com/openattestation/1.0/OpenAttestation.v3.json"
  ],
  "issuer": {
    "id": "https://example.com",
    "name": "DEMO STORE"
  },
  "issuanceDate": "2010-01-01T19:23:24Z",
  "type": ["VerifiableCredential", "DrivingLicenceCredential"],
  "credentialSubject": {
    "id": "did:example:SERIAL_NUMBER_123",
    "class": [
      {
        "type": "3",
        "effectiveDate": "2010-01-01T19:23:24Z"
      },
      {
        "type": "3A",
        "effectiveDate": "2010-01-01T19:23:24Z"
      }
    ]
  },
  "openAttestationMetadata": {
    "template": {
      "name": "CUSTOM_TEMPLATE",
      "type": "EMBEDDED_RENDERER",
      "url": "https://localhost:3000/renderer"
    },
    "proof": {
      "type": "OpenAttestationProofMethod",
      "method": "DOCUMENT_STORE",
      "value": "0x8bA63EAB43342AAc3AdBB4B827b68Cf4aAE5Caca"
    },
    "identityProof": {
      "type": "DNS-TXT",
      "identifier": "example.tradetrust.io"
    }
  }
}
```

You will need to replace the following values from values obtained from earlier:

### `openAttestationMetadata.proof.value`

Replace this with the address of the document store deployed in the step [Deploying Document Store](/docs/verifiable-document/document-store)

### `openAttestationMetadata.identityProof.identifier`

Replace this with the domain where the TXT record has been inserted in the step [Configuring DNS](/docs/verifiable-document/dns-proof)

## Wrapping the Document

With `licence.json` saved, run the following command after the [CLI is installed](/docs/component/open-attestation-cli):

```sh
open-attestation wrap licence.json --of wrapped.json --oav3
```

The will wrap the original document and append additional data required by OpenAttestation to the `proof` key at the root of the document.

> Take note of the value `proof.merkleRoot`. This is the merkle root to be issued on the document store later.

## Issuing document

With the merkle root in `proof.merkleRoot`, you may following the [Issuing Document](/docs/verifiable-document/issuing-document) guide to issued the document on Ethereum.

## Verify document

TBD (after oa-cli is updated for `verify`)

If you are reading this now, you may programmatically verify the document with [`oa-verify`](http://localhost:3000/docs/component/oa-verify)

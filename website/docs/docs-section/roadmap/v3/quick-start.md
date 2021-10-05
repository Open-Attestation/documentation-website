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

1. [Creating a wallet](/docs/integrator-section/verifiable-document/ethereum/wallet)
1. [Deploying Document Store](/docs/integrator-section/verifiable-document/ethereum/document-store)
1. [Configuring DNS](/docs/verifiable-document/dns-proof)

## Creating Raw Document

We will now create the data for the driving license. Create a file `license.json` with the following data:

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schemata.openattestation.com/com/openattestation/1.0/DrivingLicenceCredential.json",
    "https://schemata.openattestation.com/com/openattestation/1.0/OpenAttestation.v3.json",
    "https://schemata.openattestation.com/com/openattestation/1.0/CustomContext.json"
  ],
  "reference": "SERIAL_NUMBER_123",
  "name": "Republic of Singapore Driving Licence",
  "issuanceDate": "2010-01-01T19:23:24Z",
  "validFrom": "2010-01-01T19:23:24Z",
  "issuer": { "id": "https://example.com", "name": "DEMO STORE", "type": "OpenAttestationIssuer" },
  "type": ["VerifiableCredential", "DrivingLicenceCredential", "OpenAttestationCredential"],
  "credentialSubject": {
    "id": "did:example:JOHN_DOE_DID",
    "licenseNumber": "S1234567a",
    "birthDate": "1977-02-22",
    "name": "John Doe",
    "class": [
      { "type": "3", "effectiveDate": "2010-01-01T19:23:24Z" },
      { "type": "3A", "effectiveDate": "2010-01-01T19:23:24Z" }
    ]
  },
  "openAttestationMetadata": {
    "template": {
      "name": "DRIVING_LICENSE",
      "type": "EMBEDDED_RENDERER",
      "url": "https://tutorial-renderer.openattestation.com"
    },
    "proof": {
      "type": "OpenAttestationProofMethod",
      "method": "DID",
      "value": "did:ethr:0xE712878f6E8d5d4F9e87E10DA604F9cB564C9a89",
      "revocation": {
        "type": "NONE"
      }
    },
    "identityProof": {
      "type": "DNS-DID",
      "identifier": "example.tradetrust.io"
    }
  },
  "attachments": [{ "fileName": "sample.pdf", "mimeType": "application/pdf", "data": "BASE64_ENCODED_FILE" }]
}
```

You will need to replace the following values:

### `openAttestationMetadata.proof.value`

Replace this with the address of the document store deployed in the step [Deploying Document Store](/docs/integrator-section/verifiable-document/ethereum/document-store)

### `openAttestationMetadata.identityProof.identifier`

Replace this with the domain where the TXT record has been inserted in the step [Configuring DNS](/docs/verifiable-document/dns-proof)

## Wrapping the Document

With `licence.json` saved, run the following command after the [CLI is installed](/docs/developer-section/libraries/open-attestation-cli):

```sh
open-attestation wrap license.json --of wrapped.json --oav3
```

The will wrap the original document and append additional data required by OpenAttestation to the `proof` key at the root of the document.

## Issuing document

Since we are using the `DID` method to issue the document, we can simply sign the document with the private key corresponding to issuing DID configured.

In the example we will sign with the did `did:ethr:0xE712878f6E8d5d4F9e87E10DA604F9cB564C9a89` but you will have to use your DID to sign your document.

Run the following command to sign the document:

```sh
open-attestation sign wrapped.json --output-dir signed --public-key did:ethr:0xE712878f6E8d5d4F9e87E10DA604F9cB564C9a89#controller --key 0x0000000000000000000000000000000000000000000000000000000000000000000
```

> Replace both public key and private key with your DID's

## Verify document

Now you will see a file `wrapped.json` created in the folder `signed`. You may verify the document with the following command:

```sh
open-attestation verify -d signed/wrapped.json
```

Upon successful verification you will see the output:

```txt
…  awaiting  Verifying signed/wrapped.json
✔  success   The document is valid
```

> Web verification one tradetrust.io and opencerts.io are currently in the works. These documents may not be verified on the site yet.

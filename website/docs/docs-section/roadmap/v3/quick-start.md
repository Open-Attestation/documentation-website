---
id: quick-start
title: Quick Start (V3 Beta)
sidebar_label: Quick Start
---

In this guide, you will issue a driving license in the OpenAttestation Version 3 format. You will be using the document store to issue this document with `DNS-TXT` as the method to identify the issuer using DNS.

>**Note:** The document will not be rendered, as the demo renderer is currently unavailable. For a full range of documents (beside document store and `DNS-TXT`), you may look at the different types of document supported [here](/docs/docs-section/roadmap/v3/different-files).

## Document store setup

If you have not deployed a document store:

<!--Flag: Do we need to add the instructions below for deploying document store using the Ethereum and DID methods?-->
- If you are using the Ethereum method, see [this guide](/docs/integrator-section/verifiable-document/ethereum/document-store).

- If you are using the DID method, see [this guide](/docs/integrator-section/verifiable-document/did/document-store-or-ocsp).

## Creating raw document

In this step, you will create the data for the driving license. 

Create a file `license.json` with the following data:

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schemata.openattestation.com/com/openattestation/1.0/DrivingLicenceCredential.json",
    "https://schemata.openattestation.com/com/openattestation/1.0/OpenAttestation.v3.json",
    "https://schemata.openattestation.com/com/openattestation/1.0/CustomContext.json"
  ],
  "reference": "SERIAL_NUMBER_123",
  "name": "Republic of Singapore Driving License",
  "issuanceDate": "2010-01-01T19:23:24Z",
  "validFrom": "2010-01-01T19:23:24Z",
  "issuer": { "id": "https://example.com", "name": "DEMO STORE", "type": "OpenAttestationIssuer" },
  "type": ["VerifiableCredential", "DrivingLicenseCredential", "OpenAttestationCredential"],
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

### Replacing the proof value in metadata

Replace `openAttestationMetadata.proof.value` with the address of the document store deployed in [this step](/docs/integrator-section/verifiable-document/ethereum/document-store).

### Replacing the identity proof identifier

Replace `openAttestationMetadata.identityProof.identifier` with the domain where the TXT record has been inserted in [this step](/docs/integrator-section/verifiable-document/ethereum/dns-proof).

## Wrapping the document

After [installing the CLI](/docs/developer-section/libraries/remote-files/open-attestation-cli)and saving the `license.json` file, run the command below:

```sh
open-attestation wrap license.json --of wrapped.json --oav3
```

The will wrap the original document and append the additional data that OpenAttestation requires to the `proof` key at the root of the document.

## Issuing document

If you are using the `DID` method to issue the document, you can sign the document with the private key corresponding to the issuing DID configured.

This example signs the document with the did `did:ethr:0xE712878f6E8d5d4F9e87E10DA604F9cB564C9a89`. You need to use your own DID to sign documents.

To sign the document, run the following command:

```sh
open-attestation sign wrapped.json --output-dir signed --public-key did:ethr:0xE712878f6E8d5d4F9e87E10DA604F9cB564C9a89#controller --key 0x0000000000000000000000000000000000000000000000000000000000000000000
```

>**Note:** Replace both the public key and private key with those associated with your DID.

## Verifying document

In this step, you will see a file `wrapped.json` created in the folder `signed`. You can verify the document with the following command:

```sh
open-attestation verify -d signed/wrapped.json
```

Upon successful verification, you will see the output:

```txt
…  awaiting  Verifying signed/wrapped.json
✔  success   The document is valid
```

>**Note:** Alternatively, you can verify the document on [OpenCerts](https://www.opencerts.io/) or [TradeTrust](https://www.tradetrust.io/).
---
id: revoking-document-did
title: Revoking Documents Using Document Store or OCSP
sidebar_label: Revoking Documents Using Document Store or OCSP
---
Depending on whether you have deployed the Document Store or OCSP, use one of them to revoke documents. 

<!--Flag: Revisit this portion once we have the article on OCSP vs Document Store for revocation.-->

To get a better understanding of revocation, see [this article](/docs/integrator-section/verifiable-document/ethereum/revoking-document).

## Revoking using Document Store

It is possible to revoke a signed document only if you fulfill certain **prerequisites**. Any future progress can be followed [here](https://github.com/Open-Attestation/adr/blob/master/issuing_using_did.md#for-documents-that-are-signed-directly).

### Prerequisites

- An `ethr` DID (if you have been following the above steps, you should have one already)
- Some kind of DID documents:
  1. Base DID document (`ISSUER_IDENTITY`: `identityProof.identifier` against `ethr` DID)
  2. DID-DNS document (`ISSUER_IDENTITY`: `identityProof.identifier` against a [DNS-TXT](/docs/docs-section/how-does-it-work/issuance-identity))
- A deployed `documentStore`, click [here](docs/integrator-section/verifiable-document/did/document-store-or-ocsp.md) for the steps.
- Before you wrap your document with the wrapper SDK, add a `revocation` block with these keys:

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
      ....
      "name": "Demo Issuer",
      "revocation": {
        "type": "REVOCATION_STORE",
        "location": "<DEPLOYED_DOCUMENT_STORE_LOCATION>"
      },
      ...
    }
  ]
}
```

<!-- TBD v3 document sample when that releases -->

- The `<DEPLOYED_DOCUMENT_STORE_LOCATION>` is your `documentStore` location. It must be **deployed** on the Ethereum blockchain.
- Wrap your document, sign it, and append the signature to the document (following the tutorial).

### Revoking a document

Once you have fulfilled the prerequisites, you will have a document that can be revoked on a deployed `documentStore`.

To revoke a document from the Ethereum flow using the CLI, replace the variables below and run the command:   

```bash
open-attestation document-store revoke --address <DOCUMENT_STORE_LOCATION> --hash <HASH_OF_DOC(S)>  --network <NETWORK> --encrypted-wallet-path <PATH_OF_WALLET>
```

In the example above, because the revocation mapping in the `documentStore` is separate from the issued mapping, you can revoke the document using the `documentStore`, even if you haven't issued any document from it.

## Revoking using OCSP
You can also revoke a document using your own Online Certificate Status Protocol (OCSP) responder. In short, an OCSP responder is a service that will respond with the revocation status of a certificate and the reason it is revoked.

### Revocation type and location

You would require a DID document with

- `revocation.type` : `OCSP_RESPONDER`
- `revocation.location`: `https://ocsp-sandbox.openattestation.com`

Replace the `revocation.type` and `revocation.location` values below.

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
      ....
      "name": "Demo Issuer",
      "revocation": {
        "type": "OCSP_RESPONDER",
        "location": "<OCSP_RESPONDER_URL>"
      },
      ...
    }
  ]
}
```

### Revoking a document

To learn about a reference implementation to revoke a document using the OCSP responder, see [this readme](https://github.com/Open-Attestation/ocsp-responder/blob/main/README.md).

>**Note:** Other implementations will also be recognized by verifiers, as long as they adhere to the request/response format required by the OpenAttestation framework.

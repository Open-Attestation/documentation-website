---
id: revoke-using-document-store
title: Revoke documents using document store
sidebar_label: Revoke documents using document store
custom_edit_url: null
---
import RevokeIntro from "/src/reusables/_revoke-intro.mdx";

>**Note:** Depending on whether you have deployed the Document Store or OCSP, use the corresponding method to revoke documents. 

<RevokeIntro />

## Revoking using Document Store

It is possible to revoke a signed document only if you fulfill certain **prerequisites**. Any future progress can be followed [here](https://github.com/Open-Attestation/adr/blob/master/issuing_using_did.md#for-documents-that-are-signed-directly).

### Prerequisites

- An `ethr` DID (if you have been following the above steps, you should have one already)
- Some kind of DID documents:
  1. Base DID document (`ISSUER_IDENTITY`: `identityProof.identifier` against `ethr` DID)
  2. DID-DNS document (`ISSUER_IDENTITY`: `identityProof.identifier` against a [DNS-TXT](/docs/verify-section/issuance-identity))
- A deployed `documentStore`, click [here](/docs/did-section/document-store-or-ocsp) for the steps.
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

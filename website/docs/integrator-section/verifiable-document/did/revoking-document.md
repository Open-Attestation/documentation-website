---
title: Revoking Documents (Document Store)
sidebar_label: Revoking Documents (Document Store)
---

It is possible to revoke a signed document only if you fulfill certain **prerequisites**. Any future progress can be followed [here](https://github.com/Open-Attestation/adr/blob/master/issuing_using_did.md#for-documents-that-are-signed-directly).

## Prerequisites

- An `ethr` DID (if you have been following the above steps, you should have one already)
- Some kind of DID documents:
  1. Base DID document (`ISSUER_IDENTITY`: `identityProof.identifier` against `ethr` DID)
  2. DID-DNS document (`ISSUER_IDENTITY`: `identityProof.identifier` against a [DNS-TXT](/website/docs/docs-section/how-does-it-work/issuance-identity))
- A deployed `documentStore`, click [here](/website/docs/integrator-section/verifiable-document/ethereum/document-store) for how to do so.
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

- Note that the `<DEPLOYED_DOCUMENT_STORE_LOCATION>` is your `documentStore` location, it must be **deployed** on the Ethereum block chain (for now. Further implementations will relax this requirement, so that DID documents will truly be gasless).
- Wrap your document, sign it, and append the signature to the document (follow the tutorial)

## Revoking a document

- Once you have fulfilled the prerequisites, you will have a document that can be revoked on a deployed `documentStore`.
- Simply invoke the command to revoke a document from the Ethereum flow (use the CLI):

    **Note:** Before running the command, replace the variables in "<>" with the actual names to fit your case. 

```bash
open-attestation document-store revoke --address <DOCUMENT_STORE_LOCATION> --hash <HASH_OF_DOC(S)>  --network <NETWORK> --encrypted-wallet-path <PATH_OF_WALLET>
```

## Frequently asked questions (FAQ)

Q: [This article](/website/docs/docs-section/how-does-it-work/comparison#price) mentioned that if I use DID documents, I will not need to pay for transactions. But following this procedure, why do I still have to pay for at least 1 transaction (deploying a `documentStore`)?

A: Yes, that's correct. In the current version, this implementation will still need at least 1 transaction to the Ethereum blockchain.

Q: Although I did not issue any documents from the deployed `documentStore`, how can revoke this document from the same `documentStore`?

A: That's because the revocation mapping in the `documentStore` is separate from the issued mapping.

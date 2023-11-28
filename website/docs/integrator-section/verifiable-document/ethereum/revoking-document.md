---
id: revoking-document
title: Revoking Documents
sidebar_label: Revoking Documents
---

Licenses, certifications, and permits are some examples of documents that can be issued as verifiable documents.

When issuing verifiable documents, keep in mind that they will remain verifiable indefinitely.

However, there may be times when the issued document needs to be revoked because: 

* It contains errors.
* It was issued wrongly.
* After issuance, an incident occurs and requires the document to become ineffective and unverifiable.

Revocation serves as a strict, proactive approach to prevent security breach or any change that may compromise the document integrity. 

Document revocation is not intended to work as expiration, since documents with an expiry date already have a limited validity duration that the issuer determines at the time of file creation. 

For documents with limited validity, consider including expiry dates within the document content for external verification.

The following screenshot shows a certificate example: 

![Certificate Example](/docs/integrator-section/verifiable-document/ethereum/revoking-document/sample-cert-expiry.png)

It includes: 

* The issue date “31 December 2022” in both the document content and the `courseEndDate` field
* The expiry date “30 December 2025” in the document content

However, similar to a physical certificate, it should still be viewable after expiration and instead rely on the external verifying authority to accept or reject it.

## Revoking a document

```bash
open-attestation document-store revoke --address 0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b --hash 0x1e0c5e93c04032ed6571b31c785b963f0a27776041f35bdcc98cd8dfe073adc0  --network sepolia --encrypted-wallet-path wallet.json
```

In the example above:

- `address` is the document store address, for instance the one created with the [Deploying Document Store](/docs/integrator-section/verifiable-document/ethereum/document-store) guide.
- `hash` is the value of `targetHash` field of one of the [previously wrapped documents](/docs/integrator-section/verifiable-document/ethereum/wrapping-document) (open one of the file, head to the bottom and check for the `targetHash` in the `signature` object.

You will be prompted for the password that you used while creating the wallet. You will see a message after completion of the command:

```text
✔  success   Document/Document Batch with hash 0x1e0c5e93c04032ed6571b31c785b963f0a27776041f35bdcc98cd8dfe073adc0 has been revoked on 0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b
```

## Verifying the document

Head to `dev.opencerts.io` or `dev.tradetrust.io` and drag and drop the revoked document. An error will display in the portal.

![Successful verification](/docs/integrator-section/verifiable-document/ethereum/revoking-document/verifying.png)

The other document will still be valid.

## Revoking multiple documents

If you open the [previously wrapped documents](/docs/integrator-section/verifiable-document/ethereum/wrapping-document) side by side, you will notice:

- they have a different `targetHash`: it uniquely identifies any document
- they have the same `merkleRoot`: it uniquely identifies any group of wrapped documents.

When you revoke a document you can use any of those hash, but the result will be different depending on the one used:

- when using the `targetHash`, only the document will be revoked.
- when using the `merkleRoot`, all the documents wrapped together (in the same batch) will be revoked.

If you run again the command above, by using the `merkleRoot` of the documents, then will all be revoked.

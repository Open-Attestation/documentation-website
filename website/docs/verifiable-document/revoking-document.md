---
id: revoking-document
title: Revoking Documents
sidebar_label: Revoking Documents
---

After issuing a document, you might want to revoke it for any reason:

- the information provided by the recipient was wrong.
- the information in the document are outdated.
- there is a problem in the document.
- etc.

## Revoking a certificate

```bash
open-attestation document-store revoke --address 0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b --hash 0x1e0c5e93c04032ed6571b31c785b963f0a27776041f35bdcc98cd8dfe073adc0  --network ropsten --encrypted-wallet-path wallet.json
```

In the example above:

- `address` is the document store address, for instance the one created with the [Deploying Document Store](/docs/verifiable-document/document-store) guide.
- `hash` is the value of `targetHash` field of one of the [previously wrapped documents](/docs/verifiable-document/wrapping-document) (open one of the file, head to the bottom and check for the `targetHash` in the `signature` object.

You will be prompted for the password that you used while creating the wallet. You will see a message after completion of the command:

```text
✔  success   Document/Document Batch with hash 0x1e0c5e93c04032ed6571b31c785b963f0a27776041f35bdcc98cd8dfe073adc0 has been revoked on 0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b
```

## Verifying the certificate

Head to `dev.opencerts.io` or `dev.tradetrust.io` and drag and drop the revoked certificate. An error will be displayed by the portal.

![Successful verification](/docs/verifiable-document/revoking-document/verifying.png)

The other document will still be valid.

## Revoking multiple documents

If you open the [previously wrapped documents](/docs/verifiable-document/wrapping-document) side by side, you will notice:

- they have a different `targetHash`: it uniquely identifies any document
- they have the same `merkleRoot`: it uniquely identifies any group of wrapped documents.

When you revoke a document you can use any of those hash, but the result will be different depending on the one used:

- when using the `targetHash`, only the document will be revoked.
- when using the `merkleRoot`, all the documents wrapped together (in the same batch) will be revoked.

If you run again the command above, by using the `merkleRoot` of the documents, then will all be revoked.

---
id: issue-document
title: Issue documents
sidebar_label: Issue documents
---

import VerifyDocument from "/src/reusables/_verify-document.mdx";

After wrapping the documents and obtaining a merkle root, the documents are ready to be issued to the document store smart contract. To issue a batch of documents to the document store, you will use the merkle root that was generated during the batch wrapping process. This issuance only needs to be done once for all documents in a batch.

## Issuing the documents

```bash
open-attestation document-store issue --address 0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b --hash 0x80cc53b77c0539fc383f8d434ac5ffad281f3d64ae5a0e59e9f36f19548e1fff  --network sepolia --encrypted-wallet-path wallet.json
```

In the example above:

- `address` is the document store address, for instance the one created with the [Deploying Document Store](/docs/ethereum-section/document-store) guide.
- `hash` is the merkle root hash, for instance generated while [wrapping documents](/docs/ethereum-section/wrap-document-eth).

You will be prompted for the password that you used while creating the wallet. You will see a message after completion of the command:

```text
✔  success   Document/Document Batch with hash 0x80cc53b77c0539fc383f8d434ac5ffad281f3d64ae5a0e59e9f36f19548e1fff has been issued on 0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b
```

## Verifying the documents

<VerifyDocument />

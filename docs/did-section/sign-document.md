---
id: sign-document
title: Sign documents
sidebar_label: Sign documents
---
import VerifyDocument from "/src/reusables/_verify-document.mdx";

After wrapping the documents and obtaining the merkle root(s), you can sign them with the `ether` DID you created. During signing, each document's merkle root is signed individually, with the proof of their signatures appended. 

## Signing the documents

```bash
open-attestation sign ./wrapped-documents-did --od ./signed-documents-did --public-key did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller --key 0x7b227ac59116f3eeb2b265422cf3cbfbd244c525961fb297eb52153ec62aa845
```

In the example above:

- `public-key` is the public key used to [bind the wallet address with the DNS location](/docs/did-section/dns).
- `key` is the wallet private key, generated when [creating the wallet](/docs/did-section/create).

```text
✔  success   Signed documents saved to ./signed-documents-did
```

## Verifying the documents

<VerifyDocument />
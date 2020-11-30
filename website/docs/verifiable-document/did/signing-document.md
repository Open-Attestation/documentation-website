---
title: Signing Documents
sidebar_label: Signing Documents
---

After wrapping the documents and obtaining a merkle root, the documents are ready to be signed on the document store smart contract. Each documents will be signed individually, and the proof of the signature will be appended into the signed documents.

## Signing the certificates

```bash
open-attestation sign ./wrapped-documents --od ./signed-documents --public-key did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller --key 0x7b227ac59116f3eeb2b265422cf3cbfbd244c525961fb297eb52153ec62aa845
```

In the example above:

- `public-key` the public key used [to bind the wallet address with the DNS location](/docs/verifiable-document/did/dns)
- `key` is the wallet private key, generated when [creating the wallet](/docs/verifiable-document/did/create)

```text
✔  success   Signed documents saved to ./signed-documents
```

## Verifying the certificates

Head to `dev.tradetrust.io` and drag and drop one of the wrapped certificates. The certificate will be verified, then displayed.

![Successful verification](/docs/verifiable-document/signing-document/verifying.png)

🎉 Congratulations, you have completed the getting started guide to create your own Verifiable Document!

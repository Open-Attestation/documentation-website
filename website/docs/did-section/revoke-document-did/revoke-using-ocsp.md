---
id: revoke-using-ocsp
title: Revoke documents using OCSP responder
sidebar_label: Revoke documents using OCSP responder
---
import RevokeIntro from "/src/reusables/_revoke-intro.mdx";

>**Note:** Depending on whether you have deployed the Document Store or OCSP, use one of them to revoke documents. 

<RevokeIntro />

## Revoking using OCSP responder
You can revoke a document using your own Online Certificate Status Protocol (OCSP) responder. In short, an OCSP responder is a service that will respond with the revocation status of a certificate and the reason it is revoked.

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
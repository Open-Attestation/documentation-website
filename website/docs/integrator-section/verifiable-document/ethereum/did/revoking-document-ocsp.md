---
title: Revoking Documents (OCSP)
sidebar_label: Revoking Documents (OCSP)
---

You can also revoke a document using your own Online Certificate Status Protocol (OCSP) responder. Simply put, an OCSP responder would be a service that would respond with the revocation status of a certificate and the reason it was revoked.

## Revocation type and location

You would require a DID document with

- `revocation.type` : `OCSP_RESPONDER`
- `revocation.location`: `https://ocsp-sandbox.openattestation.com`

You should use your own OCSP responder if you have one deployed. Otherwise, you can demo this feature using the [Open Attestation OCSP Responder](https://github.com/Open-Attestation/ocsp-responder)

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

## Revoking a document

Refer to [this readme](https://github.com/Open-Attestation/ocsp-responder/blob/main/README.md) to learn how to add a document to the OA OCSP Responder.

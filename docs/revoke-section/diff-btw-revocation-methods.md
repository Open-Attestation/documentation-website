---
id: diff-btw-revocation-methods
title: Differences between revocation methods
sidebar_label: Differences between revocation methods
---

If you want to revoke verifiable documents issued using DID, it will be good to get a better understanding of the differences between the revocation methods using document store or OCSP responder: 

| Document Store | OCSP Responder |
|:-----------------------|:-------------------------|
| Relies on the blockchain | Relies on a backend server maintained by the issuer |
| Revoked documents cannot be unrevoked, but will have to be re-issued. | Revoked documents can be unrevoked manually by the issuer. |
| Costs involved will be for the initial smart contract deployment and for subsequent revocation transactions. Ideal for documents with very few revocations as no maintenance cost will be required. | There will be no Ethereum deployment or transaction costs, but the OCSP responder will need to be maintained indefinitely for the documents to be verified continuously. |
| Good for all kinds of documents, especially long-term and crucial ones. | Better suited for short-term and non-crucial documents. |
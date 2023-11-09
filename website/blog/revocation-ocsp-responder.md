---
title: OCSP Responder for revocation
description: Support for free revocation of DID signed documents using an online certificate status responder
slug: revocation-ocsp-responder
authors:
  - name: Wayne Wee
    title: OpenAttestation Contributor
    url: https://github.com/waynewee
    image_url: https://github.com/waynewee.png
tags: [revocation, did]
hide_table_of_contents: false
date: 2021-11-25T10:00
---

We recently released support for revocation of DID signed documents through an Online Certificate Status Protocol (OCSP) responder which would allow for the revocation of documents without the need to deploy a document store. Prior to this release, revocation of documents was only possible through the deployment of a document store which is costly.

The solution works by first deploying an API where an administrator can insert or remove entries from a database containing a list of revoked certificate identifiers. Then, when creating a raw document, the revocation type must be specified as OCSP_RESPONDER and location as the url of the API. When this document is submitted for verification, a query is sent to the online responder and an additional check is conducted to find out if a document has been revoked or not.

![OCSP](https://github.com/Open-Attestation/adr/raw/master/assets/did-certificate-revocation/oa-did-revocation.png)

The ADR containing our exploration of possible solutions to the problem of costly revocation and our proposed implementation can be found [here](https://github.com/Open-Attestation/adr/blob/master/did-certificate-revocation.md).

We also released a [reference implementation](https://github.com/Open-Attestation/ocsp-responder) of the OCSP responder using AWS Serverless. You may refer [here](https://github.com/Open-Attestation/ocsp-responder/blob/main/README.md) for a guide on its implementation.

We also added a section in our documentation website under _Verfiable Document_ > _DID_ >[ _Revoking Documents (OCSP)_](/docs/integrator-section/verifiable-document/did/revoking-document.md) with steps on how to create a OCSP-revokable document.

This solution requires minimally:

- [open-attestation](https://www.npmjs.com/package/@govtechsg/open-attestation) v6.2.0
- [oa-verify](https://www.npmjs.com/package/@govtechsg/oa-verify) v7.7.0

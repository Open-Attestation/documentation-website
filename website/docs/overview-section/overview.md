---
id: overview
title: About OpenAttestation
sidebar_label: Overview
---

<!--Merge
id: introduction
title: Introduction to OpenAttestation
sidebar_label: introduction
-->

OpenAttestation is an open source framework for verifiable documents and transferable records.

## Verifiable document

A verifiable document is a tamper-evident document that cryptographically proves who issued it. They are the electronic equivalent of the physical documents, such as plastic cards, passports, driving licenses, qualifications and awards, etc.

## Transferable records

Transferable records are extended verifiable documents that define a method for identifying the owner of the record at any given time. These records reference properties listed in [the UNCITRAL Model Law on Electronic Transferable Records](https://uncitral.un.org/en/texts/ecommerce/modellaw/electronic_transferable_records). Currently, the OA framework's implementation of this is based on [ERC721 NFTs](https://eips.ethereum.org/EIPS/eip-721).

Therefore, you can use transferable records for documents such as:

- Title Deeds
- Bills of Lading

## Building with OpenAttestation

There are three types of roles who build documents, solutions, or services with the OpenAttestation framework.

### Integrator

An integrator intends to issue/verify OpenAttestation documents or transferable records.

### Developer

A developer intends to build their platform or services on top of OpenAttestation.

### Contributor

A contributor intends to make contribution to OpenAttestation.


<!--Merge
id: overview
title: Overview
sidebar_label: Overview
-->

Creating verifiable documents is the fundamental feature of the OpenAttestation (OA) framework. 

In this quick start guide, you will learn how to deploy a verifiable document.

## Goal

At the end of this guide, you will be able to create your 📜 Certificate of Completion that is valid on any compatible OA Viewer. The following guides are available:

- Use OpenAttestation with [DID](/docs/integrator-section/verifiable-document/did/create)
- Use OpenAttestation with [Ethereum Smart Contract](/docs/integrator-section/verifiable-document/ethereum/document-store-overview)


## Additional feature

If you need to distribute the document to another user, see these articles:

* [Embedding a verifiable document into an HTML file](/docs/developer-section/quickstart/oa-embedded-html)
* [Embedding a verifiable document into a QR code (URL)](/docs/developer-section/quickstart/oa-embedded-qrcode)

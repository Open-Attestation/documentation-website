---
id: overview-tr
title: About issuing transferable records using Ethereum
sidebar_label: Overview
custom_edit_url: null
---

A Transferable Record is an extended form of a verifiable document, which makes it possible for the document to have an owner. Transferable Records reference the properties listed in [the UNCITRAL Model Law on Electronic Transferable Records](https://uncitral.un.org/sites/uncitral.un.org/files/media-documents/uncitral/en/mletr_ebook_e.pdf).

This makes Transferable Records usable for documents like:

- Title Deeds
- Bill of Ladings

## Goal

This tutorial builds on the knowledge from [verifiable document](/docs/overview-section/overview#verifiable-document). If you have not completed the tutorial, please head back to [the DID method](/docs/did-section/overview-did) or [the Ethereum method](/docs/ethereum-section/overview-eth).

By the end of this tutorial, you will be able to create your "Electronic Bill of Lading" that is valid on any OA Viewer connected to the Ethereum Sepolia network.

With the knowledge, you will be able to create transferable records according to your own business needs by:

1. Changing the data structure of the document to fit your needs
1. Changing the rendering of the document to reflect your document styles
1. Changing the backend to use the Ethereum main network

## Overview of components

![Overview of components](/docs/transferable-section/overview-tr.png)

The image above shows three different states of documents:

1. An unissued document (`0xaaaa...aaaa`) will have an owner `0x0000...0000`
1. An issued document (`0xbbbb...bbbb`) will have an owner which is either an Externally Owned Account (EOA) or a smart contract (ie `0x8888...8888`)
1. A surrendered document (`0xcccc...cccc`) will have an owner which is the token registry address (ie `0x5555...5555`)

### Token registry smart contract

The token registry smart contract is deployed by individual transferable records issuers such as the land title registry (for Title Deed) or shipping lines (for Bill of Lading). This smart contract replaces the document store smart contract in [this section](/docs/ethereum-section/document-store). Similar to document store contract, the token registry smart contract also has its identity bound to the issuer using DNS.

The token registry stores the ownership state of the transferable records using a mapping from `document ID` to `owner`. The document ID is the target hash (and merkle root) of the individual OA document created. The owner will be either an EOA or a smart contract address.

### Title escrow smart contract

There are instances where a single document will have multiple owners, with clearly defined roles to protect one from another. In trade finance, there is usually a `beneficiary` and a `holder` to a given document. The `beneficiary` corresponds to the legal owner of the Bill of Lading, while the `holder` refers to the entity holding the physical Bill of Lading.

In this case, the Title Escrow Smart Contract reflects the rules of engagement between these two parties on-chain.

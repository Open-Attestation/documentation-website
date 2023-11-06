---
id: overview
title: Transferable Record Overview
sidebar_label: Overview
---

A Transferable Record is an extended form of a verifiable document, which allows the document to have an owner. Transferable Records reference the properties listed in [the UNCITRAL Model Law on Electronic Transferable Records](https://www.uncitral.org/pdf/english/texts/electcom/MLETR_ebook.pdf).

This makes Transferable Records usable for documents like:

- Title Deeds
- Bill of Ladings

## Goal

This tutorial builds on the knowledge from [verifiable document](/docs/integrator-section/verifiable-document/overview). If you have not completed the tutorial, please head back to [the previous section](/docs/integrator-section/verifiable-document/overview).

By the end of this tutorial, you will be able to create your "Electronic Bill of Lading" that is valid on any OA Viewer connected to the Ethereum sepolia network.

With the knowledge, you will be able to create transferable records according to your own business needs by:

1. Changing the data structure of the document to fit your needs
1. Changing the rendering of the document to reflect your document styles
1. Changing the backend to use the Ethereum main network

## Overview of components

![Overview of components](/docs/integrator-section/transferable-record/overview/overview.png)

The image above shows three different states of documents:

1. An unissued document (`0xaaaa...aaaa`) will have an owner `0x0000...0000`
1. An issued document (`0xbbbb...bbbb`) will have an owner which is either an Externally Owned Account (EOA) or a smart contract (ie `0x8888...8888`)
1. A surrendered document (`0xcccc...cccc`) will have an owner which is the token registry address (ie `0x5555...5555`)

### Token registry smart contract

The token registry smart contract is deployed by individual transferable records issuers such as the land title registry (for Title Deed) or shipping lines (for Bill of Lading). This smart contract replaces the document store smart contract in [this section](/docs/integrator-section/verifiable-document/ethereum/document-store). Similar to document store contract, the token registry smart contract also has its identity bound to the issuer using DNS.

The token registry stores the ownership state of the transferable records using a mapping from `document ID` to `owner`. The document ID is the target hash (and merkle root) of the individual OA document created. The owner will be either an EOA or a smart contract address.

### Title escrow smart contract

There are instances where a single document will have multiple owners, with clearly defined roles to protect one from another. In trade finance, there are usually a `beneficiary` and a `holder` to a given document. The `beneficiary` corresponds to the legal owner of the Bill of Lading, while the `holder` refers to the entity holding the physical Bill of Lading.

In this case, the Title Escrow Smart Contract reflects the rules of engagement between these two parties on-chain.

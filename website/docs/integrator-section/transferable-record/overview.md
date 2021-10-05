---
id: overview
title: Transferable Record Overview
sidebar_label: Overview
---

Transferable Records are documents which extends on Verifiable Documents to allow a document to have an owner. These records references properties laid out in the [UNCITRAL Model Law on Electronic Transferable Records](https://www.uncitral.org/pdf/english/texts/electcom/MLETR_ebook.pdf)

This allow Transferable Records to be used for documents like:

- Title Deeds
- Bill of Ladings

## Goal

This tutorial builds onto the knowledge from the [verifiable document](/docs//verifiable-document/overview) section. If you have not completed the tutorial for verifiable document, please head back to the previous section.

By the end of this tutorial you would be able to create your "Electronic Bill of Lading" that is valid on any OA Viewer connected to the Ethereum ropsten network.

With these knowledge you will be able to create transferable records according to your own business needs by:

1. Changing the data structure of the document to suite your needs
1. Changing the rendering of the document to reflect your document styles
1. Changing the backend to use Ethereum main network

## Overview of Components

![Overview of Components](/docs/transferable-record/overview/overview.png)

### Token Registry Smart Contract

The token registry smart contract is deployed by individual transferable records issuers such as the land title registry (for title deed) or shipping lines (for bill of lading). This smart contract replaces the document store smart contract in the previous section. similarly to document store contract, it also has it's identity bound to the issuer using DNS.

The token registry stores the ownership state of the transferable records using a mapping from `document ID` to `owner`. The document ID is the target hash (and merkle root) of the individual OA document created. The owner will be either an externally owned account (EOA) or smart contract address.

In the overview above, we can see 3 different states of documents:

1. An unissued document (`0xaaaa...aaaa`) will have an owner `0x0000...0000`
1. An issued document (`0xbbbb...bbbb`) will have an owner which is either a EOA or a smart contract (ie `0x8888...8888`)
1. A surrendered document (`0xcccc...cccc`) will have an owner which is the token registry's address (ie `0x5555...5555`)

### Title Escrow Smart Contract

There are instances where a single document will have multiple owners, with clearly defined roles to protect one from another. In the case of trade finance, we observe that there are usually a `beneficiary` and a `holder` to a given document. The two role corresponds to the legally owner of the BL and the entity holding the physical BL respectively.

In this case, we have created the Title Escrow Smart Contract to reflect the rules of engagement between these two parties on-chain.

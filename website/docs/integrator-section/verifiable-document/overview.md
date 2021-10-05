---
title: Overview
sidebar_label: Overview
---

## Overview of Components

![Overview of Components](/docs/verifiable-document/overview/overview.png)

### Document Store Smart Contract

The document store is a smart contract deployed onto the Ethereum blockchain. When an OA document is issued, a proof of the issuance is stored onto the Ethereum blockchain through the smart contract. The smart contract is used to provide a globally consistent record for anyone to query a given OA document's issuance status.

### DNS Records

A domain is required to issue an OA document. A DNS record must be inserted to the DNS to assert the identity of the OA document creator.

### Verifiable Document File

A Verifiable Document File is also known as the OA document. Machine-readable data of the OA document is stored in a `.json` file. In addition to the data, these `.json` files also contain information such as:

- claim of issuer's identity
- document rendering information
- document store smart contract

### Decentralized Renderer

The decentralized renderer gives the OA document a human-readable look. It is essentially a website which will take an OA document data as input and display the document in a web view. This allows anyone to style their document without submitting code change to another party.

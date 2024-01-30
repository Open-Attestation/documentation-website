---
id: overview-eth
title: About issuing verifiable documents using Ethereum
sidebar_label: Overview
---

## Overview of components

![Overview of components](/docs/ethereum-section/overview-eth/overview.png)

### Document store smart contract

The document store is a smart contract deployed onto the Ethereum blockchain. When an OA document is issued, a proof of the issuance is stored onto the Ethereum blockchain through the smart contract. The smart contract is used to provide a globally consistent record for anyone to query a given OA document's issuance status.

### DNS records

A domain is required to issue an OA document. A DNS record must be inserted to the DNS to assert the identity of the OA document creator.

### Verifiable document file

A Verifiable Document File is also known as the OA document. Machine-readable data of the OA document is stored in a `.json` file. In addition to the data, these `.json` files also contain information such as:

- claim of issuer's identity
- document rendering information
- document store smart contract

### Decentralized renderer

The decentralized renderer gives the OA document a human-readable look. It is essentially a website which will take an OA document data as input and display the document in a web view. Using this feature, any user can style their document without submitting code change to another party.

---
id: overview
title: Verifiable Document Overview
sidebar_label: Overview
---

Verifiable documents forms the core of the OpenAttestation(OA) Framework. In this quick start guide, you will be deploying your first verifiable document.

## Goal

By the end of this tutorial you would be able to create your "Certificate of Completion" that is valid on any OA Viewer connected to the Ethereum ropsten network. From there, you may:

1. Change the data structure of the document to suite your needs
1. Change the rendering of the document to reflect your document styles
1. Change the backend to use Ethereum main network

## Overview of Components

![Overview of Components](./overview.png)

### Document Store Smart Contract

When a document is being issued, a proof of the issuance is store onto the Ethereum blockchain. A smart contract is used to provide a globally consistent record for anyone to query a given document's issuance status.

### DNS Records

A domain is required to issue an OA file. A DNS record will be inserted to the DNS to assert the identity of the OA document creator.

### Verifiable Document File

Machine-readable data of the document is stored in a .json file. On top of the data, these files also contain information such as:

- claim of issuer's identity
- document rendering information
- document store smart contract
- cryptographic setup to enable selective privacy within the document

### Decentralized Renderer

The decentralized renderer gives the OA document a human readable look. It is essentially a website which will take an OA document data as input and display the document in a web view. This allows anyone to style their document without submitting code change to another party.

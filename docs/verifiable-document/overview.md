---
id: overview
title: Verifiable Document Overview
sidebar_label: Overview
---

Verifiable documents form the core of the OpenAttestation (OA) Framework. In this quick start guide, you will be deploying your first verifiable document.

## Goal

By the end of this guide, you would be able to create your 📜 Certificate of Completion that is valid on any OA Viewer connected to the Ethereum `ropsten` network.

With these knowledge you will be able to create OA documents according to your own business needs by:

1. Changing the data structure of the document to suit your needs
1. Changing the rendering of the document to reflect your document styles
1. Changing the backend to use Ethereum main network

## Overview of Components

![Overview of Components](/docs/verifiable-document/overview/overview.png)

### Document Store Smart Contract

When a document is being issued, a proof of the issuance is store onto the Ethereum blockchain. A smart contract is used to provide a globally consistent record for anyone to query a given document's issuance status.

### DNS Records

A domain is required to issue an OA file. A DNS record must be inserted to the DNS to assert the identity of the OA document creator.

### Verifiable Document File

Machine-readable data of the document is stored in a `.json` file. On top of the data, these files also contain information such as:

- claim of issuer's identity
- document rendering information
- document store smart contract

### Decentralized Renderer

The decentralized renderer gives the OA document a human readable look. It is essentially a website which will take an OA document data as input and display the document in a web view. This allows anyone to style their document without submitting code change to another party.

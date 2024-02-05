---
id: overview-did
title: About issuing verifiable documents using DID
sidebar_label: Overview
---
import OverviewDIDETH from "/src/reusables/_overview-did-eth.mdx";

## Overview of components

![Overview of components](/docs/did-section/overview-did/overview-did.png)

### Wallet DID public key

The wallet DID public key is associated with the DID. It is visible to anyone and can be used for the transactions. When the documents are issued using DID, the public key will be used to bind the wallet address with the DNS location and store a proof of issuance. Anyone can query an OA document's issuance status using the wallet DID public key.

<OverviewDIDETH />

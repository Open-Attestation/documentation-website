---
id: overview-did
title: About issuing verifiable documents using DID
sidebar_label: Overview
custom_edit_url: null
---
import OverviewDIDETH from "/src/reusables/_overview-did-eth.mdx";

## Overview of components

![Overview of components](/docs/did-section/overview-did/overview-did.png)

### Wallet DID public key

The wallet DID public key is associated with the DID. It is visible to anyone and is used during document verification. When the documents are issued using DID, the corresponding DID private key along with the merkleRoot are used to obtain the document signature.

<OverviewDIDETH isEth={false}/>

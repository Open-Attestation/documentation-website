---
id: overview-eth
title: About issuing verifiable documents using Ethereum
sidebar_label: Overview
---
import OverviewDIDETH from "/src/reusables/_overview-did-eth.mdx";

## Overview of components

![Overview of components](/docs/ethereum-section/overview-eth/overview.png)

### Document store smart contract

The document store is a smart contract deployed onto the Ethereum blockchain. When an OA document is issued, a proof of the issuance is stored onto the Ethereum blockchain through the smart contract. The smart contract is used to provide a globally consistent record for anyone to query a given OA document's issuance status.

<OverviewDIDETH isEth={true}/>

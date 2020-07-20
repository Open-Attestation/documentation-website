---
id: title-escrow
title: Deploying Title Escrow (Joint Ownership) Contract
sidebar_label: Deploying Title Escrow Contract
---

Recall that transferable records is held using a joint ownership structure. In this section, we will deploy a title escrow smart contract that describes the joint ownership interaction between a `holder` and `beneficiary` of a transferable record.

To help you draw parallels to the physical world:

- the `holder` is the entity in physical possession of the transferable record
- the `beneficiary` is the legal owner (usually printed on the document itself) of the transferable record

Both value refers to an Ethereum address which can execute different sets of actions depending on their roles.

## Deploying Title Escrow Contract

Before we deploy the title escrow, we will need to identify the `beneficiary` and `holder` of the transferable record. The `beneficiary` and `holder` may be the same.

In the example, we will use `0x6FFeD6E6591b808130a9b248fEA32101b5220eca` for both values. You will need to replace this value with a wallet address you control to be able to perform different actions on the transferable records later.

To deploy a title escrow contract, run the following commands:

```sh
open-attestation deploy title-escrow -f key.txt -n ropsten -b 0x6FFeD6E6591b808130a9b248fEA32101b5220eca -h 0x6FFeD6E6591b808130a9b248fEA32101b5220eca -r 0x8431012Bc040942B59e3C5bf428221eab0b2f723
```

Note that you have to replace the beneficiary & holder address as well as the token registry address with your own.

Once the title escrow contract has been deployed, you will see an output similar to the following:

```txt
ℹ  info      Deploying title escrow
…  awaiting  Sending transaction to pool
…  awaiting  Waiting for transaction 0x328e2cbca342fa5883c899e7939560fdc20cc45dc4fd801577c56551e8579ef9 to be mined
✔  success   Title escrow deployed at 0xec733A8322f8216eaf8e5566e750bfee3974B7f3
ℹ  info      Find more details at https://ropsten.etherscan.io/address/0xec733A8322f8216eaf8e5566e750bfee3974B7f3
```

> Store the contract address of the title escrow for use later.

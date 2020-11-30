---
title: Comparison
sidebar_label: Comparison
---

In this section, we will discuss the differences between Ethereum Smart Contract Verifiable Credentials and DID Verifiable Credentials. The goal is to provide enough information for you to choose the correct workflow depending on your needs.

## Infrastructure

By using Ethereum Smart Contracts, you will of course be bound to the Ethereum infrastructure. Every transaction will be stored in the Blockchain. Forever. For basic issuance, you won't need to maintain any infrastructure on your own. On top of that you will be able to monitor every transaction that happened, and detect abnormal activities. For instance if someone manages to steal your wallet private key, you will find evidence directly on the Blockchain.

Regarding DID, you won't need to maintain any infrastructure as well... or maybe you will need. It will depend on your needs. Indeed, No records of your transactions will be made by default. DID will work straight, out of the box. However, if you want to keep track on every transaction, you will have to do it yourself. One could ask: "Why would I need to track every transaction ?". Unlike for Ethereum Smart Contracts, if a user manage to steal your signing private key, you will never be aware of it.

## Environment

Ethereum Smart Contracts are bound to the different Ethereum network. That means if you create a document store on the ropsten network, you won't be able to use the same document store on a different network (mainnet, rinkeby, etc...). It's very convenient for the separation of test and production use cases (like in centralized architecture, when you have staging and production environment).

This is where DID come handy. Even if technically a DID could be bound to a specific environment, like `did:ethr:ropsten:0xabcd`, it's also possible to allow it to be used everywhere, like `did:ethr:0xabc`. Of course while this is true for ethr DID, it might not be true for any DID.

## Price

You will need ethers in order to use Ethereum Smart Contracts. The following actions require ethers:

- Creating a document store,
- Issuing a merkle root,
- Revoking a merkle root.

More information in the [FAQ](/docs/faq). Other actions (typically reading what is in the smart contract) are free.

With DID, you don't need money of any sort. It works out of the box.

## Privacy

When using Ethereum Smart Contracts, all issuance and revocation events will be publicly viewable. As long as someone knows your document store contract address, they will be able to see how many times you issued, revoked, etc. 

For DID, it's the opposite, everything is private.

## Revocation

Revocation is part of our Ethereum Smart Contracts.

If you use DID, there is for the moment no way to revoke a document. We have ideas on [how to provide such a feature](https://github.com/Open-Attestation/adr/blob/master/issuing_using_did.md#for-documents-that-are-signed-directly), but the work is still in progress. In any case,
DID will have to rely on any kind of [CRL](https://en.wikipedia.org/wiki/Certificate_revocation_list) or even on a document store (which bring back the need to pay with ethers).

## Throughput

Because of Ethereum, you will never have control on how long a transaction happens with Ethereum Smart Contracts. You can pay more gas to speed up the transaction but in the end you have no control. It's also worth to consider the workflow. If you issue a lot of documents and have to pay a transaction for each document issuance individually, it will quickly cost a lot. That's why we recommend batching issuance. Whether you do it hourly, weekly or monthly will depend on your need. Keep in mind that issuing document individually is a bad option and can become very costly (unless you issue one document every month for instance). Issuing hourly or daily are viable options in terms of price.

DID is a perfect match when you need to sign document in real-time. Unlike issuing with the smart contract methods, there is no requirement to wait for a blockchain transaction to be finalised and the issued document is immediately valid.

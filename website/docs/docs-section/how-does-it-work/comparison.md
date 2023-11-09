---
title: Comparison
sidebar_label: Comparison
---

In this section, we will discuss the differences between Ethereum Smart Contract Verifiable Credentials and DID Verifiable Credentials. The goal is to provide enough information for you to choose the correct workflow depending on your needs.

## Infrastructure

By using Ethereum Smart Contracts, you will of course be bound to the Ethereum infrastructure. Every transaction will be stored in the Blockchain. Forever. For basic issuance, you won't need to maintain any infrastructure on your own. On top of that you will be able to monitor every transaction that happened, and detect abnormal activities. For instance if someone manages to steal your wallet private key, you will find evidence directly on the Blockchain.

Regarding DID, you won't need to maintain any infrastructure as well... or maybe you will need. It will depend on your needs. Indeed, No records of your transactions will be made by default. DID will work straight, out of the box. However, if you want to keep track on every transaction, you will have to do it yourself. One could ask: "Why would I need to track every transaction ?". Unlike for Ethereum Smart Contracts, if a user manage to steal your signing private key, you will never be aware of it.

## Environment

Ethereum Smart Contracts are bound to the different Ethereum network. That means if you create a document store on one network (e.g. sepolia), you won't be able to use the same document store on a different network (e.g. mainnet). It's very convenient for the separation of test and production use cases (like in centralized architecture, when you have staging and production environment).

This is where DID come handy. Even if technically a DID could be bound to a specific environment, like `did:ethr:sepolia:0xabcd`, it's also possible to allow it to be used everywhere, like `did:ethr:0xabc`. Of course while this is true for ethr DID, it might not be true for any DID.

## Price

You will need ethers to use Ethereum Smart Contracts. The following actions require ethers:

- Creating a document store,
- Issuing a merkle root,
- Revoking a merkle root.

More information in the [FAQ](/docs/docs-section/faq). Other actions (typically reading what is in the smart contract) are free.

With DID, you don't need money of any sort. It works out of the box.

## Privacy

When using Ethereum Smart Contracts, all issuance and revocation events will be publicly viewable. As long as someone knows your document store contract address, they will be able to see how many times you issued, revoked, etc.

For DID, it's the opposite, everything is private.

## Revocation

Revocation is part of our Ethereum Smart Contracts.

As of today, its possible to revoke a document if a document store has been declared in its revocation block. You can revoke a document [using a document store or an OCSP](/docs/integrator-section/verifiable-document/did/revoking-document).

Note that if you do use revocation for `DID`, you still need to have at least one transaction with the ethereum blockchain to deploy a `documentStore`, which means `DID` flow is not free anymore.

## Throughput

Because of Ethereum, you will never have control on how long a transaction happens with Ethereum Smart Contracts. You can pay more gas to speed up the transaction but in the end you have no control. It's also worth to consider the workflow. If you issue a lot of documents and have to pay a transaction for each document issuance individually, it will quickly cost a lot. That's why we recommend batching issuance. Whether you do it hourly, weekly or monthly will depend on your need. Keep in mind that issuing document individually is a bad option and can become very costly (unless you issue one document every month for instance). Issuing hourly or daily are viable options in terms of price.

DID is a perfect match when you need to sign document in real-time. Unlike issuing with the smart contract methods, there is no requirement to wait for a blockchain transaction to be finalized, and the issued document is immediately valid.

## Issuance traceability

Thanks to Ethereum, every credential you issue will be recorded. This happens during issuance, where the Merkle root of the credentials' batch is used to record the transaction. However, this is not the case for credentials issued using DID (Or at least not automatically by OpenAttestation. You can still save it yourself).

The difference might be subtle, but it's very important. If you lose control of the private key you used for your document store, or your DID, the consequences will be different:

- if you used document store, you will be able to invalidate only part of the credentials. Indeed, if you can figure which was the last transaction you ran before you lost control of your wallet, then it's possible to keep valid all the credentials before that transaction. Indeed, the document store contract [stores the block number](https://github.com/Open-Attestation/document-store/blob/master/contracts/DocumentStore.sol#L27) associated with the issuance. OpenAttestation can then only validate credentials for a specific document store that has been [issued before a specific block number](https://github.com/Open-Attestation/document-store/blob/master/contracts/DocumentStore.sol#L45). The information of the latest valid block number can be provided through the DNS-TXT record. As of today, the solution is not supported and properly defined in the verifiers. Feel free to reach out if you need our support.
- if you used DID, then you will have to invalidate all the credentials. The best way to do it is to remove your DID from the DNS-TXT record.

You might eventually think we could use a validity date in the DNS-TXT record to indicate when a DID has been compromised. However, this solution doesn't work. Nothing prevents an attacker from backdating the issuance of a credential to any arbitrary time. However, an attacker can't modify the history of issuance on Ethereum, nor can he specify a block number in the past to be recorded.

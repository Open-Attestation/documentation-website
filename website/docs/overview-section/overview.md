---
id: overview
title: Overview
sidebar_label: Overview
---

<!--Merge
id: introduction
title: Introduction to OpenAttestation
sidebar_label: introduction
-->

OpenAttestation is an open source framework for verifiable documents and transferable records.

## Verifiable document

A verifiable document is a tamper-evident document that cryptographically proves who issued it. They are the electronic equivalent of the physical documents, such as plastic cards, passports, driving licenses, qualifications and awards, etc.

## Transferable records

Transferable records are extended verifiable documents that define a method for identifying the owner of the record at any given time. These records reference properties listed in [the UNCITRAL Model Law on Electronic Transferable Records](https://uncitral.un.org/en/texts/ecommerce/modellaw/electronic_transferable_records). Currently, the OA framework's implementation of this is based on [ERC721 NFTs](https://eips.ethereum.org/EIPS/eip-721).

Therefore, you can use transferable records for documents such as:

- Title Deeds
- Bills of Lading

## Building with OpenAttestation

There are three types of roles who build documents, solutions, or services with the OpenAttestation framework.

### Integrator

An integrator intends to issue/verify OpenAttestation documents or transferable records.

### Developer

A developer intends to build their platform or services on top of OpenAttestation.

### Contributor

A contributor intends to make contribution to OpenAttestation.


<!--Merge
id: overview
title: Overview
sidebar_label: Overview
-->

Creating verifiable documents is the fundamental feature of the OpenAttestation (OA) framework. 

In this quick start guide, you will learn how to deploy a verifiable document.

## Goal

At the end of this guide, you will be able to create your 📜 Certificate of Completion that is valid on any compatible OA Viewer. The following guides are available:

- Use OpenAttestation with [DID](/docs/integrator-section/verifiable-document/did/create)
- Use OpenAttestation with [Ethereum Smart Contract](/docs/integrator-section/verifiable-document/ethereum/document-store-overview)


## Additional feature

If you need to distribute the document to another user, see these articles:

* [Embedding a verifiable document into an HTML file](/docs/developer-section/quickstart/oa-embedded-html)
* [Embedding a verifiable document into a QR code (URL)](/docs/developer-section/quickstart/oa-embedded-qrcode)



<!--Merge
id: comparison
title: Comparison
sidebar_label: Comparison
-->

This article compares the differences between Ethereum smart contract verifiable credentials and DID verifiable credentials. You can choose the correct workflow depending on your needs.

## Infrastructure

By using Ethereum smart contracts, you will be bound to the Ethereum infrastructure. Every transaction will be stored in the Blockchain permanently. For basic issuance, you won't need to maintain any infrastructure on your own. You can also monitor every transaction that happened and detect abnormal activities. For instance, if someone manages to steal your wallet private key, you will find the evidence directly on the Blockchain.

DID won't require you to maintain any infrastructure for most cases. In certain conditions, it will be required depending on your needs. None of your transaction records will be made by default. DID will work in a straightforward way. However, if you want to keep track on every transaction, you will have to trace it by yourself. Unlike Ethereum smart contracts, if a user manages to steal your signing private key and starts issuing documents, you will never be aware of it.

## Environment

Ethereum smart contracts are bound to the different Ethereum networks. That means if you create a document store on one network (e.g. sepolia), you won't be able to use the same document store on a different network (e.g. mainnet). It's very convenient for the separation of test and production use cases (like in centralized architecture, when you have staging and production environments).

DID works in a more convenient way. Even if a DID can be bound to a specific environment like `did:ethr:sepolia:0xabcd`, it can also be used everywhere, like `did:ethr:0xabc`. While this is true for ethr DID, it may not be applicable to any DID.

## Price

You will need ethers to use Ethereum smart contracts. The following actions require ethers:

- Creating a document store
- Issuing a merkle root
- Revoking a merkle root

For more information, see the [FAQ](/docs/docs-section/faq). Other actions are free, for example, reading what is in the smart contract.

With DID, you don't need to spend money with the precondition of not revoking any documents. Issuance works free of charge. If you need to revoke documents using the DID method without making any Ethereum transactions, consider deploying an OCSP responder.

## Privacy

When using Ethereum smart contracts, all issuance and revocation events will be publicly viewable. As long as someone knows your document store contract address, they will be able to see how many times you issued, revoked, etc.

For DID, it's the opposite and all transaction information is untraced by default.

## Revocation

Revocation is part of Ethereum smart contracts.

As of today, it is possible to revoke a document if a document store has been declared in its revocation block. You can revoke a document [using a document store or an OCSP](/docs/integrator-section/verifiable-document/did/revoking-document-did).

>**Note:** If you use revocation for `DID`, you still need to have at least one transaction with the Ethereum blockchain to deploy a `documentStore`, which means `DID` flow is not free anymore.

## Throughput

Because of the way Ethereum works, you will never have control on how long a transaction takes with Ethereum smart contracts. You can pay more gas to speed up the transaction, but in the end you have no control. It's also worth to consider the workflow. If you issue a lot of documents and have to pay a transaction for each document issuance individually, it will quickly cost a lot. That's why it is recommended to use batch issuance. Whether you do it hourly, weekly, or monthly, it will depend on your need. Keep in mind that issuing document individually is a bad option and can become very costly (unless you issue one document every month, for instance). Issuing hourly or daily are viable options in terms of cost.

DID is a perfect match when you need to sign document in real time. Unlike issuing with the smart contract methods, there is no requirement to wait for a blockchain transaction to be finalized, and the issued document is immediately valid.

## Issuance traceability

Ethereum maintains a permanent record of every credential you issue. This happens during issuance, where the Merkle root of the credentials batch is used to create a record of the transaction. However, this is not the case for credentials issued using DID, or at least not automatically by OpenAttestation, while you can still save it by yourself.

The difference is subtle, but very important. If you lose control of the private key you used for your document store, or your DID, the consequences will be different:

- If you used document store, you will be able to invalidate only part of the credentials. Indeed, if you can figure out which was the last transaction you ran before you lost control of your wallet, then it's possible to keep valid all the credentials before that transaction. The document store contract [stores the block number](https://github.com/Open-Attestation/document-store/blob/master/contracts/DocumentStore.sol#L27) associated with the issuance. OpenAttestation can then only validate credentials for a specific document store that has been [issued before a specific block number](https://github.com/Open-Attestation/document-store/blob/master/contracts/DocumentStore.sol#L45). The DNS-TXT record can provide the information of the latest valid block number. As of today, the verifiers do not support or properly define the solution. Contact OpenAttestation if you need support.
- If you used DID, then you will have to invalidate all the credentials. The best way is to remove your DID from the DNS-TXT record.

If you are considering whether you can use a validity date in the DNS-TXT record to indicate when a DID has been compromised, this solution doesn't work. Nothing prevents an attacker from backdating the issuance of a credential to any arbitrary time. However, an attacker can't modify the history of issuance on Ethereum or specify a block number in the past to be recorded.


<!--Merge
id: differences
title: Differences between Ethereum and DID
sidebar_label: Differences between Ethereum and DID
-->

The Ethereum method is writing to the blockchain & requires some ethers in the wallet, while the DID method performs digital signing and won’t require any ethers.

The flowchart provides an overview of the differences between the Ethereum and DID methods:

![Ethereum and DID differences](/docs/integrator-section/verifiable-document/differences/ETH-DID-differences.svg)


>**Note:** The arrow ("⏶" or “⏷”) means there are differences between the similar steps. See the table to learn more.

## Side-by-side comparison

The table compares the differences between the two methods in **bold**:

| _Ethereum method_                                        | _DID method_                                                   |
|-------------------------------------------------------------------------|--------------------------------------------------------------------------|
| **Create a wallet**                                                     | **Create a DID**                                                         |
| **Deploy Document Store**                                   | **Deploy Document Store or OCSP (optional)**                                     |
| Configure DNS **(bind document issuer's identity)**                     | Configure DNS **(bind wallet address)**                                  |
| Create raw documents **(bind document store's identity)**               | Create raw documents **(bind wallet address)**                           |
| Wrap documents                                                          | Wrap documents                                                           |
| **Issue documents**                                                     | **Sign documents**                                                       |
| Revoke documents **(using Document Store)**                             | Revoke documents **(using either Document Store or OCSP responder)**  |


## Details explained

### Create a wallet or DID
* In the Ethereum method, the user needs to [create a wallet](/docs/integrator-section/verifiable-document/ethereum/wallet).
* In the DID method, the user needs to [create a DID](/docs/integrator-section/verifiable-document/did/create), which means creating a wallet and retrieving the private key.

### Deploy Document Store

* The Ethereum method requires the deployment of Document Store at the beginning of the procedure, immediately after creating a wallet. 
* The DID method requires the deployment of Document Store as an optional step and [one of the prerequisites to revoke a document](/docs/integrator-section/verifiable-document/did/revoking-document-did#prerequisites).


### Configure DNS

* The Ethereum method [binds the document issuer's identity](/docs/integrator-section/verifiable-document/ethereum/dns-proof) to a domain.
* The DID method [only uses the wallet address](/docs/integrator-section/verifiable-document/did/dns) as signing credentials and binds it to a domain.

### Create raw documents

* The Ethereum method [binds the document store's identity](/docs/integrator-section/verifiable-document/ethereum/raw-document#1-issuers0identityprooflocation) to DNS name. 
* The DID method [binds the wallet address](/docs/integrator-section/verifiable-document/did/raw-document-did#1-issuers0identityprooflocation) to the DNS name.

### Issue or sign documents

* The two methods use different commands to [issue](/docs/integrator-section/verifiable-document/ethereum/issuing-document#issuing-the-documents) or [sign](/docs/integrator-section/verifiable-document/did/signing-document#signing-the-documents) document.

### Revoke documents

* In the Ethereum method, the user can revoke documents using [Document Store](/docs/integrator-section/verifiable-document/ethereum/revoking-document#revoking-a-document).
* In the DID method, the user can revoke documents using either [Document Store](/docs/integrator-section/verifiable-document/did/revoking-document-did#revoking-using-document-store) or [Online Certificate Status Protocol (OCSP) responder](/docs/integrator-section/verifiable-document/did/revoking-document-did#revoking-using-ocsp).

## Relevant article
To better understand how to choose the correct workflow that works for you, see [this article](/docs/docs-section/how-does-it-work/comparison).
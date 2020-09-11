---
id: identity-proofs
title: Extending Identity Proof
sidebar_label: Identity Proof
---

OpenAttestation uses the Domain Name System (DNS) as the method of issuer identity verification. A one-liner introduction to the DNS system can be summarised as: "Phonebook for the Internet". Its primary purpose is to resolve human readable names such as "google.com", or "openattestation.com", etc. to a set of records. The most common records are 'A records', which resolve to IP addresses - this allows network routing to operate over the Internet.

For OpenAttestation, we are using the TXT type of record, which simply allows us to store textual data. The textual data we store indicates the Document Store that the domain administrator trusts.

By allowing the DNS system to be used as an identity registry, we let domain name owners claim ownership of an OpenAttestation Document Store smart contract on the Ethereum Blockchain.

## Rationale

The DNS system is a key part of Internet infrastructure, and is a decentralised system - this means that there is a low barrier to entry and does not have a single point of failure. It allows issuers to simply tie their issuance to their domain name, (e.g example.openattestation.com). When a user views a certificate issued under this model, they will see "Document issued by example.openattestation.com".

## How it works

Under [IETF RFC 1464](https://tools.ietf.org/html/rfc1464), it is possible to store arbitrary string attributes as part of a domain's record set. This method is currently widely used for email server authentication (SPF, DMARC, DKIM). Our DNS identity proof technique was largely inspired by [Keybase DNS proofs](https://github.com/keybase/keybase-issues/issues/367).

Only domain name owners (and the registrar that they trust) have the authority to make changes to the records associated with that domain name. Thus when a DNS record endorses a certain fact, it transitively asserts that this fact is believed to be true by the domain name owner.

In an OpenAttestation DNS-TXT identity proof, we record a Document Store address and the network (e.g Ethereum, Main Net) it is on. In the OpenAttestation document itself, we declare the domain name to search for the record as well as the Document Store Ethereum address. This forms a bi-directional trust assertion, and if the Document's cryptographic proof is issued on that Document Store - we can say that the domain name owner has endorsed the issuance of this document.

A deeper technical discussion of this topic can be found at [OpenAttestation's Decentralised Identity Proof using DNS-TXT Architecture Decision Record](https://github.com/Open-Attestation/adr/blob/master/decentralized_identity_proof_DNS-TXT.md).

## How to create DNS TXT Record

As an issuer, you will need to add a DNS TXT record to your domain name. The exact steps to achieve this can be confirmed with your domain name registrar, this is usually achieved through your domain administration web UI.

The following is an example for an issuer:
1. on `Ethereum Main Net`
1. has a Document Store address of `0x9178F546D3FF57D7A6352bD61B80cCCD46199C2d`
```text
"openatts net=ethereum netId=1 addr=0x9178F546D3FF57D7A6352bD61B80cCCD46199C2d"
```

The following is an example for an issuer:
1. on `Ethereum Test Net (Ropsten)`
1. has a Document Store address of `0x9db35C07350e9a16C828dAda37fd9c2923c75812`

```text
"openatts net=ethereum netId=3 addr=0x9db35C07350e9a16C828dAda37fd9c2923c75812"
```

Optionally, you may also publish an A record at the same address so that the if the user clicks on the URL, they can see a helpful website with your information on it.

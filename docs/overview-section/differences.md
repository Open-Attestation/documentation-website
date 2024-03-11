---
id: differences
title: Differences between the methods to issue verifiable documents
sidebar_label: Differences between issuance methods

---

The Ethereum method is writing to the blockchain & requires some ethers in the wallet, while the DID method performs digital signing and won’t require any ethers.

The flowchart provides an overview of the differences between the Ethereum and DID methods:

![Ethereum and DID differences](/docs/overview-section/differences/ETH-DID-differences.svg)


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
* In the Ethereum method, the user needs to [create a wallet](/docs/ethereum-section/wallet).
* In the DID method, the user needs to [create a DID](/docs/did-section/create), which means creating a wallet and retrieving the private key.

### Deploy Document Store

* The Ethereum method requires the deployment of Document Store at the beginning of the procedure, immediately after creating a wallet. 
* The DID method requires the deployment of Document Store as an optional step and [one of the prerequisites to revoke a document](/docs/did-section/revoke-document-did/revoke-using-document-store#prerequisites).


### Configure DNS

* The Ethereum method [binds the document issuer's identity](/docs/ethereum-section/dns-proof) to a domain.
* The DID method [only uses the wallet address](/docs/did-section/dns) as signing credentials and binds it to a domain.

### Create raw documents

* The Ethereum method [binds the document store's identity](/docs/ethereum-section/raw-document-eth#replacing-the-identity-proof-location) to DNS name. 
* The DID method [binds the wallet address](/docs/did-section/raw-document-did#replacing-the-identity-proof-location) to the DNS name.

### Issue or sign documents

* The two methods use different commands to [issue](/docs/ethereum-section/issue-document#issuing-the-documents) or [sign](/docs/did-section/sign-document#signing-the-documents) document.

### Revoke documents

* In the Ethereum method, the user can revoke documents using [Document Store](/docs/ethereum-section/revoke-document-eth/revoke-eth#revoking-a-document).
* In the DID method, the user can revoke documents using either [Document Store](/docs/did-section/revoke-document-did/revoke-using-document-store) or [Online Certificate Status Protocol (OCSP) responder](/docs/did-section/revoke-document-did/revoke-using-ocsp).

## Relevant article
To better understand how to choose the correct workflow that works for you, see [this article](/docs/overview-section/comparison).
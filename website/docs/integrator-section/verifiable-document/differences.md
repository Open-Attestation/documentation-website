---
title: Differences between Ethereum and DID
sidebar_label: Differences between Ethereum and DID
---

The flowchart provides an overview of the differences between the Ethereum and DID methods:

![Ethereum and DID differences](/docs/integrator-section/verifiable-document/differences/ETH-DID-differences.svg)


>**Note:** The arrow ("⏶" or “⏷”) means there are differences between the similar steps. See the table to learn more.

## Side-by-side comparison

The table compares the differences between the two methods in **bold**:

| **Ethereum method**                                                     | **DID method**                                                           |
|-------------------------------------------------------------------------|--------------------------------------------------------------------------|
| **Create a wallet**                                                     | **Create a DID**                                                         |
| Deploy Document Store                                                   | Deploy Document Store **(optional)**                                     |
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
* The DID method requires the deployment of Document Store as an optional step and [one of the prerequisites to revoke a document](/docs/integrator-section/verifiable-document/did/revoking-document#prerequisites).


### Configure DNS

* The Ethereum method [binds the document issuer's identity](/docs/integrator-section/verifiable-document/ethereum/dns-proof) to a domain.
* The DID method [only uses the wallet address](/docs/integrator-section/verifiable-document/did/dns) as signing credentials and binds it to a domain.

### Create raw documents

* The Ethereum method [binds the document store's identity](/docs/integrator-section/verifiable-document/ethereum/raw-document#1-issuers0identityprooflocation) to DNS name. 
* The DID method [binds the wallet address](/docs/integrator-section/verifiable-document/did/raw-document#1-issuers0identityprooflocation) to the DNS name.

### Issue or sign documents

* The two methods use different commands to [issue](/docs/integrator-section/verifiable-document/ethereum/issuing-document#issuing-the-documents) or [sign](/docs/integrator-section/verifiable-document/did/signing-document#signing-the-documents) document.

### Revoke documents

* The Ethereum method lets the user revoke documents using [Document Store](/docs/integrator-section/verifiable-document/ethereum/revoking-document#revoking-a-document).
* The DID method lets the user revoke documents using either [Document Store](/docs/integrator-section/verifiable-document/did/revoking-document#revoking-using-document-store) or [Online Certificate Status Protocol (OCSP) responder](/docs/integrator-section/verifiable-document/did/revoking-document#revoking-using-ocsp).
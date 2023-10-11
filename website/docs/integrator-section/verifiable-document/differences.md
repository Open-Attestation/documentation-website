---
id: differences
title: Differences between the Ethereum and DID methods
sidebar_label: Differences
---

# Differences between the Ethereum and DID methods


## Overview

The flowchart provides an overview of the differences between the Ethereum and DID methods:

![alt_text](/website/static/img/ETH-DID-differences.svg "Differences between the two methods")


Note: The arrow ("⏶" or “⏷”) means there are differences between the similar steps. See the table to learn more.

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
* In the Ethereum method, the user needs to [create a wallet](https://www.openattestation.com/docs/integrator-section/verifiable-document/ethereum/wallet).
* In the DID method, the user needs to [create a DID](https://www.openattestation.com/docs/integrator-section/verifiable-document/did/create), which means creating a wallet and retrieving the private key.

### Deploy Document Store

* The Ethereum method requires the deployment of Document Store at the beginning of the procedure, immediately after creating a wallet. 
* The DID method requires the deployment of Document Store as an optional step and [one of the prerequisites to revoke a document](https://www.openattestation.com/docs/integrator-section/verifiable-document/did/revoking-document#prerequisites).


### Configure DNS

* The Ethereum method [binds the document issuer's identity](https://www.openattestation.com/docs/integrator-section/verifiable-document/ethereum/dns-proof) to a domain.
* The DID method [only uses the wallet address](https://www.openattestation.com/docs/integrator-section/verifiable-document/did/dns) as signing credentials and binds it to a domain.

### Create raw documents

* The Ethereum method [binds the document store's identity](https://www.openattestation.com/docs/integrator-section/verifiable-document/ethereum/raw-document#1-issuers0identityprooflocation) to DNS name. 
* The DID method [binds the wallet address](https://www.openattestation.com/docs/integrator-section/verifiable-document/did/raw-document#1-issuers0identityprooflocation) to the DNS name.

### Issue or sign documents

* The two methods use different commands to [issue](https://www.openattestation.com/docs/integrator-section/verifiable-document/ethereum/issuing-document#issuing-the-documents) or [sign](https://www.openattestation.com/docs/integrator-section/verifiable-document/did/signing-document#signing-the-documents) document.

### Revoke documents

* The Ethereum method lets the user revoke documents using [Document Store](https://www.openattestation.com/docs/integrator-section/verifiable-document/ethereum/revoking-document#revoking-a-document).
* The DID method lets the user revoke documents using either [Online Certificate Status Protocol (OCSP) responder](https://www.openattestation.com/docs/integrator-section/verifiable-document/did/revoking-document-ocsp) or [Document Store](https://www.openattestation.com/docs/integrator-section/verifiable-document/did/revoking-document).
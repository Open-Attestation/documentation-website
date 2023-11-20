---
id: glossary
title: Glossary
sidebar_label: Glossary
---

This page provides the definition of the commonly-used terms in the OpenAttestation (OA)documentation.

### Decentralized application (DApp)

A DApp has its backend code running on a decentralized peer-to-peer network. This is different from an app where the backend code is running on centralized servers.

### Decentralized renderer

A decentralized renderer is essentially a website that takes the OA document data as input and displays it in a web view. The renderer makes the OA document readable by human.

### DID

See [this definition](https://www.w3.org/TR/did-core/).

### DNS

Domain name system. 

### DNS record

A DNS record is a piece of information on a DNS server, which includes the type of this record (e.g. `TXT`), the domain name, and the value of this record, etc.

### Document store

A document store is a smart contract on the Ethereum network that records the issuance and revocation status of the OA documents. The document store helps the owner perform the following actions:

- Issue new OA documents
- Revoke an existing OA document
- Check the validity of an OA document
- Transfer the document store to another owner

### Domain name
A domain name is an address on the Internet that can be used to bind the document issuer's identity. This domain will display as the issuer every time the document is rendered in an OA-compliant decentralized renderer.

### Ether

Ether is the cryptocurrency used in the Ethereum blockchain network. Ethers are used to create and interact with smart contracts. They can either be mined or bought via fiat currency (e.g. Singapore Dollars).

### Know your customer (KYC)

Know your customer or know your client (KYC) is a guideline in financial services, which requires that the professionals make an effort to verify the identity, suitability, and risks involved in maintaining a business relationship.

### Online Certificate Status Protocol (OCSP)

Online Certificate Status Protocol (OCSP) is an Internet protocol used for obtaining the revocation status of an OA document. To learn more, see [this readme](https://github.com/Open-Attestation/ocsp-responder/blob/main/README.md).

### Raw document

A raw document contains the data compliant with the OA document schema before the wrapping process. It is defined in JSON schema format.

### Revocation

Revocation is an action that makes an OA document no longer valid. There can be various reasons that make the issuer decide to revoke a document after issuance. To learn more, see [this article](/docs/integrator-section/verifiable-document/ethereum/revoking-document).

### Sign

The process of generating a digital signature with the use of various signing algorithms.

### Signature

A digital signature is generated from signing and is primarily used to verify the authenticity of transactions or documents issued to the blockchain.

### Smart contract

See [this definition](https://ethereum.org/en/developers/docs/smart-contracts/#:~:text=A%20%22smart%20contract%22%20is%20simply,address%20on%20the%20Ethereum%20blockchain.&text=Smart%20contracts%20can%20define%20rules,enforce%20them%20via%20the%20code).


### Transferable record

A transferable record, also known as a "transferable document" or "token registry", is an extended verifiable document that defines a method for identifying the owner of the record at any given time. It references properties listed in [the UNCITRAL Model Law on Electronic Transferable Records](https://uncitral.un.org/en/texts/ecommerce/modellaw/electronic_transferable_records). 

### Verifiable document

A verifiable document refers to an OA document. It is also known as a "verifiable credential". The data in the OA document is stored in a `.json` file. It is a tamper-evident document that cryptographically proves the issuer.

### Wallet

See [this definition](https://ethereum.org/en/wallets/#:~:text=Ethereum%20wallets%20are%20applications%20that,funds%20and%20manage%20your%20ETH%20).

### Wrapped document

A wrapped document is a document that contains data compliant with OA schema and has gone through the wrapping process, with a checksum that provides a tamper-proof property. 

The wrapped document needs to be issued on [Ethereum](/docs/integrator-section/verifiable-document/ethereum/document-store-overview) or [DID](/docs/integrator-section/verifiable-document/did/create) to become a verifiable document.
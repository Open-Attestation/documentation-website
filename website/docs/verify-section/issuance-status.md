---
id: issuance-status
title: Issuance status
sidebar_label: Issuance status
---

OpenAttestation checks that the document has been issued and it is in a valid status of issuance (for instance, it hasn't been revoked). As of today, OpenAttestation supports two ways to issue documents: DIDs and Ethereum smart contracts.

## Ethereum Smart Contracts

The [document store](/docs/integrator-section/verifiable-document/ethereum/document-store) is a smart contract on the Ethereum network that records the issuance and revocation status of OpenAttestation documents. It stores the hashes of the wrapped documents, which are the records of the document store owner who issued the documents. Before moving on to the verification process, you need to understand the `merkleRoot`.

Assuming that you have to wrap thousands of files and issue the `targetHash` for each, it can be extremely inefficient because Ethereum is slow, and you will have to pay for each transaction. That's why you need the `merkleRoot`.

### merkleRoot

Once computing the `targetHash` of a document, OpenAttestation will determine the `merkleRoot`. The `merkleRoot` value is the merkle root hash computed from the [merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) using the `targetHash` of all the document wrapped together. Each `targetHash` is a leaf in the tree. After computing the merkle tree, the `merkleRoot` associated to a document will be added to it with the proofs (intermediate hashes) needed to ensure that the `targetHash` has been used to compute the `merkleRoot`. The proofs are added into the `proof` property.

In addition, when you wrap only one document at a time, the `targetHash` and the `merkleRoot` are identical and the `proof` property is empty. This is a normal behavior. 

When you wrap at least two documents at the same time, there will be a difference between `targetHash` and `merkleRoot`, and the proofs appended.

>**Note:** The `merkleRoot` will always be the same for all the documents wrapped together (in a batch). It will be different for the documents wrapped separately.

### Issuance

At this step, the batch of documents has a common identifier and you can prove the `targetHash` of a document was used to create a specific `merkleRoot`, based on the merkle tree algorithm. You can use the `merkleRoot` in your document store and issue it.

### Revocation

The issuance of documents can happen individually or in batch. Issuing a batch of documents is more efficient. When it comes to revocation, both values can be used:

- `targetHash` will enable the revocation of a specific document.
- `merkleRoot` will enable the revocation of a whole batch of documents.

### Issuance process and verification

To issue a document, an institution or individual need to perform the following:

1. [Deploy a new document store](/docs/integrator-section/verifiable-document/ethereum/document-store) on Ethereum and get the address of the deployed contract. 
    
    Perform this action only once.

1. Add the address of the deployed contract into the document before wrapping.

1. Wrap a document (or a batch of documents) and get a `merkleRoot`. 

    You can share the wrapped documents with the recipients.

1. Issue the `merkleRoot` by calling the `issue` function from the document store contract.

An OpenAttestation verifier will perform the following:

- Check the `merkleRoot` of the document has been issued:
  1. Get back the document store contract address from the document itself.
  1. Ensure that the `targetHash` and the `proof` match the `merkleRoot`.
  1. Check the `merkleRoot` is in the document store, by calling the `isIssued` function from the deployed contract.
- Check the `merkleRoot` of the document has been issued:
  1. Get back the document store contract address from the document itself.
  1. Check the `targetHash` is **not** in the document store, by calling the `isRevoked` function from the deployed contract.
  1. Check the `merkleRoot` is **not** in the document store, by calling the `isRevoked` function from the deployed contract.

## DIDs

Decentralized identifiers (DIDs) are a new type of identifier that enables verifiable, decentralized digital identity. The DID document associated with DIDs contains a verification method, often a public key. The owner of a DID can use the associated private key and anyone can verify that the owner controls the public key.

Currently, OpenAttestation only supports one DID method, `ethr`.

### Issuance

DIDs [are significantly faster and incur not costs](/docs/overview-section/overview). They can directly use the `targetHash` of the document (which is unique) and sign it using the associated private key. However, for consistency with the initial design of OpenAttestation, you need to sign the `merkleRoot`.

The information about the signature is added to the document, into the `proof` property. That means the document has been issued.

An `ethr` DID document looks like the following:

```json
{
  "@context": "https://w3id.org/did/v1",
  "id": "did:ethr:0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69",
  "publicKey": [
    {
      "id": "did:ethr:0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69#controller",
      "type": "Secp256k1VerificationKey2018",
      "controller": "did:ethr:0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69",
      "ethereumAddress": "0x6813eb9362372eef6200f3b1dbc3f819671cba69"
    }
  ],
  "authentication": [
    {
      "type": "Secp256k1SignatureAuthentication2018",
      "publicKey": "did:ethr:0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69#controller"
    }
  ]
}
```

The example above contains three pieces of important information:

- the DID identifier (here `did:ethr:0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69`). It's used to identify the DID, and you must add it into the `issuer.id` property of the document.
- The DID controller (here `did:ethr:0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69#controller`). It's used to identify which public key control the DID, and you must add it into the `issuer.identityProof.key` property of the document. The value is equal to the DID identifier, appended with `#controller`.
- The ethereum address associated to the DID controller (here `0x6813eb9362372eef6200f3b1dbc3f819671cba69`). you will use it to verify the signature.

>**Note:** See an example document using DID in [this guide](/docs/integrator-section/verifiable-document/did/raw-document-did).

A proof of signature looks like:

```json
{
  "proof": [
    {
      "type": "OpenAttestationSignature2018",
      "created": "2020-10-05T09:05:35.171Z",
      "proofPurpose": "assertionMethod",
      "verificationMethod": "did:ethr:0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69#controller",
      "signature": "0x6d0ff5c64b8230cdc471f38267495002f2c762acf7a80250599809ee32b4255377f1adcb56fb712dee66bfeb21be6b5d802f299aea1f1edca129e88e4c1742ce1c"
    }
  ]
}
```

- `signature` is the signed `merkleRoot`.
- `verificationMethod` is the DID controller.

That's all the information OpenAttestation uses to verify that the document has been signed with the correct private key. The `ethr` DID uses [ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) with [Secp256k1](https://en.bitcoin.it/wiki/Secp256k1) as parameter of the elliptic curve, which provides this property: when you verify a signature, use the initial value (`merkleRoot`) and the signed value (`signature`), so that they will recover the ethereum address associated with the private key. Compare the ethereum address from the DID document with the ethereum address returned by the verification. If they match, the signature is valid.

If you want to learn more about ECDSA, read [this guide from Yos Riady](https://yos.io/2018/11/16/ethereum-signatures/).

### Revocation

It's possible to revoke a DID document if a document store has been declared in its revocation block. You can revoke a document [using a document store or an OCSP](/docs/integrator-section/verifiable-document/did/revoking-document-did).

>**Note:** If you use revocation for `DID`, you still need to have at least one transaction with the ethereum blockchain to deploy a `documentStore`.

### Issuance process and verification

To issue a document, perform the following:

- [Create a new ethr DID](/docs/integrator-section/verifiable-document/did/create) to get the private key and the public address.

    Perform this action only once.

- Add the DID address and controller into the document before wrapping.

- Wrap a document and get a `merkleRoot`.

- Sign the `merkleRoot` using the private key. The signature must be appended into the wrapped document.

- Share the wrapped document with the recipients.

An OpenAttestation verifier will perform the following:

- Retrieve the ethereum address associated with the DID identifier and DID controller from the document.
- Retrieve the ethereum used to sign the `merkleRoot`.
- Make sure both addresses match.

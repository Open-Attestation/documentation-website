---
id: oa-verify
title: Verification SDK (javascript)
sidebar_label: Verification SDK (javascript)
---

The OpenAttestation Verification SDK (javascript) is a npm module that allows you to  verify [wrapped document](/docs/component/open-attestation) programmatically. This is useful if you are building your own API or web components. Some common use cases where you need this module:
- [Verifying a document](#verifying-a-document)
- [Building custom verifier](#custom-verification)
- [Building custom validation](#custom-validation)

This module does not provide the following functionality:
- Programmatic wrapping of OA documents (refer to [OpenAttestation Wrapper SDK (javascript)](/docs/component/open-attestation))
- Encryption or decryption of OA documents (refer to [Encryption SDK (javascript)](/docs/component/oa-encryption))
- Programmatic issuance/revocation of document on the Ethereum blockchain

## Installation

1. Install [Node.js](https://nodejs.org/en/)
1. Install the library: `npm install @govtechsg/oa-verify`

## Verifying a document

A verification happens on a wrapped document, and it consists of answering to some questions:
- Has the document been tampered with ?
- Is the issuance state of the document valid ?
- Is the document issuer identity valid ? (see [identity proof](/docs/advanced/identity-proofs))

Before starting to play with the library, create a file `document.json` having the following content:
```json
{
  "version": "https://schema.openattestation.com/2.0/schema.json",
  "data": {
    "issuers": [
      {
        "documentStore": "746531fb-bcbf-44d1-a32f-d662c411a71e:string:0x8Fc57204c35fb9317D91285eF52D6b892EC08cD3",
        "name": "824f1c2e-e289-4574-b207-d39afb151592:string:University of Blockchain",
        "identityProof": {
          "type": "e92275d8-5e8f-4adf-98fe-62e615f9837d:string:DNS-TXT",
          "location": "3628440e-c859-4eec-bf47-fffedafec154:string:example.openattestation.com"
        }
      }
    ]
  },
  "privacy": { "obfuscatedData": [] },
  "signature": {
    "type": "SHA3MerkleProof",
    "targetHash": "0badef8f1d5652abef918c15725412b715c708d5eb25fe14df155d63c5241f62",
    "proof": [],
    "merkleRoot": "0badef8f1d5652abef918c15725412b715c708d5eb25fe14df155d63c5241f62"
  }
}
```

This is a wrapped document created using [OpenAttestation Wrapper SDK](/docs/component/open-attestation).

Let's make sure the document is valid:
```javascript
const { verify, isValid } = require("@govtechsg/oa-verify");
const document = require("./document.json");

verify(document, { network: "ropsten" }).then(fragments => {
  console.log(isValid(fragments)); // output true
});
```

### Custom verification
In some cases, you will need to perform more verification on a document than the one provided by default. Fortunately the library is configurable in a way you can create your own [verification methods](/docs/advanced/verification-methods) and distribute your verifier.  

### Custom validation
The `isValid` function will execute over fragments and determine if the fragments produced a valid result. By default the function will return true if a document fulfill the following conditions:
- The document has NOT been tampered, AND
- The document has been issued, AND
- The document as NOT been revoked, AND
- The issuer identity is valid.

However in some conditions, the result of the function might not be useful: Why is the document not valid ? Is it because it has been tampered ? Or maybe the issuer identity is invalid ?

The function allow to specify as a second parameters the list of types on which to perform the checks. Let's try to run the verifier on `mainnet` network :

```javascript
const { verify, isValid } = require("@govtechsg/oa-verify");
const document = require("./document.json");

verify(document, { network: "mainnet" }).then(fragments => {
  console.log(isValid(fragments)); // output false
  console.log(isValid(fragments, ["DOCUMENT_INTEGRITY"])); // output true
  console.log(isValid(fragments, ["DOCUMENT_STATUS"])); // output false
  console.log(isValid(fragments, ["ISSUER_IDENTITY"])); // output false
});
```

Let's try to understand the different results:
- `isValid(fragments, ["DOCUMENT_INTEGRITY"])` returns true because the integrity of the document is not dependant on the network it has been published to.
- `isValid(fragments, ["DOCUMENT_STATUS"])` returns false because the document has not been published on Ethereum main network.
- `isValid(fragments, ["DOCUMENT_STATUS"])` returns false because there is no [DNS-TXT record](/docs/verifiable-document/dns-proof) associated with the Ethereum main network's document store.
- `isValid(fragments)` returns false because at least one of the above returns false.

### Listening to individual verification method
The `verify` function has an option to listen to individual verification methods. It might be useful if you want for instance to provide individual loader on your UI.

```javascript
const { verify, isValid } = require("@govtechsg/oa-verify");
const document = require("./document.json");

verify(document, {
  network: "ropsten",
  promisesCallback: verificationMethods => {
    for (const verificationMethod of verificationMethods) {
      verificationMethod.then(fragment =>
        console.log(
          `${fragment.name} has been resolved with status ${fragment.status}`
        )
      );
    }
  }
}).then(fragments => {
  console.log(isValid(fragments)); // output true
});
```

## Additional information
- Verification SDK implementation follow our [Verifier ADR](https://github.com/Open-Attestation/adr/blob/master/verifier.md).
- Found a bug ? Having a question ? Want to share an idea ? Reach us out on the [Github repository](https://github.com/Open-Attestation/oa-verify).`

---
id: oa-verify
title: Verification SDK (javascript) 
sidebar_label: Verification SDK (javascript)
---

The OpenAttestation Verification SDK (javascript) is a npm module that allows you to  verify [wrapped document](/docs/component/open-attestation) programmatically. This is useful if you are building your own API or web components. Some common use cases where you need this module:
- [Verifying a document](#verifying-a-document)
- [Building custom verifiers](#custom-verification)
- [Building custom validation](#custom-validation)

This module does not provide the following functionality:
- Programmatic wrapping of OA documents (refer to [OpenAttestation Wrapper SDK (javascript)](/docs/component/open-attestation))
- Encryption or decryption of OA documents (refer to [Encryption SDK (javascript)](/docs/component/oa-encryption))
- Programmatic issuance/revocation of document on the Ethereum blockchain

## Installation

1. Install [Node.js](https://nodejs.org/en/)
1. Install the library: `npm install @govtechsg/oa-verify`

## Verifying a document

A verification happens on a wrapped document, and it consists of answering to 4 questions:
- Has the document been tampered with ?
- Has the document been issued on the Blockchain ?
- Has the document been revoked ?
- Is the document issuer identity valid ? (see [identity proof](/docs/extension/identity-proofs))

Before starting to play with the library, create a file `document.json` having the following content:
```json
{
  "version": "open-attestation/2.0",
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
The `verify` function is built to run a list of verifiers. Each verifier will produce a fragment that will help to determine if the document is valid. Open Attestation comes with it's own set of verifiers.

The `verificationBuilder` function help you to create custom verification method. You can reuse the default verifiers exported by the library.

```javascript
const document = require("./document.json");
const { verificationBuilder, openAttestationVerifiers, isValid } = require("@govtechsg/oa-verify");

// our custom verifier will be valid only if the document version is not open-attestation/2.0
const customVerifier = {
  skip: () => {
    throw new Error("this verifier is never skipped");
  },
  test: () => true,
  verify: async document => {
    if (document.version === "open-attestation/2.0") {
      return {
        type: "DOCUMENT_INTEGRITY",
        name: "CustomVerifier",
        data: document.version,
        status: "INVALID"
      };
    }
    return {
      type: "DOCUMENT_INTEGRITY",
      name: "CustomVerifier",
      data: document.version,
      status: "VALID"
    };
  }
};

// create your own verify function with all verifiers and your custom one
const verify = verificationBuilder([
  ...openAttestationVerifiers,
  customVerifier
]);

verify(document, { network: "ropsten" }).then(fragments => {
  console.log(isValid(fragments)); // return false
});
```

Try to change the version of the wrapped document to anything else and see the result.

### Custom validation
The `isValid` function will execute over fragments and determine if the fragments produced a valid result. By default the function will return true if a document fulfill the following conditions:
- The document has NOT been tampered, AND
- The document has been issued, AND
- The document as NOT been revoked, AND
- The issuer identity is valid.

However in some conditions, the result of the function might not be useful: Why is the document not valid ? Is it because it has been tampered ? Or maybe the issuer identity is invalid ?

The function allow to specify as a second parameters the list of types on which to perform the checks. Let's try it with our custom verifiers over the initial wrapped document:

```javascript
const { verificationBuilder, isValid, openAttestationVerifiers } = require("@govtechsg/oa-verify");
const document = require("./document.json");

// our custom verifier will be valid only if the document version is not open-attestation/2.0
const customVerifier = {
  skip: () => {
    throw new Error("this verifier is never skipped");
  },
  test: () => true,
  verify: async document => {
    if (document.version === "open-attestation/2.0") {
      return {
        type: "DOCUMENT_INTEGRITY",
        name: "CustomVerifier",
        data: document.version,
        status: "INVALID"
      };
    }
    return {
      type: "DOCUMENT_INTEGRITY",
      name: "CustomVerifier",
      data: document.version,
      status: "VALID"
    };
  }
};

const verify = verificationBuilder([
  ...openAttestationVerifiers,
  customVerifier // see above
]);

verify(document, { network: "ropsten" }).then(fragments => {
  console.log(isValid(fragments)); // output false
  console.log(isValid(fragments, ["DOCUMENT_INTEGRITY"])); // output false
  console.log(isValid(fragments, ["DOCUMENT_STATUS"])); // output true
  console.log(isValid(fragments, ["ISSUER_IDENTITY"])); // output true
});
```

### Listening to individual verifiers
The `verify` function has an option to listen to every verifiers individually. It might be useful if you want for instance to provide individual loader on your UI.

```javascript
const { verify, isValid } = require("@govtechsg/oa-verify");
const document = require("./document.json");

verify(document, {
  network: "ropsten",
  promisesCallback: verifiers => {
    for (const verifier of verifiers) {
      verifier.then(fragment =>
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

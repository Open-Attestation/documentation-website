---
id: verification-methods
title: Extending Verification Methods
sidebar_label: Verification Methods
---

As explained by our [Verifier ADR](https://github.com/Open-Attestation/adr/blob/master/verifier.md), the library is composed of verification methods, that are run over a document and provide fragments containing details about each verification. In this guide we will learn how to write custom verification method and how you can distribute your own verifier.

### Building a custom verification method
We will write a verification method having the following rules:
1. it must run only on document having their version equal to `https://schema.openattestation.com/2.0/schema.json`.
1. it must return a valid fragment, if and only if the document data hold a name property with the value `Certificate of Completion`

### Document version must be equal to `https://schema.openattestation.com/2.0/schema.json`
This is where `skip` and `test` methods comes into play. We will use the `test` method to return when the verification method run, and the `skip` method to explain why it didn't run:
```javascript
const customVerifier = {
  skip: async () => {
    return {
      status: "SKIPPED",
      type: "DOCUMENT_INTEGRITY",
      name: "CustomVerifier",
      reason: {
        code: 0,
        codeString: "SKIPPED",
        message: `Document doesn't have version equal to 'https://schema.openattestation.com/2.0/schema.json'`
      }
    };
  },
  test: () => document.version === "https://schema.openattestation.com/2.0/schema.json"
}
```

> we use `DOCUMENT_INTEGRITY` type because we check for the content of the document.

### Document hold correct `name` property
Once we have decided `when` the verification method run, it's time to write the logic of the verifier in the `verify`. We will use [getData](/docs/component/open-attestation#retrieving-document-data) utility to access the data of the document and return the appropriate fragment depending on the content:

```javascript
const customVerifier = {
  // ... above are skip and test function
  verify: async document => {
    const documentData = getData(document);
    if (documentData.name !== "Certificate of Completion") {
      return {
        type: "DOCUMENT_INTEGRITY",
        name: "CustomVerifier",
        data: documentData.name,
        reason: {
          code: 1,
          codeString: "INVALID_NAME",
          message: `Document name is ${documentData.name}`
        },
        status: "INVALID"
      };
    }
    return {
      type: "DOCUMENT_INTEGRITY",
      name: "CustomVerifier",
      data: documentData.name,
      status: "VALID"
    };
  }
};
```

## Building a custom verify method
The `verify` function is built to run a list of verification method. Each verifier will produce a fragment that will help to determine if the document is valid. Open Attestation comes with its own set of verification methods available in `openAttestationVerifiers`.

The `verificationBuilder` function help you to create custom verification method. You can reuse the default one exported by the library.

Let's build a new verifier using our custom verification method:

```javascript
const document = require("./document.json");
const {
  verificationBuilder,
  openAttestationVerifiers,
  isValid
} = require("@govtechsg/oa-verify");
const { getData } = require("@govtechsg/open-attestation");

// our custom verifier will be valid only if the document version is not https://schema.openattestation.com/2.0/schema.json
const customVerifier = {
  skip: async () => {
    return {
      status: "SKIPPED",
      type: "DOCUMENT_INTEGRITY",
      name: "CustomVerifier",
      reason: {
        code: 0,
        codeString: "SKIPPED",
        message: `Document doesn't have version equal to 'https://schema.openattestation.com/2.0/schema.json'`
      }
    };
  },
  test: () => document.version === "https://schema.openattestation.com/2.0/schema.json",
  verify: async document => {
    const documentData = getData(document);
    if (documentData.name !== "Certificate of Completion") {
      return {
        type: "DOCUMENT_INTEGRITY",
        name: "CustomVerifier",
        data: documentData.name,
        reason: {
          code: 1,
          codeString: "INVALID_NAME",
          message: `Document name is ${documentData.name}`
        },
        status: "INVALID"
      };
    }
    return {
      type: "DOCUMENT_INTEGRITY",
      name: "CustomVerifier",
      data: documentData.name,
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
  console.log(fragments.find(fragment => fragment.name === "CustomVerifier")); // display the details on our specific verifier
});
```

The document that we [created](/docs/component/oa-verify) is not valid against our own verifier because the name property does not exist. Try again with the following document:
```json
{
  "version": "https://schema.openattestation.com/2.0/schema.json",
  "data": {
    "name": "66e35a92-9e97-4ffc-b94e-769773dd7535:string:Certificate of Completion",
    "issuers": [
      {
        "documentStore": "375a13f9-ca3d-4a1f-a0c9-1fa92e43a3ec:string:0x8Fc57204c35fb9317D91285eF52D6b892EC08cD3",
        "name": "448c7f62-3a93-4792-a157-fabcbf15b91a:string:University of Blockchain",
        "identityProof": {
          "type": "dcfc17e0-a178-4bb8-b0fb-6a2cfddb8f2f:string:DNS-TXT",
          "location": "e3f54dbf-bb51-41bb-9511-e01a5c07ea86:string:example.openattestation.com"
        }
      }
    ]
  },
  "privacy": { "obfuscatedData": [] },
  "signature": {
    "type": "SHA3MerkleProof",
    "targetHash": "975887a864e11fbe27e90f4759c44db90193abc237dede81cd3cd7ca45c46522",
    "proof": [],
    "merkleRoot": "975887a864e11fbe27e90f4759c44db90193abc237dede81cd3cd7ca45c46522"
  }
}
```
> You are ready to distribute your own custom verifier

## Additional information
- [opencerts-verify](https://github.com/OpenCerts/verify) is an example of a custom verifier.
- Using Typescript ? The library exports a set of useful types to help you build verification method. Checkout the source code.
- Verification SDK implementation follow our [Verifier ADR](https://github.com/Open-Attestation/adr/blob/master/verifier.md).
- Found a bug ? Having a question ? Want to share an idea ? Reach us out on the [Github repository](https://github.com/Open-Attestation/oa-verify).`

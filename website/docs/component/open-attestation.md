---
id: open-attestation
title: OpenAttestation Wrapper SDK (javascript)
sidebar_label: Wrapper SDK (javascript)
---

The OpenAttestation SDK (JavaScript) is a npm module that allows you to manipulate OA documents programmatically. This is useful if you are building your own API or web components. Some common use cases of this module:
- [Generating OA documents from external data sources programmatically](#wrapping-documents)
- [Extracting data from OA documents programmatically](#retrieving-document-data)
- [Programmatic selective disclosure of data fields from issued OA documents](#obfuscating-data)

This module does not provide the following functionality:
- Programmatic verification of OA documents (refer to [Verification SDK (javascript)](/docs/component/oa-verify))
- Encryption or decryption of OA documents (refer to [Encryption SDK (javascript)](/docs/component/oa-encryption))
- Programmatic issuance/revocation of document on the Ethereum blockchain

## Installation

1. Install [Node.js](https://nodejs.org/en/)
1. Install the library: `npm install @govtechsg/open-attestation`

## Usage

### Wrapping documents

Before starting to play with the library, create a file named `document.json` with the following content:
```json
{
  "issuers": [
    {
      "documentStore": "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd",
      "name": "University of Blockchain",
      "identityProof": {
        "type": "DNS-TXT",
        "location": "example.com"
      }
    }
  ]
}
```

#### Wrapping a single document
```javascript
const { wrapDocument } = require("@govtechsg/open-attestation");
const document = require("./document.json");
const util = require("util");

const wrappedDocument = wrapDocument(document);

console.log(util.inspect(wrappedDocument, { showHidden: false, depth: null }));
```

Will display:

```javascript
{
  version: 'https://schema.openattestation.com/2.0/schema.json',
  data: {
    issuers: [
      {
        documentStore: '5924d910-8916-446a-b1c3-55e2f86dd8f3:string:0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd',
        name: '0f737b20-9e5e-4ec4-bffd-c63002616bfd:string:University of Blockchain',
        identityProof: {
          type: '5fc379dd-cd24-4c91-a4c7-cf76f9c96d8d:string:DNS-TXT',
          location: '62e1c6c3-09a9-4e52-aaf6-9daf24d43657:string:example.com'
        }
      }
    ]
  },
  privacy: { obfuscatedData: [] },
  signature: {
    type: 'SHA3MerkleProof',
    targetHash: '956e27c86d4893a971600d328e235ede886f1c00b183257a822667b69886fced',
    proof: [],
    merkleRoot: '956e27c86d4893a971600d328e235ede886f1c00b183257a822667b69886fced'
  }
}
```
Note: 
- Every time you run `wrapDocument`, a salt is generated in front of each field in the data object to prevent reversing the obfuscation on fields with easily guessable content. `targetHash` and `merkleRoot` also change.
- If you are wrapping one document, `targetHash` and `merkleRoot` are equivalent.

#### Wrapping multiple documents
```javascript
const { wrapDocuments } = require("@govtechsg/open-attestation");
const document = require("./document.json");
const util = require("util");

const wrappedDocuments = wrapDocuments([document, document]);

console.log(util.inspect(wrappedDocuments, { showHidden: false, depth: null }));
```
 This will display a similar result as previously with few differences:
- `wrapDocuments` returns an `array` and not an `object`.
- Each element in the array is a wrapped document corresponding to the one provided as input.
- Each element has the same `merkleRoot`.
- Each element has a different `targetHash`.
- Similar to `wrapDocument`, every time you run `wrapDocuments`, it will create different hashes (in front of every fields in the data object), `targetHash` and `merkleRoot`.
 
#### Wrapping invalid document
Every document that you wrap must conform to the [OA schema](https://raw.githubusercontent.com/Open-Attestation/open-attestation/master/src/schema/2.0/schema.json). If that's not the case, an error will be thrown providing information about why your document is not valid.

For instance let's change `document.json` to remove the `issuers` field so that the document is an empty object:
```json
{}
```

Let's wrap again this document:
```javascript
const { wrapDocument } = require("@govtechsg/open-attestation");
const document = require("./document.json");
const util = require("util");

const wrappedDocument = wrapDocument(document);

console.log(util.inspect(wrappedDocument, { showHidden: false, depth: null }));
```

Running the code will output that the document is not valid, because the `issuers` property is required:
```javascript
Error: Invalid document
    at new SchemaValidationError
...
validationErrors: [
    {
      keyword: 'required',
      dataPath: '',
      schemaPath: '#/required',
      params: [Object],
      message: "should have required property 'issuers'"
    }
  ],
```

#### Adding data
You are free to add additional data you want in the document. OA only cares about the data it needs to work and doesn't perform extra verification on the additional data you provide.

Let's add more data into the document:
```json
{
  "issuers": [
    {
      "documentStore": "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd",
      "name": "University of Blockchain",
      "identityProof": {
        "type": "DNS-TXT",
        "location": "example.com"
      }
    }
  ],
  "transcript": {
    "name": "Introduction to Programming",
    "grade": "A+",
    "courseCredit": "3",
    "courseCode": "CS 1110",
    "examinationDate": "2017-12-01T00:00:00+08:00",
    "semester": "1"
  }
}
```
And wrap it again:
```javascript
const { wrapDocument } = require("@govtechsg/open-attestation");
const document = require("./document.json");
const util = require("util");

const wrappedDocument = wrapDocument(document);

console.log(util.inspect(wrappedDocument, { showHidden: false, depth: null }));
```

### Validating a wrapped document

#### Validating the structure
`validateSchema` checks that the structure data of a wrapped document is valid (against [OA schema](https://raw.githubusercontent.com/Open-Attestation/open-attestation/master/src/schema/2.0/schema.json)):
```javascript
const { validateSchema } = require("@govtechsg/open-attestation");
const wrappedDocument = {
  version: "https://schema.openattestation.com/2.0/schema.json",
  data: {
    issuers: [
      {
        documentStore: "5924d910-8916-446a-b1c3-55e2f86dd8f3:string:0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd",
        name: "0f737b20-9e5e-4ec4-bffd-c63002616bfd:string:University of Blockchain",
        identityProof: {
          type: "5fc379dd-cd24-4c91-a4c7-cf76f9c96d8d:string:DNS-TXT",
          location: "62e1c6c3-09a9-4e52-aaf6-9daf24d43657:string:example.com"
        }
      }
    ]
  },
  privacy: { obfuscatedData: [] },
  signature: {
    type: "SHA3MerkleProof",
    targetHash: "956e27c86d4893a971600d328e235ede886f1c00b183257a822667b69886fced",
    proof: [],
    merkleRoot: "956e27c86d4893a971600d328e235ede886f1c00b183257a822667b69886fced"
  }
}; 
console.log(validateSchema(wrappedDocument)); // true
```

#### Validating the content
`verifySignature` checks that the signature of the document matches the content in the document. If the document was wrapped in a batch, it also checks that the document was indeed part of the batch by using `proof` and `merkleRoot`.

Note that this method does not check if the document was published on the blockchain or any registry. To verify whether it was published, the merkle root of this document needs to be checked against a publicly accessible document store (can be a smart contract on the blockchain).
```javascript
const { verifySignature } = require("@govtechsg/open-attestation");
const wrappedDocument = {
  version: "https://schema.openattestation.com/2.0/schema.json",
  data: {
    issuers: [
      {
        documentStore: "5924d910-8916-446a-b1c3-55e2f86dd8f3:string:0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd",
        name: "0f737b20-9e5e-4ec4-bffd-c63002616bfd:string:University of Blockchain",
        identityProof: {
          type: "5fc379dd-cd24-4c91-a4c7-cf76f9c96d8d:string:DNS-TXT",
          location: "62e1c6c3-09a9-4e52-aaf6-9daf24d43657:string:example.com"
        }
      }
    ]
  },
  privacy: { obfuscatedData: [] },
  signature: {
    type: "SHA3MerkleProof",
    targetHash: "956e27c86d4893a971600d328e235ede886f1c00b183257a822667b69886fced",
    proof: [],
    merkleRoot: "956e27c86d4893a971600d328e235ede886f1c00b183257a822667b69886fced"
  }
}; 
console.log(verifySignature(wrappedDocument)); // true
```

If you change any value within the `data` object (for instance `DNS-TXT` to `DNS-TX`), then `verifySignature` will return false.

### Retrieving document data
`getData` returns the original data stored in the document, in a readable format.

```javascript
const { wrapDocument, getData } = require("@govtechsg/open-attestation");
const document = require("./document.json");

const wrappedDocument = wrapDocument(document);
const wrappedDocumentData = getData(wrappedDocument); // wrappedDocumentData and document are identical
```

### Obfuscating data
`obfuscateDocument` removes a key-value pair from the document's data section, without causing the file hash to change. This can be used to generate a new document containing a subset of the original data, yet allow the recipient to prove the provenance of the document.

Let's hide the `transcript.name` field:
```
const { wrapDocument, obfuscateDocument } = require("@govtechsg/open-attestation");
const util = require("util");
const document = require("./document.json");

const wrappedDocument = wrapDocument(document);
const obfuscatedDocument = obfuscateDocument(wrappedDocument, "transcript.name");

console.log(util.inspect(obfuscatedDocument, { showHidden: false, depth: null }));
```

In the output, the `transcript.name` field is not available anymore, and a new hash has been added to `privacy.obfuscatedData`:
```javascript
{
  version: 'https://schema.openattestation.com/2.0/schema.json',
  data: {
    issuers: [
      {
        documentStore: '064fef05-2f61-446c-9c46-ab43fbb16ed9:string:0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd',
        name: 'fc909530-e614-4d8f-9d42-908d19eb953d:string:University of Blockchain',
        identityProof: {
          type: '2b7c78aa-dbc0-439e-96a2-8787739c71ef:string:DNS-TXT',
          location: '30ebc0da-23cf-4702-b93d-5d3c2676e726:string:example.com'
        }
      }
    ],
    transcript: {
      grade: 'a6ea9be4-7596-4c2c-b7c0-40c38e51e158:string:A+',
      courseCredit: 'e1a377c1-2bf9-4c54-ba2c-2ceb4f24ba38:string:3',
      courseCode: '34d12250-6c82-4339-ab2e-993ba4c35dd0:string:CS 1110',
      examinationDate: '8937934a-5910-418b-abbb-b00d0b136a7f:string:2017-12-01T00:00:00+08:00',
      semester: 'fac5e301-2979-48b3-9ae6-3fae243c5156:string:1'
    }
  },
  privacy: {
    obfuscatedData: [
      '0893674f98d90213a9caf8ee8686d6b6db32f3485635cc950cac4164a10ccd18'
    ]
  },
  signature: {
    type: 'SHA3MerkleProof',
    targetHash: 'a5cb3ad4a767189a61b7b6fd462c625663a85e80a6ed476d4cd9b6fa17ca1814',
    proof: [],
    merkleRoot: 'a5cb3ad4a767189a61b7b6fd462c625663a85e80a6ed476d4cd9b6fa17ca1814'
  }
}
```

### Typescript
This module is built with typescript and provides useful types:
- `import {v2} from "@govtechsg/open-attestation"` to get correct typings over [OA schema](https://raw.githubusercontent.com/Open-Attestation/open-attestation/master/src/schema/2.0/schema.json). For instance `v2.OpenAttestationDocument` to get full details about a valid document structure.
- `import {WrappedDocument} from "@govtechsg/open-attestation"` to get correct typings for wrapped documents. You can provide a specific type to this helper: `WrappedDocument<v2.OpenAttestationDocument>`. Using this helper is specifically useful when combining with `getData`, so that the return of the function is correctly typed.
- `import {utils} from "@govtechsg/open-attestation"`:
  - `utils.isWrappedV2Document`: type guard.

## Additional information
- Found a bug? Have a question? Want to share an idea? Reach us on the [Github repository](https://github.com/Open-Attestation/open-attestation).
- We are currently building a new version of the schema, compatible with W3C VC. This is very experimental and whatever is available for v2 documents are also available for v3 documents:
  - [OA schema v3](https://raw.githubusercontent.com/Open-Attestation/open-attestation/master/src/schema/3.0/schema.json)
  - Typings: `import {v3} from "@govtechsg/open-attestation"`.
  - Type guard: `utils.isWrappedV3Document`.
  - Wrapping: `wrapDocument(document, {version: "open-attestation/3.0"})`
- There are extra utilities available:
  - `utils.getIssuerAddress`: to return the list of issuer address from wrapped document.

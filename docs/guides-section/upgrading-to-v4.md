---
id: upgrading-to-v4
title: Upgrading to OA v4
sidebar_label: Upgrading to OA v4
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Upgrading to OA v4

This guide aims to help users looking to upgrade from earlier versions of OpenAttestation to v4 and to understand the changes that have been introduced.

> Note: OA v4 currently supports DNS-DID signing only and does not support issuance via the Ethereum Document Store. 

## What's new

Created with a focus on conforming to [W3C's Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/), v4 updates the structure of issued documents in order to take a step forward in terms of interoperability.

In addition, v4 will provide issuers with added functionality, starting with support for an alternative render method - the [W3C SvgRenderingTemplate](https://w3c-ccg.github.io/vc-render-method/#svgrenderingtemplate).

Issuers of OA documents are encouraged to migrate to v4 in order to be W3C compliant and to make use of new features. The information below will cover how to create your own raw v4 document as well as the changes during the wrapping and signing processes. For more information on the newly support SVG render method, please visit [this repository](https://github.com/Open-Attestation/decentralized-renderer-react-components?tab=readme-ov-file#svg-rendering).

## Creating raw documents
When creating documents, properties can be split into two categories:
- OA properties - needed for the OA framework to properly sign, verify, and display the document; and
- Data properties - which are information relating to the subject e.g. the name of the qualification or what scores the subject was awarded

In OA v2, the raw document can contain both OA properties and Data properties at the root level. For example:

<Tabs>
<TabItem value="basic" label="Basic v2">

```js
{
  "recipient": {
    "name": "John Doe"
  },
  "course": {
    "name": "Issuing OA v4 documents"
  },
  "someOtherProperty": "that is directly at the root",
  "issuers": [
    {
      "id": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D",
      "name": "Demo Issuer",
      "revocation": {
        "type": "NONE"
      },
      "identityProof": {
        "type": "DNS-DID",
        "location": "horizontal-beige-goose.sandbox.openattestation.com",
        "key": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller"
      }
    }
  ]
}
```

</TabItem>
<TabItem value="withRenderer" label="v2 with Rendering">

```js
{
  "recipient": {
    "name": "John Doe"
  },
  "course": {
    "name": "Issuing OA v4 documents"
  },
  "someOtherProperty": "that is directly at the root",
  "$template": { // Additional "$template" object to enable rendering
    "name": "main",
    "type": "EMBEDDED_RENDERER",
    "url": "https://tutorial-renderer.openattestation.com"
  },
  "issuers": [
    {
      "id": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D",
      "name": "Demo Issuer",
      "revocation": {
        "type": "NONE"
      },
      "identityProof": {
        "type": "DNS-DID",
        "location": "horizontal-beige-goose.sandbox.openattestation.com",
        "key": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller"
      }
    }
  ]
}
```

</TabItem>

<TabItem value="withRenderAndRevoke" label="v2 with Rendering & Revocation">

```js
{
  "recipient": {
    "name": "John Doe"
  },
  "course": {
    "name": "Issuing OA v4 documents"
  },
  "someOtherProperty": "that is directly at the root",
  "$template": { // Additional "$template" object to enable rendering
    "name": "main",
    "type": "EMBEDDED_RENDERER",
    "url": "https://tutorial-renderer.openattestation.com"
  },
  "issuers": [
    {
      "id": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D",
      "name": "Demo Issuer",
      "revocation": { // Using the revocation store to enable revocation
        "type": "REVOCATION_STORE"
        "location": "0x123412341234123412341234123412341234123A"
      },
      "identityProof": {
        "type": "DNS-DID",
        "location": "horizontal-beige-goose.sandbox.openattestation.com",
        "key": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller"
      }
    }
  ]
}
```

</TabItem>
</Tabs>

In OA v4 this has been changed, and all information about the subject is placed within `credentialSubject`, with the issuance properties being placed within the `issuer`, `renderMethod`, and `credentialStatus` properties. There are also two new properties added in compliance with the W3C VC data model, namely `@context` and `type`. 

For OA v4 documents their values will always be:
- `@context`: [ "https://www.w3.org/ns/credentials/v2", "https://schemata.openattestation.com/com/openattestation/4.0/alpha-context.json" ]
- `type`: [ "VerifiableCredential", "OpenAttestationCredential" ]

For example, a corresponding v4 document for the above v2 document would look like this:

<Tabs>
<TabItem value="basic" label="Basic v4">

```js
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://schemata.openattestation.com/com/openattestation/4.0/alpha-context.json"
  ], // Points to external JSON-LD contexts in order for the document's schema to be validated
  "type": [
    "VerifiableCredential",
    "OpenAttestationCredential"
  ], // Informs verifiers of what kind of document to expect
  "issuer": {
    "id": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D",
    "type": "OpenAttestationIssuer",
    "name": "Demo Issuer",
    "identityProof": {
      "identityProofType": "DNS-DID",
      "identifier": "horizontal-beige-goose.sandbox.openattestation.com"
    }
  },
  "credentialSubject": {
    "recipient": {
    "name": "John Doe"
    },
    "course": {
    "name": "Issuing OA v4 documents"
    },
    "someOtherProperty": "that is directly at the root"
  }
}
```

</TabItem>
<TabItem value="withRenderer" label="v4 with Rendering">

```js
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://schemata.openattestation.com/com/openattestation/4.0/alpha-context.json"
  ], // Points to external JSON-LD contexts in order for the document's schema to be validated
  "type": [
    "VerifiableCredential",
    "OpenAttestationCredential"
  ], // Informs verifiers of what kind of document to expect
  "issuer": {
    "id": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D",
    "type": "OpenAttestationIssuer",
    "name": "Demo Issuer",
    "identityProof": {
      "identityProofType": "DNS-DID",
      "identifier": "horizontal-beige-goose.sandbox.openattestation.com"
    }
  },
  "renderMethod": [ // Additional "renderMethod" object to enable rendering
    {
      "id": "https://tutorial-renderer.openattestation.com",
      "type": "OpenAttestationEmbeddedRenderer",
      "templateName": "main"
    }
  ],
  "credentialSubject": {
    "recipient": {
    "name": "John Doe"
    },
    "course": {
    "name": "Issuing OA v4 documents"
    },
    "someOtherProperty": "that is directly at the root"
  }
}
```

</TabItem>

<TabItem value="withRenderAndRevoke" label="v4 with Rendering & Revocation">

```js
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://schemata.openattestation.com/com/openattestation/4.0/alpha-context.json"
  ], // Points to external JSON-LD contexts in order for the document's schema to be validated
  "type": [
    "VerifiableCredential",
    "OpenAttestationCredential"
  ], // Informs verifiers of what kind of document to expect
  "issuer": {
    "id": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D",
    "type": "OpenAttestationIssuer",
    "name": "Demo Issuer",
    "identityProof": {
      "identityProofType": "DNS-DID",
      "identifier": "horizontal-beige-goose.sandbox.openattestation.com"
    }
  },
  "renderMethod": [ // Additional "renderMethod" object to enable rendering
    {
      "id": "https://tutorial-renderer.openattestation.com",
      "type": "OpenAttestationEmbeddedRenderer",
      "templateName": "main"
    }
  ],
  "credentialStatus": { // Additional "credentialStatus" object to enable revocation
    "id": "0x123412341234123412341234123412341234123A",
    "type": "OpenAttestationRevocationStore",
  },
  "credentialSubject": {
    "recipient": {
    "name": "John Doe"
    },
    "course": {
    "name": "Issuing OA v4 documents"
    },
    "someOtherProperty": "that is directly at the root"
  }
}
```

</TabItem>
</Tabs>

## Wrapping

With respect to the wrapping of documents, two changes can be seen from v2 to v4:
- The type, merkle root, and target hash of the document are now placed within the `proof` property.
- The generated salts which were originally prefixed behind each value have been consolidated and added under the `proof` section.

<Tabs>
<TabItem value="v2wrapped" label="Wrapped Basic v2">

```js
{
  "version": "https://schema.openattestation.com/2.0/schema.json",
  "data": {
    "recipient": {
      "name": "6352ba2f-ee94-403c-bad2-efe449423e75:string:John Doe"
    },
    "course": {
      "name": "047cba72-96f3-4437-86e7-4679ff9bd8b7:string:Issuing OA v4 documents"
    },
    "someOtherProperty": "66da10f7-a299-4981-a7bb-69c2bdea0cdd:string:that is directly at the root",
    "issuers": [
      {
        "id": "463202ad-43d9-4c7f-8534-b2f388fa4c61:string:did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D",
        "name": "b279d18a-c2b6-4626-a804-f17fb3d9a497:string:Demo Issuer",
        "revocation": {
          "type": "1c68ff8e-48d2-4642-a1f0-5576b1a0849e:string:NONE"
        },
        "identityProof": {
          "type": "34a13390-064e-481e-a376-478d50f9215d:string:DNS-DID",
          "location": "de440592-cdd8-4eb8-b499-fe227a6356b8:string:horizontal-beige-goose.sandbox.openattestation.com",
          "key": "cc692ea0-7f45-4e06-9cfe-144306fe6365:string:did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller"
        }
      }
    ]
  },
  "signature": {
    "type": "SHA3MerkleProof",
    "targetHash": "a1dba714ee7f44dabf77cc648d0a41b0ceb4fbec695be41d8d1507493fb51dac",
    "proof": [],
    "merkleRoot": "a1dba714ee7f44dabf77cc648d0a41b0ceb4fbec695be41d8d1507493fb51dac"
  }
}
```

</TabItem>

<TabItem value="v4wrapped" label="Wrapped Basic v4">

```js
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://schemata.openattestation.com/com/openattestation/4.0/alpha-context.json"
  ],
  "type": [
    "VerifiableCredential",
    "OpenAttestationCredential"
  ],
  "issuer": {
    "id": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D",
    "type": "OpenAttestationIssuer",
    "name": "Demo Issuer",
    "identityProof": {
      "identityProofType": "DNS-DID",
      "identifier": "horizontal-beige-goose.sandbox.openattestation.com"
    }
  },
  "credentialSubject": {
    "recipient": {
      "name": "John Doe"
    },
    "course": {
      "name": "Issuing OA v4 documents"
    },
    "someOtherProperty": "that is directly at the root"
  },
  "proof": {
    "type": "OpenAttestationMerkleProofSignature2018",
    "proofPurpose": "assertionMethod",
    "targetHash": "a906b65827223cf96bf7c82d691a8cdfde1577d567f2e476f602567e496e9c6f",
    "proofs": [],
    "merkleRoot": "a906b65827223cf96bf7c82d691a8cdfde1577d567f2e476f602567e496e9c6f",
    "salts": "W3sidmFsdWUiOiI4YmVkNjY2MGM1MzQ1MzE3ZjdlOWE5NTYxNWI0ZjdjZmRkMTY0MDVlMGUxNDk3NDM0YzcyNWJiN2RhNjM2YjY2IiwicGF0aCI6IkBjb250ZXh0WzBdIn0seyJ2YWx1ZSI6ImNlN2Y3ODlhMmIzYWRlMGJlN2U0MzIzYTRlMWQyNWI0YTZjZWU0MDEzYjM0NGYxNzEwOTViYjMwZDg4NTliYjMiLCJwYXRoIjoiQGNvbnRleHRbMV0ifSx7InZhbHVlIjoiN2JjM2Y5MTE0ZTg5M2FhZTIyMThmYjE2MmQ2MmY4YzU0YmU4NmM4NjA5ZDczZTg3MjMyZTA3NTlmMWI0NWE4MCIsInBhdGgiOiJ0eXBlWzBdIn0seyJ2YWx1ZSI6IjYzZjI4M2M0Y2RlZDVlYmUzMGRkODhlMzI0OGIwZjc1MzRmNDVlNTFiZDM2ZDZjNDkwMmIzNjdhNTcyNTM3MWYiLCJwYXRoIjoidHlwZVsxXSJ9LHsidmFsdWUiOiI5NjZlNmYxYjExYTcxM2EyNTFkNGZiNzU2YWRmYmIwNDdmNzQyYjk2NTE4ZmMzODQzNjAxYzc2NWE4MTNmM2RkIiwicGF0aCI6Imlzc3Vlci5pZCJ9LHsidmFsdWUiOiI0YTk5ZTU5Y2FhNWU3YjgyNjlkZTEzZjRjNDBlOGQxMTcxMGM4ODA2NDY1OTkyNmMwZjhhNGI0OGM3MDE4NmIxIiwicGF0aCI6Imlzc3Vlci50eXBlIn0seyJ2YWx1ZSI6IjNlNWRjODc5ZWM0NTE2ZGE4M2EyZmQ3YzI3M2Y4Zjk0OGFkMGQ2NGEyM2Q2YmY3YzQ4YzA5ODgwMGNiNDMzM2QiLCJwYXRoIjoiaXNzdWVyLm5hbWUifSx7InZhbHVlIjoiNTEzNTc2YzczNDEyMjdhM2U0MjlmYjRmNGQ2NTFhYTU0ODRiNTllYzA5YmYwNTRlNDBjZmEzNmMwZmVlYjYzYSIsInBhdGgiOiJpc3N1ZXIuaWRlbnRpdHlQcm9vZi5pZGVudGl0eVByb29mVHlwZSJ9LHsidmFsdWUiOiJjMmExYzkwMGMyZjc4OTAzMmFmODZlMTk5OGQ0ZWYxYmZkNzRlYjEwYzFjYzRiYTNhNDNkZjJhNzg5MjM1MzA4IiwicGF0aCI6Imlzc3Vlci5pZGVudGl0eVByb29mLmlkZW50aWZpZXIifSx7InZhbHVlIjoiNzQ4ZjljZWNiMTBjZDY3OTEzYmEzZDkwZTdkMjMyNjdiNmVmYWYzNjQzMWMzYmM5ODA4NmI4NjIyNTdlZWU0NCIsInBhdGgiOiJjcmVkZW50aWFsU3ViamVjdC5yZWNpcGllbnQubmFtZSJ9LHsidmFsdWUiOiJhMGNmNThmYzMyZDk4OWUyMjZiMWY1ODNkNWVmNWU0YTA0ZDY0NjJhODBkZjBlNjIzOWEyZmIwMTA5ODRlYmVlIiwicGF0aCI6ImNyZWRlbnRpYWxTdWJqZWN0LmNvdXJzZS5uYW1lIn0seyJ2YWx1ZSI6IjViMThmZDQ5ZWQ5ZDNmZTdkMDdjZmMyZmEyNDNlY2RmOTYzNWY2ZjcxOTcwZThkNmE2ZmNhODVmZGE2YzkwNTciLCJwYXRoIjoiY3JlZGVudGlhbFN1YmplY3Quc29tZU90aGVyUHJvcGVydHkifV0=",
    "privacy": {
      "obfuscated": []
    }
  }
}
```

</TabItem>
</Tabs>

## Signing

As external proofs are discouraged by the W3C, v4 currently supports issuance via DNS-DID signing only.

In v4, the signature and public key of the document that were previously isolated within their own `proof` property are now included directly under the `proof` property created during the wrapping process.

<Tabs>
<TabItem value="v2wrappedAndSigned" label="Wrapped and Signed Basic v2">

```js
{
  "version": "https://schema.openattestation.com/2.0/schema.json",
  "data": {
    "recipient": {
      "name": "6352ba2f-ee94-403c-bad2-efe449423e75:string:John Doe"
    },
    "course": {
      "name": "047cba72-96f3-4437-86e7-4679ff9bd8b7:string:Issuing OA v4 documents"
    },
    "someOtherProperty": "66da10f7-a299-4981-a7bb-69c2bdea0cdd:string:that is directly at the root",
    "issuers": [
      {
        "id": "463202ad-43d9-4c7f-8534-b2f388fa4c61:string:did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D",
        "name": "b279d18a-c2b6-4626-a804-f17fb3d9a497:string:Demo Issuer",
        "revocation": {
          "type": "1c68ff8e-48d2-4642-a1f0-5576b1a0849e:string:NONE"
        },
        "identityProof": {
          "type": "34a13390-064e-481e-a376-478d50f9215d:string:DNS-DID",
          "location": "de440592-cdd8-4eb8-b499-fe227a6356b8:string:horizontal-beige-goose.sandbox.openattestation.com",
          "key": "cc692ea0-7f45-4e06-9cfe-144306fe6365:string:did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller"
        }
      }
    ]
  },
  "signature": {
    "type": "SHA3MerkleProof",
    "targetHash": "a1dba714ee7f44dabf77cc648d0a41b0ceb4fbec695be41d8d1507493fb51dac",
    "proof": [],
    "merkleRoot": "a1dba714ee7f44dabf77cc648d0a41b0ceb4fbec695be41d8d1507493fb51dac"
  },
  // Individually added property with the document signature
  "proof": [
    {
      "type": "OpenAttestationSignature2018",
      "created": "2024-05-07T02:28:23.403Z",
      "proofPurpose": "assertionMethod",
      "verificationMethod": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller",
      "signature":
      "0x1234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412"
    }
  ]
}
```

</TabItem>

<TabItem value="v4wrappedAndSigned" label="Wrapped and Signed Basic v4">

```js
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://schemata.openattestation.com/com/openattestation/4.0/alpha-context.json"
  ],
  "type": [
    "VerifiableCredential",
    "OpenAttestationCredential"
  ],
  "issuer": {
    "id": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D",
    "type": "OpenAttestationIssuer",
    "name": "Demo Issuer",
    "identityProof": {
      "identityProofType": "DNS-DID",
      "identifier": "horizontal-beige-goose.sandbox.openattestation.com"
    }
  },
  "credentialSubject": {
    "recipient": {
      "name": "John Doe"
    },
    "course": {
      "name": "Issuing OA v4 documents"
    },
    "someOtherProperty": "that is directly at the root"
  },
  "proof": {
    "type": "OpenAttestationMerkleProofSignature2018",
    "proofPurpose": "assertionMethod",
    "targetHash": "a906b65827223cf96bf7c82d691a8cdfde1577d567f2e476f602567e496e9c6f",
    "proofs": [],
    "merkleRoot": "a906b65827223cf96bf7c82d691a8cdfde1577d567f2e476f602567e496e9c6f",
    "salts": "W3sidmFsdWUiOiI4YmVkNjY2MGM1MzQ1MzE3ZjdlOWE5NTYxNWI0ZjdjZmRkMTY0MDVlMGUxNDk3NDM0YzcyNWJiN2RhNjM2YjY2IiwicGF0aCI6IkBjb250ZXh0WzBdIn0seyJ2YWx1ZSI6ImNlN2Y3ODlhMmIzYWRlMGJlN2U0MzIzYTRlMWQyNWI0YTZjZWU0MDEzYjM0NGYxNzEwOTViYjMwZDg4NTliYjMiLCJwYXRoIjoiQGNvbnRleHRbMV0ifSx7InZhbHVlIjoiN2JjM2Y5MTE0ZTg5M2FhZTIyMThmYjE2MmQ2MmY4YzU0YmU4NmM4NjA5ZDczZTg3MjMyZTA3NTlmMWI0NWE4MCIsInBhdGgiOiJ0eXBlWzBdIn0seyJ2YWx1ZSI6IjYzZjI4M2M0Y2RlZDVlYmUzMGRkODhlMzI0OGIwZjc1MzRmNDVlNTFiZDM2ZDZjNDkwMmIzNjdhNTcyNTM3MWYiLCJwYXRoIjoidHlwZVsxXSJ9LHsidmFsdWUiOiI5NjZlNmYxYjExYTcxM2EyNTFkNGZiNzU2YWRmYmIwNDdmNzQyYjk2NTE4ZmMzODQzNjAxYzc2NWE4MTNmM2RkIiwicGF0aCI6Imlzc3Vlci5pZCJ9LHsidmFsdWUiOiI0YTk5ZTU5Y2FhNWU3YjgyNjlkZTEzZjRjNDBlOGQxMTcxMGM4ODA2NDY1OTkyNmMwZjhhNGI0OGM3MDE4NmIxIiwicGF0aCI6Imlzc3Vlci50eXBlIn0seyJ2YWx1ZSI6IjNlNWRjODc5ZWM0NTE2ZGE4M2EyZmQ3YzI3M2Y4Zjk0OGFkMGQ2NGEyM2Q2YmY3YzQ4YzA5ODgwMGNiNDMzM2QiLCJwYXRoIjoiaXNzdWVyLm5hbWUifSx7InZhbHVlIjoiNTEzNTc2YzczNDEyMjdhM2U0MjlmYjRmNGQ2NTFhYTU0ODRiNTllYzA5YmYwNTRlNDBjZmEzNmMwZmVlYjYzYSIsInBhdGgiOiJpc3N1ZXIuaWRlbnRpdHlQcm9vZi5pZGVudGl0eVByb29mVHlwZSJ9LHsidmFsdWUiOiJjMmExYzkwMGMyZjc4OTAzMmFmODZlMTk5OGQ0ZWYxYmZkNzRlYjEwYzFjYzRiYTNhNDNkZjJhNzg5MjM1MzA4IiwicGF0aCI6Imlzc3Vlci5pZGVudGl0eVByb29mLmlkZW50aWZpZXIifSx7InZhbHVlIjoiNzQ4ZjljZWNiMTBjZDY3OTEzYmEzZDkwZTdkMjMyNjdiNmVmYWYzNjQzMWMzYmM5ODA4NmI4NjIyNTdlZWU0NCIsInBhdGgiOiJjcmVkZW50aWFsU3ViamVjdC5yZWNpcGllbnQubmFtZSJ9LHsidmFsdWUiOiJhMGNmNThmYzMyZDk4OWUyMjZiMWY1ODNkNWVmNWU0YTA0ZDY0NjJhODBkZjBlNjIzOWEyZmIwMTA5ODRlYmVlIiwicGF0aCI6ImNyZWRlbnRpYWxTdWJqZWN0LmNvdXJzZS5uYW1lIn0seyJ2YWx1ZSI6IjViMThmZDQ5ZWQ5ZDNmZTdkMDdjZmMyZmEyNDNlY2RmOTYzNWY2ZjcxOTcwZThkNmE2ZmNhODVmZGE2YzkwNTciLCJwYXRoIjoiY3JlZGVudGlhbFN1YmplY3Quc29tZU90aGVyUHJvcGVydHkifV0=",
    "privacy": {
      "obfuscated": []
    },
    // Added under the existing proof property
    "key": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller",
    "signature": "0x1234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412"
  }
}
```

</TabItem>
</Tabs>
---
id: create-custom-context
title: Creating Custom Context
sidebar_label: Creating Custom Context
---

For v3 documents in OpenAttestation, a major change consists of a `@context` property introduced into the document. Refer [here](/docs/docs-section/roadmap/v3/major-changes#context) for more information.

This guide shows you how to create a custom context.

## Document (Invoice)

![Invoice](/docs/docs-section/roadmap/invoice-sample.png)

A document like the one shown above (an Invoice), would typically contain multiple fields which in this case, it contains those that are necessary such as, `billTo` and `billFrom`. More fields could be added into the form, however this would mean that the document may contain fields that are not already defined or required.

The use of `@context` would provide an additional layer of validation to ensure that the document only contains what has already been defined as required.

The rest of this guide will use the example invoice above as a reference.

## Context Object

```json
{
  "@context": [
    {
      "@version": 1.1
    },
    "https://www.w3.org/ns/odrl.jsonld",
    {
      "id": "@id",
      "date": {
        "@type": "xsd:string"
      },
      "customerId": {
        "@type": "xsd:string"
      },
      "terms": {
        "@type": "xsd:string"
      },
      "subtotal": {
        "@type": "xsd:string"
      },
      "tax": {
        "@type": "xsd:string"
      },
      "taxTotal": {
        "@type": "xsd:string"
      },
      "total": {
        "@type": "xsd:string"
      },
      "billFrom": {
        "@id": "https://schemata.openattestation.com/vocab/#billFrom",
        "@context": {
          "name": {
            "@type": "xsd:string"
          },
          "streetAddress": {
            "@type": "xsd:string"
          },
          "city": {
            "@type": "xsd:string"
          },
          "postalCode": {
            "@type": "xsd:string"
          },
          "phoneNumber": {
            "@type": "xsd:string"
          }
        }
      }
      // other properties
    }
  ]
}
```

The object above in `.json` format, shows how a `@context` object looks like. For the `Invoice` document, a `@context` as such could be created. As seen, it contains fields that you would find in the actual image of the `Invoice`:

- `id` : ID of the document in `string` format
- `date`: Date of the `Invoice` in `string` format
- `customerId` : ID of the customer in `string` format
- ...

This `.json` could then be published in a place that could be referenced using a URL link. In this guide, the URL link for the context created above would be represented with `https://schemata.openattestation.com/io/tradetrust/invoice/1.0/invoice-context.json`.

>**Note:** The `xsd` in `xsd:string` is used to represent data types in these documents.

## Raw Document (Invoice)

```json
{
  "version": "https://schema.openattestation.com/3.0/schema.json",
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schemata.openattestation.com/io/tradetrust/invoice/1.0/invoice-context.json",
    "https://schemata.openattestation.com/com/openattestation/1.0/OpenAttestation.v3.json"
  ],
  "type": ["VerifiableCredential", "OpenAttestationCredential"],
  "issuanceDate": "2010-01-01T19:23:24Z",
  "issuer": { ... },
  "openAttestationMetadata": { ... },
  "credentialSubject": {
    "id": "id:example",
    "date": "2018-02-21",
    "customerId": "564",
    "terms": "Due Upon Receipt",
    "billFrom": {
      "name": "ABC Company",
      "streetAddress": "Level 1, Industry Offices",
      "city": "Singapore",
      "postalCode": "123456",
      "phoneNumber": "60305029"
    },
    "billTo": {
      "company": {
        "name": "DEF Company",
        "streetAddress": "Level 2, Industry Offices",
        "city": "Singapore",
        "postalCode": "612345",
        "phoneNumber": "61204028"
      },
      "name": "James Lee",
      "email": "def@company.com"
    }
    // other properties
  }
}
```

The `.json` above shows the structure of the `Invoice`'s raw document. The context created earlier, can be seen to be included in the `@context` field as a URL link.

During the [wrapping](/docs/developer-section/libraries/remote-files/open-attestation-cli#wrapping-documents) process, the document itself as well as the fields inside `credentialSubject` would be validated and cross checked against the contexts defined in `@context`.

>**Note:** It is not necessary that everything in `@context` has to appear in `credentialSubject`. But when there are additional items in `credentialSubject` that do not exist in what has already been defined in `@context`, an error would occur when trying to wrap the document.

## Configuration File (Invoice)

```json
{
  "network": "sepolia",
  "wallet": {
    "type": "ENCRYPTED_JSON",
    "encryptedJson": "{\"address\":\"1245e5b64d785b25057f7438f715f4aa5d965733\",\"id\":\"bf069d1b-4e88-487c-b695-f2e03ed7c1ff\",\"version\":3, ...}"
  },
  "forms": [
    {
      "name": "Invoice",
      "type": "VERIFIABLE_DOCUMENT",
      "defaults": {
        "version": "https://schema.openattestation.com/3.0/schema.json",
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://schemata.openattestation.com/io/tradetrust/invoice/1.0/invoice-context.json",
          "https://schemata.openattestation.com/com/openattestation/1.0/OpenAttestation.v3.json"
        ],
        "type": ["VerifiableCredential", "OpenAttestationCredential"],
        "issuanceDate": "2010-01-01T19:23:24Z",
        "issuer": {
          "id": "https://example.com",
          "name": "DEMO STORE",
          "type": "OpenAttestationIssuer"
        },
        "openAttestationMetadata": {...},
        "credentialSubject": {}
      },
      "schema": {...}
    }
  ]
}
```

The `.json` above shows the structure of the `Invoice`'s configuration file. Apart from the rest of the information such as `schema`, that contains custom fields to be filled in during the creation of the document, the `@context` created for the `Invoice` earlier, could also be seen to be included.

Similarly, the items inside `@context` contain the types of what are the different fields required in the document. It would be used to cross check against the items that have been filled in inside `schema` to ensure that the document created using this configuration file does not contain anything more than what has already been defined in `@context`.


>**Note:** It is not necessary that everything in `@context` has to appear in `schema`. But when there are additional items in `schema` that do not exist in what has already been defined in `@context`, an error would occur when trying to create a document.

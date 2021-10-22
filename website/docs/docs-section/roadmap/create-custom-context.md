---
id: create-custom-context
title: Creating Custom Context
sidebar_label: Creating Custom Context
---

For v3 documents in Open Attestation, a major change consists of a `@context` property introduced into the document. It allows for short-form aliases to be mapped to URIs required by verifiable credentials and verifiable presentations.

## Document (Invoice)

![Invoice](/docs/docs-section/roadmap/invoice-sample.png)

A document like the one shown above (an Invoice), would typically contain multiple fields which in this case, it contains those that are necessary such as, `billTo` and `billFrom`. More fields could be added into the form, however this would mean that the document may contain fields that are not already defined or required.

The use of `@context` would provide an additional layer of validation to ensure that the document only contains what has already been defined as required.

We will use the example Invoice shown above as a reference throughout the rest of this guide.

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
      "date": "xsd:string",
      "customerId": "xsd:string",
      "terms": "xsd:string",
      "subtotal": "xsd:string",
      "tax": "xsd:string",
      "taxTotal": "xsd:string",
      "total": "xsd:string",

      "billFrom": {
        "@id": "https://schemata.openattestation.com/vocab/#billFrom",
        "@context": {
          "name": "xsd:string",
          "streetAddress": "xsd:string",
          "city": "xsd:string",
          "postalCode": "xsd:string",
          "phoneNumber": "xsd:string"
        }
      }

      // rest of the contexts of different fields
    }
  ]
}
```

The object above in `.json` format, shows how a `@context` object looks like. For the `Invoice` document, a `@context` as such could be created. As seen, it contains fields that you would find in the actual image of the `Invoice`:

- `id` : ID of the document in `string` format
- `date`: Date of the `Invoice` in `string` format
- `customerId` : ID of the customer in `string` format
- ...

This `.json` could then be published in a place that could be referenced using a URL link. In this guide, the it has been published to `https://schemata.openattestation.com/io/tradetrust/Invoice/1.0/invoice-context.json`.

:::note
The `xsd` in `xsd:string` is used to represent data types in these documents.
:::

## Configuration File (Invoice)

```json
{
  "network": "ropsten",
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
          "https://schemata.openattestation.com/io/tradetrust/Invoice/1.0/invoice-context.json",
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

The `.json` above shows the structure of the `Invoice`'s configuration file. Apart from the rest of the information such as `schema`, that contains custom fields to be filled in during the creation of the document, the `@context` could also be seen to be included.

The items inside `@context` contain the source of what are the different fields required in the document. It would be used to cross check against the items inside `schema` to ensure that the document created using this configuration file does not contain anything more or less than what has already been defined.

The [URL link](https://schemata.openattestation.com/io/tradetrust/Invoice/1.0/invoice-context.json) that the context of `Invoice` resides in has been included in the `@context` field. Individual fields in `schema` would be validated against the `@context` created for `Invoice`.

:::note
When the items in `schema` do not match what has already been defined in `@context`, an error would occur when trying to create a document.
:::

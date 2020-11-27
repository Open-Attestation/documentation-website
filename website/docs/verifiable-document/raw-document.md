---
id: raw-document
title: Creating Raw Document
sidebar_label: Creating Raw Document
---

Every OA document has a checksum that provides it a tamper-proof property. At the same time, because the checksum can be used to uniquely identify a document, the checksum (or its derived value) is stored onto the document store as evidence of issuance. To compute the checksum, a `raw document` goes through a process known as `wrapping` to become a `wrapped document`. Only then, the document is ready to be issued onto the blockchain.

In this guide, we will learn how to create one raw document that conforms to the OpenAttestation v2 Schema.

## Understanding the OA Document Schema

The OpenAttestation v2.0 defines the shape of data for the `raw document` - the data before the wrapping process. It is defined in [JSON Schema](https://json-schema.org/) format.

The official OpenAttestation v2.0 schema can be found at https://schema.openattestation.com/2.0/schema.json

## Using Online Schema Validator

For this guide, we will be using an online JSON Schema validator to help us write the raw document.

### Setting up the JSON Schema Validator with OA Schema

Visit https://www.jsonschemavalidator.net/

Paste the contents from https://schema.openattestation.com/2.0/schema.json into the left panel under "Select Schema".

This will setup the JSON schema validator to validate the JSON inputs on the right against the defined schema.

![Validator Preview](/docs/verifiable-document/document-data/validator-preview.png)

If you start editing the JSON data on the right you should see errors if the data does not conform to the OpenAttestation v2.0 schema. A summary of the number of errors is found on top of the right panel and the details of the errors are found below the two panels.

### Creating raw document

We will now create the data for your certificate. Paste the following JSON data into the right panel of the JSON schema validator tool:

```json
{
  "$template": {
    "name": "main",
    "type": "EMBEDDED_RENDERER",
    "url": "https://tutorial-renderer.openattestation.com"
  },
  "recipient": {
    "name": "John Doe"
  },
  "issuers": [
    {
      "name": "Demo Issuer",
      "documentStore": "0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b",
      "identityProof": {
        "type": "DNS-TXT",
        "location": "few-green-cat.sandbox.openattestation.com"
      }
    }
  ]
}
```

To makes things simple, we will use an existing deployed renderer (at https://tutorial-renderer.openattestation.com). However you will still need to replace the following values for your own certificate:

#### 1. issuers[0].documentStore

Replace the value of `issuers[0].documentStore` from `0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b` to the smart contract address of your document store in the [previous steps](/docs/verifiable-document/document-store)

#### 1. issuers[0].identityProof.location

Replace the value of `issuers[0].identityProof.location` from `few-green-cat.sandbox.openattestation.com` to the dns name used to bind the document store's identity in the [previous steps](/docs/verifiable-document/dns-proof)

![Validator Completed](/docs/verifiable-document/document-data/validator-completed.png)

Once all the values are configured and the raw document conforms to the schema, you will see the message `No errors found. JSON validates against the schema`

## Saving the raw document

Near the `wallet.json` file, create a folder named `raw-documents`. Inside that folder create a file names `certificate-1.json` and paste the validated JSON from above.

Create another file named `certificate-2.json` and paste the same validated JSON into the file, changing the `recipient.name` to a different name.

At this point in time, your directory should look like the following:

```text
wallet.json
raw-documents
  |-- certificate-1.json
  |-- certificate-2.json
```

We are now ready to wrap the certificates.

---
id: document-data
title: Defining Document Schema
sidebar_label: Defining Document Schema
---

Every OA document has a checksum that provides it a tamper-proof property. At the same time, because the checksum can be used to uniquely identify a document, the checksum (or its derived value) is stored onto the document store as evidence of issuance. To compute the checksum, a `raw document` goes through a process known as `wrapping` to become a `wrapped document`. Only then, the document is ready to be issued onto the blockchain.

In this guide, we will learn how to create one raw document that conforms to the OpenAttestation v2 Schema.

## Understanding the OA Document Schema

The OpenAttestation v2.0 defines the shape of data for the `raw document` - the data before the wrapping process. It is defined in [JSON Schema](https://json-schema.org/) format.

The official OpenAttestation v2.0 schema can be found at https://schema.openattestation.com/2.0/schema.json

### Using Online Schema Validator

For this guide, we will be using an online JSON Schema validator to help us write the raw document.

#### Setting up the JSON Schema Validator with OA Schema

Visit https://www.jsonschemavalidator.net/

Paste the contents from https://schema.openattestation.com/2.0/schema.json into the left panel under "Select Schema".

This will setup the JSON schema validator to validate the JSON inputs on the right against the defined schema.

![Validator Preview](/docs/verifiable-document/document-data/validator-preview.png)

If you start editing the JSON data on the right you should see errors if the data does not conform to the OpenAttestation v2.0 schema. A summary of the number of errors is found on top of the right panel and the details of the errors are found below the two panels.

#### Creating raw document

We will now create the data for your Certificate of Completion. Paste the following JSON data into the right panel of the JSON schema validator tool:

```json
{
  "name": "OpenAttestation Tutorial Certificate of Completion",
  "$template": {
    "name": "COC",
    "type": "EMBEDDED_RENDERER",
    "url": "http://localhost:3000"
  },
  "recipient": {
    "name": "John Doe"
  },
  "issuers": [
    {
      "name": "Demo Issuer",
      "documentStore": "0x0000000000000000000000000000000000000000",
      "identityProof": {
        "type": "DNS-TXT",
        "location": "demo.openattestation.com"
      }
    }
  ]
}
```

Replace the following values for your own Certificate of Completion:

##### 1. \$template.url

You will need to replace the value of `$template.url` from `http://localhost:3000` to the url of the hosted document renderer in the [previous steps](/docs/verifiable-document/document-template)

##### 2. issuers[0].documentStore

You will need to replace the value of `issuers[0].documentStore` from `0x0000000000000000000000000000000000000000` to the smart contract address of your document store in the [previous steps](/docs/verifiable-document/document-store)

##### 3. issuers[0].documentStore.identityProof.location

You will need to replace the value of `issuers[0].documentStore.identityProof.location` from `demo.openattestation.com` to the dns name used to bind the document store's identity in the [previous steps](/docs/verifiable-document/dns-proof)

![Validator Completed](/docs/verifiable-document/document-data/validator-completed.png)

Once all the values are configured and the raw document conforms to the schema, you will see the message `No errors found. JSON validates against the schema`

Now that we have learnt how to structure our documents, we are ready to wrap them in the [next guide](/docs/verifiable-document/wrapping-document).

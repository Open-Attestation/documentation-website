---
id: create-custom-schema
title: Creating Custom Schema
sidebar_label: Creating Custom Schema
---

Every OA document follows a particular structure according to what the content of the file supposed to contain that makes it valid. To ensure that the document adheres to a specific structure, a customized schema could be created that caters to the document which could be used as a validation upon the [wrapping](/docs/developer-section/libraries/open-attestation-cli#wrapping-documents) process.

In this guide, we will look at how to create a custom schema.

## Document (Invoice)

![Invoice](/docs/docs-section/roadmap/invoice-sample.png)

The document shown above would be used as an example for subsequent sections when an creating OA document.

## JSON Schema

```json
{
  "$id": "https://schemata.openattestation.com/io/tradetrust/invoice/1.0/schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "Description of data expected for invoices",
  "required": ["id"],
  "properties": {
    "id": {
      "type": "string"
    },
    "date": {
      "type": "string"
    },
    "customerId": {
      "type": "string"
    },
    "terms": {
      "type": "string"
    },
    "subtotal": {
      "type": "string"
    },
    "tax": {
      "type": "string"
    },
    "taxTotal": {
      "type": "string"
    },
    "total": {
      "type": "string"
    },
    "billFrom": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "streetAddress": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "postalCode": {
          "type": "string"
        },
        "phoneNumber": {
          "type": "string"
        }
      }
    }
  }
}
```

A custom schema that could be created for the [Invoice](#document-invoice) document can be seen above.

- `$id`: ID of the schema. (required)
- `$schema`: JSON Schema vocabulary. (optional)
- `type`: Data type of schema. (optional)
- `title`: Description of what the schema represents. (optional)
- `required`: Required properties for the document. If properties stated here do not exist in `properties`, an error would occur during validation. (optional)
- `properties`: Properties of the document and their respective data types should be defined here. If the document contains fields that do not conform to what has been defined here, an error would occur during validation. (optional)

## Usage

Upon creating a custom schema for the document, it could then be used during the wrapping process for validation. Refer [here](/docs/developer-section/libraries/open-attestation-cli#wrapping-documents) for more information.

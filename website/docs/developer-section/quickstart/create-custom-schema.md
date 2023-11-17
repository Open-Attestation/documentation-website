---
id: create-custom-schema
title: Creating Custom Schema
sidebar_label: Creating Custom Schema
---

According to its file content, every OA document follows a particular structure that makes it valid. To ensure the document adheres to the structure, you can create a custom schema to use the document as a validation upon the wrapping process.

This guide will show you how to create a custom schema.

## Document (invoice)

The document below is used as an example in subsequent sections for creating an OA document.

![Invoice](/docs/docs-section/roadmap/invoice-sample.png)


## JSON schema

A custom schema for the [Invoice](#document-invoice) document is in the code example below. 

```json
{
  "$id": "https://example.com/invoice/1.0/schema.json",
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
    // other properties
  }
}
```

It contains the following variables:

| Variable   | Necessity | Definition                                               |
|------------|-----------|----------------------------------------------------------|
| `$id`      | Required  | URI location of where the schema resides.               |
| `$schema`  | Optional  | JSON schema vocabulary.                                 |
| `type`     | Optional  | Data type of the schema.                                |
| `title`    | Optional  | Description of what the schema represents.             |
| `required` | Optional  | Whether some properties are required for the document. If the properties stated here do not exist in the `properties` variable, an error will occur during validation. |
| `properties` | Optional  | Properties of the document and their respective data types. If the document contains any fields that do not conform to what is defined here, an error will occur during validation. |


## Usage

Once you have created a custom schema for the document, you can use it during the wrapping process for validation.


## Additional reading
To learn more about the wrapping process, see [this guide](/docs/developer-section/libraries/remote-files/open-attestation-cli#wrapping-documents).
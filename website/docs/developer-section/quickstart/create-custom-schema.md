---
id: create-custom-schema
title: Creating Custom Schema
sidebar_label: Creating Custom Schema
---

Every OA document follows a particular structure according to what the content of the file supposed to contain that makes it valid. To ensure that the document adheres to a specific structure, a customized schema could be created that caters to the document which could be used as a validation upon the [wrapping](/docs/developer-section/libraries/open-attestation-cli#wrapping-documents) process.

In this guide, we will look at how to create custom schemas for different versions of a document.

## V2 Document

```json
{
  "$id": "https://schemata.openattestation.com/io/tradetrust/certificate-of-origin/1.0",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "Description of data expected for certificate of origin documents",
  "required": ["id"],
  "definitions": {
    "CompanyInfo": {
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
  },
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
      "$ref": "#/definitions/CompanyInfo"
    },
    // other properties

    "links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "object",
          "properties": {
            "href": {
              "type": "string"
            }
          }
        }
      }
    }
  }
}
```

## V3 Document

---
id: document-data
title: Defining Document Schema
sidebar_label: Defining Document Schema
---

Every OA document has a checksum that provides it a tamper-proof property. At the same time, because the checksum can be used to uniquely identify a document, the checksum (or its derived value) is stored onto the document store as evidence of issuance. To compute the checksum, an `unwrapped document` goes through a process known as `wrapping` to become a `wrapped document`. Only then, the document is ready to be issued onto the blockchain.

Multiple documents can be wrapped at the same time in a single batch operation, creating a single checksum for the entire batch of unwrapped documents. This is especially useful when using document store on the Ethereum blockchain to lower the transaction cost and time.

In this guide, we will learn how to create the unwrapped document that conforms to the OpenAttestation v2 Schema, and then wrap the document to form the wrapped document.

## Installing the CLI

### Download binary from release page

Download the latest binary for the command line interface (CLI) at https://github.com/Open-Attestation/open-attestation-cli/releases

Move the binary to the directory of your choice (ie `oa-documents`) or add the binary to the PATH variable of your operating system.

### Make binary executable (MacOS/Linux)

In `oa-documents`:

```sh
chmod +x open-attestation-linux
```

### Running the CLI

Once the CLI is made executable, you may run it from the terminal directly. You should see the following if it is running correctly.

In `oa-documents`:

```sh
./open-attestation-linux
Open Attestation document issuing, verification and revocation tool.

Commands:
  index.js filter <source> <destination>    Obfuscate fields in the document
  [fields..]
  index.js batch <raw-dir> <batched-dir>    Combine a directory of documents
  [schema]                                  into a document batch

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

The common subcommands you might be interested in are:
- batch
- filter
```

## Understanding the OA Document Schema

The OpenAttestation v2.0 defines the shape of data for the `unwrapped document` - the data before the wrapping process. It is defined in [JSON Schema](https://json-schema.org/) format.

The official OpenAttestation v2.0 schema can be found at https://schema.openattestation.com/2.0/schema.json

### Using Online Schema Validator

For this guide, we will be using an online JSON Schema validator to help us write the unwrapped document.

#### Setting up the JSON Schema Validator with OA Schema

Visit https://www.jsonschemavalidator.net/

Paste the contents from https://schema.openattestation.com/2.0/schema.json into the left panel under "Select Schema".

This will setup the JSON schema validator to validate the JSON inputs on the right against the defined schema.

![Validator Preview](/docs/verifiable-document/document-data/validator-preview.png)

If you start editing the JSON data on the right you should see errors if the data does not conform to the OpenAttestation v2.0 schema. A summary of the number of errors is found on top of the right panel and the details of the errors are found below the two panels.

#### Creating unwrapped document

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

We will need to replace a few value from the schema for it to be valid for you:

##### 1. \$template.url

You will need to replace the value of `$template.url` from `http://localhost:3000` to the url of the hosted document renderer in the [previous steps](/docs/verifiable-document/document-template)

##### 2. issuers[0].documentStore

You will need to replace the value of `issuers[0].documentStore` from `0x0000000000000000000000000000000000000000` to the smart contract address of your document store in the [previous steps](/docs/verifiable-document/document-store)

##### 3. issuers[0].documentStore.identityProof.location

You will need to replace the value of `issuers[0].documentStore.identityProof.location` from `demo.openattestation.com` to the dns name used to bind the document store's identity in the [previous steps](/docs/verifiable-document/dns-proof)

![Validator Completed](/docs/verifiable-document/document-data/validator-completed.png)

Once all the values are configured and the unwrapped document conforms to the schema, you will see the message `No errors found. JSON validates against the schema`

## Wrapping the document file

Now that we have manually created one unwrapped document data, we will use the CLI to wrap the unwrapped document file. In this step, we will issue an additional Certificate of Completion to another person at the same time to see how the CLI tool can wrap multiple unwrapped documents at the same time.

### Creating the unwrapped document file

In a directory of your choice, create a folder named `unwrapped-documents`:

In `oa-documents`:

```sh
mkdir unwrapped-documents
cd unwrapped-documents
```

Create a file named `coc-1.json` and paste the validated JSON into the file:

`coc-1.json`

```text
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

Create another file named `coc-2.json` and paste the same validated JSON into the file, changing the `recipient.name` from your name to another person's name.

At this point in time, your directory should look like the following:

```text
oa-documents
|--open-attestation-linux (downloaded binary, optional if added to execution path)
|--unwrapped-documents
    |-- coc-1.json
    |-- coc-2.json
```

### Wrapping the documents with the CLI tool

Now that we have all the unwrapped documents in a single folder, we will use the CLI tool to read all the files in that folder, wrap documents and then output the files in another directory `wrapped-documents`.

At the same time a `merkle root`, a 64 character long string prepended with `0x` will be generated. The merkle root is the only information that will be stored onto the blockchain to verify the issuance status of an OA document.

In `oa-documents`:

```sh
./open-attestation-linux batch unwrapped-documents wrapped-documents
✔  success   Batch Document Root: 0x80cc53b77c0539fc383f8d434ac5ffad281f3d64ae5a0e59e9f36f19548e1fff
```

After running the CLI you will see the success message with the `Batch Document Root`. In the above sample, the document root (also known as merkle root) is `0x80cc53b77c0539fc383f8d434ac5ffad281f3d64ae5a0e59e9f36f19548e1fff`, you will definitely have a different value.

> Save this value for future reference.

At the same time, you will notice that another directory, `wrapped-document`, has been created:

```text
oa-documents
|--open-attestation-linux
|--unwrapped-documents
    |-- coc-1.json
    |-- coc-2.json
|--wrapped-documents
    |-- coc-1.json
    |-- coc-2.json
```

In the `wrapped-document` directory, you will find the wrapped document which can be sent to the recipient later once the document has been issued in the document store in the [next guide](/docs/verifiable-document/issuing-document).

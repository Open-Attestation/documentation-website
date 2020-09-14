---
id: status-codes-errors
title: Status Codes and Errors
sidebar_label: Status Codes and Errors
---

This document describes all verification status codes and errors returned by the [`@govtechsg/oa-verify`](https://github.com/Open-Attestation/oa-verify) package.

## Status Codes and Errors

Every error handled by the `oa-verify` package has an error `code` and `codeString` (which are provided in this [type definition](https://github.com/Open-Attestation/oa-verify/blob/master/src/types/error.ts)), so long as the particular verification fragment is not `VALID`.

### `DOCUMENT_STATUS` Fragment

This section details all status codes returned in the `DOCUMENT_STATUS` verification fragment. These error codes exist in both `OpenAttestationEthereumDocumentStoreStatusCode` and `OpenAttestationEthereumTokenRegistryStatusCode` unless otherwise stated.

#### `UNEXPECTED_ERROR`

| code | codeString          |
|------|---------------------|
| 0    | UNEXPECTED_ERROR    |

#### `DOCUMENT_NOT_ISSUED`

| code | codeString             |
|------|------------------------|
| 1    | DOCUMENT_NOT_ISSUED    |

The document's merkle root cannot be found in the document store. Note that this error only exists in `OpenAttestationEthereumDocumentStoreStatusCode`.

#### `DOCUMENT_NOT_MINTED`

| code | codeString             |
|------|------------------------|
| 1    | DOCUMENT_NOT_MINTED    |

The document's merkle root cannot be found in the token registry. Note that this error only exists in `OpenAttestationEthereumTokenRegistryStatusCode`.

#### `CONTRACT_ADDRESS_INVALID`

| code | codeString               |
|------|--------------------------|
| 2    | CONTRACT_ADDRESS_INVALID |

The document store address provided is invalid, most likely because it's not of the correct length or it contains non-hexadecimal characters.

#### `ETHERS_UNHANDLED_ERROR`

| code | codeString             |
|------|------------------------|
| 3    | ETHERS_UNHANDLED_ERROR |

This is an error that we have yet to handle it at this moment.

#### `SKIPPED`

| code | codeString |
|------|------------|
| 4    | SKIPPED    |

#### `DOCUMENT_REVOKED`

| code | codeString       |
|------|------------------|
| 5    | DOCUMENT_REVOKED |

The document's merkle root has been revoked by the document store.

#### `INVALID_ARGUMENT`

| code | codeString       |
|------|------------------|
| 6    | INVALID_ARGUMENT |

The document's merkle root is invalid because:

- it is not of the correct length
- it contains non-hexadecimal characters

#### `CONTRACT_NOT_FOUND`

| code | codeString         |
|------|--------------------|
| 404  | CONTRACT_NOT_FOUND |

The document store address is of a valid format but cannot be found.

#### `SERVER_ERROR`

| code | codeString   |
|------|--------------|
| 500  | SERVER_ERROR |

This error covers all non-HTTP 200 error codes. If you see this error, it's most likely because:

- you are rate-limited by the Ethereum provider (e.g. `infura` or `cloudflare`) because of too many requests in a short period of time
- the Ethereum provider is down

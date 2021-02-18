---
id: major-changes
title: Major Change from V2
sidebar_label: Major Changes
---

Here are some of the major changes from OpenAttestation v2 Data Model

## `@context`

The `@context` property is now introduced as per [W3C VC Care Data Model](https://www.w3.org/TR/vc-data-model/#contexts) to allow the issuer to map such short-form aliases to the URIs required by specific verifiable credentials and verifiable presentations.

OpenAttestation has released our extension to W3C credentials context via `https://schemata.openattestation.com/com/openattestation/1.0/OpenAttestation.v3.json`.

## `credentialSubject`

Previously stored in the `data` key, the claims about the subject of the credential are now to be placed in the `credentialSubject` field.

## `openAttestationMetadata`

Previously mixed into the `data` object, additional metadata that are crucial in the role of verification of document integrity or provenance and display of document are now moved into the `openAttestationMetadata` field.

## `issuer`

Instead of allowing for multiple issuers as found in OA v2, version 3 restricts that there may only be one named `issuer` of verifiable credentials. For use cases where there is need for different entities to come together to co-issue the document, the entities will need to [choose a way to signal intent from multiple participants on the blockchain](https://geek.sg/blog/comparing-different-ways-to-signal-intent-from-multiple-participants-on-the-blockchain)

## Data access

In the previous version, every value in the document is made into a string with a random salt pre-pended as a mean to protect against rainbow table attack on obfuscated value. This results in the need for the `getData` method which strips the salt and change the type of the value back to the original type.

In the upgrade, the random salts has been moved to `proof.salts` to be pre-pended to the individual values only at the checksum verification stage. This allows the data of the VC to be directly accessible without the `getData` method.

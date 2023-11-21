---
id: major-changes
title: Major Change from V2
sidebar_label: Major Changes
---

This article describes some major changes from the OpenAttestation V2 Data Model.

## `@context`

To help the issuer map short-form aliases to the URIs required by specific verifiable credentials and verifiable presentations, the `@context` property is introduced as per [W3C VC Care Data Model](https://www.w3.org/TR/vc-data-model/#contexts).

OpenAttestation has released the extension to W3C credentials context via `https://schemata.openattestation.com/com/openattestation/1.0/OpenAttestation.v3.json`

## `credentialSubject`

Previously stored in the `data` key, the claims about the subject of the credential should be placed in the `credentialSubject` field.

## `openAttestationMetadata`

Previously mixed into the `data` object, additional metadata that are crucial in verifying the document integrity or provenance and displaying the document are moved into the `openAttestationMetadata` field.

## `issuer`

Instead of allowing multiple issuers as in OA V2, V3 has a restriction that there can be only one entity named `issuer` of the verifiable credentials. For use cases where there are different entities to issue the document together, the entities will need to [choose a way to signal intent from multiple participants on the blockchain](https://geek.sg/blog/comparing-different-ways-to-signal-intent-from-multiple-participants-on-the-blockchain).

## Data access

<!--Flag: Explain the meaning of "salt" or add it into glossary-->

In the previous version, every value in the document is made into a string with a random salt pre-pended as a method to protect against the rainbow table attack on the obfuscated value. This results in the need for the `getData` method which strips the salt and change the type of the value back to the original type.

In the upgrade, the random salt has been moved to `proof.salts` to be pre-pended to the individual values only at the checksum verification stage. This makes the data of the VC directly accessible without the `getData` method.

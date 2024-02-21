---
id: overview
title: OpenAttestation V3 (Beta)
sidebar_label: Overview
---

## Goal

OpenAttestation's latest version seeks to align the data model to [W3C Verifiable Credentials Data Model](https://www.w3.org/TR/vc-data-model/) for interoperability with other W3C VC wallets.

## Data Model Release Status

Version 3 Data Model is currently in `Beta` release.

This means that the OpenAttestation data model is feature complete but is likely to contain some known or unknown bugs. Refrain from using version 3 in production environment until the the release status is marked `General Availability`.

## Beta Program

If you are using OpenAttestation to issue or verify VC, you are encouraged to test out Version 3 as early beta tester. Feel free to get started with the tools and help report issues to our github repository at https://github.com/Open-Attestation/open-attestation.

## Major Changes from V2

Major changes from the version 2 can be found [here](/docs/docs-section/roadmap/v3/major-changes).

## Tool Compatibility

While the base data model is feature complete, we are in the work of upgrading the tools and documentations for support of v3. Below are the progress of update for different tools:

### oa-verify

https://www.npmjs.com/package/@govtechsg/oa-verify

Status: Supported

### oa-cli

https://www.npmjs.com/package/@govtechsg/open-attestation-cli

Status:

- `wrap`: Supported
- `sign`: Supported
- `verify`: Supported

### TradeTrust Website

https://tradetrust.io/

Status: Pending

### TradeTrust Creator

https://creator.tradetrust.io/

Status: Pending

### OpenCerts Website

https://opencerts.io

Status: Supported

### Verify Website

https://verify.gov.sg

Status: Pending

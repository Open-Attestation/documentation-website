---
id: overview-changelog
title: Overview
sidebar_label: Overview
---

<!--Merge:
id: overview-v3-beta
title: OpenAttestation (V3 Beta)
sidebar_label: Overview
-->

## Goal

The latest version of OpenAttestation aims to align with the data model to [W3C Verifiable Credentials Data Model](https://www.w3.org/TR/vc-data-model/) for interoperability with other W3C VC wallets.

## Data model release status

The Version 3 Data Model is currently in `Beta` release.

This means the OpenAttestation data model has implemented all primary features, but might contain certain bugs. Refrain from using version 3 in production environment until the release status becomes `General Availability`.

## Beta program

If you are using OpenAttestation to issue or verify a document, it is recommended to test out Version 3 at an early stage. Feel free to get started with the tools and report any issues to [this GitHub repository](https://github.com/Open-Attestation/open-attestation).

## Major changes from V2

See major changes from Version 2 [here](/docs/docs-section/roadmap/v3/major-changes).

## Tool compatibility

While the base data model has implemented all primary features, the tools and documentation are pending upgrade to support V3. The following shows the progress of update for different tools:

- oa-verify

    - URL: https://www.npmjs.com/package/@govtechsg/oa-verify 
    
    - Status: Supported

- oa-cli

    - URL: https://www.npmjs.com/package/@govtechsg/open-attestation-cli
    
    - Status:

        - `wrap`: Supported
        - `sign`: Supported
        - `verify`: Supported

- TradeTrust website
    
    - URL: https://tradetrust.io/
    
    - Status: Pending

- TradeTrust creator
  
  - URL: https://creator.tradetrust.io/

  - Status: Pending

- OpenCerts website

  - URL: https://opencerts.io

  - Status: Supported

- Verify website

  - URL: https://verify.gov.sg

  - Status: Pending

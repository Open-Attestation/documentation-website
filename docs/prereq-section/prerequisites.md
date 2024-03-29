---
id: prerequisites
title: Prerequisites
sidebar_label: Prerequisites
---

Before getting started, you will need to set up the OpenAttestation CLI correctly. 

## System requirements
The OA commands are compatible with UNIX-based operating systems (e.g. Linux or macOS). If your computer is running on the Windows operating system, you need to adjust some commands into Windows equivalent.

## Installing OA CLI and checking the version
Follow the steps on the [installation page](/docs/lib-section/remote-files/open-attestation-cli), and make sure the following command returns the OA version number:

```bash
open-attestation --version
```

>**Note:** If you need to change the binary name or the path to the binary, be sure to change the example above and the commands that you will run throughout the guide.

## Revocation method
If you require issued documents to be revocable, you need to define the revocation method at the point of issuance. For more information, see the [Differences between revocation methods](/docs/revoke-section/diff-btw-revocation-methods) article.
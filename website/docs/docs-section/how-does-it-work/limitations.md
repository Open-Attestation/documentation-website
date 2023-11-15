---
title: Limitations
sidebar_label: Limitations
---

This article talks about the limitations of OpenAttestation credentials.

# QR code

In some cases, it will be beneficial to add the data of credentials into machine-readable content, such as QR Code.

OpenAttestation credentials are naturally verbose. During wrapping, OpenAttestation adds some information in front of each value. Therefore, the number of data that an OpenAttestation credential can hold to fit inside a QR Code is limited.

See [the benchmark](https://github.com/Open-Attestation/open-attestation/tree/master/benchmarks/qr-code) to learn about some indications of the maximum data you can add to your credentials before it exceeds a QR Code capacity limit.

# Batched document

The number of documents to be issued at a time is one of the recurring questions from the users. What the users usually want to find out is how many documents they can issue in a batch together.

The maximum number of documents to be issued in a batch may be constrained by hardware limitations (RAM, CPU, and so on).

To prove this, [this benchmark](https://github.com/Open-Attestation/open-attestation-cli/tree/master/performance-tests) is used for testing on OpenAttestation team's development machines. The finding is, there are no specific limits on the number of documents you can issue.

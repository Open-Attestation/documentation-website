---
title: Limitations
sidebar_label: Limitations
---

In this section, we will discuss the limitations of OpenAttestation credentials.

# QR Code

In some cases, it might be beneficial for the data of credentials to be fully contained inside machine-readable content, such as QR Code.

As we have seen previously, OpenAttestation credentials are naturally verbose. During wrapping, we add a salt in front of each value. Because of this process, the number of data that an OpenAttestation credential can hold to fit inside a QR Code is limited.

We made a [benchmark](https://github.com/Open-Attestation/open-attestation/tree/master/benchmarks/qr-code) to give you some indications of the maximum data you can add to your credentials before it exceeds a QR Code capacity limit.

# Batched document

`"How many documents can I issue at once?"` is one of the recurring questions that we receive. What usually they want to know, is how many documents they can batch together.

We often answered that we were not aware of any limitations and that it would probably be constrained by hardware limitations (RAM, CPU, etc.).

To prove our point, we wrote a [benchmark](https://github.com/Open-Attestation/open-attestation-cli/tree/master/performance-tests) and tested it with our development machines.

The benchmark proves it: there are no specific limits on the number of documents you can issue.

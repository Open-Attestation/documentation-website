---
title: Introduction
sidebar_label: Introduction
---

To fully understand how OpenAttestation works, you need to dig into the different properties the framework provides to your documents:

- [Document integrity](/docs/how-does-it-work/document-integrity): OpenAttestation ensures that the content of the document has not been modified since the document has been created, with exception of data removed using the built-in obfuscation mechanism.
- [Issuance Status](/docs/how-does-it-work/issuance-status): OpenAttestation checks that the document has been issued and that its issuance status is in good standing (for instance, that it hasn't been revoked). As of today, OpenAttestation supports two ways to issue documents: DID Signing and Ethereum Smart Contracts.
- [Issuance Identity](/docs/how-does-it-work/issuance-identity): OpenAttestation checks and returns the identity of the issuer. By default, OpenAttestation uses DNS to verify the identity but DID can be used optionally. It's important to note that OpenAttestation does not endorse any issuers. It only verifies that the issuing party in the document has provided some sort of proof that it is the same party as claimed - for example, proving ownership over a domain by the ability to create a DNS record.

It's very important to note that, even if we split the verification, they are all complementary. For instance, if we can prove that the document has been issued, and the issuer is valid, that would make no sense if we can't prove that the document has not been tampered. That thinking works for any combination.

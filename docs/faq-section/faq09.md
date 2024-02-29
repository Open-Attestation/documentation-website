---
id: faq09
title: Why do I have to pay for at least one transaction while choosing the DID method?
sidebar_label: Why do I have to pay for at least one transaction while choosing the DID method?
custom_edit_url: null
---

[This article](/docs/overview-section/comparison#price) mentioned that if you use DID documents, you don't need to pay for transactions. This happens when you use DID for issuance and OCSP for revocation. 

However, if you use DID for issuance and a `documentStore` for revocation, you still need to have at least one transaction with the Ethereum blockchain to deploy a `documentStore`.

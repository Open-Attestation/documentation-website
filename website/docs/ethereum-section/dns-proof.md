---
id: dns-proof
title: Configure DNS
sidebar_label: Configure DNS
---
import SupportedNetworks from "/src/reusables/_supported-networks.mdx";

Every OA document's provenance can be verified and traced back to its creator or issuer. This is achieved by embedding an `identityProof` property in the document, which serves as a claim for identity. During the verification phase, the claim is checked against external records.

![Example Issuer Identity](/docs/integrator-section/verifiable-document/ethereum/dns-proof/example.png)

In this example above, the document's issuer is bound to `demo.openattestation.com`.

In this guide, you will bind the document issuer's identity to a valid domain name. This domain will be displayed as issuer every time the document is rendered in an OA-compliant decentralized renderer.

You will be inserting a temporary DNS record on our DNS at `sandbox.openattestation.com` so you do not need your own domain to follow the guide. If you prefer to use your own domain name for the identity, you may skip the steps involving the CLI and instead read the [DNS Configuration Guide](/docs/guides-section/configure-dns).

## Creating temporary DNS proof

With your [document store](/docs/ethereum-section/document-store), run the following command:

```bash
open-attestation dns txt-record create --address 0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b --network-id 11155111
```

The `network-id` corresponds to the [network ID for the different Ethereum networks](https://chainid.network/). Generally, you will use only the following networks:

<!-- Reusing the Network Table here -->

<SupportedNetworks />

## Getting the response
Once the DNS TXT record has been successfully deployed, you will see the success message with the bound location.

```text
✔  success   Record created at few-green-cat.sandbox.openattestation.com and will stay valid until Thu Jul 02 2020 14:51:40 GMT+0800 (Singapore Standard Time)
```

In the example above, the document store `0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b`, has been bound to the `few-green-cat.sandbox.openattestation.com` location. 

## Verification
Run the following command to make sure the entry has been propagated to the DNS:

```bash
open-attestation dns txt-record get --location few-green-cat.sandbox.openattestation.com
```

It will display to you the list of the DNS TXT records associated to that location:

```text
┌─────────┬────────────┬────────────┬────────────┬──────────────────────────────────────────────┬────────┐
│ (index) │    type    │    net     │    netId   │                     addr                     │ dnssec │
├─────────┼────────────┼────────────┼────────────┼──────────────────────────────────────────────┼────────┤
│    0    │ 'openatts' │ 'ethereum' │ '11155111' │ '0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b' │ false  │
└─────────┴────────────┴────────────┴────────────┴──────────────────────────────────────────────┴────────┘
```

>**Note:** It will take some time (usually 10s to 15s) for the record to be correctly propagated to the DNS.

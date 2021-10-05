---
id: dns-proof
title: Configuring DNS
sidebar_label: Configuring DNS
---

Every OA document's provenance can be verified and traced back to its creator or issuer. This is achieved by embedding an `identityProof` property in the document, which serves as a claim for identity. During the verification phase, the claim is checked against external records.

![Example Issuer Identity](/docs/verifiable-document/dns-proof/example.png)

In this example above, the document's issuer is bound to `demo.openattestation.com`.

In this guide, we will bind the document issuer's identity to a valid domain name. This domain will be displayed as issuer every time the document is rendered in an OA-compliant decentralized renderer.

We will be inserting a temporary DNS record on our DNS at `sandbox.openattestation.com` so you do not need your own domain to follow the guide. If you prefer to use your own domain name for the identity, you may skip the steps involving the CLI and instead read the [DNS Configuration Guide](../advanced/configuring-dns).

## Creating Temporary DNS Proof with CLI

With your [document store](/docs/verifiable-document/document-store), run the following command:

```bash
open-attestation dns txt-record create --address 0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b --network-id 3
```

The `network-id` corresponds to the [network ID for the different Ethereum networks](https://chainid.network/). We generally use only the following networks:

| Network ID | Name                     | Network   |
| ---------- | ------------------------ | --------- |
| `1`        | Ethereum Mainnet         | `mainnet` |
| `3`        | Ethereum Testnet Ropsten | `ropsten` |
| `4`        | Ethereum Testnet Rinkeby | `rinkeby` |

Once the DNS TXT record has been successfully deployed, you will see the success message with the bound location.

```text
✔  success   Record created at few-green-cat.sandbox.openattestation.com and will stay valid until Thu Jul 02 2020 14:51:40 GMT+0800 (Singapore Standard Time)
```

In the example above, the document store `0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b`, has been bound to the `few-green-cat.sandbox.openattestation.com` location. Let's make sure the entry has been propagated to the DNS:

```bash
open-attestation dns txt-record get --location few-green-cat.sandbox.openattestation.com
```

which will display to you the list of the DNS TXT records associated to that location.

```text
┌─────────┬────────────┬────────────┬───────┬──────────────────────────────────────────────┬────────┐
│ (index) │    type    │    net     │ netId │                     addr                     │ dnssec │
├─────────┼────────────┼────────────┼───────┼──────────────────────────────────────────────┼────────┤
│    0    │ 'openatts' │ 'ethereum' │  '3'  │ '0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b' │ false  │
└─────────┴────────────┴────────────┴───────┴──────────────────────────────────────────────┴────────┘
```

> Note that it can take some time for the record to be correctly propagated to the DNS, even though it usually takes 10 to 15s.

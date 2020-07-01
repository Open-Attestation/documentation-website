---
id: dns-proof
title: Configuring DNS
sidebar_label: Configuring DNS
---

Every OA document's provenance can be verified and traced back to its creator or issuer. This is achieved by embedding an `identityProof` property in the document, which serves as a claim for identity. During the verification phase, the claim is checked against external records.

In this guide, we will bind the document issuer's identity to a valid domain name. This domain will be displayed as issuer every time the document is rendered in an OA-compliant decentralized renderer.

## Example

![Example Issuer Identity](/docs/verifiable-document/dns-proof/example.png)

In this example, the document's issuer is bound to `demo.openattestation.com`.

## Using Open Attestation CLI

The OpenAttestation CLI is a good solution when starting with OpenAttestation as it will help you to quickly create a short-lived DNS TXT record. If you want to use a custom domain, you should head to [using a custom domain](#using-a-custom-domain) section

### Prerequisites

- [OpenAttestation CLI](../../component/open-attestation-cli) installed
- A document store (for instance created from the [previous guide](./document-store))

### Creating the DNS TXT record

```bash
open-attestation dns txt-record create --address 0xE1aF9E29c9548659e8b2D93a8750f40CE912ef15 --networkId 3
```

The `networkId` corresponds to the [network ID for the different Ethereum networks](https://chainid.network/). We generally use only the following networks:

| Network ID | Name                     | Network   |
| ---------- | ------------------------ | --------- |
| `1`        | Ethereum Mainnet         | `mainnet` |
| `3`        | Ethereum Testnet Ropsten | `ropsten` |
| `4`        | Ethereum Testnet Rinkeby | `rinkeby` |

Once the DNS TXT record has been successfully deployed, you will see the success message with the bound location.

```text
✔  success   Record created at stale-rose-sparrow.sandbox.openattestation.com and will stay valid until Thu Jul 02 2020 14:51:40 GMT+0800 (Singapore Standard Time)
```

In the example above, the document store `0xE1aF9E29c9548659e8b2D93a8750f40CE912ef15`, has been bound to the `stale-rose-sparrow.sandbox.openattestation.com` location. Let's make sure the entry has been propagated to the DNS:

```bash
open-attestation dns txt-record get --location stale-rose-sparrow.sandbox.openattestation.com
```

which will display to you the list of the DNS TXT records associated to that location.

```text
┌─────────┬────────────┬────────────┬───────┬──────────────────────────────────────────────┬────────┐
│ (index) │    type    │    net     │ netId │                     addr                     │ dnssec │
├─────────┼────────────┼────────────┼───────┼──────────────────────────────────────────────┼────────┤
│    0    │ 'openatts' │ 'ethereum' │  '3'  │ '0xE1aF9E29c9548659e8b2D93a8750f40CE912ef15' │ false  │
└─────────┴────────────┴────────────┴───────┴──────────────────────────────────────────────┴────────┘
```

> Note that it can take some time for the record to be correctly propagated to the DNS, even though it usually takes 10-15s.

## Using a custom domain

### Prerequisites

- Domain name
- Edit access to your domain's DNS records
- A document store (for instance created from the [previous guide](./document-store))

To bind the domain name to the issuer's identity, you must be able to change the DNS record of the domain name.

### Inserting the DNS Record

You will need to add a DNS `TXT` record to your domain name. The exact steps to achieve this can be confirmed with your domain registrar, this is usually achieved through your domain registrar or DNS provider's web UI.

While we have provided [links to guides](#additional-note-for-adding-dns-txt-records) on adding DNS `TXT` records for some common domain registrars and DNS providers, the steps below is a generic procedure for any DNS provider.

Select a domain name that you will like to associate with your documents. The domain can either be the root domain (e.g. `openattestation.com`) or a subdomain (e.g. `issuer.openattestation.com`). Using the root domain is recommended as it will be easier for viewers of your documents to recognize visually.

Within your domain registrar or DNS provider's web UI, insert a `TXT` record into the DNS in the following format:

| Type | Name        | Value                                                         |
| ---- | ----------- | ------------------------------------------------------------- |
| TXT  | example.com | openatts net=ethereum netId=3 addr=`<DOCUMENT_STORE_ADDRESS>` |

The `<DOCUMENT_STORE_ADDRESS>` in the `Value` field above is the document store smart contract address obtained [in the previous guide](/docs/verifiable-document/document-store/). Please note that the document store address needs to be prepended with `addr`.

An example of a valid DNS `TXT` record is as shown:

| Type | Name                     | Value                                                                         |
| ---- | ------------------------ | ----------------------------------------------------------------------------- |
| TXT  | demo.openattestation.com | openatts net=ethereum netId=3 addr=0xED2E50434Ac3623bAD763a35213DAD79b43208E4 |

The `netId` corresponds to the [network ID for the different Ethereum networks](https://chainid.network/). We generally use only the following networks:

| Network ID | Name                     | Network   |
| ---------- | ------------------------ | --------- |
| `1`        | Ethereum Mainnet         | `mainnet` |
| `3`        | Ethereum Testnet Ropsten | `ropsten` |
| `4`        | Ethereum Testnet Rinkeby | `rinkeby` |

For more information on switching to production mode, refer to the [Additional Note for Identity Proof in Production](#additional-note-for-identity-proof-in-production) section below.

### Testing the DNS Record

![Google DNS to Test](/docs/verifiable-document/dns-proof/google-dns.png)

> The DNS propagation should take a few minutes, though in some cases you may need to wait up to 24 hours. Continue with the other parts of the guide while waiting for DNS to propagate.

After adding the `TXT` record, we recommend you to check that the record has been inserted correctly by viewing with [Google DNS](https://dns.google.com/). Make sure to select `TXT` in the _RR Type_ dropdown.

### Additional Note for Identity Proof in Production

The `TXT` record above is for use for documents issued on the Ethereum `ropsten` network. To bind the identity in production where your documents are issued in the Ethereum `mainnet` network, you will have to change `netId` to `1`.

An example of a valid `TXT` record for Ethereum `mainnet` network is as shown:

| Type | Name                     | Value                                                                         |
| ---- | ------------------------ | ----------------------------------------------------------------------------- |
| TXT  | demo.openattestation.com | openatts net=ethereum netId=1 addr=0x9db35C07350e9a16C828dAda37fd9c2923c75812 |

### Additional Note for Adding DNS `TXT` Records

Below is a list of guides provided by some of the common domain registrars and DNS providers. This list is by no means comprehensive.

- [Amazon Route 53](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/dns-txt-records.html)
- [Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360019093151-Managing-DNS-records-in-Cloudflare)
- [Name.com](https://www.name.com/support/articles/115004972547-Adding-a-TXT-Record)
- [Namecheap](https://www.namecheap.com/support/knowledgebase/article.aspx/317/2237/how-do-i-add-txtspfdkimdmarc-records-for-my-domain)
- [GoDaddy](https://sg.godaddy.com/help/add-a-txt-record-19232)

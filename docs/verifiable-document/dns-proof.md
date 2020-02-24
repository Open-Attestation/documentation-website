---
id: dns-proof
title: Configuring DNS
sidebar_label: Configuring DNS
---

Every OA document's provenance can be verified and traced back to its creator or issuer. This is achieved by embedding an `identityProof` in the document which serves as a claim for identity. During the verification phase, the claim is checked against external records.

In this guide, we will bind the document issuer's identity to a valid domain name. This domain will be displayed as issuer every time the document is rendered in a compliant viewer.

## Example

![Example Issuer Identity](/docs/verifiable-document/dns-proof/example.png)

In this example, the document's issuer is bound to `DEMO.OPENATTESTATION.COM`.

## Pre-requisite

- Domain Name

To bind the domain name to the issuer's identity, you must be able to change the DNS record of the domain name.

## Inserting the DNS Record

You will need to add a DNS TXT record to your domain name. The exact steps to achieve this can be confirmed with your domain name registrar, this is usually achieved through your domain administration web UI.

Select a domain name that you will like to associate with your documents. The domain can either be the root domain (ie. openattestation.com) or a subdomain (ie issuer.openattestation.com). Using the root domain will be recommended as it will be easier for viewers of your documents to recognize.

Using the domain web UI, insert a `TXT` record into the DNS in the following format:

```text
openatts net=ethereum netId=3 addr=&lt;DOCUMENT_STORE_ADDRESS&gt;
```

where `<DOCUMENT_STORE_ADDRESS>` is the document store smart contract address obtained [in the previous guide](/docs/verifiable-document/document-store/).

An example of a valid `TXT` record is as shown:

```text
openatts net=ethereum netId=3 addr=0x9db35C07350e9a16C828dAda37fd9c2923c75812
```

## Testing the DNS Record

![Google DNS to Test](/docs/verifiable-document/dns-proof/google-dns.png)

> After the update, you may need to wait up to 24 hrs for the DNS to propagate. You may continue with the other parts of the guide while waiting for DNS to propagate.

After adding the `TXT`record, you may check that the record has been inserted correctly by viewing with https://dns.google.com/.

Make sure to select `TXT` in the "RR Type" dropdown.

## Additional Note for Identity Proof in Production

The `TXT` record above is for use for documents issued on the `ropsten` network. To bind the identity in production where your documents are issued in the Ethereum main net, you will have to change `netId` to `1`.

The `netId` corresponds to the [network ID for the different Ethereum networks](https://ethereum.stackexchange.com/questions/17051/how-to-select-a-network-id-or-is-there-a-list-of-network-ids).

An example of a valid `TXT` record for Ethereum main network is as shown:

```text
openatts net=ethereum netId=1 addr=0x9db35C07350e9a16C828dAda37fd9c2923c75812
```

---
id: issuance-identity
title: Issuance identity
sidebar_label: Issuance identity
---
import SupportedNetworks from "/src/reusables/_supported-networks.mdx";

OpenAttestation uses the Domain Name System (DNS) as the method to verify the issuer's identity. A one-line summary of the DNS system can be "a Phone book for the Internet". Its primary purpose is to resolve human readable names such as "google.com" or "openattestation.com" etc. to a set of records. IP addresses, the most common DNS records, make it possible for network routing to operate over the Internet.

OpenAttestation uses records in the TXT format which store textual data. The textual data indicate the document stores that the domain administrators trust.

To use the DNS system as an identity registry, the domain name owner must claim the ownership of an OpenAttestation Document Store smart contract on the Ethereum blockchain.

## Rationale

The DNS system is a key part of Internet infrastructure and also a decentralized system - this means there is a low barrier to entry and does not have a single point of failure. Thus, the issuers can tie their issuance to their domain name (e.g. example.openattestation.com). When a user views a document issued under this model, they see "Document issued by example.openattestation.com".

## How it works

Under [IETF RFC 1464](https://tools.ietf.org/html/rfc1464), it is possible to store arbitrary string attributes as part of a domain's record set. Currently, this method is widely used for email server authentication (SPF, DMARC, DKIM). The DNS identity proof technique of OpenAttestation was largely inspired by [Keybase DNS proofs](https://github.com/keybase/keybase-issues/issues/367).

Only domain name owners (and the registrar that they trust) have the authority to make changes to the records associated with that domain name. Thus, when a DNS record endorses a fact, it transitively asserts that the domain name owner believes this fact is true.

In an OpenAttestation DNS-TXT identity proof, the OA framework records a document store address and the network (e.g. Ethereum Mainnet) it is using. The OpenAttestation document declares the domain name for record searching and the document store Ethereum address. This forms a bi-directional trust assertion; if the Document's cryptographic proof is issued on that document store, it means the domain name owner has endorsed the issuance of this document.

See a deeper technical discussion of this topic at [OpenAttestation's Decentralized Identity Proof using DNS-TXT Architecture Decision Record](https://github.com/Open-Attestation/adr/blob/master/decentralized_identity_proof_DNS-TXT.md).

## How to create DNS TXT record

OpenAttestation is able to verify every OA document's provenance and trace it back to its creator or issuer. The OA framework achieves this by embedding an `identityProof` property in the document, which serves as a claim for identity. During the verification phase, the OA framework checks the the claim against external records.

In this section, you will bind the document issuer's identity to a valid domain name. This domain will display as the issuer every time that an OA-compliant decentralized renderer is rendering the document.

## Prerequisites

- A domain name
- The edit access to your domain's DNS records
- A document store

To bind the domain name to the issuer's identity, you must be able to change the DNS record of the domain name.

## Inserting the DNS record for Ethereum smart contracts

You will need to add a DNS `TXT` record to your domain name. Confirm with your domain registrar the exact steps to achieve this, which is usually implementable through your domain registrar or DNS provider's web UI.

While [these links to guides](#additional-note-for-adding-dns-txt-records) describe how to add DNS `TXT` records for some common domain registrars and DNS providers, the steps below describe a generic procedure for any DNS provider:

1. Select a domain name that you want to associate with your documents. 

    The domain can be either the root domain (e.g. [openattestation.com](http://openattestation.com/)) or a subdomain (e.g. [issuer.openattestation.com](http://issuer.openattestation.com/)). One benefit of using the root domain is that it will be easier for the viewers to recognize your documents visually. However, you can choose to use the subdomain if there is a need to distinguish between multiple categories of documents to be issued (e.g. [certA.openattestation.com](http://certa.openattestation.com/) and [certB.openattestation.com](http://certb.openattestation.com/)).

2. Within your domain registrar or DNS provider's web UI, insert a `TXT` record into the DNS in the following format:

    | Type | Name        | Value                                                           |
    | ---- | ----------- | --------------------------------------------------------------- |
    | TXT  | example.com | "openatts net=ethereum netId=`<NETWORK_ID>` addr=`<DOCUMENT_STORE_ADDRESS>`" |

    The `<DOCUMENT_STORE_ADDRESS>` in the `Value` field above is the document store smart contract address obtained. 
    
    You need to prepend the document store address with `addr`.

    >**Note:** The quotes around the value are necessary. They are used to delimit each different record that you bind to the same domain.

    An example of a valid DNS `TXT` record is as shown:

    | Type | Name                     | Value                                                                           |
    | ---- | ------------------------ | ------------------------------------------------------------------------------- |
    | TXT  | demo.openattestation.com | "openatts net=ethereum netId=11155111 addr=0xED2E50434Ac3623bAD763a35213DAD79b43208E4" |

    The `netId` corresponds to the [network ID for the different Ethereum networks](https://chainid.network/). Generally, you will use only the following networks:

    <!-- Reusing the Network Table here -->

    <SupportedNetworks />

3. For more information on switching to production mode, refer to [this section](#additional-note-for-identity-proof-in-production).

### Testing the DNS record

After adding the `TXT` record, it is recommended to check the record has been inserted correctly by viewing [Google DNS](https://dns.google.com/). Be sure to select `TXT` in the **RR Type** dropdown list.

>**Note:** The DNS propagation should take a few minutes, though in some cases you may need to wait up to 24 hours. Continue with the remaining parts of the guide while waiting.

![Google DNS to Test](/docs/guides-section/configure-dns/google-dns.png)

### Additional note for identity proof in production

The `TXT` record above is for use in the documents issued on the Ethereum `Sepolia` network. To bind the identity in production where your documents are issued in the Ethereum `Mainnet` network, you will have to change `netId` to `1`.

An example of a valid `TXT` record for Ethereum `Mainnet` network is as shown:

| Type | Name                     | Value                                                                           |
| ---- | ------------------------ | ------------------------------------------------------------------------------- |
| TXT  | demo.openattestation.com | "openatts net=ethereum netId=1 addr=0x9db35C07350e9a16C828dAda37fd9c2923c75812" |

## Inserting the DNS record for DID

This is very similar to Ethereum Smart Contracts. Only the shape of the data change.
Within your domain registrar or DNS provider's web UI, insert a `TXT` record into the DNS in the following format:

| Type | Name        | Value                                   |
| ---- | ----------- | --------------------------------------- |
| TXT  | example.com | "openatts a=dns-did; p=`<DID>`; v=1.0;" |

The `<DID>` variable in the `Value` field above is DID public key id, as resolved by your DID. 

The expected value looks like `did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller`, similar to `didDocument.publicKey[0].id`.

## Additional note for adding DNS `TXT` records

The following is a list of guides provided by several common domain registrars and DNS providers. This list is not comprehensive:

- [Amazon Route 53](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/dns-txt-records.html)
- [Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360019093151-Managing-DNS-records-in-Cloudflare)
- [Name.com](https://www.name.com/support/articles/115004972547-Adding-a-TXT-Record)
- [Namecheap](https://www.namecheap.com/support/knowledgebase/article.aspx/317/2237/how-do-i-add-txtspfdkimdmarc-records-for-my-domain)
- [GoDaddy](https://sg.godaddy.com/help/add-a-txt-record-19232)

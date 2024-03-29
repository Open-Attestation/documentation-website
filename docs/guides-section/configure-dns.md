---
id: configure-dns
title: Configure DNS with domain registrar
sidebar_label: Configure DNS with domain registrar
---
import SupportedNetworks from "/src/reusables/_supported-networks.mdx";

You can verify every OA document's provenance and track it back to the creator or issuer. Achieve this by embedding an `identityProof` property in the document, which serves as a claim for identity. During the verification phase, the claim is checked against external records.

In this guide, you will bind the document issuer's identity to a valid domain name. This domain will display as the issuer every time an OA-compliant decentralized renderer is rendering the document.

## Prerequisites

To complete this tutorial, meet the following prerequisites:

- Know what your domain name is. To learn more about the domain name, see [this article](/docs/ethereum-section/dns-proof).

- Have the edit access to your domain's DNS records.

- Have your document store deployed. 

    - If you are using the Ethereum method, see [this guide](/docs/ethereum-section/document-store).

    - If you are using the DID method, see [this guide](/docs/did-section/document-store-or-ocsp).

To bind the domain name to the issuer's identity, you must be able to change the DNS record of the domain name.

## Inserting the DNS record for Ethereum smart contracts

You will need to add a DNS `TXT` record to your domain name. Confirm the exact steps to achieve this with your domain registrar. Usually, you can perform it through your domain registrar or DNS provider's web UI.

While [this guide](#additional-note-for-adding-dns-txt-records) provides the steps on adding DNS `TXT` records for common domain registrars and DNS providers, the steps below show a generic procedure for any DNS provider:

1. Select a domain name that you want to associate with your documents. 

    The domain can be either the root domain (e.g. [openattestation.com](http://openattestation.com/)) or a subdomain (e.g. [issuer.openattestation.com](http://issuer.openattestation.com/)). One benefit of using the root domain is that it will be easier for the viewers to recognize your documents visually. However, you can choose to use the subdomain if there is a need to distinguish between multiple categories of documents to be issued (e.g. [certA.openattestation.com](http://certa.openattestation.com/) and [certB.openattestation.com](http://certb.openattestation.com/)).

2. Within your domain registrar or DNS provider's web UI, insert a `TXT` record into the DNS in the following format:

    | Type | Name        | Value                                                           |
    | ---- | ----------- | --------------------------------------------------------------- |
    | TXT  | example.com | "openatts net=ethereum netId=`<NETWORK_ID>` addr=`<DOCUMENT_STORE_ADDRESS>`" |

    The `<DOCUMENT_STORE_ADDRESS>` in the `Value` field above is the document store smart contract address. 

3. Prepend the document store address with `addr`. 

    The quotes around the value are necessary. They will delimit each different records that you will bind to the same domain.

    An example of a valid DNS `TXT` record is in the following:

    | Type | Name                     | Value                                                                           |
    | ---- | ------------------------ | ------------------------------------------------------------------------------- |
    | TXT  | demo.openattestation.com | "openatts net=ethereum netId=`11155111` addr=0xED2E50434Ac3623bAD763a35213DAD79b43208E4" |

    The `netId` corresponds to the [network ID for the different Ethereum networks](https://chainid.network/). 
    
    Generally, you will use only the following networks:

    <!-- Reusing the Network Table here -->

    <SupportedNetworks />
    
    For more information on switching to production mode, refer to [this section](#additional-note-for-the-identity-proof-in-production).

### Testing the DNS record

![Google DNS to Test](/docs/guides-section/configure-dns/google-dns.png)

>**Note:** The DNS propagation often takes a few minutes, though in some cases you may need to wait up to 24 hours. Continue with the other parts of the guide while waiting.

After adding the `TXT` record, it is recommended to check the record has been inserted correctly by viewing [Google DNS](https://dns.google.com/). Be sure to select **TXT** in the "RR Type" dropdown list.

### Additional note for the identity proof in production

The `TXT` record above is for the use of documents issued on the Ethereum `Sepolia` network. To bind the identity in production where your documents are issued in the Ethereum `Mainnet` network, you will have to change `netId` to `1`.

An example of a valid `TXT` record for Ethereum `Mainnet` network is in the following:

| Type | Name                     | Value                                                                           |
| ---- | ------------------------ | ------------------------------------------------------------------------------- |
| TXT  | demo.openattestation.com | "openatts net=ethereum netId=1 addr=0x9db35C07350e9a16C828dAda37fd9c2923c75812" |

## Inserting the DNS record for DID

This is very similar to the Ethereum smart contracts. Only the shape of the data will change. Within your domain registrar or DNS provider's web UI, insert a `TXT` record into the DNS in the following format:

| Type | Name        | Value                                   |
| ---- | ----------- | --------------------------------------- |
| TXT  | example.com | "openatts a=dns-did; p=`<DID>`; v=1.0;" |

The `<DID>` variable in the `Value` field above is DID public key id, as resolved by your DID. 

For instance, check [this DID](https://dev.uniresolver.io/1.0/identifiers/did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D). The expected value is `did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller`, similar to `didDocument.publicKey[0].id`.

## Additional note for adding DNS TXT records

You can choose any domain registrar and DNS provider based on your requirements. 

For easy reference, find the below list of guides for several domain registrars and DNS providers:

- [Amazon Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/ResourceRecordTypes.html#TXTFormat)
- [Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360019093151-Managing-DNS-records-in-Cloudflare)
- [Name.com](https://www.name.com/support/articles/115004972547-Adding-a-TXT-Record)
- [Namecheap](https://www.namecheap.com/support/knowledgebase/article.aspx/317/2237/how-do-i-add-txtspfdkimdmarc-records-for-my-domain)
- [GoDaddy](https://sg.godaddy.com/help/add-a-txt-record-19232)

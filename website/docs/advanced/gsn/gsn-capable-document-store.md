---
id: gsn-capable-document-store
title: Deploying a GsnCapableDocumentStore
sidebar_label: Deploy GsnCapableDocumentStore
---

The GsnCapableDocumentStore is a variant of Document Store which allows for relayed transactions. The rest of the functionality mimics that of Document Store.

## Pre-requisite

- [OpenAttestation CLI](/docs/component/open-attestation-cli) installed
- Private key to an Ethereum wallet with sufficient ethers or a [wallet](/docs/verifiable-document/wallet)

## Deploying via OpenAttestation CLI

To deploy a GsnCapableDocumentStore you can do so using the following command.You may replace the `<document-store-name>` with a suitable name.

You will also need the corresponding address of the [Trust Forwarder](https://docs.opengsn.org/learn/index.html#forwarder) for your network provided by GSN. You can find a the most updated list [here](https://docs.opengsn.org/gsn-provider/networks.html).

```bash
open-attestation deploy gsn-capable-document-store "My Name" 0x25CEd1955423BA34332Ec1B60154967750a0297D --network ropsten
```

> `0x25CEd1955423BA34332Ec1B60154967750a0297D` is the address of trust forwarder for ropsten provided by GSN

This will deploy the GsnCapableDocumentStore on the `ropsten` network. You should see a similar output when the deployment is successful:

```bash
…  awaiting  Waiting for transaction 0xf4a222c9bcc31ebd202a110568a7798218477482b773f49290e1df8b4936a313 to be mined
✔  success   Gsn Capable document store deployed at 0x0d3dFdd82FF13Ff06a336e28CABE465B64fD8168
```

> Save YOUR gsn capable document store address for future reference

After successfully deploying the GsnCapableDocumentStore, you will need to set the paymaster address. This will allow relayers to know which paymaster to request payment from. You can do so with the following command.

```bash
open-attestation gsn-capable set-paymaster --network ropsten --gsn-capable-address 0x0d3dFdd82FF13Ff06a336e28CABE465B64fD8168 --paymaster-address 0xcB94584760bCA09e9fa7117C4eE966814f17a306
```

> This allows our dapps to look up the paymaster address for your contract without additional declaration.

### DNS Configuration

Similar to [binding the document store to a domain name](../../verifiable-document/document-store), you will have to bind the identity of the GSN capable document store to a domain name.

If you like more detailed setup instructions, you may refer to the [documentation for configuring DNS](../configuring-dns/).

> Take note of the domain you are inserting the records on, you will need this later

## Additional Resource

Below is a list of additional resources for more information:

- [OpenGSN](https://docs.opengsn.org/learn/index.html)
- [GsnCapableDocumentStore](https://github.com/Open-Attestation/document-store/blob/master/contracts/GsnCapableDocumentStore.sol)

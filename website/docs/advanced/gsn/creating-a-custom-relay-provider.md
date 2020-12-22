---
id: creating-a-custom-relay-provider
title: Creating a Custom RelayProvider
sidebar_label: Creating a Custom RelayProvider
---

A RelayProvider allows a client to send signed transaction to the blockchain.

We provided our own implementation (link) and you can do your own by following this guide (link)

This guide aims to give an example on how developers can use GsnCapable interface in conjunction with GsnRelayProvider to send relayed transactions.

## Configuring RelayProvider

Now that we have successfully set up a gas station network, we can move on to implementing [RelayProviders](https://docs.opengsn.org/learn/index.html#client) to send relayed transactions to our contract on the frontend. You can find out more on how to implement the RelayProvider [here](https://docs.opengsn.org/tutorials/integration.html#the_user_interface_code).

### Gsn Capable Interface

To test if the given contract is Gsn Capable we can make use of the method `supportsInterface` with the `interface-id` of [`0xa5a23640`](https://github.com/Open-Attestation/document-store/blob/master/contracts/GsnCapable.sol#L10). If the contract supports the interface, we can assume that it can handle relayed transactions. An example of how this can be implementation can be found [here](https://github.com/TradeTrust/document-creator-website/pull/76/files#diff-ae839d6f834102d8aaabb1f74fe1acb14ca32a3bee209ed2264f846fcca2679aR15).

We will need to configure the GsnRelayProvider as [explained](https://docs.opengsn.org/tutorials/integration.html#the_user_interface_code) with the `RelayHubAddress` and `PaymasterAddress`. The `RelayHubAddress` can be found at [GSN](https://docs.opengsn.org/gsn-provider/networks.html). The `PaymasterAddress`
will be retrieved from the contract provided (this was set earlier as part of [this step](./gsn-capable-document-store)).

## Additional Resource

Below is a list of additional resources for more information:

- [OpenGSN](https://docs.opengsn.org/learn/index.html)

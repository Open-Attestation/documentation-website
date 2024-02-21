---
id: creating-a-custom-relay-provider
title: Creating a Custom RelayProvider
sidebar_label: Creating a Custom RelayProvider
---

A [RelayProviders](https://docs.opengsn.org/learn/index.html#client) allows a client to send signed transaction to the blockchain.

We provided our own [implementation](https://github.com/TradeTrust/document-creator-website/pull/76/files#diff-ae839d6f834102d8aaabb1f74fe1acb14ca32a3bee209ed2264f846fcca2679aR15) and you can do your own by following this [guide](https://docs.opengsn.org/tutorials/integration.html#the_user_interface_code).

### Gsn Capable Interface

As not every contract can accept relayed transactions, we have provided a new Erc165 interface `GsnCapable` to test if the contract can accept relayed transactions. Additionally, the inherited interface can return the corresponding paymaster address paying for the transaction.

To test if the given contract is `GsnCapable` we can make use of the method `supportsInterface` with the `interface-id` of [`0xa5a23640`](https://github.com/Open-Attestation/document-store/blob/master/contracts/GsnCapable.sol#L10) on any smart contract (the `interface-id` is our own implementation). If the contract supports the interface, we can assume that it can handle relayed transactions.

## Additional Resource

Below is a list of additional resources for more information:

- [OpenGSN](https://docs.opengsn.org/learn/index.html)

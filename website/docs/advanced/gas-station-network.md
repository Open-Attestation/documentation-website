---
id: gas-station-network
title: Using the gas station network
sidebar_label: Gas station network
---

Anyone who sends an Ethereum transaction needs to have ETH to pay for gas fees. This forces new users to pass KYC and purchase ETH before they can start using any dapp. This can be a major hurdle for users without prior crypto experience that are unfamiliar with the concept of needing to keep ETH in their wallet for gas.

Ethereum Gas Station Network (GSN) abstracts away gas to minimize onboarding & UX friction for dapps. With GSN, gasless clients can interact with Ethereum contracts without users needing ETH for transaction fees.

## How it works

![Google DNS to Test](/docs/advanced/gas-station-network/gsn_flow_full_layered.jpg)

_Source: [Open GSN](https://docs.opengsn.org/learn/index.html)_

Instead of signing an Ethereum transaction, which would require ETH for gas, a user signs a message containing information about a transaction they would like to execute and sends it to a relay server. Before the relay server pays for gas it verifies it will get refunded by a Paymaster contract.

A [paymaster](https://docs.opengsn.org/learn/index.html#paymaster) holds ETH and can implement any business logic to decide whether to accept or reject a meta transaction. For example, accepting only transactions by whitelisted users, or to the contracts methods required for onboarding users, or only transactions that include a repayment in tokens to the Paymaster, etc.

Assuming that the paymaster is willing to pay for transaction, the transaction gets forwarded to our contract, executing the function logic of issue, revocation, minting etc.

## Implementing the Gas Station Network

In order to use the gas station network we will need to deploy the following smart contracts:

- [Paymaster](https://github.com/Open-Attestation/document-store/blob/master/contracts/NaivePaymaster.sol)
- [GsnCapableDocumentStore](https://github.com/Open-Attestation/document-store/blob/master/contracts/GsnCapableDocumentStore.sol)

## Deploying Paymaster & GsnCapableDocumentStore

### Pre-requisite

- [OpenAttestation CLI](/docs/component/open-attestation-cli) installed
- Private key to an Ethereum wallet with sufficient ethers or a [wallet](/docs/verifiable-document/wallet)

### Deploying via OpenAttestation CLI

#### Paymaster

Simply run the following command. You may replace the `<paymaster-name>` with a suitable name

```bash
open-attestation deploy paymaster  "My Paymaster" --network ropsten --encrypted-wallet-path wallet.json
```

This will deploy the paymaster on the `ropsten` network. You should see a similar output when the deployment is successful:

```bash
ℹ  info      Deploying paymaster My Paymaster
? Wallet password [hidden]
…  awaiting  Decrypting Wallet [====================] [100/100%]
ℹ  info      Wallet successfully decrypted
...
…  awaiting  Waiting for transaction 0xf4a222c9bcc31ebd202a110568a7798218477482b773f49290e1df8b4936a313 to be mined
✔  success   Paymaster My Name deployed at 0xC234Fb1F1ef0ABCD1faC90ad12F4DfC97D583F95
```

> Save YOUR paymaster address for future reference

After deploying your paymaster, you will need to fund it so that the paymaster would be able to pay for relayed transactions made. We can use this command to transfer 1 ETH to the paymaster for now. Replace `<paymaster-address> `with your own paymaster's address and `<value>` with the amount you want to send.

```bash
npx @ethersproject/cli --account wallet.json --network ropsten send 0xC234Fb1F1ef0ABCD1faC90ad12F4DfC97D583F95 1
```

> There will be no prompting to key in you password, just key it in after command finishes loading

You can read more about `ethers-cli` [here](https://docs.ethers.io/v5/cli/ethers/#sandbox-utility--help).

#### GsnCapableDocumentStore

The GsnCapableDocumentStore is a variant of Document Store which allows for relayed transactions. The rest of the functionality mimics that of Document Store. To deploy a GsnCapableDocumentStore you can do so using the following command.You may replace the `<document-store-name>` with a suitable name.

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

Similar to [binding the document store to a domain name](../verifiable-document/document-store), you will have to bind the identity of the GSN capable document store to a domain name.

If you like more detailed setup instructions, you may refer to the [documentation for configuring DNS](../advanced/configuring-dns/).

> Take note of the domain you are inserting the records on, you will need this later

### Paymaster Configuration

In order to authorize your paymaster to pay for your contract we will need to configure the paymaster deployed earlier. We can use the `add-target` method to do so. You need to replace `<paymaster-address>` with your own paymaster and `<target-address>` with the address off the contract you intend to allow payment for.

```bash
open-attestation paymaster add-target --network ropsten --target-address 0x9Eb76E132fCA96779A5225419352Fb1B3B5Fd706 --paymaster-address 0xcB94584760bCA09e9fa7117C4eE966814f17a306 --encrypted-wallet-path wallet.json
```

You should see a similar output if the call is successful:

```bash
✔  success   Contract with address 0x9Eb76E132fCA96779A5225419352Fb1B3B5Fd706 has been registered on paymaster 0xcB94584760bCA09e9fa7117C4eE966814f17a306
```

You can check if a contract is supported by the paymaster by using the following command:

```bash
open-attestation paymaster supports-contract --network ropsten --target-address 0x9Eb76E132fCA96779A5225419352Fb1B3B5Fd706 --paymaster-address 0xcB94584760bCA09e9fa7117C4eE966814f17a306
```

## Configuring RelayProvider

Now that we have successfully set up a gas station network, we can move on to implementing [RelayProviders](https://docs.opengsn.org/learn/index.html#client) to send relayed transactions to our contract on the frontend. You can find out more on how to implement the RelayProvider [here](https://docs.opengsn.org/tutorials/integration.html#the_user_interface_code).

### Gsn Capable Interface

To test if the given contract is Gsn Capable we can make use of the method `supportsInterface` with the `interface-id` of [`0xa5a23640`](https://github.com/Open-Attestation/document-store/blob/master/contracts/GsnCapable.sol#L10). If the contract supports the interface, we can assume that it can handle relayed transactions. An example of how this can be implementation can be found [here](https://github.com/TradeTrust/document-creator-website/pull/76/files#diff-ae839d6f834102d8aaabb1f74fe1acb14ca32a3bee209ed2264f846fcca2679aR15).

We will need to configure the GsnRelayProvider as [explained](https://docs.opengsn.org/tutorials/integration.html#the_user_interface_code) with the `RelayHubAddress` and `PaymasterAddress`. The `RelayHubAddress` can be statically retrieved from [GSN](https://docs.opengsn.org/gsn-provider/networks.html). The `PaymasterAddress`
will be retrieved from the contract provided (this was set earlier as part of [this step](#gsncapabledocumentstore).

## Additional Resource

Below is a list of additional resources for more information:

- [Open GSN](https://docs.opengsn.org/learn/index.html)
- [OA-CLI Paymaster Methods](https://github.com/Open-Attestation/open-attestation-cli/#paymaster)

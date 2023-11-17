---
id: setup-paymaster
title: Creating a Paymaster
sidebar_label: Creating a Paymaster
---

A [Paymaster](https://docs.opengsn.org/learn/index.html#paymaster) holds ETH and can implement any business logic to decide whether to accept or reject a meta transaction. For example, accepting only transactions by whitelisted users, or to the contracts methods required for onboarding users, or only transactions that include a repayment in tokens to the Paymaster, etc.

A Paymaster is useful for any party willing to pay for a relayed transaction to a given address using the GSN network.

This guide is for developers who want to setup a paymaster wallet to sponsor all transactions to a given smart contract.

## Implementation of Paymaster

We provided an implementation of the Paymaster which allows for multiple payable address.

You can refer to the source code of our Paymaster [here](https://github.com/Open-Attestation/document-store/blob/master/contracts/NaivePaymaster.sol).

## Deploying Paymaster

### Prerequisites

- [OpenAttestation CLI](/docs/developer-section/libraries/remote-files/open-attestation-cli) installed
- [Ethereum wallet with sufficient ethers](/docs/integrator-section/verifiable-document/ethereum/wallet)

> We will only show example for the wallet and one must change the command accordingly if using another method

### Deploying via OpenAttestation CLI

Simply run the following command. You may replace the `<paymaster-name>` with a suitable name (the name does not matter).

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

After deploying your paymaster, you will need to fund it so that the paymaster will be able to pay for relayed transactions made. We can use this command to transfer 1 ETH to the paymaster for now. Replace `<paymaster-address>` with your own paymaster's address and `<value>` with the amount you want to send.

```bash
npx @ethersproject/cli --account wallet.json --network ropsten send 0xC234Fb1F1ef0ABCD1faC90ad12F4DfC97D583F95 1
```

> There will be no prompting to key in you password, just key it in after command finishes loading

You can read more about `ethers-cli` [here](https://docs.ethers.io/v5/cli/ethers/#sandbox-utility--help).

## Paymaster Configuration

The paymaster is ready. You have to wait for clients to deploy their gsn capable document store before proceeding further.

To authorize your paymaster to pay for your contract we will need to configure the paymaster deployed earlier. We can use the `add-target` method to do so. You need to replace `<paymaster-address>` with your own paymaster and `<target-address>` with the address off the contract you intend to allow payment for.

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

## Additional Resource

Below is a list of additional resources for more information:

- [OpenGSN](https://docs.opengsn.org/learn/index.html)
- [Paymaster](https://docs.opengsn.org/learn/index.html#paymaster)
- [OA-CLI Paymaster Methods](https://github.com/Open-Attestation/open-attestation-cli/#paymaster)

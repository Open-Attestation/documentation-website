---
id: token-registry
title: Deploying Transferable Record Registry
sidebar_label: Deploying Transferable Record Registry
---

The token registry is a smart contract on the Ethereum network that records the ownership information of a transferable record. It is compliant to the [ERC721 standards](https://eips.ethereum.org/EIPS/eip-721).

In this guide, we will deploy a token registry smart contract on the Ethereum `ropsten` network which is a test network that does not require actual ethers for transactions.

## Pre-requisite

- [OpenAttestation CLI](/docs/component/open-attestation-cli) installed
- Private key to an Ethereum wallet with sufficient ethers

## Deploying via OpenAttestation CLI

### Creating the key file

Create a file `key.txt` with the private key of your Ethereum wallet and save it in your working directory. If you are using Metamask, you may retrieve this key from the extension in [this guide](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

Sample `key.txt` file content (replace with your private key):

```sh
d8f30c982fc23245a2cc4ec8271edcb4637f539d490ce750cdb5085241ffb41c
```

> Do not share this file with anyone else!

### Deploying the token registry

Simply run the following command. You may replace the `<registry-name>` and `<registry-symbol>` with a suitable name and symbol (usually 3 characters).

```sh
open-attestation deploy token-registry "My Token Registry" MTR -n ropsten -f key.txt
```

This will deploy the token registry on the `ropsten` network. You should see a similar output when the deployment is successful:

```txt
ℹ  info      Deploying token registry My Token Registry
…  awaiting  Sending transaction to pool
…  awaiting  Waiting for transaction 0x7e3eea01c42bb10b3160f19c9f55fe3de24ed05abb9d6f4363c80c0d0f1be355 to be mined
✔  success   Token registry deployed at 0x8431012Bc040942B59e3C5bf428221eab0b2f723
ℹ  info      Find more details at https://ropsten.etherscan.io/address/0x8431012Bc040942B59e3C5bf428221eab0b2f723
```

In this case, our contract has been successfully deployed on ropsten at the address `0x8431012Bc040942B59e3C5bf428221eab0b2f723`.

> Save YOUR token registry address for future reference

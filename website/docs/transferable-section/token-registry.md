---
id: token-registry
title: Deploy transferable record registry
sidebar_label: Deploy transferable record registry
---

The token registry is a smart contract on the Ethereum network that records the ownership information of a transferable record. It is compliant to the [ERC721 standards](https://eips.ethereum.org/EIPS/eip-721).

In this guide, you will deploy a token registry smart contract on the Ethereum `sepolia` network which is a test network that does not require actual ethers for transactions.

## Prerequisites

- [OpenAttestation CLI](/docs/lib-section/remote-files/open-attestation-cli) installed
- Private key to an Ethereum wallet with sufficient ethers

## Deploying via OpenAttestation CLI

### Retrieving the private key
Run the command: 
   ```bash
    open-attestation wallet decrypt wallet.json
   ```

In the response, find the private key which looks like: 
   ```text
    - private key 0xd8f30c982fc23245a2cc4ec8271edcb4637f539d490ce750cdb5085241ffb41c
   ```

### Creating the key file

Create a file `key.txt` with the private key of your Ethereum wallet and save it in your working directory. If you are using MetaMask, you may retrieve this key from the extension in [this guide](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

Sample `key.txt` file content (replace it with your private key):

```sh
d8f30c982fc23245a2cc4ec8271edcb4637f539d490ce750cdb5085241ffb41c
```

> **Important:** Do not share this file with anyone else.

### Deploying the token registry

Replace the `<registry-name>` and `<registry-symbol>` below with a suitable name and symbol (usually three characters) and run the command:

```sh
open-attestation deploy token-registry <registry-name> <registry-symbol> -n sepolia -f key.txt
```
The following shows an example, in which `<registry-name>`=`"My Token Registry"` and `<registry-symbol>`=`MTR`.

```sh
open-attestation deploy token-registry "My Token Registry" MTR -n sepolia -f key.txt
```

This will deploy the token registry on the `sepolia` network. 

When the deployment is successful, the response looks like the following:

```txt
ℹ  info      Deploying token registry My Token Registry
…  awaiting  Sending transaction to pool
…  awaiting  Waiting for transaction 0x7e3eea01c42bb10b3160f19c9f55fe3de24ed05abb9d6f4363c80c0d0f1be355 to be mined
✔  success   Token registry deployed at 0x8431012Bc040942B59e3C5bf428221eab0b2f723
ℹ  info      Find more details at https://sepolia.etherscan.io/address/0x8431012Bc040942B59e3C5bf428221eab0b2f723
```

In this case, our contract has been successfully deployed on sepolia at the address `0x8431012Bc040942B59e3C5bf428221eab0b2f723`.

>**Important:** Save your token registry address for future reference.

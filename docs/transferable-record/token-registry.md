---
id: token-registry
title: Deploying Transferable Record Registry
sidebar_label: Deploying Transferable Record Registry
---

The token registry is a smart contract on the Ethereum network that records the ownership information of a transferable record. It is compliant to the [ERC721 standards](https://eips.ethereum.org/EIPS/eip-721).

In this guide, we will deploy a token registry smart contract on the Ethereum `ropsten` network which is a test network that does not require actual ethers for transactions.

## Pre-requisite

- [OpenAttestation CLI](../component/open-attestation-cli) installed
- Private key to an Ethereum wallet with sufficient ethers

## Deploying via OpenAttestation CLI

### Creating the key file

Create a file `key.txt` with the private key of your Ethereum wallet and save it in your working directory.

Sample `key.txt` file content (replace with your private key):

```sh
d8f30c982fc23245a2cc4ec8271edcb4637f539d490ce750cdb5085241ffb41c
```

> Do not share this file with anyone else!

### Deploying the token registry

Simply run the following command, replacing `<registry-name>` and `<registry-symbol>` with a suitable name and symbol (usually 3 characters).

```sh
open-attestation deploy token-registry <registry-name> <registry-symbol> -n ropsten -f key.txt
```

This will deploy the token registry on the `ropsten` network. To deploy on the main Ethereum network, simply omit the `-n ropsten` flag. You will need to have sufficient funds on Ethereum for that to work as well.

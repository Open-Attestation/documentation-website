---
id: wallet
title: Create a wallet
sidebar_label: Create a wallet
---

First, create the [wallet](https://ethereum.org/wallets).

After that, you will get the public address of the wallet and be able to verify the wallet balance.

If necessary, use ether faucet to top up your wallet.

## Running the wallet create command

```bash
open-attestation wallet create --output-file wallet.json
```

During the creation, you will be prompted for a password. Be sure to remember the wallet password for the following steps.

In the response, you will see a message like the following:

```text
ℹ  info      Creating a new wallet
? Wallet password [hidden]
…  awaiting  Encrypting Wallet [====================] [100/100%]
ℹ  info      Wallet with public address 0x10cFd56E11e7d66C8d0716Cd2D6B847Cb17ABeeD successfully created. Find more details:
✔  success   Wallet successfully saved into /home/nebulis/IdeaProjects/open-attestation-cli/wallet.json
```

A wallet will be created in the current folder, in the `wallet.json` file.

## Getting the wallet public address

> In the example above, the public address of the wallet is `0x10cFd56E11e7d66C8d0716Cd2D6B847Cb17ABeeD`. You will definitely get a different value.

## Verifying the wallet balance

Make sure ethers have been added into your wallet. You will need some for the next steps.

Head to etherscan (https://sepolia.etherscan.io/address/{PUT_YOUR_ADDRESS_HERE}) and verify the balance. You should have 1 ether.

For instance, for the wallet created above, the URL is https://sepolia.etherscan.io/address/0x10cFd56E11e7d66C8d0716Cd2D6B847Cb17ABeeD.

## Adding ethers to your wallet

You can use any of these ether faucets for the Sepolia network to fund your wallet. For instance:

- https://sepoliafaucet.com
- https://sepolia-faucet.pk910.de

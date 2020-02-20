---
id: ropsten-setup
title: Setting up Test Account on Etherem Test Network (Ropsten)
sidebar_label: Test Account Setup
---

This guide will set you up on the Ethereum Test Network (Ropsten) so that you may interact with our web applications using the metamask plugin.

The test network is a fork of the Ethereum network used for non-production applications and is free to use. We will be using the test network for the guide.

## Downloading Metamask

![Metamask](/docs/appendix/ropsten-setup/metamask.png)

You may download the Chrome Extension Metamask to create and manage your wallet from https://metamask.io.

## Setting Up Metamask

Once the chrome extension has been downloaded you will need to set up your wallet by:

### 1. Creating a new password for the wallet

<img src="/docs/appendix/ropsten-setup/create-password.png" alt="Create Password" height="400"/>

### 2. Backing up the seed phrases

![Metamask](/docs/appendix/ropsten-setup/seed-backup.png)

### 3. Note down your wallet address

<img src="/docs/appendix/ropsten-setup/address.png" alt="Wallet Address" height="400"/>

Once your wallet is created, you will see your wallet's address. This address is a string starting with `0x` and can be shared with others safely. You will need to note down this address.

### 4. Connect to Ropsten Test Network

<img src="/docs/appendix/ropsten-setup/network-selector.png" alt="Select Ropsten Test Network" height="400"/>

For the rest of the guide, we will be connected to the ropsten network. You will need to change the network in the network selector at the top of the plugin. Select "Ropsten Test Network" to continue.

## Obtaining Ropsten Ethers

Ethers is a cryptocurrency used to fund transactions on the Ethereum network. On the Ethereum mainnet, ethers may be purchased from any cryptocurrency exchanges. However, on the ropsten network, you may obtain free ethers from faucets ran by other organizations.

One of these is the Metamask Faucet available at https://faucet.metamask.io/.

![Metamask Faucet](/docs/appendix/ropsten-setup/faucet.png)

Simply log into your Metamask wallet on the chrome extension and click on "Request 1 ether from faucet" to obtain free ethers for development purposes. You may have to wait up to 20 seconds for the ethers to appear in your wallet.

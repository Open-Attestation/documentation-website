---
id: wallet
title: Creating a wallet
sidebar_label: Creating a wallet
---

The first step that we will need to go through, is the [wallet](/docs/appendix/glossary#wallet) creation:

```bash
open-attestation wallet create --output-file wallet.json --fund ropsten
```

> Using `--fund ropsten` will automatically add ethers to your wallet on the ropsten network.

During the creation, you will be prompted for a password. Make sure to remember it for the following steps. You will see a message after completion of the command:

```text
ℹ  info      Creating a new wallet
? Wallet password [hidden]
…  awaiting  Encrypting Wallet [====================] [100/100%]
ℹ  info      [ropsten] Added fund to 0x10cFd56E11e7d66C8d0716Cd2D6B847Cb17ABeeD
ℹ  info      Wallet with public address 0x10cFd56E11e7d66C8d0716Cd2D6B847Cb17ABeeD successfully created. Find more details:
✔  success   Wallet successfully saved into /home/nebulis/IdeaProjects/open-attestation-cli/wallet.json
```

A wallet will be created in the current folder, in the `wallet.json` file.

> In the example above, the public address for the wallet is `0x10cFd56E11e7d66C8d0716Cd2D6B847Cb17ABeeD`. You will definitely get a different value.

Make sure ethers have been added into your wallet. You will need some for the next steps. Head to etherscan (https://ropsten.etherscan.io/address/PUT_YOUR_ADDRESS_HERE}) and verify the balance. You should have 1 ether. For instance, for the wallet created above, the URL is https://ropsten.etherscan.io/address/0x10cFd56E11e7d66C8d0716Cd2D6B847Cb17ABeeD.

After few minutes, if your balance stays empty, you can try to use a different ether faucet for ropsten network. For instance :

- https://faucet.metamask.io/
- https://faucet.dimensions.network/

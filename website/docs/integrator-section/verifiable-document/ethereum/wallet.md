---
id: wallet
title: Creating a wallet
sidebar_label: Creating a wallet
---

The first step that we will need to go through, is the [wallet](/docs/docs-section/appendix/glossary#wallet) creation:

```bash
open-attestation wallet create --output-file wallet.json
```

During the creation, you will be prompted for a password. Make sure to remember it for the following steps. You will see a message after completion of the command:

```text
ℹ  info      Creating a new wallet
? Wallet password [hidden]
…  awaiting  Encrypting Wallet [====================] [100/100%]
ℹ  info      Wallet with public address 0x10cFd56E11e7d66C8d0716Cd2D6B847Cb17ABeeD successfully created. Find more details:
✔  success   Wallet successfully saved into /home/nebulis/IdeaProjects/open-attestation-cli/wallet.json
```

A wallet will be created in the current folder, in the `wallet.json` file.

> In the example above, the public address for the wallet is `0x10cFd56E11e7d66C8d0716Cd2D6B847Cb17ABeeD`. You will definitely get a different value.

Make sure ethers have been added into your wallet. You will need some for the next steps. Head to etherscan (https://sepolia.etherscan.io/address/PUT_YOUR_ADDRESS_HERE}) and verify the balance. You should have 1 ether. For instance, for the wallet created above, the URL is https://sepolia.etherscan.io/address/0x10cFd56E11e7d66C8d0716Cd2D6B847Cb17ABeeD.

You can use any of these ether faucet for sepolia network to fund your wallet. For instance :

- <https://sepoliafaucet.com/>

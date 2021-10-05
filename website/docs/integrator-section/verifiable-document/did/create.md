---
title: Creating a DID
sidebar_label: Creating a DID
---

While there exists many [DIDs](/docs/appendix/glossary#did), this tutorial will focus only on `ethr` DID. At the moment, OpenAttestation only supports `ethr` DID. 

The creation of an `ethr` DID is identical to [the creation of a wallet](/docs/verifiable-document/wallet), as it relies entirely on the ethereum architecture. Once the wallet will be created, we will need to retrieve its private key:

1. Create the wallet:

   ```bash
   open-attestation wallet create --of wallet.json
   ```

   ```text
   ℹ  info      Creating a new wallet
   ? Wallet password [hidden]
   …  awaiting  Encrypting Wallet [====================] [100/100%]
   ℹ  info      Wallet with public address 0xaCc51f664D647C9928196c4e33D46fd98FDaA91D successfully created. Find more details:
   ✔  success   Wallet successfully saved into /home/nebulis/IdeaProjects/open-attestation-cli/wallet.json
   ```

   A wallet will be created in the current folder, in the `wallet.json` file.

1. Retrieve the private key:

   ```bash
    open-attestation wallet decrypt wallet.json
   ```

   ```text
   ⚠  warning   You are about to reveal the private key of your wallet. Please type the following word into the terminal to prove that you understand the risks: environmental-maroon-scorpion
   ? ack: environmental-maroon-scorpion
   ℹ  info      User consented to risks
   ? Wallet password [hidden]
   …  awaiting  Decrypting Wallet [====================] [100/100%]
   ℹ  info      Wallet successfully decrypted
   ✔  success   Wallet information:
    - address: 0xaCc51f664D647C9928196c4e33D46fd98FDaA91D
    - public key: 0x041582ae06ae170b4c5610599c8a5fee37414da84f7e2a3b3c48789199c3202f2c7673f3e32dfead4543247ccb792aa4f54dbd3e701172723434e88f770dd64823
    - private key 0x7b227ac59116f3eeb2b265422cf3cbfbd244c525961fb297eb52153ec62aa845
   ```

There are two information to keep very importantly for the next steps:

- the wallet address (`0xaCc51f664D647C9928196c4e33D46fd98FDaA91D` in the example above)
- the private key (`0x7b227ac59116f3eeb2b265422cf3cbfbd244c525961fb297eb52153ec62aa845` in the example above)

Please note that you will definitely get different values.

> In order to make the tutorial easier to follow, we decided to reveal all the information about the wallet we used, including the private key. We used a throw-away wallet for that purpose. That means that we will never use this wallet again. It's very important that you **NEVER SHARE THE PRIVATE KEY** of your wallet.

You can check your DID at
https://dev.uniresolver.io/1.0/identifiers/did:ethr:CHANGE_BY_YOUR_WALLET_ADDRESS (for instance with [check this url](https://dev.uniresolver.io/1.0/identifiers/did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D) with the example above)
)

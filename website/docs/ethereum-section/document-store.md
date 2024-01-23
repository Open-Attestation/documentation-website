---
id: document-store
title: Deploy document store
sidebar_label: Deploy document store
---

The document store is a smart contract on the Ethereum network that records the issuance and revocation status of OA documents. In this guide, you will deploy a document store smart contract on the Ethereum `sepolia` network, which is a test network that does not require actual [ethers](/docs/glossary-section/glossary#ether) for transactions.

## Running the deploy document-store command
You will use the wallet created in the [previous step](/docs/ethereum-section/wallet).

```bash
open-attestation deploy document-store "Ethereum document store" --network sepolia --encrypted-wallet-path wallet.json
```

You will be prompted for the password that you used while creating the wallet. 

## Getting the response
Once your document store smart contract has been successfully deployed, you will see the success message with the document store address.

```text
ℹ  info      Deploying document store Ethereum document store
? Wallet password [hidden]
…  awaiting  Decrypting Wallet [====================] [100/100%]
ℹ  info      Wallet successfully decrypted
...
✔  success   Document store Ethereum document store deployed at 0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b
ℹ  info      Find more details at https://sepolia.etherscan.io/address/0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b
```

## Saving the document store address
In the example above, the document store address is `0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b`.

Please do **not** use the Transaction ID in the response.

> **Important:** Save the document store address somewhere. You will need this address later to complete the tutorial.
---
id: document-store
title: Deploying Document Store Smart Contract
sidebar_label: Deploying Document Store
---

The document store is a smart contract on the Ethereum network that records the issuance and revocation status of OA documents. In this guide, we will deploy a document store smart contract on the Ethereum `goerli` network, which is a test network that does not require actual [ethers](/docs/docs-section/appendix/glossary#ether) for transactions.

## Run the deploy document-store command
We will make use of the wallet that we created in the [previous step](/docs/integrator-section/verifiable-document/ethereum/wallet).

```bash
open-attestation deploy document-store "Ethereum document store" --network goerli --encrypted-wallet-path wallet.json
```

You will be prompted for the password that you used while creating the wallet. 

## Get the response
Once your document store smart contract has been successfully deployed, you will see the success message with the document store address.

```text
ℹ  info      Deploying document store Ethereum document store
? Wallet password [hidden]
…  awaiting  Decrypting Wallet [====================] [100/100%]
ℹ  info      Wallet successfully decrypted
...
✔  success   Document store Ethereum document store deployed at 0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b
ℹ  info      Find more details at https://goerli.etherscan.io/address/0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b
```

## Note down the document store address
In the example above, the document store address is `0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b`.

> **Important:** Please do **not** use the Transaction ID in the response.

Save the document store address somewhere. You will need this address later to complete the tutorial.
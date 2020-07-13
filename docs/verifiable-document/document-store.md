---
id: document-store
title: Deploying Document Store Smart Contract
sidebar_label: Deploying Document Store
---

The document store is a smart contract on the Ethereum network that records the issuance and revocation status of OA documents. In this guide, we will deploy a document store smart contract on the Ethereum `ropsten` network, which is a test network that does not require actual [ethers](/docs/appendix/glossary#ether) for transactions.

In this guide we will make use of the wallet that we created in the [previous step](/docs/verifiable-document/wallet)

```bash
open-attestation deploy document-store "My first document store" --network ropsten --encrypted-wallet-path wallet.json
```

You will be prompted for the password that you used while creating the wallet. Once your document store smart contract has been successfully deployed, you will see the success message with the document store address.

```text
ℹ  info      Deploying document store My first document store
? Wallet password [hidden]
…  awaiting  Decrypting Wallet [====================] [100/100%]
ℹ  info      Wallet successfully decrypted
...
✔  success   Document store My first document store deployed at 0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b
ℹ  info      Find more details at https://ropsten.etherscan.io/address/0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b
```

In the example above, the document store address is `0xBBb55Bd1D709955241CAaCb327A765e2b6D69c8b`, please do **NOT** use the Transaction ID.

**Save the document store address somewhere.** You will need this address later to complete the tutorial.

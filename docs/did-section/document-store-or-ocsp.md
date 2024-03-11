---
id: document-store-or-ocsp
title: Deploy document store or OCSP
sidebar_label: Deploy document store or OCSP
---
For first-time users, it's recommended to skip this article and [read the next one](/docs/did-section/dns).

:::info 
* It is **optional** to deploy either document store or OCSP responder. Perform this task **only** if you need to revoke documents. 
* If you need to choose from document store and OCSP responder, see the differences between revocation methods in [this article](/docs/revoke-section/diff-btw-revocation-methods).
:::

## Deploying Document Store

> **Important:** If you have run the Ethereum method and created a document store, it is technically possible to use the same document store as a revocation store for DID. However, the resulting revocation list will be shared between these two methods.

The document store is a smart contract on the Ethereum network that records the issuance and revocation status of OA documents. In this guide, you will deploy a document store smart contract on the Ethereum `Sepolia` network, which is a test network that does not require actual [ethers](/docs/glossary-section/glossary#ether) for transactions.


### Running the deploy document-store command
You will use the wallet created in the [previous step](/docs/did-section/create).

```bash
open-attestation deploy document-store "DID document store" --network sepolia --encrypted-wallet-path wallet.json
```

You will be prompted for the password that you used while creating the wallet. 

### Getting the response
Once your document store smart contract has been successfully deployed, you will see the success message with the document store address.

```text
ℹ  info      Deploying document store DID document store
? Wallet password [hidden]
…  awaiting  Decrypting Wallet [====================] [100/100%]
ℹ  info      Wallet successfully decrypted
...
✔  success   Document store DID document store deployed at 0x3AaeBb82BbF0513B422532953724C33504E5b157
ℹ  info      Find more details at https://sepolia.etherscan.io/address/0x3AaeBb82BbF0513B422532953724C33504E5b157
```

### Saving the document store address
In the example above, the document store address is `0x3AaeBb82BbF0513B422532953724C33504E5b157`. 

Please do **not** use the Transaction ID in the response.

> **Important:** Save the document store address somewhere. You will need this address later to complete the tutorial.

## Deploying OCSP responder
A reference implementation for deploying the OCSP responder is available at [this repository on GitHub](https://github.com/Open-Attestation/ocsp-responder).

>**Note:** Other implementations will also be recognized by verifiers, as long as they adhere to the request/response format required by the OpenAttestation framework.

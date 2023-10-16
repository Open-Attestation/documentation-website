---
title: Deploying Document Store Or OCSP
sidebar_label: Deploying Document Store Or OCSP
---
> **Note:** It is **optional** to deploy either document store or OCSP. Perform this task only if you need to revoke documents.

## Deploying Document Store

> **Important:** If you have run the Ethereum method and created a document store, do not use it in the DID method.

<!-- The document store is a smart contract on the Ethereum network that records the issuance and revocation status of OA documents. In this guide, we will deploy a document store smart contract on the Ethereum `goerli` network, which is a test network that does not require actual [ethers](/docs/docs-section/appendix/glossary#ether) for transactions. -->

<embed src="/docs/reusable_snippets/_document-store-overview-snippet.md" />


### Run the deploy document-store command
We will make use of the wallet that we created in the [previous step](/docs/integrator-section/verifiable-document/did/create).

```bash
open-attestation deploy document-store "DID document store" --network goerli --encrypted-wallet-path wallet.json
```

You will be prompted for the password that you used while creating the wallet. 

### Get the response
Once your document store smart contract has been successfully deployed, you will see the success message with the document store address.

```text
ℹ  info      Deploying document store DID document store
? Wallet password [hidden]
…  awaiting  Decrypting Wallet [====================] [100/100%]
ℹ  info      Wallet successfully decrypted
...
✔  success   Document store DID document store deployed at 0x3AaeBb82BbF0513B422532953724C33504E5b157
ℹ  info      Find more details at https://goerli.etherscan.io/address/0x3AaeBb82BbF0513B422532953724C33504E5b157
```

### Note down the document store address
In the example above, the document store address is `0x3AaeBb82BbF0513B422532953724C33504E5b157`. 

> **Important:** Please do **not** use the Transaction ID in the response.

Save the document store address somewhere. You will need this address later to complete the tutorial.

## Deploying OCSP
To deploy your own Online Certificate Status Protocol (OCSP) responder, see [this repository on GitHub](https://github.com/Open-Attestation/ocsp-responder).
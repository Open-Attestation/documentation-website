---
id: issuing-transferable-record
title: Issuing Transferable Record
sidebar_label: Issuing Transferable Record
---

In this final step, we will create the transferable record and initialize the first owner of that to the title escrow we have created earlier.

## Prerequisite

You will require the following:

- token registry address
- private key to token registry (key.txt)
- title escrow contract address
- merkle root of the wrapped transferable record

## Issuing Transferable Records

To issue the transferable record, simply run the following command:

```sh
open-attestation token-registry issue -a 0x8431012Bc040942B59e3C5bf428221eab0b2f723 --tokenId 0x0d9839a8034cb783d98bd57bcbaafb4dc3614c4193d2edf8a655c1ec6635b7ea --to 0xec733A8322f8216eaf8e5566e750bfee3974B7f3 -n ropsten -f key.txt
```

Note to replace the following values:

- `0x8431012Bc040942B59e3C5bf428221eab0b2f723` with your token registry contract address
- `0x0d9839a8034cb783d98bd57bcbaafb4dc3614c4193d2edf8a655c1ec6635b7ea` with your merkle root (with a `0x` prefix)
- `0xec733A8322f8216eaf8e5566e750bfee3974B7f3` with your title escrow contract address

Once the document has been issued, you will be able to see an output similar to the following:

```txt
ℹ  info      Issuing 0x0d9839a8034cb783d98bd57bcbaafb4dc3614c4193d2edf8a655c1ec6635b7ea to the initial recipient 0xec733A8322f8216eaf8e5566e750bfee3974B7f3 in the registry 0x8431012Bc040942B59e3C5bf428221eab0b2f723
…  awaiting  Sending transaction to pool
…  awaiting  Waiting for transaction 0xc31bc1d99a725226552aff943ba4aa73ea79f93bd3ef0e7f5e63a5040af52457 to be mined
✔  success   Token with hash 0x0d9839a8034cb783d98bd57bcbaafb4dc3614c4193d2edf8a655c1ec6635b7ea has been issued on 0x8431012Bc040942B59e3C5bf428221eab0b2f723 with the initial recipient being 0xec733A8322f8216eaf8e5566e750bfee3974B7f3
ℹ  info      Find more details at https://ropsten.etherscan.io/tx/0xc31bc1d99a725226552aff943ba4aa73ea79f93bd3ef0e7f5e63a5040af52457
```

Congratulation, you have successfully created your first transferable record.

## Viewing your transferable record

To view your transferable record, simply head over the https://dev.tradetrust.io/ (or https://tradetrust.io/ if you've issued to the Ethereum mainnet). You will be able to drop your transferable record (found in `wrapped-documents` folder) into the dropzone and see something similar to the following:

![Completed Transferable Record](/docs/transferable-record/issuing-transferable-record/completed.png)

Notice you are able to click on `Connect Wallet` when logged in to either the beneficiary or holder to gain access to actions to change the ownership of the transferable record.

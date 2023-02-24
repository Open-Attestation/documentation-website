---
id: issuing-transferable-record
title: Issuing Transferable Record
sidebar_label: Issuing Transferable Record
---

In this final step, we will create the transferable record and initialize the first beneficiary and holder for the title escrow.

## Prerequisite

You will require the following:

- token registry address
- private key to token registry (key.txt)
- merkle root of the wrapped transferable record

## Issuing Transferable Records

In the example, we will use 0x6FFeD6E6591b808130a9b248fEA32101b5220eca for as beneficiary and holder. You will need to replace this value with a wallet address you control to be able to perform different actions on the transferable records later.

To issue the transferable record, simply run the following command:

```sh
open-attestation token-registry issue -a 0x8431012Bc040942B59e3C5bf428221eab0b2f723 --tokenId 0x0d9839a8034cb783d98bd57bcbaafb4dc3614c4193d2edf8a655c1ec6635b7ea --beneficiary 0x6FFeD6E6591b808130a9b248fEA32101b5220eca --holder 0x6FFeD6E6591b808130a9b248fEA32101b5220eca -n ropsten -f key.txt
```

Note to replace the following values:

- `0x8431012Bc040942B59e3C5bf428221eab0b2f723` with your token registry contract address
- `0x0d9839a8034cb783d98bd57bcbaafb4dc3614c4193d2edf8a655c1ec6635b7ea` with your merkle root (with a `0x` prefix)
- `0x6FFeD6E6591b808130a9b248fEA32101b5220eca` with your beneficiary and holder addresses

Once the document has been issued, you will be able to see an output similar to the following:

```txt
ℹ  info      Issuing 0x0d9839a8034cb783d98bd57bcbaafb4dc3614c4193d2edf8a655c1ec6635b7ea to the initial recipient 0x6FFeD6E6591b808130a9b248fEA32101b5220eca and initial holder 0x6FFeD6E6591b808130a9b248fEA32101b5220eca in the registry 0x1E63411DC2fCd6Fab5EE938622f5f6A390F48272
…  awaiting  Sending transaction to pool
…  awaiting  Waiting for transaction 0xaff547d8f608ca17c4c33acef1788ee0b0cc177abb1efcb868250dbecdde46cf to be mined
✔  success   Token with hash 0x0d9839a8034cb783d98bd57bcbaafb4dc3614c4193d2edf8a655c1ec6635b7ea has been issued on 0x1E63411DC2fCd6Fab5EE938622f5f6A390F48272 with the initial recipient being 0x6FFeD6E6591b808130a9b248fEA32101b5220eca and initial holder 0x6FFeD6E6591b808130a9b248fEA32101b5220eca
ℹ  info      Find more details at https://ropsten.etherscan.io/tx/0xaff547d8f608ca17c4c33acef1788ee0b0cc177abb1efcb868250dbecdde46cf
```

Congratulation, you have successfully created your first transferable record.

## Viewing your transferable record

To view your transferable record, simply head over the https://dev.tradetrust.io/ (or https://tradetrust.io/ if you've issued to the Ethereum mainnet). You will be able to drop your transferable record (found in `wrapped-documents` folder) into the dropzone and see something similar to the following:

![Completed Transferable Record](/docs/integrator-section/transferable-record/issuing-transferable-record/completed.png)

Notice you are able to click on `Connect Wallet` when logged in to either the beneficiary or holder to gain access to actions to change the ownership of the transferable record.

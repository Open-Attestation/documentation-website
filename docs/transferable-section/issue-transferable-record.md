---
id: issue-transferable-record
title: Issue transferable records
sidebar_label: Issue transferable records

---

In this final step, you will create the transferable record and initialize the first beneficiary and holder for the title escrow.

## Prerequisite

You will require the following:

- token registry address
- private key to token registry (`key.txt`)
- merkle root of the wrapped transferable record
- beneficiary and holder wallet addresses

## Issuing the transferable record

In the example, you will use 0x6FFeD6E6591b808130a9b248fEA32101b5220eca as beneficiary and holder. You will need to replace this value with a wallet address you control, to be able to perform different actions on the transferable records later.

To issue the transferable record, replace the following values:

- `0x8431012Bc040942B59e3C5bf428221eab0b2f723` with your token registry contract address
- `0x0d9839a8034cb783d98bd57bcbaafb4dc3614c4193d2edf8a655c1ec6635b7ea` with your merkle root (with a `0x` prefix)
- `0x6FFeD6E6591b808130a9b248fEA32101b5220eca` with your beneficiary and holder addresses

Then run the command:

```sh
open-attestation token-registry issue --address 0x8431012Bc040942B59e3C5bf428221eab0b2f723 --tokenId 0x0d9839a8034cb783d98bd57bcbaafb4dc3614c4193d2edf8a655c1ec6635b7ea --beneficiary 0x6FFeD6E6591b808130a9b248fEA32101b5220eca --holder 0x6FFeD6E6591b808130a9b248fEA32101b5220eca -n sepolia -f key.txt
```

>**Note:** This tutorial uses the same wallet address for both the beneficiary and the holder for demonstration purposes. You can specify different wallet addresses for the beneficiary and holder if they are two different entities.

Once the document has been issued, you will be able to see an output similar to the following:

```txt
ℹ  info      Issuing 0x0d9839a8034cb783d98bd57bcbaafb4dc3614c4193d2edf8a655c1ec6635b7ea to the initial recipient 0x6FFeD6E6591b808130a9b248fEA32101b5220eca and initial holder 0x6FFeD6E6591b808130a9b248fEA32101b5220eca in the registry 0x8431012Bc040942B59e3C5bf428221eab0b2f723
…  awaiting  Sending transaction to pool
…  awaiting  Waiting for transaction 0xaff547d8f608ca17c4c33acef1788ee0b0cc177abb1efcb868250dbecdde46cf to be mined
✔  success   Token with hash 0x0d9839a8034cb783d98bd57bcbaafb4dc3614c4193d2edf8a655c1ec6635b7ea has been issued on 0x8431012Bc040942B59e3C5bf428221eab0b2f723 with the initial recipient being 0x6FFeD6E6591b808130a9b248fEA32101b5220eca and initial holder 0x6FFeD6E6591b808130a9b248fEA32101b5220eca
ℹ  info      Find more details at https://sepolia.etherscan.io/tx/0xaff547d8f608ca17c4c33acef1788ee0b0cc177abb1efcb868250dbecdde46cf
```

The response means you have successfully created the transferable record.

## Viewing your transferable record

To view your transferable record, visit https://dev.tradetrust.io/

If you have issued the Ethereum Mainnet, visit https://tradetrust.io/ instead. 

You will be able to drag your transferable record from the `wrapped-documents-transferable` folder and drop it to see a page like the following:

![Completed Transferable Record](/docs/transferable-section/complete-issuance.png)

When you have logged in as either beneficiary or holder, click **Manage Assets** to perform the action such as:

* **Transfer holdership**: This will change the owner of the document.
* **Endorse change of beneficiary**: This will change the beneficiary of the document.
* **Surrender document**: This will freeze the records in the document so that they can no longer be used for transfers, but are still valid for verification.

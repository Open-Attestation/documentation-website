---
id: encrypt-document
title: Encrypt verifiable documents
sidebar_label: Encrypt verifiable documents

---

Because the verifiable documents may include confidential information, it will be good to encrypt the documents before distributing them, so that all information can be securely transferred. 

If the issuers want to host the verifiable documents, they must encrypt the documents. To learn more, see the OpenAttestation (Encryption) repository. 

## Prerequisites

OpenAttestation (Encryption) installed on your machine with the command below:

```bash
npm i @govtechsg/oa-encryption
```

## Encrypting a document

To encrypt a document, run the following steps: 

1. Copy the following code example into a text editor: 

```javascript
const { encryptString } = require("@govtechsg/oa-encryption");

const document = {
  version: "https://schema.openattestation.com/2.0/schema.json",
  data: {
    issuers: [
      {
        documentStore: "5924d910-8916-446a-b1c3-55e2f86dd8f3:string:0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd",
        name: "0f737b20-9e5e-4ec4-bffd-c63002616bfd:string:University of Blockchain",
        identityProof: {
          type: "5fc379dd-cd24-4c91-a4c7-cf76f9c96d8d:string:DNS-TXT",
          location: "62e1c6c3-09a9-4e52-aaf6-9daf24d43657:string:example.com",
        },
      },
    ],
  },
  privacy: { obfuscatedData: [] },
  signature: {
    type: "SHA3MerkleProof",
    targetHash: "956e27c86d4893a971600d328e235ede886f1c00b183257a822667b69886fced",
    proof: [],
    merkleRoot: "956e27c86d4893a971600d328e235ede886f1c00b183257a822667b69886fced",
  },
};

const encryptedDocument = encryptString(JSON.stringify(document));
console.log(encryptedDocument);
```

2. Provide these parameters with your own values:
    * `issuers.documentStore`
    * `issuers.name`
    * `issuers.identityProof.location`
    * `signature.targetHash`
    * `signature.merkleRoot`
3. Save the file and run the code.

4. Observe the response. It should look like the following: 

```javascript
{
  cipherText:
   'S7jca6lGDvN3ZDsPX4xc+6zLCkvRN1b1g6b0LL/IHiWn9c4JmIdmfg7fMd98fehkPMlkvScYn1/XI9ZoYA6NRjf61Kpam2A0Dx7kBR866TW+Stzbbb4AAqoXm0GX3BBvPgjhQCoGS9vJBkD0coK+DCO0Vrcdptuo2io3/zbBD6GbE5zLhnqizLrLO+RffnCeJ6LFYSUbAwBvSJv+OnNJjf+99ejaT3zKZNLB+NSu1WNG23nyzJoeYgEqg/E7i5jhD5+pZ8FvGsVQ2hM4zrnw5CvC8AfnRkR5KUEpJ4A0XJly3gQnCBN2HtIEHRmxBgPOnM2Mcm/mNVct2tqogrfyksXrLqS2YvYAEP9uGmSu3/iP2aTzS5xqiBg0UedFVQcc3cEjzaI4lXWa5t+cjzS08pssN2lT55WHsLo/XqVSTMx4/nekDl1SVm6wpfHl2htvhxvGiUF9F1tS7VpoE/+OMS7fCPkncmPKMpuUmWN79KhZS+/R0wM1sB7+HYTulYIZ3Z/vxX1YuNFSR0V6lCsVavl4tV9IhA9PvQPvmKDSyJyrD+v4AUrtEgnvyEPttfHW2MqJGGK6w9sUB3It2OvHQVXmAtVJgqpuP6cZwMlswQWfJfcjkfxWnQGCJtsCXhc7qePwxuL3C74QTFkKQcrGLGoMNcSTV5xhPxtg7zBocVs689RJkbjirhBOJajlY4NwplFga7qgyNA6yYI2BamX4fRaMq1XEuYRo8+d2kiJXSQSTEaUNQuIIsO3Nd+u8p/Dapw0xZBeyqj1Ys1N4aPFlx26OigiabXpwQNxH+ioaceU4LUsjCmF+MsPuxi3L0HLIsnvqy1LgffOswih+hqaqjHdpOMlpLcwQziD47HSOmW83jPezEEaWwiSH5eYYy4JwgsatCc+hCJEB8A8PXG1aSdRTRg+nqZQlJ4ONs+C55Svdj+6K+mdtK21qpQBIOOZjxMztubv/0/BETbPp8HDtaZdS80uLwXSNWAaf2dnbaNQkAW3idHYTgi8375FRr63/TUIeoo9Wh4YHTyjlEay/+CBokN0zREGQMaXKS/TEGxsdOIjsJjR8URyPBVFIhHNXcN1RQnxcD0WU+JvsheaoFLs/x1ITc7E',
  iv: 'TG47WMwppeS9oICk',
  tag: 'Iox0laR51y8czUw8Yx6mGQ==',
  key:
   '04d49fe8ac0a0afa5e9e2fa617551b5d7be532d0c8586a0809d7d223316d7cc5',
  type: 'OPEN-ATTESTATION-TYPE-1'
}
```

5. Extract the key from the encrypted document. Store the rest of the document anywhere.

## Decrypting a document

To decrypt a document, run the following steps:

1. Make sure you have the decryption key.

2. Copy the following code example into a text editor: 

```javascript
const { decryptString } = require("@govtechsg/oa-encryption");

const encryptedDocument = {
  cipherText:
    "H/smVRcwLrv7KzeMtHVYAxouaO+aaEm1jxXMw5fvHJSj3dszKK76ap17rPSa/JpiNEMXFn5pCBqnmfbveuRhjHcxKvKVSyMlbh6R+zFoge0VPwP6KDsKat/39FQddfXbbaoDz+B1vFoTc2hWFQw/IEd5DQIbj08hZiZ14A6xPfutbIiR0y5DnWQjRPWi/tPoE7aSuImWa6gr5MlJSUDcEoJ7HSqSxUS29UCn3F8WWLkaM98XYQrBDdqaKXGoG6yFyLpJkyOpdXq17qhhj5/2CNPqxZIBqIgLeVw1uUvS9XAm8QivMdtmNvTQEl1vmBALVif8FbQGuQGNnRycLo4rJpCu745qtyt9fkCblZ6aGPTt4Ghf/XtW4/dwXDJYqKotl45aY8O06/z6beWh0YOgq6qYKXdW2KscprMPtFMnoK7brKej631/NX9o7a0L83lQXQ1lL+k4JCbrQ/ZpWe3VwE8rIVd1OdVhAHDKOcAGR2n/GY1kfZ+yRjvkIuylti/bGTCl3DzBdwCi4F8ulh2uypsH1mplO+/Of1zpH/UOMLnmEOPg/ENrGZSWJSYpi/We3jVirE4rH+pXLqGLNxczS9hintWFvoV2mVFw8CqmRfakGcrEq2E5PzImBViUDZ/AUxawHtxJxKyCl9yEo/my8Mu9PFpuxQW3BryVmW1X7zCJL0DoqkoaH9hwlP2FS/cWjqiPwOSTjp+DkIuxjjnOYTcLskwEJNBpjXckvzUoz/wZ7W8gOc5cnxvY269+fEmUrsxWHcNbMu3EEFFm02EE66p9sFVQZcZqOP2Z0lINuvTh10r9fuDYDSp/u2YruZbeqJVOPHeC+5yoha8FqvmDtZ3iZcexu0X6d03Ay0xiVeIQ39+SwWs2eHspFC5FvygFJDnS4N84fuyg6E6rxpc9CUfW4YC5lyiqZfKdFHCUZ1+p8BdP0F0wMBdQmuMw1VS/CVmjW9c9P3gGAKtr5wN6XdXJY/uICdDW0RukV9JNfsdfOk0XLEqwBTbvaoRGYXoRy9Jk3KOz3xxRcWn2PwZbuf0CaZQIPJJTmU5KUBFhnFxyOZCCP6JPuHamv7ZTU5kO1b2/gZRTO9Y6RLpAFq64uFrKjzXrZWSZ",
  iv: "WK7OMSRG5ODxonBO",
  tag: "pXV7QvmTRA00OkL510pSvw==",
  key: "46b1f4f0b53e5a5b92dd8e7c9a53826a41a03d9333a501ebeb1710fcd2741420",
  type: "OPEN-ATTESTATION-TYPE-1",
};
const decryptedDocument = decryptString(encryptedDocument);
console.log(JSON.parse(decryptedDocument));
```

3. Provide these parameters with your own values:

    * `iv`
    * `tag`
    * `key`
    * `type`

4. Save the file and run the code.

5. Observe the response. It should retrieve the document content.

## Related resources

Learn more about encryption from [this article](/docs/distribute-section/oa-embed-qrcode/#optional-information-in-the-qr-code).
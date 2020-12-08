---
id: how-does-it-work
title: How does it work?
sidebar_label: How does it work?
---

In the tutorial, we have learnt how to [wrap a document](/docs/verifiable-document/wrapping-document) and [issue it](/docs/verifiable-document/issuing-document) into a document store. However, we didn't explain what these actions were doing and why they are necessary.

## Wrapping a document

As a reminder, wrapping a document works on JSON object. A single wrapped document will look like this:

```json
{
  "version": "https://schema.openattestation.com/2.0/schema.json",
  "data": {
    "name": "2f1a9924-bc38-455c-b39e-6420001ad67b:string:Maersk Bill of Lading",
    "issuers": [
      {
        "identityProof": {
          "type": "40caddff-5cd4-477d-adf4-48dcd0a2d761:string:DNS-TXT",
          "location": "c15358f4-f0dc-41c8-abfb-0d030aae3233:string:imaginative-amber-ferret.sandbox.openattestation.com"
        },
        "name": "0de92429-f8d3-47a0-868f-154227a66f40:string:DEMO STORE",
        "tokenRegistry": "89c1f33c-121d-4622-a561-12fb400f2f3f:string:0x8194648f40ED07F841fA357Bf52CBE8D6d7ce48D"
      }
    ]
  },
  "signature": {
    "type": "SHA3MerkleProof",
    "targetHash": "11d456db211d68cc8a6eac5e293422dec669b54812e4975497d7099467335987",
    "proof": [],
    "merkleRoot": "11d456db211d68cc8a6eac5e293422dec669b54812e4975497d7099467335987"
  }
}
```

A few interesting transformations happened that we will dive into below:

- A `data` key has been created and its value holds the contents of the file previously provided when wrapping, along with some weird-looking extra (hexadecimal) data.
- A `signature` object has been created.

### The `data` object

The first step of wrapping consists of transforming all the object properties provided as input using the following algorithm:

1. For each property
1. Generate a salt [using uuid v4](https://www.npmjs.com/package/uuid) in order to prevent [rainbow table attack](https://en.wikipedia.org/wiki/Rainbow_table).
1. Determine the type of original property.
1. Transform the original value to `<salt>:<original-type>:<original-value>`.

> The shape of the input object remains untouched.

### The `signature` object

#### targetHash

Once the `data` object has been computed we will be able to create an unique hash for the document that we will set into `targetHash`:

1. List each properties' path from the `data` object and associate its value. The path follows the [flatley](https://github.com/antony/flatley) path convention. For instance: `name`, `issuers.0.tokenRegistry`, etc.
1. For each properties' path, compute a hash using the properties' path and value. To compute the hash we use [keccak256](https://en.wikipedia.org/wiki/SHA-3).
1. Sort all the hashes from the previous step alphabetically and hash them all together: this will provide the `targetHash` of the document. To compute the `targetHash` we also use [keccak256](https://en.wikipedia.org/wiki/SHA-3).

> The `targetHash` of a document is an unique identifier.

![Compute target hash](/docs/advanced/how-does-it-work/target-hash.png)

Later on, during verification of the document, the same exact steps are performed again to assert that the contents of the document has not been tampered with. This works as the final targetHash will be completely different if any part of the wrapped document is different from the original.

The [document store](/docs/verifiable-document/document-store) is a smart contract on the Ethereum network that records the issuance and revocation status of OpenAttestation documents. It stores the hashes of wrapped documents, which are the records of the owner of the document store having issued the documents.

Imagine that you wrap thousands of files and had to issue the `targetHash` for each of them. It would be extremely inefficient. That's where the `merkleRoot` will come in handy.

#### merkleRoot

Once the `targetHash` of a document is computed, OpenAttestation will determine the `merkleRoot`. The `merkleRoot` value is the merkle root hash computed from the [merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) using the `targetHash` of all the document wrapped together. Each `targetHash` is a leaf in the tree. After computing the merkle tree, the `merkleRoot` associated to a document will be added to it as well as the proofs (intermediate hashes) needed to ensure that the `targetHash` has been used to compute the `merkleRoot`. The proofs are added into the `proof` property.

In the document above we can notice that the `targetHash` and the `merkelRoot` are identical and that the `proof` is empty. This is normal and happen when you wrap only one document at a time. Try to wrap at least 2 documents at the same time, and you will see a difference between `targetHash` and the `merkelRoot`, and you will see proofs appended.

> The `merkleRoot` will always be the same for all the documents wrapped together (in a batch). It will be different for documents wrapped separately.

Now that our batch of documents have a common identifier and that we can prove (thanks to the merkle tree algorithm) that the `targetHash` of a document was used to create a specific `merkleRoot`, we can use the `merkleRoot` in our document store and issue it.

#### Data Obfuscation

Due to the way we compute `targetHash`, OpenAttestation allows for one to obfuscate data they don't want to make public. For this we can simply compute the hash of a specific field and add it into the documents. Let's try it with the [CLI](/docs/component/open-attestation-cli) and the document above:

```bash
open-attestation filter ./path/to/file.json ./output.json name
```

The content of `output.json` will be:

```json
{
  "version": "https://schema.openattestation.com/2.0/schema.json",
  "data": {
    "issuers": [
      {
        "identityProof": {
          "type": "40caddff-5cd4-477d-adf4-48dcd0a2d761:string:DNS-TXT",
          "location": "c15358f4-f0dc-41c8-abfb-0d030aae3233:string:imaginative-amber-ferret.sandbox.openattestation.com"
        },
        "name": "0de92429-f8d3-47a0-868f-154227a66f40:string:DEMO STORE",
        "tokenRegistry": "89c1f33c-121d-4622-a561-12fb400f2f3f:string:0x8194648f40ED07F841fA357Bf52CBE8D6d7ce48D"
      }
    ]
  },
  "signature": {
    "type": "SHA3MerkleProof",
    "targetHash": "11d456db211d68cc8a6eac5e293422dec669b54812e4975497d7099467335987",
    "proof": [],
    "merkleRoot": "11d456db211d68cc8a6eac5e293422dec669b54812e4975497d7099467335987"
  },
  "privacy": {
    "obfuscatedData": [
      "9d22655fcee6bf3eb10ba280cfa40e662f004a819be0b64e2fe9d0cebba6788f"
    ]
  }
}
```

The `name` field is not available anymore in the `data` object, and the hash associated to it is added into `privacy.obfuscatedData`.

> More importantly, the document remains valid.

The hash added into `privacy.obfuscatedData` is the one used when computing the [`targetHash`](#targethash). To verify that a document remained untouched, OpenAttestation computes the `targetHash` of the provided document and compare it to `signature.targetHash`. There is one subtle difference during verification. All the hashes available in `privacy.obfuscatedData` are added to the list of computed hashes. So for verification the steps are as follows:

1. List each properties' path from the `data` object and associate its value.
1. For each properties' path, compute a hash using the properties' path and value.
1. Append the hashes from `privacy.obfuscatedData` to the list of computed hashes from the previous step.
1. Sort all the hashes from the previous step alphabetically and hash them all together: this will provide the `targetHash` of the document.

The only difference with the [`targetHash`](#targethash) computation is the step 3.

![Compute target hash with data obfuscation](/docs/advanced/how-does-it-work/target-hash-with-data-obfuscation.png)

With the help of data obfuscation a user can decide to selectively disclose a subset of data he wants to share.

### Document Store

As discussed above, issuance of documents can happen individually or by batch. Issuing a batch documents is by far the more efficient way.

When it comes to revocation both values can also be used:

- `targetHash` will allow for the revocation of a specific document.
- `merkleRoot` will allow for the revocation of the whole batch of documents.

## Additional information

### Data Obfuscation limitations

#### Empty objects

Considering the following object in `data`:

```json
{
  "data": {
    "foo": {
      "bar": 1,
      "xyz": 2
    }
  }
}
```

The following obfuscation would work:

- `foo.bar` only;
- `foo.xyz` only;
- `foo` (that would remove completely the object);

However, obfuscating both `foo.bar` AND `foo.xyz` would lead to an error. Indeed, obfuscation does not work when applied to all individual fields of an object, leaving the object empty:

```json
{
  "data": {
    "foo": {}
  }
}
```

While we could provide a way to make this work (and actually we [used to](https://github.com/Open-Attestation/open-attestation/commit/a0c783ff399f0d8a3390dcf6173c4287a051082d)), that would also introduce a new behavior: anyone could add empty objects into the document, and the document would remain valid. While we are not sure whether this could lead to potential vulnerabilities, we decided to not support it.

To avoid this problem, obfuscate the full object (`foo` in this case) when you need to obfuscate all the fields of an object.

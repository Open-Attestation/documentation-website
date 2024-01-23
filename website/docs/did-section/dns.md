---
id: dns
title: Configure DNS
sidebar_label: Configure DNS
---

The explanation about why you need to configure DNS is available [in the Ethereum tutorial](/docs/ethereum-section/dns-proof).

In the DID method, you will only use the wallet address as signing credentials and bind it to a domain.

## Creating temporary DNS proof

With your [wallet address](/docs/did-section/create), run the following command:

```bash
open-attestation dns txt-record create --public-key did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller
```

You need to prepend your wallet address with `did:ethr:` and append `#controller` to it. 

Change `YOUR_WALLET_ADDRESS` below and view your own DID via this link:

https://dev.uniresolver.io/1.0/identifiers/did:ethr:YOUR_WALLET_ADDRESS

Check the values in the output. The `public-key` parameter in the creation command above **MUST** match the `id` property value:

```json
[
  {
    "id": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller",
    "type": "Secp256k1VerificationKey2018",
    "controller": "did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D",
    "ethereumAddress": "0xacc51f664d647c9928196c4e33d46fd98fdaa91d"
  }
]
```


## Getting the response

Once the DNS TXT record has been successfully deployed, you will see the success message with the bound location.

```text
✔  success   Record created at intermediate-sapphire-catfish.sandbox.openattestation.com and will stay valid until Fri Nov 27 2020 14:12:03 GMT+0800 (Singapore Standard Time)
```

In the example above, the document store `did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller` has been bound to the `intermediate-sapphire-catfish.sandbox.openattestation.com` location. 

## Verification
Run the following command to make sure the entry has been propagated to the DNS:

```bash
open-attestation dns txt-record get --location intermediate-sapphire-catfish.sandbox.openattestation.com
```

It will display the list of the DNS TXT records associated to that location:

```text
┌─────────┬────────────┬───────────┬──────────────────────────────────────────────────────────────────┬─────────┬────────┐
│ (index) │    type    │ algorithm │                            publicKey                             │ version │ dnssec │
├─────────┼────────────┼───────────┼──────────────────────────────────────────────────────────────────┼─────────┼────────┤
│    0    │ 'openatts' │ 'dns-did' │ 'did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller' │  '1.0'  │ false  │
└─────────┴────────────┴───────────┴──────────────────────────────────────────────────────────────────┴─────────┴────────┘

```

>**Note:** It will take some time (usually 10s to 15s) for the record to be correctly propagated to DNS.

---
title: Configuring DNS
sidebar_label: Configuring DNS
---

The explanation about why we need to configure the DNS are available [in the Ethereum tutorial](/docs/verifiable-document/dns-proof).

The principles are similar, but we will only use the wallet address as signing credentials and bind it to a domain.

## Creating Temporary DNS Proof with CLI

With your [wallet address](/docs/verifiable-document/did/create), run the following command:

```bash
open-attestation dns txt-record create --public-key did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller
```

Take note that you need to prepend your wallet address by `did:ethr:` and append `#controller` to it. Indeed, open again your own DID on uniresolver (see previous step). Check the value of `didDocument.publicKey`. It should look like:

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

The `public-key` parameter in the creation command above **MUST** match the `id` property.

Once the DNS TXT record has been successfully deployed, you will see the success message with the bound location.

```text
✔  success   Record created at intermediate-sapphire-catfish.sandbox.openattestation.com and will stay valid until Fri Nov 27 2020 14:12:03 GMT+0800 (Singapore Standard Time)
```

In the example above, the document store `did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller`, has been bound to the `intermediate-sapphire-catfish.sandbox.openattestation.com` location. Let's make sure the entry has been propagated to the DNS:

```bash
open-attestation dns txt-record get --location intermediate-sapphire-catfish.sandbox.openattestation.com
```

which will display to you the list of the DNS TXT records associated to that location.

```text
┌─────────┬────────────┬───────────┬──────────────────────────────────────────────────────────────────┬─────────┬────────┐
│ (index) │    type    │ algorithm │                            publicKey                             │ version │ dnssec │
├─────────┼────────────┼───────────┼──────────────────────────────────────────────────────────────────┼─────────┼────────┤
│    0    │ 'openatts' │ 'dns-did' │ 'did:ethr:0xaCc51f664D647C9928196c4e33D46fd98FDaA91D#controller' │  '1.0'  │ false  │
└─────────┴────────────┴───────────┴──────────────────────────────────────────────────────────────────┴─────────┴────────┘

```

> Note that it can take some time for the record to be correctly propagated to the DNS, even though it usually takes 10 to 15s.

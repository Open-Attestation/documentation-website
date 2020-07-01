---
id: open-attestation-cli
title: Command Line Interface
sidebar_label: Command Line Interface (CLI)
---

The OpenAttestation CLI is a binary that allows you to interact with an OpenAttestation document directly. It can also be used to interact with different types of smart contracts on the Ethereum network.

## Installation (binary)

To install the binary, simply download the binary from the [CLI release page](https://github.com/Open-Attestation/open-attestation-cli/releases) for your OS.

> We are aware that the size of the binaries must be reduced and we have tracked the issue in [Github](https://github.com/Open-Attestation/open-attestation-cli/issues/68). We hope to find a solution in a near future and any help is welcomed.

## Installation (npm)

Alternatively for Linux or MacOS users, if you have `npm` installed on your machine, you may install the cli using the following command:

```sh
npm install -g @govtechsg/open-attestation-cli
```

Installation using this method will install the CLI globally on your machine and you may run the binary by running:

```sh
open-attestation
```

## Usage Instructions

For usage instructions, refer to the [CLI README](https://github.com/Open-Attestation/open-attestation-cli) or run the CLI with the help flag:

```sh
open-attestation --help
```

> In all the guides, we will refer to the CLI as `open-attestation` when running a command. That means we will assume the CLI is available in your execution path. If it's not the case, you will to change `open-attestation` by the full path to the executable.

## Writing operations

When writing data to the Blockchain you will **need** to provide your private key. All functions - when the private key is required - will provide 3 ways for you to pass it in:

1. Using `OA_PRIVATE_KEY` environment variable holding the private key(recommended).
1. Using `--key-file` option where you provide a path to a file containing the private key.
1. Using `--key` option where you provide the private key directly to the command (**Note that for this method, the private key may be stored in the machine's bash history**).

### Using `OA_PRIVATE_KEY` environment variable

```bash
export OA_PRIVATE_KEY=0000000000000000000000000000000000000000000000000000000000000001
open-attestation deploy document-store "My Name" --network ropsten
unset OA_PRIVATE_KEY
```

### Using `--key-file` option

```bash
echo -n 0000000000000000000000000000000000000000000000000000000000000002 >> ./examples/sample-key
open-attestation deploy document-store "My Name" --network ropsten --key-file ./examples/sample-key
rm ./examples/sample-key
```

### Using `--key` option

```bash
open-attestation deploy document-store "My Name" --network ropsten --key 0000000000000000000000000000000000000000000000000000000000000003
```

> In the different guides we will indicate when the private key will be needed, but we won't display how to provide it. It's up to you to pick up your preferred way.

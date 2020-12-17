---
id: gas-station-network
title: What is GSN?
sidebar_label: What is GSN?
---

Anyone who sends an Ethereum transaction needs to have ETH to pay for gas fees. This forces new users to pass [KYC (Know Your Customer)](../../appendix/glossary#know-your-customer-kyc) and purchase ETH before they can start using any dapp. This can be a major hurdle for users without prior crypto experience that are unfamiliar with the concept of needing to keep ETH in their wallet for gas.

Ethereum Gas Station Network (GSN) abstracts away gas to minimize onboarding & UX friction for dapps. With GSN, clients with no Ethereum can interact with Ethereum contracts without them having to pay for gas fees.

## How it works

![Google DNS to Test](/docs/advanced/gas-station-network/gsn_flow_full_layered.jpg)

_Source: [Open GSN](https://docs.opengsn.org/learn/index.html)_

Instead of signing an Ethereum transaction, which would require ETH for gas, a user signs a message containing information about a transaction they would like to execute and sends it to a relay server. Before the relay server pays, it verifies that it will get refunded by a Paymaster contract.

A [Paymaster](https://docs.opengsn.org/learn/index.html#paymaster) holds ETH and can implement any business logic to decide whether to accept or reject a meta transaction. For example, accepting only transactions by whitelisted users, or to the contracts methods required for onboarding users, or only transactions that include a repayment in tokens to the Paymaster, etc.

Assuming that the Paymaster is willing to pay for transaction, the transaction gets forwarded to our contract, executing the function logic of issue, revocation, minting etc.

## Next steps

Now that we understand how GSN can be helpful as developers and how they work, we can move on to deploying the [Paymaster](/docs/advanced/gsn/setup-paymaster) and creating a [GsnCapableDocumentStore](/docs/advanced/gsn/gsn-capable-document-store).

## Additional Resource

Below is a list of additional resources for more information:

- [OpenGSN](https://docs.opengsn.org/learn/index.html)

---
id: verification-flow
title: Verification Flow
sidebar_label: Verification Flow
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- import TokenRegistryDark from './diagram/token-registry.dark.svg';
import VerifiableDocsETHDark from './diagram/verifiable-docs-eth.dark.svg';
import VerifiableDocsDIDDark from './diagram/verifiable-docs-did.dark.svg'; -->

import TokenRegistryLight from './diagram/token-registry.light.svg';
import VerifiableDocsETHLight from './diagram/verifiable-docs-eth.light.svg';
import VerifiableDocsDIDLight from './diagram/verifiable-docs-did.light.svg';

<Tabs>
  <TabItem value="docStore" label="Verifiable Document" default>
    <Tabs>
    <TabItem value="docStore-eth" label="Verifiable Document ETH" default>
        <VerifiableDocsETHLight />
      </TabItem>
      <TabItem value="docStore-did" label="Verifiable Document DID">
        <VerifiableDocsDIDLight />
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="tokenRegistry" label="Transferable Record">
    <TokenRegistryLight/>
  </TabItem>

</Tabs>



## Verification method
See the list of verification methods [here](../remote-files/open-attestation-verify#verification-method).

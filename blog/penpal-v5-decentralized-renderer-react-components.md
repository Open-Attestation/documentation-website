---
title: Support for penpal v5
description: Support for penpal v5 in decentralized-renderer-react-components
slug: penpal-v5-decentralized-renderer-react-components
authors:
  - name: Laurent Maillet
    title: Co-creator of OpenAttestation
    url: https://github.com/Nebulis
    image_url: https://avatars.githubusercontent.com/u/503185?s=400&u=f636c79081c55c3dfa431dc249314a02e28d8587
tags: [penpal, decentralized-renderer-react-components]
hide_table_of_contents: false
date: 2021-11-17T10:00
---

We added support for penpal v5 in [decentralized-renderer-react-components](https://github.com/Open-Attestation/decentralized-renderer-react-components) v3.5.0. You can check the changes in the [pull request](https://github.com/Open-Attestation/decentralized-renderer-react-components/pull/39).

For many months, our library was stuck using Penpal v4 due to a [lack of compatibility between Penapl v4 and Penpal v5](https://github.com/Aaronius/penpal/issues/52). To make it short, it's not possible to have a verifier using Penpal v4 with a renderer using Penpal v5, and vice-versa.

This version doesn't bring new interfaces or new options. As an integrator, the new version is unnoticeable, but it's important to note what's going on under the hood.

- `FrameConnector` (the main component used by verifiers to connect to a renderer) tries to establish a connection using both Penpal v4 and Penpal v5 in parallel. It means the verifiers will support both Penpal v4 and v5. Unless you know exactly which renderer your verifier will call, verifiers must keep backward compatibility with renderer using Penpal v4.
- `FramedDocumentRenderer` (the main component to establish a connection with a verifier) will always use Penpal v5. It's safer this way to directly decide to move on with a specific version of Penpal because it's easier to know which version you will need to establish the connection (as a user, you have more control). In any case, if you need your renderer to keep using Penpal v4, feel free to downgrade or to fork our library.

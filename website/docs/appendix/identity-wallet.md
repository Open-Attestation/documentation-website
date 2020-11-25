---
id: identity-wallet
title: Identity Mobile App
sidebar_label: Identity Mobile App
---

OA provides its own mobile application to view, store and share Verifiable Documents and Transferable Records.

## Installation

For the moment, the application is not available on Apple store or Android store. You will need to run it through [Expo](https://expo.io/).

1. Download Expo Client app [![Expo Client on apple store](/docs/appendix/identity-wallet/apple-store.svg)](https://apps.apple.com/app/expo-client/id982107779 "Open expo on apple store") [![Expo Client on apple store](/docs/appendix/identity-wallet/android-store.svg "Open expo on android store")](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en)
1. Open Expo and download Identity Wallet app by scanning the following QR Code

<img src="/docs/appendix/identity-wallet/identity-wallet-qr-code.png" alt="identity wallet qr code" title="scan the qr code with expo" width="200"/>

🎉 Congratulations, you are now able to use Identity Wallet application.

## Documents

In order to view a document, open Identity Wallet, proceed to the QR Code tab and scan. Some examples are available on [Open Attestation Gallery](http://gallery.openattestation.com/).

In the gallery you will find 2 different kinds of documents, viewable and storable:
- Viewable documents can only be viewed (and not stored) in the application. No other actions are permitted.
- Storable documents can be viewed and stored in the application. Once a document is stored into your wallet you can also share it with others. When you view the document, a QR Code icon will be displayed. Click on it to share your document.

## Additional information
- Identity Wallet implementation follow our [Universal Actions ADR](https://github.com/Open-Attestation/adr/blob/master/universal_actions.md).
- Found a bug? Have a question? Want to share an idea? Reach us on the [Github repository](https://github.com/Open-Attestation/identity-wallet).

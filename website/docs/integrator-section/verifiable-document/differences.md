---
title: Differences between the Ethereum and DID methods
sidebar_label: Differences
---

# Differences between the Ethereum and DID methods


## Overview

The flowchart provides an overview of the differences between the Ethereum and DID methods:

![alt_text](/website/static/img/ETH-DID-diff-compare-flowchart.png "Differences between the two methods")


**Note:** The arrow (“⏶” or “⏷”) means there are differences between the similar steps. See the table to learn more.


## Side-by-side comparison

The table shows the differences between the two methods in **bold**:


<table>
  <tr>
   <td>Ethereum method
   </td>
   <td>DID method
   </td>
  </tr>
  <tr>
   <td><strong>Create a wallet</strong>
   </td>
   <td><strong>Create a DID</strong>
   </td>
  </tr>
  <tr>
   <td><strong>Deploy Document Store</strong>
   </td>
   <td><strong>-</strong>
   </td>
  </tr>
  <tr>
   <td>Configure DNS
<p>
(<strong>bind document issuer's identity</strong>)
   </td>
   <td>Configure DNS
<p>
(<strong>bind wallet address</strong>)
   </td>
  </tr>
  <tr>
   <td>Create raw documents
<p>
(<strong>bind document store's identity</strong>)
   </td>
   <td>Create raw documents
<p>
(<strong>bind wallet address</strong>)
   </td>
  </tr>
  <tr>
   <td>Wrap documents
   </td>
   <td>Wrap documents
   </td>
  </tr>
  <tr>
   <td><strong>Issue documents</strong>
   </td>
   <td><strong>Sign documents</strong>
   </td>
  </tr>
  <tr>
   <td>Revoke documents using: 
<ul>

<li><strong>Document Store</strong>
</li>
</ul>
   </td>
   <td>Revoke documents using:
<ul>

<li><strong>Document Store </strong>

<li>Or <strong>OCSP responder </strong>
</li>
</ul>
   </td>
  </tr>
</table>



## Details explained


### Create a wallet or DID



* In the Ethereum method, the user needs to [create a wallet](https://www.openattestation.com/docs/integrator-section/verifiable-document/ethereum/wallet).
* In the DID method, the user needs to [create a DID](https://www.openattestation.com/docs/integrator-section/verifiable-document/did/create), which means creating a wallet and retrieving the private key.


### Deploy Document Store



* The Ethereum method requires the deployment of Document Store at the beginning of the procedure, immediately after creating a wallet. 
* The DID method requires the deployment of Document Store as a [prerequisite before the user revokes a document](https://www.openattestation.com/docs/integrator-section/verifiable-document/did/revoking-document#prerequisites).


### Configure DNS



* The Ethereum method [binds the document issuer's identity](https://www.openattestation.com/docs/integrator-section/verifiable-document/ethereum/dns-proof) to a domain.
* The DID method [only uses the wallet address](https://www.openattestation.com/docs/integrator-section/verifiable-document/did/dns) as signing credentials and binds it to a domain.


### Create raw documents



* The Ethereum method [binds the document store's identity](https://www.openattestation.com/docs/integrator-section/verifiable-document/ethereum/raw-document#1-issuers0identityprooflocation) to DNS name. 
* The DID method [binds the wallet address](https://www.openattestation.com/docs/integrator-section/verifiable-document/did/raw-document#1-issuers0identityprooflocation) to DNS name.


### Issue or sign documents



* The two methods use different commands to [issue](https://www.openattestation.com/docs/integrator-section/verifiable-document/ethereum/issuing-document#issuing-the-documents) or [sign](https://www.openattestation.com/docs/integrator-section/verifiable-document/did/signing-document#signing-the-documents) document.


### Revoke documents



* The Ethereum method lets the user revoke document using [Document Store](https://www.openattestation.com/docs/integrator-section/verifiable-document/ethereum/revoking-document#revoking-a-document).
* The DID method lets the user revoke document using either [Online Certificate Status Protocol (OCSP) responder](https://www.openattestation.com/docs/integrator-section/verifiable-document/did/revoking-document-ocsp) or [Document Store](https://www.openattestation.com/docs/integrator-section/verifiable-document/did/revoking-document).
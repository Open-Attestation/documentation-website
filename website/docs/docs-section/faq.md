---
id: faq
title: FAQ
sidebar_label: FAQ
---

### What are OpenAttestation documents?

OpenAttestation documents (OA documents) are a type of verifiable documents or verifiable credentials.

As our transactions become increasingly digital, there is a need to ensure that the legitimacy of credentials such as certificates, licenses or permits is verifiable. 

OpenAttestation documents are cryptographically secure and hence tamper-resistant. OpenAttestation also helps any user check who issued the document, and whether the document has been revoked so that it is no longer valid. These verifications are always performed at the point of viewing (before the document displays).

### What can I do using the OpenAttestation framework?

You can perform the following actions using the OA framework:

>**Note:** In the diagrams below, "source" means the user's local machine where the request comes from.

* Create a wallet or DID

![Create a wallet](/docs/docs-section/faq/create-wallet.png)

* Deploy document store

![Deploy document store](/docs/docs-section/faq/deploy-document-store.png)

* Create raw documents

![Create raw documents](/docs/docs-section/faq/create-raw-or-wrap.png)

* Wrap documents (see the diagram above)

* Issue documents using Ethereum or sign documents using DID

![Issue or revoke documents](/docs/docs-section/faq/issue-or-revoke.png)

* Revoke documents (see the diagram above)

* Verify the OA documents with a compatible verifier

![Verify documents](/docs/docs-section/faq/verify.png)

* Distribute the OA documents using any of the [Universal Actions](https://github.com/Open-Attestation/adr/blob/master/universal_actions.md#universal-actions-for-open-attestation-documents)

* Developers can use the libraries and code samples to develop software applications.


### Can I use a Graphical User Interface (GUI) for OpenAttestation documents?

You can use the [Toolkit](https://toolkit.openattestation.com/) to perform the following tasks with ease:

* Wrap or unwrap an OA document
* Verify documents
* Get OpenAttestation DNS TXT records
* Diagnose an OA document
* Encrypt or decrypt an OA document
* Create a [Universal Action](https://github.com/Open-Attestation/adr/blob/master/universal_actions.md#universal-actions-for-open-attestation-documents) to share an OA document

### How are OpenAttestation documents distributed?

The distribution of OpenAttestation documents falls into two broad categories: 

1. By link 
    - Sharing a URL/scanning a QR code

2. By document transmission 
    - Sending the original OpenAttestation document (OA document)
    - Sending an HTML page (with an OA document embedded)
    - Sending the document as a PDF with a QR code for verification

Below are the pros and cons of each approach. 

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Pros</th>
            <th>Cons</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Sharing a URL/scanning a QR code</td>
            <td>
                <ul>
                    <li>The URL is lightweight and it does not require any local file storage.</li>
                    <li>Easy to share e.g. via email, messages, or social media</li>
                    <li>The user can click and view it in one step.</li>
                    <li>The URL can be converted into QR code if required.</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>It needs an additional step to save the document after viewing.</li>
                    <li>It requires hosting of the certificate.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Sending the original OA document</td>
            <td>
                <ul>
                    <li>The OA document follows a structured schema, which makes it machine-readable.</li>
                    <li>The OA document is more lightweight than an HTML or a PDF file, thus requires less storage.</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>The user can’t open OA documents directly.</li>
                    <li>It requires the user to upload the OA document to a verifier for viewing.</li>
                    <li>The user needs instructions on what to do with an OA document, which makes it difficult for adoption.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><a href="/docs/developer-section/quickstart/oa-embedded-html/">Sending an HTML page (with an OA document embedded)</a></td>
            <td>
                <ul>
                    <li>The user can open HTML on most devices without installing any application.</li>
                    <li>The HTML page takes up more storage than the OA document, but less than the PDF file.</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>The HTML page requires an extra step from the user to visit a URL.</li>
                    <li>The user can be confused by having to load an HTML page and then opening it in a viewer.</li>
                    <li>There is a limit to the size of the embedded OA document in the HTML page.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Sending the document as a PDF with a QR code for verification</td>
            <td>
                <ul>
                    <li>The user can open the PDF file on most devices without installing any application.</li>
                    <li>The PDF file is a common document format to users.</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>The user is likely to take the document in PDF at it appears, without any proper verification.</li>
                    <li>It requires hosting of the certificate.</li>
                    <li>The PDF file requires the most storage among all listed methods.</li>
                    <li>The PDF file is not machine-readable.</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

### How can I have an estimation of the costs involved in using the smart contracts?

See the page [Contract Costs](/docs/docs-section/appendix/contract-costs) for a breakdown of the cost estimation.

### What is gas?

For more information on gas and gas prices, check out [this article](https://ethereum.stackexchange.com/questions/3/what-is-meant-by-the-term-gas).

### What is the theoretical storage limit of a smart contract?

It is `2^261` bytes. Check out [this Stack Exchange post](https://ethereum.stackexchange.com/questions/1038/is-there-a-theoretical-limit-for-amount-of-data-that-a-contract-can-store/1040#1040) for more information.

### Can I create multiple TXT records under the same domain/subdomain?

Yes. You can make use of multiple TXT records to point to multiple Ethereum addresses (e.g. document stores or DIDs). Keep in mind each TXT record should only contain one Ethereum address record.

### Why do I have to pay for at least one transaction while choosing the DID method?

[This article](/docs/docs-section/how-does-it-work/comparison#price) mentioned that if you use DID documents, you don't need to pay for transactions. This happens when you use DID for issuance and OCSP for revocation. 

However, if you use DID for issuance and a `documentStore` for revocation, you still need to have at least one transaction with the Ethereum blockchain to deploy a `documentStore`.

### Although I did not issue any documents from the deployed document store, why can I revoke this document?

That's because the revocation mapping in the `documentStore` is separate from the issued mapping.
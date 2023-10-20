---
id: faq
title: FAQ
sidebar_label: FAQ
---

#### What are OpenAttestation documents?

OpenAttestation documents are verifiable documents, or Verifiable Credentials, as commonly referred to by the tech community. 

As our transactions become increasingly digital, there is a need to ensure that the legitimacy of credentials such as certificates, licenses or permits can be verified. 

OpenAttestation documents are cryptographically secure and hence tamper-resistant. OpenAttestation also allows anyone to check who issued the document, or whether the document has been revoked so that it is no longer valid. These verifications are always performed at the point of viewing, or in other words, before the document is being displayed. 

#### How are OpenAttestation documents distributed?

Today, the distribution of OpenAttestation documents falls into 2 broad categories: 

1. By link 
    - Sharing a URL/scanning a QR code

2. By document transmission 
    - Sending the original OpenAttestation document (OA document) 
    - Sending a HTML page (embedded with OA document)
    - Sending document as PDF with QR code for verification

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
                    <li>URL is lightweight and local file storage is not required</li>
                    <li>Easy to share e.g. via email, messages, social media applications</li>
                    <li>User is able to click and view in one step</li>
                    <li>URL can be converted into QR code if need be</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>An additional step is needed to save the document after viewing</li>
                    <li>Requires hosting of the certificate</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Sending OpenAttestation document (OA document)</td>
            <td>
                <ul>
                    <li>OA documents follow a structured schema, which makes them machine-readable</li>
                    <li>OA documents are more lightweight than HTML or PDF, thus requires less storage</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>User can’t natively open OA documents</li>
                    <li>Requires user to upload the OA document to a verifier to view</li>
                    <li>Education is needed for user to know what to do with an OA document, making it difficult for adoption</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><a href="https://www.openattestation.com/docs/developer-section/quickstart/oa-embedded-html/">Sending HTML (embedded with OA document)</a></td>
            <td>
                <ul>
                    <li>User can natively open HTML on most devices</li>
                    <li>HTML takes up more storage than OA document, but less than PDF</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>The HTML requires user to take an extra step over navigating to a URL</li>
                    <li>The user can get confused by having to load an HTML page and then having to navigate to a viewer</li>
                    <li>There is a limit to the size of the embedded OA document in the HTML</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Sending document as PDF with QR code for verification</td>
            <td>
                <ul>
                    <li>User can natively open PDF on most devices</li>
                    <li>PDF is a well known document format to users</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>User is likely to take document in PDF at face value without proper verification</li>
                    <li>Requires hosting of the certificate</li>
                    <li>PDF requires the most storage among all listed methods</li>
                    <li>PDF is not machine-readable</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

#### How can I have an estimation of the costs involved in using the smart contracts?

You can refer to the page [Contract Costs](/docs/docs-section/appendix/contract-costs) for a breakdown of the estimations.

#### What is gas?

For more information on Gas and Gas Prices, check out [this article](https://ethereum.stackexchange.com/questions/3/what-is-meant-by-the-term-gas)

#### What is the theoretical storage limit of a smart contract?

It is `2^261` bytes. Check out this stackoverflow [post](https://ethereum.stackexchange.com/questions/1038/is-there-a-theoretical-limit-for-amount-of-data-that-a-contract-can-store/1040#1040) for more information.

#### Can I create multiple TXT records under the same domain/subdomain?

Yes. You can make use of multiple TXT records to point to multiple Ethereum addresses (e.g. document stores or DIDs). Keep in mind each TXT record should only contain one Ethereum address record.


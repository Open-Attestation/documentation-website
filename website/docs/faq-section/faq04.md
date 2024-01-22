---
id: faq04
title: How are OpenAttestation documents distributed?
sidebar_label: How are OpenAttestation documents distributed?
---

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
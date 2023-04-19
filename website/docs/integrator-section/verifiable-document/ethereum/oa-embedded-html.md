---
id: oa-embedded-html
title: Embed OA Document in a HTML File
sidebar_label: Embed OA Document in a HTML File
---

> **Note**: This guide is currently for OA documents that are verifiable on [verify.gov.sg](https://www.verify.gov.sg). Do ensure your OA document can be verified on [verify.gov.sg](https://www.verify.gov.sg) before continuing with this guide.

This step is optional for both Ethereum and DID documents, you may proceed to the next step if you do not need to embed the OA document in a HTML file.

Since an OpenAttestation document (`.OA`) is not a native file extension automatically recognised by devices, the OA-embedded HTML solution was introduced. This approach helps to encapsulate an OA document so that end-users can be directed directly to the verifier (with their document) just by clicking on a button presented by a locally-rendered HTML page.

This is an optional procedure after creating an issued/signed OA document that is dependent on your use case (e.g. you want to make it more convenient for end-users who may not understand what to do with an OA document).
## How it works

In this guide, we will create a HTML file with a "Proceed" button to redirect the user to [verify.gov.sg](https://www.verify.gov.sg/). The OA document will be embedded in the Verify URL for verification and rendering.

The steps are as follows:

1. Create the Verify URL by encoding and embedding the OA document data at the back of the Verify URL
2. Create the HTML file to be issued (we will be using a [sample template](https://github.com/Open-Attestation/oa-embedded-html/blob/master/samples/healthcert-pdt-oa-embedded-uri-fragment-sample.html))
3. Modify the button in the HTML file to contain the Verify URL. This button will redirect the user to the [Verify page](https://www.verify.gov.sg/) where the OA document will be verified and rendered accordingly.

   ![Resultant HTML](/docs/integrator-section/verifiable-document/ethereum/oa-embedded-html/html-proceed-verify.png)

## Prerequisites:

Ensure that you have followed the documentation on how to issue an [Ethereum OA document](/docs/integrator-section/verifiable-document/ethereum/document-store-overview) or [DID OA document](/docs/integrator-section/verifiable-document/did/create), and have a valid OA document which you want to use. If you do not have an OA document, you may want to use our [sample HealthCert document](https://github.com/Notarise-gov-sg/api-notarise-healthcerts/blob/master/test/fixtures/v2/pdt_pcr_notarized_with_nric_wrapped.json) to follow through the guide.

## Create your Verify URL

To get started, we will need to have an issued/signed OA document.

- In this guide, we will be using our [sample HealthCert document](https://github.com/Notarise-gov-sg/api-notarise-healthcerts/blob/master/test/fixtures/v2/pdt_pcr_notarized_with_nric_wrapped.json).

If you have your own OA document, you can use it as well.

### Encoding the payload

1. Copy the [sample document contents](https://github.com/Notarise-gov-sg/api-notarise-healthcerts/blob/master/test/fixtures/v2/pdt_pcr_notarized_with_nric_wrapped.json). If you are using your own OA document, open the file in a text editor and copy the file data.

   ![Copy document content](/docs/integrator-section/verifiable-document/ethereum/oa-embedded-html/copy-healthcert-data.png)

2. Minify/Compress the OA document

   - We will be minifying/compressing the JSON data in the OA document to prevent additional characters from being encoded later in step (3)
   - You can use online tools like [Code Beautify](https://codebeautify.org/jsonminifier) to help you

     ![Paste document for encoding](/docs/integrator-section/verifiable-document/ethereum/oa-embedded-html/minify-document-data.png)

   - Copy and paste the data, into a text editor (we will need it later)

3. Encode your data using a URL Encoder

   - We will be encoding the data from step (2) so that it can be appended to the back of the Verify URL later on
   - You can use online tools like [urlencoder.org](https://www.urlencoder.org/) to help you
     ![Paste document for encoding](/docs/integrator-section/verifiable-document/ethereum/oa-embedded-html/encode-document-data.png)
   - Copy and paste the encoded data into a text editor (we will need it later)

### Create the Verify URL with OA Document Data

- Open a text editor of your choice
- Add the encoded data, which you have copied from earlier, after the hash `#` symbol in `https://www.verify.gov.sg/verify?m=uri-fragment#`.

```url
https://www.verify.gov.sg/verify?m=uri-fragment#<paste_your_encoded_data_here>
```

## Creating the HTML file

### Sample HTML file

To standardise the HTML files being issued, HealthCerts Providers are encouraged to use the [sample HTML file](https://github.com/Open-Attestation/oa-embedded-html/blob/master/samples/healthcert-pdt-oa-embedded-uri-fragment-sample.html).

For simplicity, we will be using the contents from the [sample HTML file](https://github.com/Open-Attestation/oa-embedded-html/blob/master/samples/healthcert-pdt-oa-embedded-uri-fragment-sample.html). Then we will embed the Verify URL into the "Proceed" button so that users will be redirected to the Verify page upon clicking.

### Replace the button link with your Verify URL

1. Copy the [sample HTML file template](https://github.com/Open-Attestation/oa-embedded-html/blob/master/samples/healthcert-pdt-oa-embedded-uri-fragment-sample.html) and paste it into a text editor of your choice
2. Replace the [the URL on this line](https://github.com/Open-Attestation/oa-embedded-html/blob/master/samples/healthcert-pdt-oa-embedded-uri-fragment-sample.html#L105) with your Verify URL from earlier

   ```html
   <p>
    <!-- Replace the URL in the "href" value with your Verify URL -->
     <a
       id="oa-doc-link"
       class="btn-proceed"
       alt="Proceed to view and verify document"
       title="Proceed to view and verify document"
       href="https://www.verify.gov.sg/verify?m=uri-fragment#<paste_your_encoded_data_here>"
     >
       Proceed
     </a>
   </p>
   ```

3. Open the HTML file in your browser
4. Click on the "Proceed" button
5. You should be redirected to the Verify page where your OA document is being verified and rendered on the screen.

🎉 Congratulations, you have successfully created a HTML file with an OA document embedded Verify URL that redirects to the Verify page for verification!

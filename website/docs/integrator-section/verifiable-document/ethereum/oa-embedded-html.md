---
id: oa-embedded-html
title: Embed OA Doc in HTML File
sidebar_label: Embed OA Doc in HTML File
---

Depending on your use case, after creating an issued/signed OA document, you may want to embed it into a HTML file for issuance.

## How It Works

In this guide, we will create a HTML file with a "Proceed" button to redirect the user to [verify.gov.sg](https://www.verify.gov.sg/). The OA document will be embedded in the Verify URL for verification and rendering.

The steps are as follows:

1. Create our Verify URL by encoding and embedding the OA document data at the back of the Verify URL
2. Create our HTML file to be issued (we will be using a [sample template](https://github.com/Open-Attestation/oa-embedded-html/blob/master/samples/healthcert-pdt-oa-embedded-uri-fragment-sample.html))
3. Modify the button in the HTML file to contain our Verify URL. This button will redirect the user to the [Verify page](https://www.verify.gov.sg/) where the OA document will be verified and rendered accordingly.

   ![Resultant HTML](/docs/integrator-section/verifiable-document/ethereum/oa-embedded-html/html-proceed-verify.png)

## Prerequisites:

Ensure that you have followed the documentation on how to issue an [Ethereum OA document](/docs/integrator-section/verifiable-document/ethereum/document-store-overview) or [DID OA document](/docs/integrator-section/verifiable-document/did/create) and have a valid OA document which you want to use. If you do not have an OA document, you may want to use our [sample HealthCert document](https://github.com/Notarise-gov-sg/api-notarise-healthcerts/blob/master/test/fixtures/v2/pdt_pcr_notarized_with_nric_wrapped.json) to follow through the guide.

## Create your Verify URL

To get started, we will need to have an issued/signed OA document.

- In this guide, we will be using our [sample HealthCert document](https://github.com/Notarise-gov-sg/api-notarise-healthcerts/blob/master/test/fixtures/v2/pdt_pcr_notarized_with_nric_wrapped.json).

If you have your own OA document, you can use it as well.

### Encoding URL

1. Copy the [sample document contents](https://github.com/Notarise-gov-sg/api-notarise-healthcerts/blob/master/test/fixtures/v2/pdt_pcr_notarized_with_nric_wrapped.json) or if you are using your own OA document, open the file in a text editor and copy the file data.

   ![Copy document content](/docs/integrator-section/verifiable-document/ethereum/oa-embedded-html/copy-healthcert-content.png)

2. Remove whitespaces from the data

   - We will be removing whitespaces from our data to prevent additional characters from being encoded in step (3)
   - You can use online tools like https://codebeautify.org/remove-whitespace to help you
   - Copy and paste the data, without whitespaces, into a text editor (we will need it later)

3. Encode your data using a URL Encoder

   - We will be encoding the data from step (2) so that it can be appended to the back of the Verify URL later on
   - You can use online tools like https://www.urlencoder.org/ to help you
     ![Paste document for encoding](/docs/integrator-section/verifiable-document/ethereum/oa-embedded-html/encode-document-content.png)
   - Copy and paste the encoded data into a text editor (we will need it later)

### Create the Verify URL With OA Document Data

- Open a text editor of your choice
- Add the encoded data, which you have copied from earlier, after the hash `#` symbol in `https://www.verify.gov.sg/verify?m=uri-fragment#`.

```bash
https://www.verify.gov.sg/verify?m=uri-fragment#<paste_your_encoded_data_here>
```

## Creating The HTML File

### Sample HTML File

To standardize the HTML files being issued, HealthCerts Providers are encouraged to use the [sample HTML file](https://github.com/Open-Attestation/oa-embedded-html/blob/master/samples/healthcert-pdt-oa-embedded-uri-fragment-sample.html).

For simplicity, we will be using the contents from the [sample HTML file](https://github.com/Open-Attestation/oa-embedded-html/blob/master/samples/healthcert-pdt-oa-embedded-uri-fragment-sample.html). Then we will embed our Verify URL into the "Proceed" button so that users will be redirected to the Verify page upon clicking.

### Embed URL into Action Button

1. Copy the [sample HTML file template](https://github.com/Open-Attestation/oa-embedded-html/blob/master/samples/healthcert-pdt-oa-embedded-uri-fragment-sample.html) and paste it into a text editor of your choice
2. Replace the [the URL on this line](https://github.com/Open-Attestation/oa-embedded-html/blob/master/samples/healthcert-pdt-oa-embedded-uri-fragment-sample.html#L105) with your Verify URL from earlier

   ```javascript
   <p>
     <a
       id="oa-doc-link"
       class="btn-proceed"
       alt="Proceed to view and verify document"
       title="Proceed to view and verify document"
       // Replace the URL below with your Verify URL
       href="https://www.verify.gov.sg/verify?m=uri-fragment#<paste_your_encoded_data_here>"
     >
       Proceed
     </a>
   </p>
   ```

3. Open the HTML file in your browser
4. Click on the "Proceed" button
5. You should be redirected to the Verify page where your OA document is being verified and rendered on the screen.

🎉 Congratulations, you have successfully created a HTML file with an OA document embedded Verify URL that redirects user to our Verify page for verification!

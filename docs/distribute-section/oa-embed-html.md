---
id: oa-embed-html
title: Distribute a verifiable document via an HTML file
sidebar_label: Distribute a verifiable document via an HTML file
---

> **Note**: This guide is currently for OA documents that are verifiable on [verify.gov.sg](https://www.verify.gov.sg). Before continuing with this guide, be sure to verify your OA document on [verify.gov.sg](https://www.verify.gov.sg)

Because an OpenAttestation document (`.oa`) is not a native file extension that devices can recognize automatically, the OA-embedded HTML solution is here to solve this issue. Using this solution, you can encapsulate an OA document, so that the end users only need to click a button on a locally-rendered HTML page and be directed to the verifier with their document.

This is an optional procedure after creating an issued or a signed OA document depending on your use case (e.g. if you want to make it more convenient for end users to handle an OA document properly).

## How it works

In this guide, you will create an HTML file with a **Proceed** button to redirect the user to [verify.gov.sg](https://www.verify.gov.sg/). You will embed the OA document in the Verify URL for verification and rendering.

To continue, follow the steps below:

1. To create the Verify URL, encode the OA document data and embed it at the end of the Verify URL.

2. Create the HTML file to be issued.

    You will use a [sample template](https://github.com/Open-Attestation/oa-embedded-html/blob/master/samples/healthcert-pdt-oa-embedded-uri-fragment-sample.html).

3. Modify the button in the HTML file to contain the Verify URL. 

    This button will redirect the user to the [Verify page](https://www.verify.gov.sg/) which will verify and render the OA document.

    The screenshot below shows how the **Proceed** button works.

   ![Resultant HTML](/docs/distribute-section/oa-embed-html/html-proceed-verify.png)

## Prerequisites

Ensure that you have followed the steps on how to issue an [Ethereum OA document](/docs/ethereum-section/overview-eth) or [DID OA document](/docs/did-section/create), and have a valid OA document you want to use. 

In case you do not have an OA document, you can use [this sample HealthCert document](https://github.com/Notarise-gov-sg/api-notarise-healthcerts/blob/master/test/fixtures/v2/pdt_pcr_notarized_with_nric_wrapped.json) to follow the guide.

## Create your Verify URL

To get started, you need an issued or a signed OA document.

This guide will use [the sample HealthCert document](https://github.com/Notarise-gov-sg/api-notarise-healthcerts/blob/master/test/fixtures/v2/pdt_pcr_notarized_with_nric_wrapped.json). You can also use your own OA document if you have one.

### Encoding the payload

1. Copy the [sample document contents](https://github.com/Notarise-gov-sg/api-notarise-healthcerts/blob/master/test/fixtures/v2/pdt_pcr_notarized_with_nric_wrapped.json). 

   ![Copy document data](/docs/distribute-section/oa-embed-html/copy-healthcert-data.png)

    If you are using your own OA document, open the file in a text editor and copy the file data.

2. Minify or compress the OA document.

   - You need to minify or compress the JSON data in the OA document to prevent additional characters from being encoded later in Step 3.
   - Use online tools like [Code Beautify](https://codebeautify.org/jsonminifier).

   - Copy the data and paste it into a text editor. Save it for later use.

     ![Minify document data](/docs/distribute-section/oa-embed-html/minify-document-data.png)

3. Encode your data with a URL Encoder.

   - Encode the data from Step 2. 
   
      You will append it to the end of the Verify URL later on.

   - Use online tools like [urlencoder.org](https://www.urlencoder.org/)

   - Copy the data and paste it into a text editor. Save it for later use.

     ![Encode document data](/docs/distribute-section/oa-embed-html/encode-document-data.png)

### Create the Verify URL with OA Document Data

- Open a text editor you prefer.
- Append the encoded data, which you copied earlier, after the hash `#` sign in `https://www.verify.gov.sg/verify?m=uri-fragment#`

```url
https://www.verify.gov.sg/verify?m=uri-fragment#<paste_your_encoded_data_here>
```

## Creating the HTML file

### Sample HTML file

To standardize the HTML files being issued, it is recommended for HealthCerts providers to use the [sample HTML file](https://github.com/Open-Attestation/oa-embedded-html/blob/master/samples/healthcert-pdt-oa-embedded-uri-fragment-sample.html).

For simplicity, this guide will use the contents from the [sample HTML file](https://github.com/Open-Attestation/oa-embedded-html/blob/master/samples/healthcert-pdt-oa-embedded-uri-fragment-sample.html). Then it will embed the Verify URL into the **Proceed** button, so that upon clicking, users will be redirected to the Verify page.

### Replace the button link with your Verify URL

1. Copy the [sample HTML file template](https://github.com/Open-Attestation/oa-embedded-html/blob/master/samples/healthcert-pdt-oa-embedded-uri-fragment-sample.html) and paste it into a text editor you prefer.
2. Replace the [the URL on this line](https://github.com/Open-Attestation/oa-embedded-html/blob/master/samples/healthcert-pdt-oa-embedded-uri-fragment-sample.html#L105) with your Verify URL from earlier:

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

3. Open the HTML file in your browser.
4. Click **Proceed**.
5. You should be redirected to the Verify page, which verifies your OA document and renders it on the screen.

🎉 Congratulations, you have successfully created an HTML file with an OA document embedded and made it verifiable.

---
id: oa-embedded-qrcode
title: Embedding a Verifiable Document into a QR Code (URL)
sidebar_label: Embedding a Verifiable Document into a QR Code (URL)
---

Using a QR code is one of the recommended [Universal Actions](https://github.com/Open-Attestation/adr/blob/master/universal_actions.md#universal-actions-for-open-attestation-documents) through which OpenAttestation documents can be distributed or communicated. The purpose of Universal Actions is to implement a standard for all parties to share OpenAttestation documents.

The QR code used in the OpenAttestation framework is essentially a URL where you can embed an OA document to make it easily shareable. In this way, the verifying party only needs to scan the QR code to view the verifiable document. 


## Example QR code and link

The following shows an example QR code:

![Example QR Code](/docs/developer-section/quickstart/oa-embedded-qrcode/example-qrcode.png)


The following shows the link in the QR code above: 

[https://dev.opencerts.io/?q=%7B%22type%22%3A%22DOCUMENT%22%2C%22payload%22%3A%7B%22uri%22%3A%22https%3A%2F%2Fgallery.openattestation.com%2Fstatic%2Fdocuments%2Ftranscript-encrypted.opencert%22%2C%22permittedActions%22%3A%5B%22STORE%22%5D%2C%22redirect%22%3A%22https%3A%2F%2Fdev.opencerts.io%22%7D%7D#%7B%22key%22%3A%22691add1930798b63b17c8683a4776bedc16771ea5664337e21a563be0529024f%22%7D](https://dev.opencerts.io/?q=%7B%22type%22%3A%22DOCUMENT%22%2C%22payload%22%3A%7B%22uri%22%3A%22https%3A%2F%2Fgallery.openattestation.com%2Fstatic%2Fdocuments%2Ftranscript-encrypted.opencert%22%2C%22permittedActions%22%3A%5B%22STORE%22%5D%2C%22redirect%22%3A%22https%3A%2F%2Fdev.opencerts.io%22%7D%7D#%7B%22key%22%3A%22691add1930798b63b17c8683a4776bedc16771ea5664337e21a563be0529024f%22%7D)


## Generating your shareable URL

The shareable URL contains the URL to the compatible verifier, along with a query parameter (q) containing an encoded payload, and a hash (#) followed by the optional decryption key.

The syntax of the shareable URL is in the following: 


```
https://[VERIFIER_URL]/?q=[ENCODED_QUERY_PARAM]#[OPTIONAL_DECRYPTION_KEY]
```


In the URL, the query parameter (q) consists of an encoded query string of a JSON. If you analyze the URL in your preferred URL decoder, you will see the query parameter (q) decoded to a JSON string similar to the following example:


```
{
  "type": "DOCUMENT",
  "payload": {
    "uri": "https://gallery.openattestation.com/static/documents/transcript-encrypted.opencert",
    "permittedActions": [
      "STORE"
    ],
    "redirect": "https://dev.opencerts.io"
  }
}
```



For the ease of reading, here’s how an **unencoded** URL looks like:



[https://dev.opencerts.io/?q= **{"type":"DOCUMENT","payload":{"uri":"https://gallery.openattestation.com/static/documents/transcript-encrypted.opencert","permittedActions":["STORE"],"redirect":"https://dev.opencerts.io"}}**#**{"key":"691add1930798b63b17c8683a4776bedc16771ea5664337e21a563be0529024f"}**​](https://dev.opencerts.io/?q={"type":"DOCUMENT","payload":{"uri":"https://gallery.openattestation.com/static/documents/transcript-encrypted.opencert","permittedActions":["STORE"],"redirect":"https://dev.opencerts.io"}}#{"key":"691add1930798b63b17c8683a4776bedc16771ea5664337e21a563be0529024f"})



>**Note:** The bold portion has to be encoded separately.


### Mandatory information in the QR code

The table below describes the JSON key/value pairs for the query parameter `q` for the verifier to handle: 


<table>
  <tr>
   <td><strong>Query Parameter <code>q</code></strong>
   </td>
  </tr>
  <tr>
   <td><strong>Key</strong>
   </td>
   <td><strong>Necessity</strong>
   </td>
   <td><strong>Definition</strong>
   </td>
   <td><strong>Data Type</strong>
   </td>
   <td><strong>Value</strong>
   </td>
  </tr>
  <tr>
   <td><code>type</code>
   </td>
   <td>Required
   </td>
   <td>Data type of the information that the QR code presents.
   </td>
   <td>Enum
   </td>
   <td>The following value option is accepted:
<ul>

<li><code>DOCUMENT</code>
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><code>payload</code>
   </td>
   <td>Required
   </td>
   <td>An object that consists of three variables, including <code>uri</code>, <code>permittedActions</code>, and <code>redirect</code>.
   </td>
   <td>Object
   </td>
   <td>The three variables in this object must follow the respective requirements on their value options.
   </td>
  </tr>
  <tr>
   <td><code>payload.uri</code>
   </td>
   <td>Required
   </td>
   <td>A URI where the verifiable document is hosted.
   </td>
   <td>URI
   </td>
   <td>A valid URI pointing to the document that is retrievable by the verifier. 
<p>Example: S3 Bucket</p>
   </td>
  </tr>
  <tr>
   <td><code>payload.permittedActions</code>
   </td>
   <td>Optional
   </td>
   <td>The actions that the user will be able to perform on the document.
   </td>
   <td>Enum
   </td>
   <td>The following value options are accepted:
<ul>

<li><code>VIEW</code></li>

<li><code>STORE</code></li>

</ul>
   </td>
  </tr>
  <tr>
   <td><code>payload.redirect</code>
   </td>
   <td>Optional
   </td>
   <td>A URI where the OA-compliant verifier resides.
   </td>
   <td>URI
   </td>
   <td>A valid URI pointing to any compatible verifier is accepted.
   </td>
  </tr>
</table>



### Optional information in the QR code

The table below describes the JSON key/value pairs for the optional URI fragment (hash `#`): 


<table>
  <tr>
   <td><strong>Hash <code>#</code></strong>
   </td>
  </tr>

  <tr>
   <td><strong>Key</strong>
   </td>
   <td><strong>Necessity</strong>
   </td>
   <td><strong>Definition</strong>
   </td>
   <td><strong>Data Type</strong>
   </td>
   <td><strong>Value</strong>
   </td>
  </tr>

  <tr>
   <td><code>key</code>
   </td>
   <td>Optional
   </td>
   <td>Decryption key hexadecimal encoded
   </td>
   <td>String
   </td>
   <td>Any key compliant with <a href="https://github.com/Open-Attestation/oa-encryption">OpenAttestation encryption</a> is accepted. 
   </td>
  </tr>
</table>


## Embedding a document in a QR code

To share an OA document via a QR code:  

1. Collect all [mandatory information](#mandatory-information-in-the-qr-code) that the QR code requires.
    * To prevent any possible security breach, you have the option to encrypt confidential information and [add a decryption key](#optional-information-in-the-qr-code) into the QR code. 
    * To learn more about OpenAttestation encryption, see [this GitHub repository](https://github.com/Open-Attestation/oa-encryption).

2. Place the mandatory fields into their respective JSON key/value pair.

3. Use your preferred URL encoder to encode the query parameter (q) and hash (#) so that it can be inserted into the URL. 

4. Use your preferred QR code generator to turn the URL into a QR code.

5. Share the QR code with other users to let them view the document in a compatible verifier.


## Additional information about the distribution methods

To learn more about the pros and cons of QR code and other distribution methods, see [this article](/docs/docs-section/faq#how-are-openattestation-documents-distributed).
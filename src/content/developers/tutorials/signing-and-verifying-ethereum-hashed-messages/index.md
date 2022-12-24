---
title: Signing and Verifying Ethereum Hashed Messages
description: Proving consent off-chain with the option to settle on-chain using Ethereum native cryptography
author: "AwKaiShin"
tags: ["metamask", "signing", "ethers.js"]
skill: beginner
lang: en
source: medium.com
sourceUrl: https://medium.com/@kaishinaw/signing-and-verifying-ethereum-hashed-messages-fefa46a746f2
published: 2022-10-31
---

## Introduction {#introduction}

One exciting feature of Ethereum is the ability to prove consent directly between parties. In other words, you can easily validate that someone agreed to something without the need for a third party. As there is practically no limitation to the data being agreed to, this opens up endless possibilities when it comes to designing how users interact digitally.

Of note, this capability comes from the cryptography underlying Ethereum and not the EVM itself. While this complex maths is not in the scope of this article, we still require a very high level understanding of the functionality that Public Key Cryptography/ECDSA cryptography enables:

- Messages are signed using a private key which results in a raw signature
- Anyone with the raw signature and unsigned message will be able to validate the account which signed the message using the corresponding public key
- The unsigned message can not be extracted from the raw signature without the corresponding private key

You can check out this amazing [thread](https://twitter.com/SalomonCrypto/status/1580677281474699264?s=20&t=zz3vZEGbRSmEmVDW-gQ0AQ) if you would like an introduction to ECDSA.

Consequently, this also enables for such proofs to be handled off-chain which means no gas (and therefore no money) is required when it comes to validating that a message has indeed been signed by a particular wallet. In effect, off-chain interactions which are secured by the option to settle on-chain.

This paves the way for use cases which are critical to mainstream adoption:

- User onboarding: New crypto users are unlikely to have the required coins to interact with a smart contract. By signing a message, the operator can send the signed transaction to the network therefore **paying gas fees on behalf of the user**.
- Decentralised identity: Assuming a wallet represents an individual, users will be able to create new relationships without the need to coordinate financially. By validating a message signature, users can be **assured that the person on the other end is who they say they are**.
- Scaling via channels: Transactions can be accumulated in the form of signed messages with final settlement happening once on-chain. **Intermediate state changes insured by the main chain security**.
- Pre-authorised agreements: Transactions can be signed with final settlement being decided by a third party. This enables **non-custodial management of order flows**.
- Offline signing: Even in places where there is no internet, transaction computation can still take place on a local computer. Users can **transact without the need for a network connection**.

For this guide, we will be covering signing and validation of Ethereum hashed messages. Hashing the message allows for better efficiency and security on-chain while also providing an additional layer of privacy. Do note that by hashing the message, we are prioritising the above over message readability at the point of signing. If you would like the human readable message version, please refere [here](https://medium.com/@kaishinaw/signing-and-verifying-ethereum-messages-f5acd41ca1a8).

This guide assumes basic familiarity with Express, Ethers.js, Browserify, and Metamask. If you need an introduction on how to setup these tools, you can refer to a previous [guide](https://medium.com/@kaishinaw/connect-metamask-with-ethers-js-fc9c7163fd4d).

The Github [repository](https://github.com/0xKai27/ValidateSignerHash) for this guide contains a few key files:

- `/client/signing/sign.ts`: Client functions required to sign the message
- `/client/signing/validate.ts`: Client functions triggering message validation on the server
- `/routes/api.ts`: Client/Server APIs used to communicate data
- `/server/validate.ts`: Server functions to store and validate the data

## Sign Offline Message

For this guide, the Issuer will be allowed to customise their message to be signed with their own Metamask wallet. In order to determine the legitimacy of the signature, the payload and fully-extended signature will be stored on the server for future validation.

![Sign Sequence](https://miro.medium.com/max/720/1*WO35jeKxa6Z6RPYao42BAw.webp)

We first create the UI form for the custom message to be inputted:

```html
<!-- index.ejs -->
<h2>Sign offline message</h2>
<form id="signMessage">
  <p>Message:</p>
  <input type="text" id="message" />
  <br />
  <button>Sign Message</button>
</form>
```

![Sign Message Form](https://miro.medium.com/max/640/1*_WdIE8XG3plG0XCvLEhpqA.webp)

Upon submission, our client code (`/client/signing/sign.ts`) will process the signature sequentially by:

- Encoding the message as a `DataHexString` in preparation for hashing. The [`AbiCoder`](https://docs.ethers.io/v5/api/utils/abi/coder/#AbiCoder) is required to translate between the binary data formats used to interoperate between the EVM and higher level libraries.
- Hashing the payload with the `keccak256` algorithm. This hashing enables the payload to be more efficiently and securely validated if the data is stored on the chain as `bytes32` does not require assembly (not in scope but good to have). Alternatively, if the above is less of a priority, it is also possible to display the human readable message for the user to sign in Metamask by omitting these 2 steps, you can view this in a separate [guide](https://medium.com/@kaishinaw/signing-and-verifying-ethereum-messages-f5acd41ca1a8).
- Prompting the user to sign the hashed payload with `signMessage()` which prefixes the Ethereum ([EIP-191](https://eips.ethereum.org/EIPS/eip-191)) specific identifier `"\x19Ethereum Signed Message:\n"` and byte length of the message. This eliminates the risk of replay attacks on other EVM platforms. Note that Metamask is used for signing without exposing the Issuer’s private keys.

![Metamask Sign Message](https://miro.medium.com/max/720/1*xfVIJjBD9TMDToDT8LuqBw.webp)

- Generate the fully expanded-format of the signed message with `splitSignature()`. The cryptography behind this is out of scope but effectively, this signature is unique to the signed message (i.e. private key and signed message combination) which then enables the message to be validated by another party.

![Fully Expanded Signature](https://miro.medium.com/max/720/1*dnKBFZEM_nk25AzzBvKLYA.webp)

- Post the payload and expanded signature to the server to be saved for future validation. Note that only the `payload`, `payloadHash`, and `fullyExpandedSig` were sent to the server via `/api/signedMessage`.

```typescript
// sign.ts
async function signMessage() {
  // Encode the payload
  let payload: string = ethers.utils.defaultAbiCoder.encode(
    ["string"],
    [unsignedMessage]
  )
  console.log(`Payload:`)
  console.debug(payload)

  // Hash the payload
  let payloadHash: string = ethers.utils.keccak256(payload)
  console.log(`Payload Hash:`)
  console.debug(payloadHash)

  // Get the user to sign the message with their private keys on the browser
  signedMessage = await ethersSigner.signMessage(
    ethers.utils.arrayify(payloadHash)
  )
  console.log(`Raw Signed Message:`)
  console.debug(signedMessage)

  // Get the fully expanded signature
  let fullyExpandedSig: ethers.Signature =
    ethers.utils.splitSignature(signedMessage)
  console.log(`Fully Expanded Signature:`)
  console.debug(fullyExpandedSig)

  await fetch("/api/signedMessage", {
    method: "POST",
    body: JSON.stringify({ payload, payloadHash, fullyExpandedSig }),
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    const message = await res.text()
    console.log(JSON.parse(message).message)
  })
}
```

The logic for saving to the server can be found in `/routes/api.ts`:

```typescript
// routes/api.ts
/* POST client payload and extended signature to be saved on server */
router.post("/signedMessage", async (req, res) => {
  await setPayload(req.body.payload)
  await setPayloadHash(req.body.payloadHash)
  await setFullyExpandedSig(req.body.fullyExpandedSig)

  res.status(200).json({
    message: "Successfully saved on server!",
  })
})
```

## Validate Message Signer {#validate-message-signer}

As the signed message is now stored on the server, we can now validate the message signer. For simplicity, it is assumed that the Validator triggers the validation from the same UI. When in production, this message validation will likely form a prerequisite before any application specific function is triggered. The core validation logic is independently processed by the server (`/server/validate.ts`).

![Validate Sequence](https://miro.medium.com/max/720/1*R1bGJ--eye27LPNSKAsAHA.webp)

To enable validation to be triggered, we create a validation button as well as a span which will hold the signing address once processed:

```html
<!-- index.ejs -->
<h2>Validate message signer</h2>
<button id="validateSignature">Validate Signature</button>
<h3>Message Signer: <span id="messageSigner"></span></h3>
```

This button will trigger validation on the server via the `/api/validateSignature` route specified in `/client/signing/validate.ts`:

```typescript
// client/signing/validate.ts
validateSignatureButton.addEventListener("click", async () => {
  await fetch("/api/validateSignature", {
    method: "GET",
  }).then(async (res) => {
    const message = await res.text()
    messageSignerSpan.innerHTML = JSON.parse(message).messageSigner
  })
})
```

Following the API specified, the server will attempt to validate the message with [`verifyMessage()`](https://docs.ethers.io/v5/api/utils/signing-key/#utils-verifyMessage) which returns the address which produced the signed signature. In practice, we would then compare this returned address against the Issuer’s public key which would indicate the validity of the signature. Notice also that `verifyMessage()` only requires the `payloadHash` and `fullyExpandedSig` which implies that validation can be processed without the need for sharing private keys.

```typescript
// client/signing/validate.ts
async function validateSignature(): Promise<string> {
  console.log(`Server Payload Hash:`)
  console.debug(serverPayloadHash)
  console.log(`Server Fully Expanded Signature:`)
  console.debug(serverFullyExpandedSig)

  let signingAddress: string = ethers.utils.verifyMessage(
    ethers.utils.arrayify(serverPayloadHash),
    serverFullyExpandedSig
  )

  return signingAddress
}
```

![Validate Signer](https://miro.medium.com/max/720/1*fCqL6uISmxpAKscQGjkQPw.webp)

## Extract Decoded Message {#extract-decoded-message}

In the event that the server-side requires the human readable message, it can also be obtained using [`abiCoder.decode()`](https://docs.ethers.io/v5/api/utils/abi/coder/#AbiCoder-decode) as the encoded `payload` was also previously saved to the server.

```typescript
// client/signing/validate.ts
async function decodeMessage(): Promise<string> {
  let decodedPayload: ethers.utils.Result = ethers.utils.defaultAbiCoder.decode(
    ["string"],
    serverPayload
  )
  let decodedMessage: string = decodedPayload[0]

  return decodedMessage
}
```

![Extract Message](https://miro.medium.com/max/720/1*m1UzlhTs0xnzLBHRpDBTqw.webp)

In this case, the data type will need to be known by the server in order to decode the payload. With complex types, this makes it more difficult for the data to be read by any unwanted parties.

---
title: Issuing And Verifying Ethereum DIDs with Metamask
description: Signing, Issuing, and Verifying DIDs as JWTs on a browser UI using Metamask
author: "AwKaiShin"
tags: ["metamask", "signing", "ethers.js", "identity"]
skill: beginner
lang: en
source: medium.com
sourceUrl: https://medium.com/@kaishinaw/issuing-and-verifying-ethereum-dids-with-metamask-a42070c0a04d
published: 2022-11-11
---

## Introduction {#introduction}

As we move towards a more user-centric digital identity infrastructure, one of the fundamental issues we face is the verifiability and portability of a claim. In other words, how can I independently prove that someone has said something about me. This is in stark contrast to the existing trust model whereby verification of a claim necessitates direct interaction between the validator and issuer of a claim (i.e. to validate a digital certificate, I would check the certificate against the Issuer’s database).

There are many solutions being built to achieve this technologically and the vast majority of them would involve some form of public key cryptography. Explaining the complex maths behind such cryptography is not in the scope of this guide but it is crucial to appreciate the functionalities which it enables:

- A key pair is generated whereby one of the keys is made publicly available while the other key is kept private.
- Any actions carried out with the public key will require confirmation by signing with the private key. Transactions result in a unique hash based on the inputs to the transaction.
- Due to how the key pair was generated, the owner can prove ownership of the public key without ever having to disclose the private key.

In the Ethereum context, this means that as an Issuer, I am able to make a claim about a subject by signing a transaction with my crypto wallet, the same one which I use for transferring Ethereum. By registering this signing event on a smart contract registry, `ethr-did-registry`, anyone can prove that the claim was issued from my account by checking the signed message against this decentralised registry. Given the accessibility and availability of the smart contract, this means that validation only requires ownership of the signed message which can easily be stored on the subject’s personal device (i.e. identity wallet). With this design, users are always in full control as the operation of their digital data/identity is not dependent on a third party.

Given such a background, this guide is a technical introduction on how this can be achieved using Metamask on Ethereum (Goerli testnet). Aside from decentralised identity specific concepts, it is assumed that you have some basic familiarity with [Express.js](https://expressjs.com/), [Ethers.js](https://docs.ethers.org/v5/), and [Metamask](https://metamask.io/). If you would like a refresher of how these 3 are integrated, especially around running Ethers.js in the browser, you can refer to a separate [guide](https://medium.com/@kaishinaw/connect-metamask-with-ethers-js-fc9c7163fd4d).

The Github repo for this guide can be found [here](https://github.com/0xKai27/did-jwt-metamask).

## Key Concepts {#key-concepts}

Before diving into the code, there are a few key data objects that we will be working with:

- **DID**: A globally unique decentralised identifier with features designed for blockchains. Consists of a DID Method which defines how DIDs work within a specific blockchain as well as a Method-Specific Identifier which is unique within the method’s namespace.
- **DID Document**: A JSON-LD object that describes the public keys and service endpoints necessary to bootstrap cryptographically-verifiable interactions with the subject in question. For more info on DIDs and DID Documents, refer to [DID: Decentralised Identity’s Starting Line](https://medium.com/@kaishinaw/did-decentralised-identitys-starting-line-175fe44b91a3)
- **Verifiable Data Registry**: A system that facilitates the creation, verification, updating, and/or deactivation of DIDs and DID Documents. In this case, we are using the [`ethr-did-registry`](https://github.com/uport-project/ethr-did-registry) smart contract.
- **Key Pair**: A pair of public and private keys which represents an Ethereum account that enables public resolving of an address as well as private control over account actions. For more info: [Ethereum Book](https://github.com/ethereumbook/ethereumbook/blob/develop/04keys-addresses.asciidoc)
- **JSON Web Token (JWT)**: Defines a compact and self-contained way for securely transmitting information between parties as a JSON object. Refer JWT website: https://jwt.io/introduction
- **Private Claim (JWT Specific)**: A customisable claim which has been pre-agreed between the producer and consumer of the JWT claim. We will be using this as an example of data which can be included in a JWT payload. You can refer to the JWT RFC7519 spec [here](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.6).

This [FAQ](https://identity.foundation/faq/) great resource if you would like to dive deeper into these concepts. For more specific DID properties, you can refer directly to the DID [spec](https://www.w3.org/TR/did-core/#core-properties).

### Development Notes {#development-notes}

This guide comprises of 2 logically separate stages when issuing/verifying an Ethereum DID-JWT:

- Issuance of a JWT with a private claim that is signed by the Issuer
- Validation of Subject DID Document and JWT payload by the Audience

Each of the above stages are separated into their own separate page (Issuer & Audience App) which requires you to interact with the JWT via separate role accounts on Metamask.

![Roles](https://miro.medium.com/max/640/1*b4S6pJvEneCDMDiiflJ3fA.webp)

The intention behind manually operating each stage is to provide a more detailed view into sections of the end-to-end flow. Do note that **although the sequence diagrams indicate saving the JWT to a “Subject Device” (i.e. identity wallet), I have opted to temporary store it on the session token for simplicity.**

## Signing and Issuance of JWTs {#signing-and-issuance-of-jwts}

![Issuance Sequence](https://miro.medium.com/max/720/1*JKKEU4ngg7uAClqDzpzlYQ.webp)

We first need to prepare the claims that will be in the JWT. This consists of the private claim as well as the parties to the claim:

- **“iss”**: The “iss” (issuer) claim identifies the principal that issued the
  JWT. This account will require some test ETH in order to sign the JWT.
- **“sub”**: The “sub” (subject) claim identifies the principal that is the
  subject of the JWT. This account will require some test ETH in order to update the on-chain DID Document.
- **“aud”**: The “aud” (audience) claim identifies the recipients that the JWT is intended for.

All Ethereum addresses will have to be formatted in their DID method equivalent. As we are using the [`did:ethr:`](https://decentralized-id.com/web-standards/w3c/wg/did/decentralized-identifier/#didethr) method, our equivalent DID will be in the following format: `did:ethr:<chainId>:<ethAddress>`. Do note that the `chainId` is being pulled based on the connected Metamask network. The [`ethr-did`](https://github.com/uport-project/ethr-did) library provides a helpful wrapper around the connected account that enables us to conveniently interact with DIDs.

![Prepare JWT](https://miro.medium.com/max/720/1*doDaT6jgCSiYAq_zZMOHbA.webp)

You can easily overwrite the defaults for these 3 fields through the UI or changing the relevant variables in the code (`subjectAddress`, `audienceAddress`, `privateClaim`). On building the JWT message, you should see the object printed to the browser’s console:

![JWT Message](https://miro.medium.com/max/720/1*Zai-4S6flLf-yN4eFZmeJg.webp)

As we will be using a Metamask account to sign the message, we first need to create a delegate signer which would be connected to our Issuer account. This is required as “web3 providers are not directly able to sign data in a way that is compliant with the JWT [`ES256K`](https://datatracker.ietf.org/doc/html/rfc8812#section-3.2) or the (unregistered) `ES256K-R` algorithms” ([Getting Started Ethr-Did](https://github.com/uport-project/ethr-did/blob/master/docs/guides/index.md)). **By creating a delegate signer, a new [`assertionMethod`](https://www.w3.org/TR/did-core/#dfn-assertionmethod) and [`verificationMethod`](https://www.w3.org/TR/did-core/#dfn-verification-method) object linking the delegate issuer will be added to the Issuer’s DID Document.** This is what enables the JWT to be verified later.

We can go ahead and create the delegate by selecting the “Create Delegate” button which will trigger a request from Metamask for you to confirm the transaction. Note that you might have to change the suggested gas fee in Metamask for the transaction to be mined.

![Metamask Add Delegate](https://miro.medium.com/max/720/1*Qk7enf8e8-yj_Me6erHvDQ.webp)

Once the transaction is confirmed, you will be able to see the randomly generated delegate account and DIDs:

![Delegate](https://miro.medium.com/max/720/1*K6JNC65lFG82mSv5PAsWRw.webp)

The main thing to note when creating the delegate is that the [`createSigningDelegate()`](https://github.com/uport-project/ethr-did/blob/c63d2f510d5173414763ec613660450368445293/src/index.ts#L316) function exposed by `ethr-did` replaces the signer in our Issuer EthrDID object with that of the delegate:

![createSigningDelegate](https://miro.medium.com/max/640/1*7rDSK9kbS8Dc2aoPObhBfw.webp)

With the delegate signer created, we can finally sign the message by clicking on the “Sign JWT” button which signs the message with the updated Issuer DID.

![Sign JWT](https://miro.medium.com/max/720/1*1B5XnuK_F6G4jATqEJ8WMA.webp)

The signed JWT is a [Base64](https://en.wikipedia.org/wiki/Base64) concatenation of the signing input (header and payload) as well as resulting signature, each separated by a `"."`. Critically, given that the JWT is self-contained, this means that the JWT inputs are able to be decoded based on the ownership of the JWT alone. As such, **any JWT that contains personally identifiable or sensitive information should never be persisted on-chain** as it will be permanently viewable to all. In this case, it is recommended that the JWT be stored on the Subject’s device (i.e. identity wallet) from where it can be efficiently retrieved based on user consent. JWTs should be reissued where required (i.e. loss of device/DID).

For completeness, the Issuer’s DID Document is also logged in the browser’s console for reference. Notice that the delegate account that was added in the [`verificationMethod`](https://www.w3.org/TR/did-core/#dfn-verification-method) which corresponds to the [`assertionMethod`](https://www.w3.org/TR/did-core/#dfn-assertionmethod) entry.

![Issuer DID Doc](https://miro.medium.com/max/720/1*QgtBervkQm2FIe5Vq2IziQ.webp)

### Section Code {#issuance-section-code}

- View: [`/views/issuer.ejs`](https://github.com/0xKai27/JWT-EthrDidRegistry/blob/main/views/issuer.ejs)
- Logic: [`/jwt/sign.ts`](https://github.com/0xKai27/JWT-EthrDidRegistry/blob/main/jwt/sign.ts)

## Validating the JWT {#validating-the-jwt}

![Validation Flow](https://miro.medium.com/max/720/1*CU-lIia1IAKrVTzZbmzh1A.webp)

The `ethr-did` library makes verifying the JWT an extremely simple process as all the complexities are handled behind a single `verifyJWT()` function. Conceptually, the JWT is being verified by:

- Decoding the JWT
- Obtaining the verification public key and controller from the decoded JWT (under `verificationMethod`)
- Check JWT verification purpose
- Resolve the controller DID Document (i.e. Issuer)
- Check Issuer DID Document `assertionMethod` against Decoded JWT
- Check JWT expiry and valid `aud`

As the `ethr-did` library verifies the JWT against the `iss` DID Document which was updated in the first stage (i.e. `issuerDelegateKp.signJWT()`), this flow can be achieved by the validator with just the JWT alone. In other words, **the JWT can be stored privately off-chain and provided only when a Subject requests for validation by the Audience listed in the JWT.**

For this flow, ensure that you are connected to the audience wallet in Metamask or you can configure the audience address via the form:

![Configure Audience](https://miro.medium.com/max/720/1*d6MJ7OPbQSQR2cAtlQOEHQ.webp)

`ethr-did` will compare the configured audience DID against the JWT payload “aud” as part of the verification checks. To trigger the checks, you can then click on the “Validate JWT” button:

![Validate JWT Payload](https://miro.medium.com/max/640/1*D16vTcGWkIb_9iTAFQHANQ.webp)

The verification will also return the result as well as the fully decoded payload which is then displayed in the UI. The full result can be viewed in the console:

![Full Validation Result](https://miro.medium.com/max/720/1*SHCIlZFwt1L-TtdCXgfzGw.webp)

While the `verified` value is all that is required to validate the JWT, the `ethr-did` library also returns additional details around the JWT and signer for convenience. A few things to take note of:

- The DID Document returned is the same as the Issuer DID from the previous stage. That is, anyone resolving the Issuer DID from the `ethr-did-registry` will receive the same result
- The `issuer` value is the DID equivalent of our Issuer address
- The `payload`, with all our claims, can be completely decoded based on the JWT
- The `signer` object links the Issuer with the delegate signer account that was created

### Section Code {#verification-section-code}

- View: [`/views/audience.ejs`](https://github.com/0xKai27/JWT-EthrDidRegistry/blob/main/views/audience.ejs)
- Logic: [`/jwt/verify.ts`](https://github.com/0xKai27/JWT-EthrDidRegistry/blob/main/jwt/verify.ts)

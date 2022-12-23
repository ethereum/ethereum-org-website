---
title: Signing In With Ethereum - Owning Your Own Identity
description: SIWE (Sign In With Ethereum) authentication flow using Metamask
author: "AwKaiShin"
tags: ["metamask", "ethers.js", "siwe"]
skill: beginner
lang: en
source: medium.com
sourceUrl: https://medium.com/@kaishinaw/signing-in-with-ethereum-owning-your-own-identity-a5714f1afcdc
published: 2022-09-29
---

## Introduction {#introduction}

![SIWE Logo](https://miro.medium.com/max/720/0*SNekAu_rShtBcOeJ)

With [public key cryptography](https://www.youtube.com/watch?v=AQDCe585Lnc) underlying Web3, one of the novel use cases which has risen is the ability to verify “who you say you are” without the need of a centralised identity provider. While there are many pieces being concurrently built in the rapidly evolving decentralised identity space, [SpruceID](https://www.spruceid.com/spruceid) is leading the charge on the authentication front.

[SIWE](https://github.com/spruceid/siwe) (Sign In With Ethereum) has quickly established itself as an essential tool for users who demand more autonomy over their own digital identity. This is achieved through providing users the option to self-custodise their own digital identity via an EVM compatible wallet (ie. signing a verifiable message). Moreover, by establishing a standard sign-in workflow, SIWE can be easily integrated across existing identity services and is therefore not limited to just Web3 native applications.

SpruceID has provided a very useful [SIWE Notepad Example](https://github.com/spruceid/siwe-notepad) which implements an end-to-end SIWE authentication on Express.js, complete with session management.

![SIWE Notepad](https://miro.medium.com/max/720/0*BQ8c6rYHkOXapBrM.webp)

The purpose of this guide is to focus on just the core sign-in flow using Metamask. By setting aside session management as well as integration with other wallet providers, I hope to simplify the core aspects of SIWE :

- SIWE Authentication on Client vs Server
- Constructing the sign-in message for users to approve
- Avoiding replay attacks through nonce synchonisation
- Interacting with SIWE via the Metamask UI

The Github repository for this guide can be found [here](https://github.com/0xKai27/MetamaskSIWE). If you would like an introduction to programatically interacting with Metamask:

- [Connecting Metamask with a Local Hardhat Network](https://medium.com/@kaishinaw/connecting-metamask-with-a-local-hardhat-network-7d8cea604dc6)
- [Connecting Metamask to your Web Application (Express)](https://medium.com/@kaishinaw/connecting-metamask-to-your-web-application-express-99c155c56665)
- [Connect Metamask with Ethers.js](https://medium.com/@kaishinaw/connect-metamask-with-ethers-js-fc9c7163fd4d)

## Application Skeleton Setup {#application-skeleton-setup}

We first need to create a project directory and install Express:

```bash
mkdir MetamaskSIWE
cd MetamaskSIWE
npm install express
```

With the Express package installed, we can then utilise `express-generator` to quickly and conveniently setup an app template. Before running `express-generator`, we can view the setup options by running the following:

```bash
npx express-generator --help
```

![Express Generator Help](https://miro.medium.com/max/720/1*e5w6cfalCEDpsdb6Z56iTw.webp)

For our purposes, we want to bootstrap our project using [EJS](https://ejs.co/) as this minimises the need to context switch given its similarities to HTML. As such, we will run `express-generator` with the EJS view flag:

```bash
npx express-generator -v ejs
```

![Express Generator Create](https://miro.medium.com/max/720/1*hriDwSu2Iw7Upkrp5prbNg.webp)

As instructed, we will also install the required dependencies:

```bash
npm install
```

For the sake of convenience, we will be using `nodemon` to automatically refresh our application whenever we make any changes. The command below will install `nodemon` globally so that you can use it for your other projects:

```bash
npm install -g nodemon
```

Once installed, we can start our web application by running the below:

```bash
nodemon start
```

You should then be able to see a welcome page below when visiting the default port at `localhost:3000`.

![Express Localhost](https://miro.medium.com/max/544/0*zrZSOOEsiIZ7B36k.webp)

Express is now setup and we can go ahead and make the necessary changes to connect Metamask to our Express instance.

## Create "Login with SIWE" Button {#create-login-with-siwe-button}

The first thing we will do is to change the view so that the page display is more intuitive for our purpose. Navigate into the `index.ejs` file located in the `/views` folder. We can replace the `<body>` with the code below:

```html
<!-- /index.ejs -->
<body>
  <h1><%= title %></h1>
  <button id="login">Login with SIWE</button>
  <script src="javascripts/bundle.js"></script>
</body>
```

As per Metamask [best practice](https://docs.metamask.io/guide/getting-started.html#basic-considerations), we have included a button for the user to initiate the connection request. **The connection request should always be initiated by the user and not on page load.**

Additionally, we have also included a `bundle.js` script which we will be creating shortly. This script will hold the code required for Metamask to connect to the application.

Lastly, we have also changed the title that is fed into the page by modifying `index.js` under the `/routes` folder. The `res.render()` feeds the data passed in the function to our `index.ejs` file to be rendered.

```javascript
//routes/index.js
var express = require("express")
var router = express.Router()

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "SIWE Example" })
})

module.exports = router
```

Saving the above, `nodemon` would have automatically refreshed your application and your browser should display the following:

![Express Routing](https://miro.medium.com/max/556/1*NZHw8lDMxP88qlHwCaLslA.webp)

We can now get started on implementing the Ethereum login logic.

## Using SIWE to Sign-in from the Browser {#using-siwe-to-sign-in-from-the-browser}

In order to utilise the SIWE library, we will first install it via:

```bash
npm install siwe
```

Do note that SIWE comes pre-packaged with Ethers.js and hence there is no need to install Ethers.js again else there would be a conflict.

As we will need to run this script from the browser, we will also be using [Browserify](https://browserify.org/) in order to `require` the modules on the client’s browser. Refer to the Browserify section of the previous [guide](https://medium.com/@kaishinaw/connect-metamask-with-ethers-js-fc9c7163fd4d) for more details on this.

Consequently, we will first create an input file, `provider.js`, which contains all the logic required for this guide. This file will then be “Browserified” with the output file, `bundle.js`, being placed in the `/public/javascripts/` directory.

```bash
touch provider.js
```

We can then copy and paste the following into our `provider.js` file:

```javascript
//providers.js

const { ethers } = require("ethers")
const { SiweMessage } = require("siwe")

const loginButton = document.querySelector("#login")

loginButton.addEventListener("click", async () => {
  /**
   * Get the provider and signer from the browser window
   */
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  /**
   * Get the active account
   */
  const [address] = await provider.listAccounts()
  console.log(`Address used to construct SIWE message: ${address}`)

  /**
   * Gets a randomly generated nonce from the SIWE library. This nonce is added
   * to the session so we can check it on sign in. For security purposes, this
   * is generated on the server
   */
  const nonce = await fetch("/api/nonce").then((res) => res.text())
  console.log(`Nonce returned from server stored on client: ${nonce}`)

  /**
   * Get the chain id
   */
  const chainId = (await provider.getNetwork()).chainId
  console.debug(chainId)

  /**
   * Creates the message object
   */
  const message = new SiweMessage({
    domain: document.location.host,
    address,
    chainId,
    uri: document.location.origin,
    version: "1",
    statement: "Metamask SIWE Example",
    nonce,
  })
  console.log(`SIWE message constructed in the client:`)
  console.debug(message)

  /**
   * Generates the message to be signed and uses the provider to ask for a signature
   */
  const signature = await signer.signMessage(message.prepareMessage())
  console.log(`Signed message signature: ${signature}`)

  /**
   * Calls the sign_in endpoint to validate the message. On success, the
   * console woill display the message returned from server
   */
  await fetch("/api/sign_in", {
    method: "POST",
    body: JSON.stringify({ message, signature }),
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    const message = await res.text()
    console.log(JSON.parse(message).message)
  })
})
```

We first instantiate our button by using the query selector and add a click event listener on the button. Once clicked, a few things will happen:

- Extract the [`provider`](https://docs.ethers.io/v5/api/providers/) and [`signer`](https://docs.ethers.io/v5/api/signer/) from the browser window using Ethers.js. This allows us to programatically interact with our Metamask instance.
- Get the active Metamask account. This will be the address which is linked to the sign-in request.
- Generate a randomized nonce which will be used to validate the sign-in between the server and the client. Note that this is NOT the account nor consensus nonce which is used in Ethereum. To avoid the nonce being manipulated, this is generated on the server via calling the `/api/nonce` endpoint.

![Nonce](https://miro.medium.com/max/640/1*y4gsrSTfJZlH3cChaow4zA.webp)

- Create a new SIWE message which will allow us to call the SIWE library methods on the message. You can find the code [here](https://github.com/spruceid/siwe/blob/main/packages/siwe/lib/client.ts).
- Prompt the user to sign the prepared SIWE message which will generate a receipt containing the raw signature of the message. You can refer to the Ethers.js `signMessage()` function [here](https://docs.ethers.io/v5/single-page/#/v5/api/signer/-%23-Signer-signMessage).
- Call the `/api/sign_in` endpoint in order for the server to validate and handle the sign-in. As per session management [best practices](https://www.geeksforgeeks.org/session-management-in-http/), we will be using the POST method here so that sensitive information is embedded in the request body.

Save the `providers.js` file and we can then run the Browserify command:

```bash
browserify providers.js -o public/javascripts/bundle.js
```

A `bundle.js` file will be created in the public directory which static assets are served from. Note that our `index.ejs` file also contains a script tag referencing this path. Although `nodemon` would have automatically refreshed our app, we still need to implement the `/api/nonce` and `/api/sign_in` before our sign-in is fully functional.

## Updating Server Endpoints {#updating-server-endpoints}

We will now switch to our `index.js` file located under the `routes/` directory to add our 2 endpoints.

The `/api/nonce` endpoint will utilise the `generateNonce()` function from the SIWE library which generates a sufficiently random nonce to prevent replay attacks. The code for `generateNonce()` can be found [here](https://github.com/spruceid/siwe/blob/main/packages/siwe/lib/utils.ts). Our endpoint will respond with the generated nonce:

```javascript
//routes/index.js
const { SiweMessage, generateNonce } = require("siwe")

// Store the nonce for checking against log-in
let nonce

// Generate the nonce
router.get("/api/nonce", async (req, res) => {
  nonce = generateNonce()
  console.log(`Nonce generated on server: ${nonce}`)
  res.send(nonce)
})
```

Note that we have also initialised `nonce` at the file level instead of saving it to a session for the sake of legibility. The `nonce` is stored on the server in order to be able to compare it with the `nonce` returned from the client when a user logs in.

The majority of the sign in code will be handled by the `/api/sign_in` endpoint:

```javascript
// routes/index.js
// Handle the session on the Express server
router.post('/api/sign_in', async (req, res) => {
  /**
   * Get the message and signature from the request
   */
  const { message, signature } = req.body;

  /**
   * Format the message
   */
  const messageSIWE = new SiweMessage(message);

  /**
   * Instantiate a default provider instance
   */
  const provider = ethers.getDefaultProvider();

  /**
   * Validate the SIWE message received from client
   */
  const fields = await messageSIWE.validate(signature, provider); // siwe npm package yet to implement verify
  if (fields.nonce !== nonce) {
    res.status(422).json({
      message: "Invalid nonce: Client and Server nonce mismatch"
    });
    return;
  }
  console.log(`SIWE message `)
  console.debug(fields);
  console.log(`Successfully logged in on the server`)

  /**
   * Return success message to client
   */
  res.status(200).json({
    message: "Successfully logged in!"
  })
}
```

As per our client code, this endpoint is implemented as a POST request in order to minimise data leakages (this will have to be paired with HTTPS for better security). Consequently, we first need to destructure the request in order to get the `message` and `signature`. The `message` is then formatted into the `SiweMessage` equivalent. This `SiweMessage` should contain the same information as the one generated in the browser.

In order to validate the `signature` and `message` pair, we also require a new `provider` instance to be created. In this case, we will use Ethers.js default provider as we just need a quick way to test the sign in function.

The user login is then validated using the `validate()` method on the `SiweMessage` equivalent. The latest implementation can be found on SIWE’s [Github](https://github.com/spruceid/siwe/blob/main/packages/siwe/lib/client.ts). Do note that `validate()` is soon to be deprecated in favour of `verify()` which implements additional safeguards. However, as this latest change have yet to be implemented in NPM, this guide will still use the `validate()` function.

Upon validation, the results are written to `fields`. Critically, our code also implements a check to ensure that `fields.nonce` is equivalent to the `nonce` which was generated prior upon `/api/nonce` being called. Once this check is done, the user has successfully signed in and we can handle the session accordingly. Additionally, a success response is also returned to the client which will be logged in the browser console.

## Signing In With Metamask UI {#signing-in-with-metamsk-ui}

We can now navigate our browser to test the sign in via the user interface. Click the “Login with SIWE” button and you should receive a signature request from Metamask.

![Metamask Signature Request](https://miro.medium.com/max/720/1*lmZk24UrmhR9x-gZp6Ky7A.webp)

Notice that the message defined in our `provider.js` is displayed for the user to review. Additionally, you will also see the console printing relevant details such as the `nonce` and the `SiweMessage`.

![Console Signature Request](https://miro.medium.com/max/640/1*TuDTopNFNPfKC2iExx_bFg.webp)

You should also see the equivalent `nonce` being generated and printed to your server logs.

![Server Logs](https://miro.medium.com/max/640/1*Y6qse-dHTWfknb7uK9-KUw.webp)

We can then click the “Sign” button to approve this transaction. This will create the signed message which is printed to the browser’s console.

![Browser Console Signed Message](https://miro.medium.com/max/640/1*lWeJbaRyJHv2jswoBG48_Q.webp)

With this signature, the `/api/sign_in` endpoint will also be triggered resulting in the following being printed to our server console:

![Server Console SIWE Message](https://miro.medium.com/max/720/1*F8hwvfa_bnc2uYMsLIDVWg.webp)

Once completed, the success message returned by the server will be reflected accordingly in the browser console:

![Browser Console Signed In](https://miro.medium.com/max/640/1*cxLXAnOzEEgIe15px18TLA.webp)

Congrats, you have successfully implemented signing in with Ethereum using Metamask!

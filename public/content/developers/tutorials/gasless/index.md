---
title: Providing your customers with a gasless experience
description: It is easy to create a private key and an address; it's just a matter of running the right software. But there are many places in the world where getting the ETH to send transactions is much harder. In this tutorial you learn how to cover the onchain gas costs for executing user-signed, off-chain structured data in your smart contract. You have the user sign a structure containing the transaction information, which your offchain code then submits to the blockchain as a transaction.
author: Ori Pomerantz
tags: ["gasless"]
skill: beginner
lang: en
published: 2026-03-01
---

## Introduction {#introduction}

If we want Ethereum to serve [a billion more people](https://blog.ethereum.org/category/next-billion), we need to remove friction and make it as easy to use as possible. One source of this friction is the need for ETH to pay gas fees.

If you have a dapp that makes money from users, it might make sense to let users submit transactions through your server and pay the transaction fees yourself. Because users still sign an authorization message in their wallets, they retain Ethereum's guarantees of integrity. Availability depends on the server that relays transactions, so it is more limited. However, you can set things up so users can also access the smart contract directly (if they get ETH), and let others set up their own servers if they want to sponsor transactions.

The technique in this tutorial only works when you control the smart contract. There are other techniques, including [account abstraction](https://eips.ethereum.org/EIPS/eip-4337) that let you sponsor transactions to other smart contracts, which I hope to cover in a future tutorial.

Note: This is *not* production-level code. It is vulnerable to significant attacks and lacks major features. Learn more in the [vulnerabilities section of this guide](#vulnerabilities).
## The sample application {#sample-app}

The sample application here is a variant on HardHat's `Greeter` contract. You can see it [on GitHub](https://github.com/qbzzt/260301-gasless). The smart contract is already deployed on the [Sepolia](https://sepolia.dev/), at address [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA). 

To see it in action, follow these steps.

1. Clone the repository and install the necessary software.

   ```sh
   github clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. Edit `.env` to set `PRIVATE_KEY` to a wallet that has ETH on Sepolia. If you need Sepolia ETH, [use a faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia). Ideally, this private key should be different from the one you have in your browser wallet.

3. Start the server.

   ```sh
   npm run dev
   ```

4. Browse to the application at URL [`http://localhost:5173`](http://localhost:5173).

5. Click **Connect with Injected** to connect to a wallet. Approve in the wallet, and approve the change to Sepolia if necessary.

6. Write a new greeting and click **Update greeting via sponsor**.

7. Sign the message.

8. Wait about 12 seconds (the block time om Sepolia). While waiting you can look at the URL in the server's console to see the transaction.

9. See that the greeting changed, and that the last updated by address value is now the address of your browser wallet.

To understand how this works, we need to look at how the message gets created in the user interface, how it is relayed by the server, and how the smart contract processes it.

### The user interface {#ui-changes}

The user interface is based on [WAGMI](https://wagmi.sh/); you can read about it [in this tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Here is how we sign the message:

```js
const signGreeting = useCallback(
```

The React hook [`useCallback`](https://react.dev/reference/react/useCallback) lets us improve performance by reusing the same function when the component is redrawn.

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

If there is no account, raise an error. This should never happen because the button that calls us is disabled, but future programmers may remove that safeguard.

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

Parameters for the [domain separator](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). This value is constant, so in a better-optimized implementation, we might calculate it once rather than recalculate it each time the function is called.

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

The data type we sign. Here, we have a single parameter, `greeting`, but real-life systems typically have more.

```js
        const message = { greeting }
```

The actual message we want to sign and send. `greeting` is both the field name and the name of the variable that fills it.

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

Actually get the signature. This function is asynchronous because users take a long time (from a computer's perspective) to sign data.

```js
        const r = `0x${signature.slice(2, 66)}`
        const s = `0x${signature.slice(66, 130)}`
        const v = parseInt(signature.slice(130, 132), 16)

        return {
            req: { greeting },
            v,
            r,
            s,
        }
    },
```

The function returns a single hexadecimal value. Here we divide it into fields.

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

If any of these variables change, create a new instance of the function. The `account` and `chainId` parameters can be changed by the user in the wallet. `contractAddr` is a function of the chain Id. `signTypedDataAsync` should not change, but we import it from [a hook](https://wagmi.sh/react/api/hooks/useSignTypedData), so we can't be sure, and it's best to add it here.

Now that the new greeting is signed, we need to send it to the server. 

```js
  const sponsoredGreeting = async () => {
    try {
```

This function takes a signature and sends it to the server.

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

Send to the path `/server/sponsor` in the server we came from.

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

Use `POST` to send the information JSON-encoded.

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  } 
```

Output the response. On a production system we'd also show the response to the user.

### The server {#server}

I like using [Vite](https://vite.dev/) as my front-end. It automatically serves the React libraries and updates the browser when the front-end code changes. However, Vite does not include backend tooling.

The solution is in [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js).

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // Let Vite handle everything else
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

First we register a handler for the requests we handle ourselves (`POST` to `/server/sponsor`). Then we create and use a Vite server to handle all other URLs.

```js
  app.post("/server/sponsor", async (req, res) => {
    try {
      const signed = req.body

      const txHash = await sepoliaClient.writeContract({
        address: greeterAddr,
        abi: greeterABI,
        functionName: 'sponsoredSetGreeting',
        args: [signed.req, signed.v, signed.r, signed.s],
      })
    } ...
  })
```

This is just a standard [viem](https://viem.sh/) blockchain call.

### The smart contract {#smart-contract}

Finally, [`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) needs to verify the signature.

```solidity
    constructor(string memory _greeting) {
        greeting = _greeting;

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("Greeter")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

The constructor creates the [domain separator](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator), similar to the user interface code above. Blockchain execution is much more expensive, so we only calculate it once.

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

This is the structure that gets signed. Here we have just one field.

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

This is the [structure identifier](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct). It is calculated each time in the user interface.

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s        
    ) external {
```

This function receives a signed request and updates the greeting.

```solidity
        // Compute EIP-712 digest
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        GREETING_TYPEHASH,
                        keccak256(bytes(req.greeting))
                    )
                )
            )
        );
```

Create the digest in accordance with [EIP 712](https://eips.ethereum.org/EIPS/eip-712). 

```solidity
        // Recover signer
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

Use [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) to get the signer address. Note that a bad signature can still result in a valid address, just a random one.

```solidity
        // Apply greeting as if signer called it
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

Update the greeting.

## Vulnerabilities {#vulnerabilities}

This is *not* production-level code. It is vulnerable to significant attacks and lacks major features. Here are some, along with how to solve them.

To see some of these attacks, click the buttons under the *Attacks* heading and see what happens. For the **Invalid signature** button, check the server console to see the transaction response.

### Denial of service on the server {#dos-on-server}

The easiest attack is a [denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack) attack on the server. The server receives requests from anywhere on the Internet and based on those requests sends transactions. There is absolutely nothing preventing an attacker from issuing a bunch of signatures, valid or invalid. Each will cause a transaction. Eventually the server will run out of ETH to pay for gas.

One solution to this problem is to limit the rate to one transaction per block. If the purpose is to show greetings to [externally owned accounts](https://ethereum.org/developers/docs/accounts/#key-differences), it does not matter what the greeting is in the middle of the block anyway.

Another solution is to keep track of addresses and only allow signatures from valid customers.

### Wrong greeting signatures {#wrong-greeting-sigs}

When you click **Signature for wrong greeting**, you submit a valid signature for a specific address (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) and greeting (`Hello`). But it submits it with a different greeting. This confuses `ecrecover`, which changes the greeting but has the wrong address.

To solve this problem, add the address to the [signed structure](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124). This way, the `ecrecover` random address won't match the address in the signature, and the smart contract will reject the message.

### Replay attacks {#replay-attack}

When you click **Replay attack**, you submit the same "I'm 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e, and I'd like the greeting to be `Hello`" signature, but with the correct greeting. As a result, the smart contract believes that the address (which isn't yours) changed the greeting back to `Hello`. The information to do this is publicly available in the [transaction information](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1).

If this is a problem, one solution is to add a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Have a [mapping](https://docs.soliditylang.org/en/latest/types.html#mapping-types) between addresses and numbers, and add a nonce field to the signature. If the nonce field matches the mapping for the address, accept the signature and increment the mapping for next time. If it doesn't, reject the transaction.

Another solution is to add a timestamp to the signed data and accept the signature as valid only for a few seconds after that timestamp. This is simpler and cheaper, but we risk replay attacks within the time window, and the failure of legitimate transactions if the time window is exceeded.

## Other missing features {#other-missing-features}

There are additional features we would add in a production setting.

### Access from other servers {#other-servers}

Currently, we allow any address to submit a `sponsorSetGreeting`. This may be exactly what we want, in the interest of decentralization. Or maybe we want to ensure that sponsored transactions go through *our* server, in which case we'd check `msg.sender` in the smart contract. 

Either way, this should be a conscious design decision, not just the result of not thinking about the issue.

### Error handling {#error-handling}

A user submits a greeting. Maybe it gets updated at the next block. Maybe it doesn't. Errors are invisible. On a production system, the user should be able to distinguish between these cases:

- The new greeting has not been submitted yet
- The new greeting has been submitted, and it's in process
- The new greeting has been rejected

## Conclusion {#conclusion}

At this point, you should be able to create a gasless experience for your dapp users, at the cost of some centralization.

However, this only works with smart contracts that support ERC-712. To transfer an ERC-20 token, for example, it is necessary to have the transaction signed by the owner rather than just a message. The solution is [account abstraction (ERC-4337)](https://docs.erc4337.io/index.html). I hope to write a future tutorial about it.

[See here for more of my work](https://cryptodocguy.pro/).

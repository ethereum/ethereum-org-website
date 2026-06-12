---
title: Authentication on Ethereum
description: Learn how user authentication works in Ethereum applications — no passwords, just wallets and signatures.
lang: en
---

If you're coming from traditional web development, you're used to username/password login, OAuth flows, and session cookies. Authentication on Ethereum works differently — and in many ways, more simply.

On Ethereum, a user proves their identity by **signing a message with their wallet**. No password to store. No database of credentials to leak. Just cryptography.

## How is it different from web2? {#how-is-it-different}

| Web2 | Ethereum |
|------|----------|
| Username + password | Wallet address + signature |
| Server stores credentials | User holds private key |
| Sessions managed by cookies / JWT | Sessions verified by onchain signature |
| "Sign in with Google" | "Sign in with Ethereum" |
| Password reset flows | Seed phrase recovery |

The fundamental shift: in web2, a centralized server authenticates you. On Ethereum, **you authenticate yourself** by proving you control a specific address — and anyone can verify it independently.

## Prerequisites {#prerequisites}

Make sure you understand:

- [Ethereum accounts and how they work](/developers/docs/accounts/)
- [What a wallet is and how to connect one](/wallets/)
- [Public-private key cryptography basics](/developers/docs/accounts/#a-wallet-is-a-keypair)

## How wallet-based authentication works {#how-wallet-auth-works}

The core flow is simple:

1. **Your dapp asks the user to connect their wallet** (via MetaMask, Rainbow, WalletConnect, etc.)
2. **The wallet shares the user's Ethereum address** — this is their public identifier
3. **Your dapp generates a unique message** (a nonce or challenge)
4. **The user signs the message** with their private key (happens inside the wallet)
5. **Your backend verifies the signature** against the claimed address
6. **If valid, the user is authenticated**

No password was ever typed, stored, or transmitted.

## Sign-In with Ethereum (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) defines a standard message format for Ethereum sign-in, commonly called **SIWE** (Sign-In with Ethereum). It replaces ad-hoc message signing with a structured, secure standard.

A SIWE message looks like this:

```
ethereum.org wants you to sign in with your Ethereum account:
0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B

I accept the Terms of Service: https://example.com/tos

URI: https://example.com/login
Version: 1
Chain ID: 1
Nonce: 32891757
Issued At: 2024-06-12T14:30:00Z
```

Key features of SIWE:

- **Domain binding** — the message includes the domain, preventing phishing
- **Chain ID** — specifies which network the signature is valid for
- **Nonce** — prevents replay attacks
- **Expiration** — optional timestamp limiting validity window
- **Resources** — optional URIs for scoped access

### SIWE libraries {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** — Official TypeScript implementation by Spruce
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** — Rust implementation
- **[siwe-go](https://github.com/spruceid/siwe-go)** — Go implementation

### Example: client-side sign-in with siwe {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. Get a nonce from your backend
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. Create and sign the SIWE message
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign in to My Dapp',
    uri: window.location.origin,
    version: '1',
    chainId: 1,
    nonce,
  })

  const signature = await signer.signMessage(message.prepareMessage())

  // 3. Send to backend for verification
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### Example: server-side verification (Node.js) {#example-siwe-server}

```ts
import { SiweMessage } from 'siwe'

app.post('/api/auth/verify', async (req, res) => {
  try {
    const { message, signature } = req.body
    const siweMessage = new SiweMessage(message)

    const { success, data } = await siweMessage.verify({ signature })

    if (success) {
      // data.address is the verified Ethereum address
      // Create a session or JWT for the user
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## Wallet connection libraries {#wallet-connection-libraries}

Before authenticating, you need the user to connect their wallet. These libraries make it easy:

- **[RainbowKit](https://www.rainbowkit.com/)** — Ready-to-use React component with beautiful UI
- **[ConnectKit](https://docs.family.co/connectkit)** — Drop-in wallet connection modal
- **[AppKit (WalletConnect)](https://reown.com/appkit)** — Multi-chain wallet connection with built-in SIWE
- **[wagmi](https://wagmi.sh)** — React Hooks library with `useAccount`, `useConnect`

## Verifying signatures manually {#verifying-manually}

If you prefer not to use SIWE, you can verify signatures directly:

```ts
import { verifyMessage } from 'ethers'

// The message the user signed
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// Recover the signer's address from the signature
const recoveredAddress = verifyMessage(message, signature)

// Compare with the claimed address
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // Authentication successful
}
```

### Important security notes {#security-notes}

- **Always use a nonce** — prevents replay attacks where an old signature is reused
- **Include the domain** — prevents signatures from being valid across different sites
- **Check expiration** — signatures should have a limited validity window
- **Use SIWE (EIP-4361) when possible** — it handles all of the above for you
- **Never expose private keys** — the signature happens inside the wallet; your app only sees the result

## Session management {#session-management}

Once authenticated, you still need sessions — just like web2. Common patterns:

- **JWT tokens** — issue a JWT after verifying the signature, use for API requests
- **Server-side sessions** — store the verified address in a session cookie
- **SIWE with resources** — define scoped access tokens linked to specific URIs

The key difference from web2: the user's Ethereum address is their persistent identity. They can use it across any dapp without creating a new account.

## Decentralized identity {#decentralized-identity}

Ethereum authentication is part of a broader movement toward **self-sovereign identity**. Standards and projects in this space include:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** — Human-readable names (e.g., `vitalik.eth`) that resolve to addresses
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** — Onchain attestations about identity and credentials
- **[W3C Decentralized Identifiers (DIDs)](https://www.w3.org/TR/did-core/)** — Global standard for verifiable decentralized identity
- **[Ceramic Network](https://ceramic.network/)** — Decentralized data streams tied to a DID

## Further reading {#further-reading}

- [EIP-4361: Sign-In with Ethereum](https://eips.ethereum.org/EIPS/eip-4361)
- [SIWE documentation](https://docs.login.xyz/)
- [Sign-In with Ethereum on Auth0](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [WalletConnect Auth docs](https://docs.reown.com/appkit/authentication)
- [ENS documentation](https://docs.ens.domains/)

## Related topics {#related-topics}

- [Ethereum accounts](/developers/docs/accounts/)
- [JavaScript API libraries](/developers/docs/apis/javascript/)
- [Backend API libraries](/developers/docs/apis/backend/)
- [Wallets](/wallets/)

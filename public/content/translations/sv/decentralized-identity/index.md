---
title: Decentraliserad Identitet och Modern Autentisering
description: Lär dig om decentraliserad identitet, Web3 authentication, och moderna sätt att hantera användaridentitet.
lang: sv
---

# Decentraliserad Identitet {#decentralized-identity}

Decentraliserad identitet (DID - Decentralized Identity) handlar om att **du** äger och kontrollerar din digitala identitet, inte företag eller regeringar. Kombinerat med moderna autentiseringsmetoder skapar det en kraftfull lösning för nästa generations appar.

## Problemet med traditionell identitet {#the-problem}

### Dagens system {#current-systems}

**Traditionell autentisering:**
```
Du → Email/lösenord → Företagets databas
                    ↓
          De äger din identitet
          De kan stänga av dig
          De kan bli hackade
          Du måste lita på dem
```

**Problemen:**
- 🔐 **Säkerhet**: Lösenord läcker i databas-hacks
- 🏢 **Centralisering**: Företag äger din data
- 🚫 **Lock-in**: Svårt att byta plattform
- 📊 **Privacy**: De vet allt om dig
- ♻️ **Repetition**: Samma info till varje tjänst

## Decentraliserad identitet - Lösningen {#the-solution}

### Self-Sovereign Identity (SSI) {#ssi}

**Du äger din identitet:**
```
Du → Din wallet → Verifiable Credentials
      ↓
   Du kontrollerar
   Du väljer vad du delar
   Ingen kan ta det ifrån dig
```

**Komponenter:**
1. **DID (Decentralized Identifier)** - Din unika ID
2. **Verifiable Credentials** - Digitala bevis
3. **Wallet** - Lagrar din identitet
4. **Blockchain** - Verifierar utan att lagra privat data

## Hur det fungerar {#how-it-works}

### 1. Din DID {#your-did}

Ett DID ser ut så här:
```
did:ethr:0x1234567890123456789012345678901234567890
```

- **did:** - Protokoll prefix
- **ethr:** - Ethereum-baserad
- **0x123...** - Din publika adress

### 2. Verifiable Credentials {#verifiable-credentials}

**Exempel: Åldersverifiering**

```json
{
  "@context": "https://www.w3.org/2018/credentials/v1",
  "type": ["VerifiableCredential", "AgeCredential"],
  "issuer": "did:ethr:0xIssuer...",
  "issuanceDate": "2024-01-01T00:00:00Z",
  "credentialSubject": {
    "id": "did:ethr:0xYou...",
    "ageOver": 18
  },
  "proof": {
    "type": "EthereumEip712Signature2021",
    "created": "2024-01-01T00:00:00Z",
    "proofValue": "0x..."
  }
}
```

**Fördelen**: Du bevisar att du är över 18 **utan att avslöja din exakta ålder eller personnummer**!

### 3. Zero-Knowledge Proofs {#zk-proofs}

**Bevisa något utan att avslöja det:**

```
Påstående: "Jag är över 18"
Bevis: Kryptografiskt bevis
Resultat: Verifierat ✅

Men verifieraren lär sig:
- ❌ INTE din ålder
- ❌ INTE ditt födelsedatum  
- ❌ INTE ditt namn
- ✅ BARA att du är över 18
```

## Web3 Authentication {#web3-auth}

### Wallet-baserad login {#wallet-login}

**Traditionell login:**
```typescript
// Email + lösenord
await login(email, password);
```

**Web3 login:**
```typescript
// Sign message med wallet
import { useSignMessage } from 'wagmi';

function Login() {
  const { signMessage } = useSignMessage();
  
  async function login() {
    const message = 'Sign to login to MyApp';
    await signMessage({ message });
  }
}
```

**Fördelar:**
- ✅ Inget lösenord att glömma
- ✅ Inget att hacka (ingen databas)
- ✅ Fungerar cross-platform
- ✅ Du kontrollerar access

### SIWE (Sign-In with Ethereum) {#siwe}

**Standard för Web3 authentication:**

```typescript
import { SiweMessage } from 'siwe';

// 1. Skapa meddelande
const message = new SiweMessage({
  domain: 'myapp.com',
  address: userAddress,
  statement: 'Sign in to MyApp',
  uri: 'https://myapp.com',
  version: '1',
  chainId: 1,
});

// 2. Användaren signerar
const signature = await signer.signMessage(message.prepareMessage());

// 3. Verifiera på backend
const verified = await message.verify({ signature });

if (verified) {
  // Användaren är autentiserad! ✅
}
```

## Implementation: Modern Auth {#implementation}

### NextAuth.js + Web3 {#nextauth-web3}

**Setup:**
```bash
npm install next-auth siwe ethers
```

**Auth config:**
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"));
        const result = await siwe.verify({
          signature: credentials?.signature || "",
        });

        if (result.success) {
          return {
            id: siwe.address,
          };
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
```

**Frontend:**
```typescript
'use client'
import { useAccount, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import { signIn } from 'next-auth/react';

export function SignInButton() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  async function handleSignIn() {
    const message = new SiweMessage({
      domain: window.location.host,
      address: address,
      statement: 'Sign in with Ethereum',
      uri: window.location.origin,
      version: '1',
      chainId: 1,
    });

    const signature = await signMessageAsync({
      message: message.prepareMessage(),
    });

    await signIn('credentials', {
      message: JSON.stringify(message),
      signature,
      redirect: false,
    });
  }

  return (
    <button onClick={handleSignIn}>
      Sign in with Ethereum
    </button>
  );
}
```

### ENS (Ethereum Name Service) {#ens}

**Från 0x123... till readable names:**

```typescript
import { normalize } from 'viem/ens';
import { useEnsName, useEnsAvatar } from 'wagmi';

function Profile({ address }: { address: string }) {
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: normalize(ensName) });

  return (
    <div>
      {ensAvatar && <img src={ensAvatar} alt="Avatar" />}
      <p>{ensName || address}</p>
    </div>
  );
}

// 0x123... → alice.eth
```

**Registrera ENS:**
```typescript
// På app.ens.domains
// Eller programmatiskt
import { ENS } from '@ensdomains/ensjs';

const ens = new ENS();
await ens.name('alice.eth').getAddress();
```

## Verifiable Credentials i praktiken {#vc-practice}

### Issue ett credential {#issue-credential}

```typescript
import { createVerifiableCredentialJwt } from 'did-jwt-vc';

const vcPayload = {
  sub: 'did:ethr:0xUser...',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential', 'UniversityDegree'],
    credentialSubject: {
      degree: {
        type: 'BachelorDegree',
        name: 'Computer Science'
      }
    }
  }
};

const vcJwt = await createVerifiableCredentialJwt(
  vcPayload,
  issuerDID
);

// vcJwt kan nu delas med studenten
```

### Verifiera ett credential {#verify-credential}

```typescript
import { verifyCredential } from 'did-jwt-vc';

const verifiedVC = await verifyCredential(vcJwt, resolver);

if (verifiedVC.verified) {
  console.log('Credential är giltigt!');
  console.log(verifiedVC.verifiableCredential);
}
```

### Lagra i wallet {#store-wallet}

**MetaMask Snaps:**
```typescript
// Lagra credentials i MetaMask
await window.ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'npm:@veramo/snap',
    request: {
      method: 'saveCredential',
      params: {
        credential: vcJwt
      }
    }
  }
});
```

## Privacy-preserving Auth {#privacy-auth}

### Selective Disclosure {#selective-disclosure}

**Dela bara vad som behövs:**

```typescript
// Du har dessa credentials:
const credentials = {
  name: "Anna Andersson",
  age: 25,
  address: "Stockholm",
  email: "anna@example.com",
  degree: "Computer Science"
};

// App ber om:
const requested = ['age', 'degree'];

// Du väljer att dela:
const shared = {
  ageOver18: true,  // Inte exakt ålder!
  degree: "Computer Science"
};

// App får INTE: name, exact age, address, email
```

### Private credentials med ZK {#zk-credentials}

```typescript
// Bevisa attribut utan att avslöja dem
import { generateProof, verifyProof } from 'zk-library';

// Bevisa att du har en examen
const proof = await generateProof({
  credential: degreeCredential,
  statement: "I have a university degree",
  // Actual degree type döljs
});

// Verifierare checkar
const valid = await verifyProof(proof);
// ✅ Vet: Personen har examen
// ❌ Vet INTE: Vilken examen eller från vilken skola
```

## Modern Identity Providers {#identity-providers}

### 1. Dynamic.xyz {#dynamic}

**Enklaste Web3 auth:**

```tsx
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';

export default function App() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: 'your-env-id',
        walletConnectors: ['metamask', 'coinbase', 'walletconnect'],
      }}
    >
      <DynamicWidget />
    </DynamicContextProvider>
  );
}
```

### 2. Privy {#privy}

**Web3 + Email:**

```tsx
import { PrivyProvider, usePrivy } from '@privy-io/react-auth';

function LoginButton() {
  const { login } = usePrivy();
  
  return <button onClick={login}>Login</button>;
}

export default function App() {
  return (
    <PrivyProvider appId="your-app-id">
      <LoginButton />
    </PrivyProvider>
  );
}
```

### 3. Web3Auth {#web3auth}

**Social login → Web3:**

```typescript
import { Web3Auth } from "@web3auth/modal";

const web3auth = new Web3Auth({
  clientId: "YOUR_CLIENT_ID",
  chainConfig: {
    chainNamespace: "eip155",
    chainId: "0x1",
  },
});

await web3auth.initModal();
await web3auth.connect();

// Användare kan logga in med Google, men får en wallet!
```

## Use Cases {#use-cases}

### 1. KYC utan data leak {#kyc}

**Traditionellt:**
- Skicka pass-kopia till varje tjänst
- Riskabelt (data läcker)
- Upprepat för varje app

**Med DID:**
```
Bank verifierar dig EN gång
  ↓
Issue Verifiable Credential
  ↓
Du använder samma credential överallt
  ↓
Ingen ny app får din passport data
```

### 2. Professional Credentials {#professional}

**LinkedIn-profil på blockchain:**
- University issues degree credential
- Employer issues work experience credential
- Du äger och kontrollerar allt

```typescript
const professionalProfile = {
  education: [degreeCredential],
  workExperience: [experienceCredential],
  skills: [certificationCredential]
};

// Dela med employers utan middleman
```

### 3. Healthcare {#healthcare}

**Medicinska journaler:**
- Du äger din health data
- Selective sharing med doctors
- Privacy-preserving

```
Du → Health Credential (encrypted)
     ↓
  Dela med doktor A (viss data)
  Dela med doktor B (annan data)
  Dölj för andra
```

### 4. Age Verification {#age-verification}

**För apps som behöver åldersverifiering:**

```typescript
// User proves age without revealing birthdate
const ageProof = await proveAgeOver(18, birthCertificateCredential);

// App verifierar
if (await verifyAgeProof(ageProof)) {
  // Grant access
}

// App lär sig: User är över 18
// App lär sig INTE: Exact age, birthdate, name
```

## DID Standards {#did-standards}

### DID Methods {#did-methods}

**did:ethr:** - Ethereum-based
```
did:ethr:0x1234567890123456789012345678901234567890
```

**did:key:** - Cryptographic key-based
```
did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH
```

**did:web:** - Web-based (domain)
```
did:web:example.com
```

### Verifiable Credentials Data Model {#vc-data-model}

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1"
  ],
  "id": "http://example.com/credentials/123",
  "type": ["VerifiableCredential"],
  "issuer": "did:example:issuer",
  "issuanceDate": "2024-01-01T00:00:00Z",
  "credentialSubject": {
    "id": "did:example:subject",
    "claim": "value"
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2024-01-01T00:00:00Z",
    "verificationMethod": "did:example:issuer#key-1",
    "proofPurpose": "assertionMethod",
    "proofValue": "base64-encoded-signature"
  }
}
```

## Build Your Own DID System {#build-did}

### Med Veramo {#veramo}

```bash
npm install @veramo/core @veramo/did-manager @veramo/kms-local
```

```typescript
import { createAgent } from '@veramo/core';
import { DIDManager } from '@veramo/did-manager';
import { EthrDIDProvider } from '@veramo/did-provider-ethr';

const agent = createAgent({
  plugins: [
    new DIDManager({
      providers: [
        new EthrDIDProvider({
          defaultKms: 'local',
          network: 'mainnet',
        }),
      ],
    }),
  ],
});

// Skapa DID
const did = await agent.didManagerCreate({
  provider: 'did:ethr',
});

console.log(did.did); // did:ethr:0x...
```

## Security Considerations {#security}

### Best Practices {#best-practices}

**1. Private key management**
```typescript
// ❌ Lagra ALDRIG private keys i kod
const privateKey = "0x123..."; // NEVER!

// ✅ Använd secure key management
const signer = new KMSEthereumProvider({
  kms: 'local',
  keyRef: 'did-key-1'
});
```

**2. Credential revocation**
```typescript
// Implementera revocation registry
const revoked = await checkRevocationStatus(credentialId);
if (revoked) {
  throw new Error('Credential has been revoked');
}
```

**3. Expiration**
```json
{
  "expirationDate": "2025-12-31T23:59:59Z",
  "credentialSubject": { ... }
}
```

## Future of Identity {#future}

**Trends:**
- **Account Abstraction** - Bättre UX för wallets
- **Biometric DIDs** - Face/finger för recovery
- **Portable reputation** - Ta din reputation överallt
- **Cross-chain identity** - En identitet, alla chains
- **AI + DID** - AI agents med verifiable identity

## Resources {#resources}

### Standards & Specs {#specs}
- **W3C DID Core** - DID specification
- **W3C Verifiable Credentials** - VC data model
- **EIP-712** - Typed structured data hashing
- **SIWE** - Sign-In with Ethereum

### Tools & Libraries {#tools}
- **Veramo** - Modular DID framework
- **SpruceID** - Open-source identity toolkit
- **Ceramic Network** - Decentralized data network
- **Lit Protocol** - Access control

### Learn More {#learn-more}
- **DIF (Decentralized Identity Foundation)**
- **W3C Credentials Community Group**
- **SSI Meetup** - Community events

Decentraliserad identitet är framtiden - börja bygga idag! 🔐

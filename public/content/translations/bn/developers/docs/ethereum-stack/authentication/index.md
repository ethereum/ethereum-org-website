---
title: ইথেরিয়ামে প্রমাণীকরণ
description: ইথেরিয়াম অ্যাপ্লিকেশনগুলোতে ব্যবহারকারীর প্রমাণীকরণ কীভাবে কাজ করে তা জানুন—কোনো পাসওয়ার্ড নেই, শুধু ওয়ালেট এবং স্বাক্ষর।
lang: bn
---

আপনি যদি প্রথাগত ওয়েব ডেভেলপমেন্ট থেকে এসে থাকেন, তবে আপনি ব্যবহারকারীর নাম/পাসওয়ার্ড লগইন, OAuth ফ্লো এবং সেশন কুকিজের সাথে অভ্যস্ত। ইথেরিয়ামে প্রমাণীকরণ ভিন্নভাবে কাজ করে—এবং অনেক দিক থেকে, আরও সহজভাবে।

ইথেরিয়ামে, একজন ব্যবহারকারী **তাদের ওয়ালেট দিয়ে একটি বার্তা স্বাক্ষরকরণ**-এর মাধ্যমে তাদের পরিচয় প্রমাণ করেন। সংরক্ষণ করার মতো কোনো পাসওয়ার্ড নেই। ফাঁস হওয়ার মতো ক্রেডেনশিয়ালের কোনো ডাটাবেস নেই। শুধু ক্রিপ্টোগ্রাফি।

## এটি ওয়েব২ থেকে কীভাবে আলাদা? {#how-is-it-different}

| ওয়েব২ | ইথেরিয়াম |
| --------------------------------- | ------------------------------------------------ |
| ব্যবহারকারীর নাম + পাসওয়ার্ড | ওয়ালেট ঠিকানা + স্বাক্ষর |
| সার্ভার ক্রেডেনশিয়াল সংরক্ষণ করে | ব্যবহারকারী প্রাইভেট কী ধারণ করেন |
| সেশনগুলো কুকিজ / JWT দ্বারা পরিচালিত হয় | সেশনগুলো একটি অফচেইন ওয়ালেট স্বাক্ষর দিয়ে শুরু হয় |
| "Sign in with Google" | "Sign in with Ethereum" |
| পাসওয়ার্ড রিসেট ফ্লো | সিড ফ্রেজ পুনরুদ্ধার |

মৌলিক পরিবর্তন: ওয়েব২-তে, একটি কেন্দ্রীভূত সার্ভার আপনাকে প্রমাণীকরণ করে। ইথেরিয়ামে, আপনি একটি নির্দিষ্ট ঠিকানা নিয়ন্ত্রণ করেন তা প্রমাণ করার মাধ্যমে **আপনি নিজেকে প্রমাণীকরণ করেন**—এবং যে কেউ স্বাধীনভাবে এটি যাচাই করতে পারে।

## পূর্বশর্ত {#prerequisites}

নিশ্চিত করুন যে আপনি বুঝতে পেরেছেন:

- [ইথেরিয়াম অ্যাকাউন্ট এবং সেগুলো কীভাবে কাজ করে](/developers/docs/accounts/)
- [ওয়ালেট কী এবং কীভাবে এটি সংযুক্ত করতে হয়](/wallets/)
- [পাবলিক-প্রাইভেট কী ক্রিপ্টোগ্রাফির মূল বিষয়গুলো](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## ওয়ালেট-ভিত্তিক প্রমাণীকরণ কীভাবে কাজ করে {#how-wallet-auth-works}

মূল ফ্লোটি সহজ:

1. **আপনার বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) ব্যবহারকারীকে তাদের ওয়ালেট সংযুক্ত করতে বলে** (মেটামাস্ক, Rainbow, WalletConnect ইত্যাদির মাধ্যমে)
2. **ওয়ালেটটি ব্যবহারকারীর ইথেরিয়াম ঠিকানা শেয়ার করে** - এটি তাদের সর্বজনীন শনাক্তকারী
3. **আপনার dapp একটি অনন্য বার্তা তৈরি করে** (একটি নন্স বা চ্যালেঞ্জ)
4. **ব্যবহারকারী তাদের প্রাইভেট কী দিয়ে বার্তাটিতে স্বাক্ষর করেন** (এটি ওয়ালেটের ভেতরে ঘটে)
5. **আপনার ব্যাকএন্ড দাবিকৃত ঠিকানার বিপরীতে স্বাক্ষরটি যাচাই করে**
6. **যদি বৈধ হয়, তবে ব্যবহারকারী প্রমাণীকৃত হন**

কোনো পাসওয়ার্ড কখনও টাইপ, সংরক্ষণ বা প্রেরণ করা হয়নি।

## ইথেরিয়ামের সাথে সাইন-ইন (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) ইথেরিয়াম সাইন-ইনের জন্য একটি প্রমিত বার্তা বিন্যাস সংজ্ঞায়িত করে, যাকে সাধারণত **SIWE** (Sign-In with Ethereum) বলা হয়। এটি অ্যাড-হক বার্তা স্বাক্ষরকরণকে একটি কাঠামোগত, সুরক্ষিত মান দিয়ে প্রতিস্থাপন করে।

একটি SIWE বার্তা দেখতে এরকম হয়:

```yaml
example.com wants you to sign in with your Ethereum account:
0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B

I accept the Terms of Service: https://example.com/tos

URI: https://example.com/login
Version: 1
Chain ID: 1
Nonce: 32891757
Issued At: 2024-06-12T14:30:00Z
```

SIWE-এর মূল বৈশিষ্ট্যগুলো:

- **ডোমেইন বাইন্ডিং** - বার্তাটিতে ডোমেইন অন্তর্ভুক্ত থাকে, যা ফিশিং প্রতিরোধ করে
- **চেইন আইডি** - স্বাক্ষরটি কোন নেটওয়ার্ক-এর জন্য বৈধ তা নির্দিষ্ট করে
- **নন্স** - রিপ্লে আক্রমণ প্রতিরোধ করে
- **মেয়াদোত্তীর্ণ** - ঐচ্ছিক টাইমস্ট্যাম্প যা বৈধতার সময়সীমা সীমিত করে
- **রিসোর্স** - স্কোপড অ্যাক্সেসের জন্য ঐচ্ছিক URI

### SIWE লাইব্রেরি {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** - Spruce দ্বারা অফিসিয়াল TypeScript বাস্তবায়ন
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** - Rust বাস্তবায়ন
- **[siwe-go](https://github.com/spruceid/siwe-go)** - Go বাস্তবায়ন

### উদাহরণ: siwe-এর সাথে ক্লায়েন্ট-সাইড সাইন-ইন {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. আপনার ব্যাকএন্ড থেকে একটি নন্স নিন
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. SIWE বার্তা তৈরি এবং স্বাক্ষর করুন
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

  // 3. যাচাইয়ের জন্য ব্যাকএন্ডে পাঠান
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### উদাহরণ: সার্ভার-সাইড যাচাইকরণ (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// একটি নন্স ইস্যু করুন এবং এটি সেশনে সংরক্ষণ করুন যাতে /verify পরে এটি যাচাই করতে পারে
app.get('/api/auth/nonce', (req, res) => {
  req.session.nonce = generateNonce()
  res.json({ nonce: req.session.nonce })
})

app.post('/api/auth/verify', async (req, res) => {
  try {
    const { message, signature } = req.body
    const siweMessage = new SiweMessage(message)

    const { success, data } = await siweMessage.verify({
      signature,
      nonce: req.session.nonce,
    })

    if (success) {
      // data.address হলো যাচাইকৃত ইথেরিয়াম ঠিকানা
      // ব্যবহারকারীর জন্য একটি সেশন বা JWT তৈরি করুন
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## ওয়ালেট সংযোগ লাইব্রেরি {#wallet-connection-libraries}

প্রমাণীকরণের আগে, ব্যবহারকারীকে তাদের ওয়ালেট সংযুক্ত করতে হবে। এই লাইব্রেরিগুলো এটিকে সহজ করে তোলে:

- **[RainbowKit](https://www.rainbowkit.com/)** - সুন্দর UI সহ ব্যবহারের জন্য প্রস্তুত React কম্পোনেন্ট
- **[ConnectKit](https://docs.family.co/connectkit)** - ড্রপ-ইন ওয়ালেট সংযোগ মোডাল
- **[AppKit (WalletConnect)](https://reown.com/appkit)** - বিল্ট-ইন SIWE সহ মাল্টিচেইন ওয়ালেট সংযোগ
- **[Wagmi](https://wagmi.sh)** - `useAccount` এবং `useConnect` সহ React হুকস লাইব্রেরি

## ম্যানুয়ালি স্বাক্ষর যাচাইকরণ {#verifying-manually}

আপনি যদি SIWE ব্যবহার করতে না চান, তবে আপনি সরাসরি স্বাক্ষর যাচাই করতে পারেন:

```ts
import { verifyMessage } from 'ethers'

// ব্যবহারকারী যে বার্তাটিতে স্বাক্ষর করেছেন
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// স্বাক্ষর থেকে স্বাক্ষরকারীর ঠিকানা পুনরুদ্ধার করুন
const recoveredAddress = verifyMessage(message, signature)

// দাবিকৃত ঠিকানার সাথে তুলনা করুন
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // প্রমাণীকরণ সফল
}
```

### গুরুত্বপূর্ণ নিরাপত্তা নোট {#security-notes}

- **সর্বদা একটি নন্স ব্যবহার করুন** - রিপ্লে আক্রমণ প্রতিরোধ করে যেখানে একটি পুরানো স্বাক্ষর পুনরায় ব্যবহার করা হয়
- **ডোমেইন অন্তর্ভুক্ত করুন** - স্বাক্ষরগুলোকে বিভিন্ন সাইট জুড়ে বৈধ হওয়া থেকে বাধা দেয়
- **মেয়াদোত্তীর্ণ পরীক্ষা করুন** - স্বাক্ষরগুলোর একটি সীমিত বৈধতার সময়সীমা থাকা উচিত
- **সম্ভব হলে SIWE (EIP-4361) ব্যবহার করুন** - এটি আপনার জন্য উপরের সমস্ত কিছু পরিচালনা করে
- **কখনও প্রাইভেট কী প্রকাশ করবেন না** - স্বাক্ষরকরণ ওয়ালেটের ভেতরে ঘটে; আপনার অ্যাপ কেবল ফলাফলটি দেখতে পায়

## সেশন ব্যবস্থাপনা {#session-management}

একবার প্রমাণীকৃত হওয়ার পর, আপনার এখনও সেশনের প্রয়োজন হবে—ঠিক ওয়েব২-এর মতো। সাধারণ প্যাটার্নগুলো হলো:

- **JWT টোকেন** - স্বাক্ষর যাচাই করার পর একটি JWT ইস্যু করুন, API অনুরোধের জন্য ব্যবহার করুন
- **সার্ভার-সাইড সেশন** - যাচাইকৃত ঠিকানাটি একটি সেশন কুকিতে সংরক্ষণ করুন
- **রিসোর্সসহ SIWE** - নির্দিষ্ট URI-এর সাথে যুক্ত স্কোপড অ্যাক্সেস টোকেন সংজ্ঞায়িত করুন

ওয়েব২ থেকে মূল পার্থক্য: ব্যবহারকারীর ইথেরিয়াম ঠিকানা হলো তাদের স্থায়ী পরিচয়। তারা নতুন কোনো অ্যাকাউন্ট তৈরি না করেই যেকোনো dapp জুড়ে এটি ব্যবহার করতে পারে।

## বিকেন্দ্রীভূত পরিচয় (ডিআইডি) {#decentralized-identity}

ইথেরিয়াম প্রমাণীকরণ হলো **সেলফ-সোভেরেইন আইডেন্টিটি** (self-sovereign identity)-এর দিকে একটি বৃহত্তর আন্দোলনের অংশ। এই ক্ষেত্রের মান এবং প্রকল্পগুলোর মধ্যে রয়েছে:

- **[ইথেরিয়াম নেম সার্ভিস (ENS)](https://ens.domains/)** - মানুষের পাঠযোগ্য নাম (যেমন, `vitalik.eth`) যা ঠিকানায় রূপান্তরিত হয়
- **[ইথেরিয়াম অ্যাটেস্টেশন সার্ভিস (EAS)](https://attest.org/)** - পরিচয় এবং ক্রেডেনশিয়াল সম্পর্কে অনচেইন সত্যায়ন
- **[W3C ডিসেন্ট্রালাইজড আইডেন্টিফায়ার (DIDs)](https://www.w3.org/TR/did-core/)** - যাচাইযোগ্য বিকেন্দ্রীভূত পরিচয় (ডিআইডি)-এর জন্য বৈশ্বিক মান
- **[Ceramic নেটওয়ার্ক](https://ceramic.network/)** - একটি ডিআইডি (DID)-এর সাথে যুক্ত বিকেন্দ্রীকৃত ডেটা স্ট্রিম

## আরও পড়ুন {#further-reading}

- [EIP-4361: ইথেরিয়ামের সাথে সাইন-ইন](https://eips.ethereum.org/EIPS/eip-4361)
- [SIWE ডকুমেন্টেশন](https://docs.login.xyz/)
- [Auth0-তে ইথেরিয়ামের সাথে সাইন-ইন](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Reown AppKit প্রমাণীকরণ ডক্স](https://docs.reown.com/appkit/authentication)
- [ENS ডকুমেন্টেশন](https://docs.ens.domains/)

## সম্পর্কিত বিষয়গুলো {#related-topics}

- [ইথেরিয়াম অ্যাকাউন্ট](/developers/docs/accounts/)
- [JavaScript API লাইব্রেরি](/developers/docs/apis/javascript/)
- [ব্যাকএন্ড API লাইব্রেরি](/developers/docs/apis/backend/)
- [ওয়ালেট](/wallets/)
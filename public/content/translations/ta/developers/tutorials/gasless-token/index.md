---
title: "உங்கள் எரிவாயு இல்லாத பயனர்களை வில்லைகளை வைத்திருக்கவும் ஒப்பந்தங்களை அழைக்கவும் அனுமதித்தல்"
description: "கணக்குச் சுருக்கத்தைப் பயன்படுத்தி, ஒரு குறிப்பிட்ட EOA மூலம் அனுப்பப்பட்ட அல்லது அந்த EOA ஆல் கையொப்பமிடப்பட்ட பரிவர்த்தனைகளை ஏற்கும் திறன் ஒப்பந்தப் பணப்பைகளை நாம் உருவாக்கலாம். இந்தத் திறன் ஒப்பந்தங்கள் பின்னர் வில்லைகளைச் சொந்தமாகக் கொண்டிருக்கலாம், அவை EOA இன் கட்டுப்பாட்டில் இருக்கும்."
author: ஓரி பொமரன்ட்ஸ்
tags: ["எரிவாயு இல்லாத", "erc-20", "கணக்குச் சுருக்கம்"]
skill: intermediate
breadcrumb: "எரிவாயு இல்லாத வில்லை"
lang: ta
published: 2026-04-01
---

## அறிமுகம் {#introduction}

ஒரு [முந்தைய கட்டுரை](/developers/tutorials/gasless/) EIP-712 கையொப்பங்களைப் பயன்படுத்தி உங்கள் சொந்தப் பயன்பாட்டிற்கு எரிவாயு இல்லாத அணுகலைப் பயன்படுத்துவது பற்றி விவாதித்தது, ஆனால் இது உங்கள் சொந்தத் திறன் ஒப்பந்தங்களுக்கு மட்டுமே வரம்பிற்குட்பட்டது. [கணக்குச் சுருக்கத்தைப்](/roadmap/account-abstraction/) பயன்படுத்தி, இரண்டு வகையான பரிவர்த்தனைகளை ஏற்றுக்கொண்டு, கோரப்பட்ட இலக்குக்கு அவற்றை அனுப்பும் திறன் ஒப்பந்தப் பணப்பைகளை நாம் உருவாக்கலாம்:

- ஒரு குறிப்பிட்ட EOA மூலம் அனுப்பப்படும் பரிவர்த்தனைகள் (இதற்கு அந்த EOA-விடம் ETH இருக்க வேண்டும்)
- எங்கிருந்தும் அனுப்பப்பட்ட, ஆனால் அதே EOA ஆல் கையொப்பமிடப்பட்ட பரிவர்த்தனைகள்.

இந்த வழியில், ஒரு கணக்கு சொத்துக்களை (வில்லைகள் போன்றவை) வைத்திருக்கவும், எரிவாயு உள்ள ஒரு EOA செய்யக்கூடிய அனைத்து செயல்பாடுகளையும் செய்யவும் எரிவாயு இல்லாத வழியை நாம் வழங்க முடியும்.

### கோரிக்கையை நாம் ஏன் அப்படியே அனுப்ப முடியாது? {#why-no-tx-origin}

ERC-20 மற்றும் தொடர்புடைய தரநிலைகளில், கணக்கின் உரிமையாளர் [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties) ஆவார், இது வில்லை ஒப்பந்தத்தை அழைத்த முகவரியாகும், இது பரிவர்த்தனையைத் தொடங்கியவராக இருக்க வேண்டிய அவசியமில்லை, [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties). இது [பாதுகாப்புக் காரணங்களுக்காகத்](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin) தேவைப்படுகிறது. இதன் பொருள் என்னவென்றால், நாம் வில்லைப் பரிமாற்றக் கோரிக்கைகளை அனுப்பினால், அவை பயனரால் கட்டுப்படுத்தப்படும் முகவரிக்கு பதிலாக அனுப்புநரின் முகவரியிலிருந்து வில்லைகளைப் பரிமாற்றம் செய்ய முயற்சிக்கும்.

[EIP-7702](https://eip7702.io/) வழியாக EOA முகவரியைப் பயன்படுத்த உங்களை அனுமதிக்கும் ஒரு தீர்வு உள்ளது, ஆனால் இதற்கு ஆபத்தானதாக இருக்கக்கூடிய ஒரு பிரதிநிதித்துவத்தில் கையொப்பமிட வேண்டும், எனவே பணப்பை வழங்குநர் ஒப்புதல் அளிக்கும் ஒரு திறன் ஒப்பந்தத்திற்குப் பிரதிநிதித்துவம் செய்ய மட்டுமே நீங்கள் இதைப் பயன்படுத்த முடியும். இந்த வழிகாட்டிக்கு, பயனருக்கான ஒரு ப்ராக்ஸியாக ஒரு திறன் ஒப்பந்தத்தை உருவாக்கும் மிகவும் எளிமையான முறையை நான் விரும்புகிறேன்.

## இது செயல்படுவதைப் பார்த்தல் {#in-action}

1. உங்களிடம் [Node](https://nodejs.org/en/download) மற்றும் [Foundry](https://www.getfoundry.sh/introduction/installation) இரண்டும் இருப்பதை உறுதிசெய்யவும்.

2. பயன்பாட்டை குளோன் செய்து தேவையான மென்பொருளை நிறுவவும்.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. Sepolia-வில் ETH உள்ள ஒரு பணப்பைக்கு `SEPOLIA_PRIVATE_KEY`-ஐ அமைக்க `.env`-ஐத் திருத்தவும். உங்களுக்கு Sepolia ETH தேவைப்பட்டால், அதைப் பெற [ஒரு பாசெட்டைப் பயன்படுத்தவும்](/developers/docs/networks/#sepolia). வெறுமனே, இந்தத் தனிப்பட்ட திறவுகோல் உங்கள் உலாவிப் பணப்பையில் உள்ளதிலிருந்து வேறுபட்டதாக இருக்க வேண்டும்.

4. சேவையகத்தைத் தொடங்கவும்.

   ```sh
   npm run dev
   ```

5. [`http://localhost:5173`](http://localhost:5173) என்ற URL-இல் உள்ள பயன்பாட்டிற்குச் செல்லவும்.

6. ஒரு பணப்பையுடன் இணைக்க **Connect with Injected** என்பதைக் கிளிக் செய்யவும். பணப்பையில் ஒப்புதல் அளிக்கவும், தேவைப்பட்டால் Sepolia-விற்கான மாற்றத்திற்கும் ஒப்புதல் அளிக்கவும்.

7. கீழே ஸ்க்ரோல் செய்து **Deploy UserProxy (slow process)** என்பதைக் கிளிக் செய்யவும்.

8. பயனர் ப்ராக்ஸி எப்போது நிலைநிறுத்தப்படுகிறது என்பதை நீங்கள் பார்க்கலாம், ஏனெனில் **UserProxy access** என்பதற்குப் பக்கத்தில் ஒரு முகவரி இருக்கும். நீங்கள் 24 வினாடிகள் (2 தொகுதிகள்) காத்திருந்தும் அது இன்னும் நடக்கவில்லை என்றால், மாற்றங்களைக் கண்டறிவதில் சிக்கல் இருக்கலாம்.

   அப்படி இருந்தால், [Sepolia Explorer](https://eth-sepolia.blockscout.com/)-க்குச் சென்று, `npm run dev`-இல் சேவையக வெளியீட்டில் நீங்கள் காணும் நிலைநிறுத்தப் பரிவர்த்தனை ஹாஷை உள்ளிடவும். உருவாக்கப்பட்ட ஒப்பந்தத்தின் முகவரியைக் காண அதைக் கிளிக் செய்து, பின்னர் அதை நகலெடுக்கவும். _Or enter existing proxy address_ புலத்தில் முகவரியை ஒட்டவும், பின்னர் **Set proxy address** என்பதைக் கிளிக் செய்யவும்.

9. வில்லைகளைப் பெற ERC-20 ஒப்பந்தத்தின் [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) செயல்பாட்டிற்கு ஒரு அழைப்பைச் சமர்ப்பிக்க **Request more tokens for proxy** என்பதைக் கிளிக் செய்யவும். பணப்பையில் கையொப்பத்தை **Confirm** செய்யவும். நிச்சயமாக, வில்லைகள் ப்ராக்ஸியின் முகவரியைச் சென்றடைகின்றன, பயனரின் முகவரியை அல்ல.

10. கீழே ஸ்க்ரோல் செய்து _Last transaction:_-இன் கீழ் உள்ள இணைப்பைக் கிளிக் செய்யவும். இது `faucet` பரிவர்த்தனையைக் காட்ட உலாவியைத் திறக்கும்.

11. _amount to transfer_-இல், ஒன்று முதல் ஆயிரம் வரையிலான எண்ணை உள்ளிடவும். வில்லைகளை உங்கள் சொந்த முகவரிக்குப் பரிமாற்றம் செய்ய **Transfer** என்பதைக் கிளிக் செய்யவும். கோரிக்கைக்கு **Confirm** என்பதைக் கிளிக் செய்வதற்கு முன், கையொப்பமிடப்படும் தரவு ஒளிபுகாததாக இருப்பதைக் காணவும். தாங்கள் எதில் கையொப்பமிடுகிறோம் என்பதைப் புரிந்துகொள்வதில் பயனர்கள் சிரமப்படுவார்கள். இதை நாம் [கீழே](#vulnerabilities) விவாதிப்போம் என்பதை நினைவில் கொள்ளவும்.

12. பரிவர்த்தனை உறுதிசெய்யப்பட்ட பிறகு, _your balance_ மற்றும் _proxy balance_ இரண்டிலும் மாற்றத்தைக் காணக் காத்திருக்கவும். Sepolia 12 வினாடிகள் தொகுதி நேரத்தைக் கொண்டிருப்பதால், இதற்கும் சிறிது நேரம் ஆகும் என்பதைக் கவனத்தில் கொள்ளவும்.

## இது எவ்வாறு செயல்படுகிறது {#how-work}

எரிவாயு இல்லாத அனுபவத்திற்கு, பயனருக்கான ஒரு பயனர் இடைமுகம், பயனர் இடைமுகத்திலிருந்து சங்கிலிக்குச் செய்திகளை வழிநடத்த ஒரு சேவையகம் மற்றும் அவற்றைப் பெற்றுச் சரிபார்க்க ஒரு திறன் ஒப்பந்தம் ஆகியவை நமக்குத் தேவை.

### பணப்பைத் திறன் ஒப்பந்தம் {#wallet-smart-contract}

இதுதான் [திறன் ஒப்பந்தம்](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol). இதைக் கோருவதற்குப் பயன்படுத்தப்படும் சேனலைப் பொருட்படுத்தாமல், உண்மையான உரிமையாளர் கோருவதைச் செய்வதும், மற்ற அனைத்தையும் புறக்கணிப்பதுமே இதன் நோக்கமாகும். இதைச் செய்ய, இதன் செயல்பாடுகள் அழைக்க வேண்டிய இலக்கு முகவரியையும், அதை அழைக்கப் பயன்படுத்த வேண்டிய தரவையும் பெறுகின்றன.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

உரிமையாளரின் அடையாளம் மற்றும் செய்திகள் மீண்டும் மீண்டும் வருவதைத் தடுக்க ஒரு [நான்ஸ்](https://en.wikipedia.org/wiki/Cryptographic_nonce). நான்ஸ் ஒரு `public` மாறியாக இருப்பதால், Solidity கம்பைலர் ஒரு காட்சிச் செயல்பாட்டையும் உருவாக்குகிறது, [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0), இது புறச்சங்கிலிக் குறியீட்டை அதன் மதிப்பைப் படிக்க அனுமதிக்கிறது.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

[EIP-712 கையொப்பங்களைச்](https://eips.ethereum.org/EIPS/eip-712) சரிபார்க்கத் தேவையான தகவல்.

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

ஒரு `UserProxy` ஒரு ஒற்றை உரிமையாளர் முகவரியுடன் பிணைக்கப்பட்டுள்ளது. இது சொத்துக்களை (ERC-20 வில்லைகள், NFT-கள் போன்றவை) சொந்தமாகக் கொண்டிருக்க முடியும் என்பதால் இது அவசியமாகும். வெவ்வேறு உரிமையாளர்களுக்குச் சொந்தமான சொத்துக்களை நாம் ஒன்றோடொன்று கலக்க விரும்பவில்லை.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

[டொமைன் பிரிப்பான்](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). இது சங்கிலி ID மற்றும் ஒப்பந்த முகவரியைப் பொறுத்தது என்பதால், இதைத் தொகுக்கும் நேரத்தில் கணக்கிட முடியாது. இது ஒரு UserProxy-ஐ மற்றொன்றுக்காகத் தயாரிக்கப்பட்ட செய்தியால் ஏமாற்றப்படுவதை சாத்தியமற்றதாக்குகிறது.

```solidity
    event CallResult(address target, bytes returnData);
```

ஒரு அழைப்பின் முடிவுகளைப் பதிவு செய்யவும்.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

இந்தச் செயல்பாட்டை உரிமையாளர் நேரடியாக அழைக்கலாம். எந்த ரிலேக்களும் கிடைக்கவில்லை என்றால், உரிமையாளர் இன்னும் தொகுதிச்சங்கிலியில் நேரடியாகச் சொத்துக்களை அணுக முடியும் (பயனரிடம் ETH இருந்தால்).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

உரிமையாளரால் நாம் _நேரடியாக_ அழைக்கப்பட்டால், வழங்கப்பட்ட அழைப்புத் தரவுடன் இலக்கை அழைக்கவும்.

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

இது `UserProxy`-இன் முக்கியச் செயல்பாடாகும். இது `target` மற்றும் `data` ஆகியவற்றையும், ஒரு கையொப்பத்தையும் பெறுகிறது.

```solidity
    external returns (bytes memory) {
        // EIP-712 சுருக்கத்தைக் கணக்கிடு
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

டைஜெஸ்ட்டில் நான்ஸும் அடங்கும், ஆனால் நாம் அதைப் பரிவர்த்தனையிலிருந்து பெறத் தேவையில்லை; சரியான மதிப்பு நமக்கு ஏற்கனவே தெரியும். தவறான நான்ஸைக் கொண்ட ஒரு கையொப்பம் நிராகரிக்கப்படும்.

```solidity

    // கையொப்பமிட்டவரை மீட்டெடு
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

கையொப்பம் தவறானதாக இருந்தால், `ecrecover` வழக்கமாக வேறு முகவரியை வழங்கும், மேலும் அது ஏற்கப்படாது.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

பயனர் நம்மை அழைக்கச் சொன்ன ஒப்பந்தத்தை அழைக்கவும், அது வெற்றிகரமாக இல்லாவிட்டால் மீளமைக்கவும்.

```solidity
    emit CallResult(target, returnData);

    nonce++; // மறுஇயக்கத்தைத் தடுக்க நான்ஸை அதிகரி

    return returnData;
}
```

வெற்றிகரமாக இருந்தால், ஒரு பதிவு நிகழ்வை வெளியிட்டு நான்ஸை அதிகரிக்கவும்.

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

இவை ஒப்பந்தத்திலிருந்து ETH-ஐப் பரிமாற்றம் செய்யவும் உங்களை அனுமதிக்கும் கிட்டத்தட்ட ஒரே மாதிரியான மாறுபாடுகளாகும்.

### ரிலேயர் {#relayer}

ரிலேயர் என்பது ஒரு [சேவையகக் கூறாகும்](/developers/tutorials/server-components/). இது JavaScript-இல் எழுதப்பட்டுள்ளது; மூலக் குறியீட்டை நீங்கள் [இங்கே](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js) பார்க்கலாம்.

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

நமக்குத் தேவையான நூலகங்கள். இது ஒரு [Express](https://expressjs.com/) சேவையகமாகும், இது பயனர் இடைமுகக் குறியீட்டை வழங்க [Vite](https://vite.dev/)-ஐப் பயன்படுத்துகிறது. தொகுதிச்சங்கிலியுடன் தொடர்புகொள்ள [Viem](https://viem.sh/)-ஐயும், பரிவர்த்தனையை அனுப்பும் முகவரிக்கான தனிப்பட்ட திறவுகோலைப் படிக்க [dotenv](https://www.dotenv.org/)-ஐயும் பயன்படுத்துகிறோம்.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

தொகுக்கப்பட்ட `UserProxy`-ஐப் படிக்க இது ஒரு எளிய வழியாகும். `UserProxy`-ஐ அழைக்க நமக்கு ABI தேவை, மேலும் ஒரு பயனருக்காக அதை நிலைநிறுத்தத் தொகுக்கப்பட்ட குறியீடு தேவை.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

`.env` கோப்பைப் படித்து, முகவரியைப் பிரித்தெடுத்து, அதை கன்சோலில் அச்சிடவும்.

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

தொகுதிச்சங்கிலியுடன் பேசும் Viem கிளையண்டுகள்.

```js
const start = async () => {
  const app = express()
```

ஒரு Express சேவையகத்தை இயக்கவும்.

```js
  app.use(express.json())
```

கோரிக்கை உடலைப் படிக்க Express-க்குச் சொல்லவும், அது JSON ஆக இருந்தால் அதைப் பாகுபடுத்தவும்.

```js
  app.post("/server/deploy", async (req, res) => {
```

ப்ராக்ஸியை நிலைநிறுத்துவதற்கான கோரிக்கைகளைக் கையாளும் குறியீடு இதுவாகும். நமது ETH தீரும் வரை ப்ராக்ஸியை நிலைநிறுத்துவதற்கான கோரிக்கைகளுடன் ஒரு தாக்குபவர் நம்மை ஸ்பேம் செய்ய முடியும் என்பதால், இங்கே நாம் [சேவை மறுப்புத்](https://en.wikipedia.org/wiki/Denial-of-service_attack) தாக்குதல்களுக்கு ஆளாக நேரிடும் என்பதைக் கவனத்தில் கொள்ளவும். ஒரு தயாரிப்பு அமைப்பில், ப்ராக்ஸியை நிலைநிறுத்துவதற்கான கோரிக்கை கையொப்பமிடப்பட்டிருக்க வேண்டும் என்றும், கையொப்பமிட்டவர் ஏற்கனவே உள்ள வாடிக்கையாளராக இருக்க வேண்டும் என்றும் நாம் கோரலாம்.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

கோரிக்கையிலிருந்து உரிமையாளரின் முகவரியைப் பெறவும்.

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[ஒப்பந்தத்தை நிலைநிறுத்தவும்](https://viem.sh/docs/contract/deployContract#deploycontract) மற்றும் [அது நிலைநிறுத்தப்படும் வரை காத்திருக்கவும்](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

எல்லாம் சரியாக இருந்தால், ப்ராக்ஸி முகவரியைப் பயனர் இடைமுகத்திற்கு வழங்கவும்.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

ஏதேனும் சிக்கல் இருந்தால், அதைப் புகாரளிக்கவும்.

```js
  app.post("/server/message", async (req, res) => {
```

இது `UserProxy` ஒப்பந்தத்திற்கான பயனர் செய்திகளைச் செயலாக்கும் குறியீடாகும். இது சேவை மறுப்புத் தாக்குதலுக்கு ஆளாகக்கூடிய மற்றொரு புள்ளியாகும்.

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

கோரிக்கைத் தரவைப் பெற்று, ப்ராக்ஸியில் `signedAccess`-ஐ அழைக்க அதைப் பயன்படுத்தவும்.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

பரிவர்த்தனை ஹாஷைத் திரும்பப் புகாரளிக்கவும். பரிவர்த்தனையைச் சரிபார்க்க பயனருக்கு ஒரு URL-ஐக் காட்ட இது UI-ஐ அனுமதிக்கிறது.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

மீண்டும், ஏதேனும் சிக்கல் இருந்தால், அதைப் புகாரளிக்கவும்.

```js
  // மற்ற அனைத்தையும் Vite கையாளட்டும்
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

மற்ற அனைத்திற்கும், நமக்காகப் பயனர் இடைமுகத்தை வழங்குவதைக் கையாளும் Vite-ஐப் பயன்படுத்தவும்.

### பயனர் இடைமுகம் {#user-interface}

[இது பயனர் இடைமுகக் குறியீடாகும்](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) தவிர, பெரும்பாலான குறியீடுகள் [இந்தக் கட்டுரையில்](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through) ஆவணப்படுத்தப்பட்டுள்ளதைப் போலவே இருக்கும்.

[`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx)-இன் பகுதிகள் [இந்தக் கட்டுரையில்](/developers/tutorials/gasless/#ui-changes) உள்ள [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx)-ஐப் போலவே உள்ளன. புதிய பகுதிகள் இங்கே உள்ளன.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[இந்தச் செயல்பாடு](https://viem.sh/docs/contract/encodeFunctionData) ஒரு EVM செயல்பாட்டு அழைப்பிற்கான அழைப்புத் தரவை உருவாக்குகிறது. பயனர் அழைப்புத் தரவில் கையொப்பமிட இது அவசியமாகும்.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

மேலே விளக்கப்பட்ட `UserProxy`.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[இந்த ஒப்பந்தம்](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) பெரும்பாலும் ஒரு சாதாரண ERC-20 ஒப்பந்தமாகும், இதில் `faucet()` என்ற ஒரு முக்கியமான செயல்பாடு சேர்க்கப்பட்டுள்ளது. இந்தச் செயல்பாடு சோதனை நோக்கங்களுக்காக வில்லைகளைக் கேட்கும் எவருக்கும் அவற்றை வழங்குகிறது.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

`FaucetToken`-க்கான முகவரி.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

இந்தக் கூறு ஒரு தொகுதி ஆராய்வியில் ஒப்பந்தத்திற்கான இணைப்புடன் ஒரு முகவரியை வெளியிடுகிறது.

```js
const Token = () => {
    ...
```

பெரும்பாலான வேலைகளைச் செய்யும் முக்கியக் கூறு இதுவாகும்.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

பயனர் முகவரியின் வில்லை இருப்பு.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

பயனருக்குச் சொந்தமான ஒரு ப்ராக்ஸியின் முகவரி.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

ப்ராக்ஸியின் வில்லை இருப்பு.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

பயனர் ப்ராக்ஸி முகவரியை கைமுறையாக அமைக்கும்போது இந்தப் புலம் பயன்படுத்தப்படுகிறது. ப்ராக்ஸி முகவரியை கைமுறையாக அமைக்கும் திறனைக் கொண்டிருப்பது, ஒவ்வொரு முறையும் புதிய ஒன்றை நிலைநிறுத்துவதற்குப் பதிலாக (மற்றும் பழைய ப்ராக்ஸிக்குச் சொந்தமான அனைத்து வில்லைகளையும் இழப்பதற்குப் பதிலாக) ஏற்கனவே உள்ள ப்ராக்ஸியைப் பயன்படுத்த பயனரை அனுமதிக்கிறது.

```js
  const [ txHash, setTxHash ] = useState(null)
```

கடைசிப் பரிவர்த்தனையின் ஹாஷ், பயனர் அந்தப் பரிவர்த்தனையைச் சரிபார்க்க ஆராய்விக்கான இணைப்பைக் காட்டப் பயன்படுத்தப்படுகிறது.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

இந்தப் புலங்கள் அனைத்தும் ஒரு ERC-20 ஒப்பந்தத்திற்கு வில்லைப் பரிமாற்றக் கட்டளைகளை அனுப்பப் பயன்படுத்தப்படுகின்றன. இது `FaucetToken` ஆக இருக்கலாம், ஆனால் அப்படி இருக்க வேண்டிய அவசியமில்லை. [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) செயல்பாடு ERC-20 தரநிலையின் ஒரு பகுதியாகும்.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

நாம் ஆர்வமாக உள்ள இரண்டு வில்லை இருப்புகளைப் படிக்கவும், பயனருக்கு எவ்வளவு சொந்தமானது, மற்றும் ப்ராக்ஸிக்கு எவ்வளவு சொந்தமானது.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

ரீப்ளே தாக்குதல்களைத் தடுக்க (எடுத்துக்காட்டாக, ஒரு விற்பனையாளர் தங்களுக்குப் பணம் கொடுக்கும் பரிவர்த்தனையை மீண்டும் இயக்குவது), நாம் ஒரு [நான்ஸைப்](https://en.wikipedia.org/wiki/Cryptographic_nonce) பயன்படுத்துகிறோம். நாம் கையொப்பமிடும் தரவில் அதைச் சேர்க்க தற்போதைய மதிப்பை நாம் தெரிந்து கொள்ள வேண்டும்.

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

தொகுதிச்சங்கிலியிலிருந்து படிக்கப்படும் தகவல் மாறும்போது பயனருக்குக் காட்டப்படும் இருப்பைப் புதுப்பிக்க [`useEffect`](https://react.dev/reference/react/useEffect)-ஐப் பயன்படுத்தவும்.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

பயனரின் சொந்தக் கணக்கிற்கு `FaucetToken` வில்லைகளைப் பரிமாற்றம் செய்வதே இயல்புநிலையாகும். Viem-இடமிருந்து அவற்றைப் பெறும்போது இந்த மதிப்புகளை இங்கே அமைக்கிறோம்.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

உரைப்புலங்கள் மாறும்போது அதற்கான நிகழ்வுக் கையாளுநர்கள்.

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

இந்தப் பயனருக்காக ஒரு ப்ராக்ஸியை நிலைநிறுத்தச் சேவையகத்தைக் கேட்கவும்.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

சங்கிலிசார் `UserProxy`-க்கு அனுப்பச் சேவையகத்திற்கு அனுப்புவதற்கு முன் ஒரு செய்தியில் கையொப்பமிடவும். இது [இங்கே](/developers/tutorials/gasless/#ui-changes) விளக்கப்பட்டுள்ளது. இலக்கு முகவரி (நாம் அழைக்கும் வில்லையின் முகவரி) மற்றும் அனுப்ப வேண்டிய அழைப்புத் தரவு ஆகிய இரண்டையும் கொண்ட ஒரு செய்தியில் நாம் கையொப்பமிட வேண்டும்.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

கையொப்பமிடப்பட்ட செய்தியை `UserProxy`-க்கு அனுப்பவும், அது கையொப்பத்தைச் சரிபார்த்து பின்னர் அதை `target`-க்கு அனுப்பும்.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // இரண்டு முகவரிகளும்
          data,           // இலக்குக்கு அனுப்ப வேண்டிய அழைப்புத் தரவு
          v, r, s         // கையொப்பம்
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

சேவையகத்திற்கு ஒரு கோரிக்கையை அனுப்பவும், நீங்கள் பதிலைப் பெறும்போது, பரிவர்த்தனை ஹாஷைப் பெறவும்.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

`faucet` செயல்பாட்டை அழைப்பதைப் போலச் செய்து பார்க்கவும். இது வெற்றிகரமாக இருந்தால் மட்டுமே நாம் பாசெட் பொத்தானைச் செயல்படுத்துவோம்.

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

சேவையகம் மற்றும் `UserProxy` மூலம் ஒரு செயல்பாட்டை அழைக்க, நாம் மூன்று படிகளைப் பின்பற்றுகிறோம்:

1. [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData)-ஐப் பயன்படுத்திக் கையொப்பமிடவும் அனுப்பவும் அழைப்புத் தரவை உருவாக்கவும்.

2. செய்தியில் கையொப்பமிடவும் (இலக்கு முகவரி, அழைப்புத் தரவு மற்றும் நான்ஸ்).

3. செய்தியைச் சேவையகத்திற்கு அனுப்பவும்.

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

கூறின் இந்தப் பகுதி உலாவியிலிருந்து நேரடியாக `FaucetToken`-ஐப் பயன்படுத்த உங்களை அனுமதிக்கிறது. பிழைத்திருத்தத்தை எளிதாக்குவதே இதன் முக்கிய நோக்கமாகும்.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

ஒரு புதிய `UserProxy`-ஐ நிலைநிறுத்தப் பயனரை அனுமதிக்கவும்.

```js
         <br /><br />
         <input type="text" placeholder="அல்லது ஏற்கனவே உள்ள ப்ராக்ஸி முகவரியை உள்ளிடவும்" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

பயனர்கள் முறையான முகவரியை உள்ளிடும்போது மட்டுமே **Set proxy address** என்பதைக் கிளிக் செய்ய அனுமதிக்கவும். கேள்விக்குரிய முகவரி உண்மையில் ஒரு `UserProxy` ஒப்பந்தம் என்பதை இது உறுதி செய்யாது என்பதைக் கவனத்தில் கொள்ளவும். அத்தகைய சரிபார்ப்பைச் சேர்க்க முடியும், ஆனால் அது மிகவும் மெதுவாக இருக்கும் (மோசமான பயனர் அனுபவம்) மற்றும் பாதுகாப்பை மேம்படுத்தாது (தாக்குபவர்கள் எப்போதும் பயனர் இடைமுகத்திற்குத் தங்கள் சொந்தக் குறியீட்டைப் பயன்படுத்தலாம்).

```js
         <br /><br />
         { proxyAddr && (
```

முறையான ப்ராக்ஸி முகவரி இருந்தால் _மட்டுமே_ மீதமுள்ளவற்றைக் காட்டவும்.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

பயனர் நான்ஸைத் தெரிந்து கொள்ள வேண்டியதில்லை; இது பிழைத்திருத்த நோக்கங்களுக்காக மட்டுமே.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

ப்ராக்ஸி மூலம் `faucet()`-க்கான அழைப்பை நாம் போலியாகச் செய்து பார்க்க முடியாது. இருப்பினும், நம்மிடம் ஒரு ப்ராக்ஸி இருப்பதையும், ப்ராக்ஸி நமக்கு ஒரு நான்ஸைப் புகாரளித்ததையும் நாம் குறைந்தபட்சம் உறுதிசெய்ய முடியும்.

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

ERC-20 பரிமாற்றப் பரிவர்த்தனைகளை வழங்கப் பயனரை அனுமதிக்கவும்.

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

கடைசிப் பரிவர்த்தனை ஹாஷ் இருந்தால், பயனர் அதை ஒரு தொகுதி ஆராய்வியில் காணும் வகையில் ஒரு இணைப்பைக் காட்டவும்.

```js
      </div>
    </>
  )
}

export {Token}
```

இது வெறும் React பாய்லர்பிளேட் ஆகும்.

## பாதிப்புகள் {#vulnerabilities}

நமது சேவையகம் சேவை மறுப்புத் தாக்குதல்களுக்கு ஆளாகக்கூடியது. இந்தத் தாக்குதல் [தொடரின் முந்தைய கட்டுரையில்](/developers/tutorials/gasless/#dos-on-server) விளக்கப்பட்டுள்ளது.

கூடுதலாக, நாம் மோசமான பயனர் நடத்தையை ஊக்குவிக்கிறோம். இதில் கையொப்பமிடுமாறு பயனரை நாம் கேட்கிறோம்:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

பயனர் பரிமாற்றம் செய்ய விரும்பும் வில்லை, தொகை மற்றும் இலக்கு முகவரிக்கான முறையான ERC-20 பரிமாற்றம் இது என்பது _நமக்குத்_ தெரியும். ஆனால் பெரும்பாலான பயனர்களுக்கு அழைப்புத் தரவை எவ்வாறு விளக்குவது என்று தெரியாது, மேலும் அவர்கள் எதில் கையொப்பமிடுகிறார்கள் என்பது பற்றிய எந்த யோசனையும் இல்லை. இது இரண்டு காரணங்களுக்காக மோசமான வடிவமைப்பாகும்:

- சில பயனர்கள் நம்மைப் பயன்படுத்த மாட்டார்கள், ஏனெனில் அவர்கள் கையொப்பமிடுமாறு நாம் கூறும் தரவை அவர்கள் நம்புவதில்லை.
- மற்ற பயனர்கள் நம்மை நம்புவார்கள், மேலும் அது என்னவென்று புரியாமலேயே அழைப்புத் தரவில் கையொப்பமிட வேண்டும் என்று _கற்றுக்கொள்வார்கள்_. இதன் பொருள் என்னவென்றால், ஆடம் அட்டாக்கர் அவர்களைத் தனது வலைத்தளத்திற்குத் திருப்பிவிட முடிந்தால், பயனருக்குச் சொந்தமான அனைத்து USDC (அல்லது DAI, அல்லது வேறு ஏதேனும் ERC-20) ஆகியவற்றையும் அவருக்கு வழங்கும் ஒரு பரிவர்த்தனையில் அவர்களைக் கையொப்பமிடச் செய்ய முடியும்.

பரிமாற்றம் போன்ற பொதுவாகப் பயன்படுத்தப்படும் செயல்பாடுகளுக்கு `UserProxy`-இல் தனித்தனிச் செயல்பாடுகளைக் கொண்டிருப்பதே இதற்கான தீர்வாகும். பின்னர் பயனர்கள் தங்களுக்குப் புரிந்த ஒன்றில் கையொப்பமிடலாம்.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**குறிப்பு:** பயனர்கள் தாங்கள் விரும்பும் எந்தப் பணப்பையையும் பயன்படுத்தலாம் என்றாலும், EIP-712-ஐப் பயன்படுத்தும் பயன்பாடுகள் [முழுமையான கையொப்பத் தரவைக் காட்டும்](https://rabby.io/) பணப்பையைப் பயன்படுத்த அவர்களை ஊக்குவிப்பது மிகவும் பரிந்துரைக்கப்படுகிறது. சில பணப்பைகள் முகவரியைத் துண்டிக்கின்றன, இது பாதுகாப்பற்றது. ஒரு தாக்குபவர் ஒரே தொடக்க மற்றும் முடிவு எழுத்துக்களைக் கொண்ட, ஆனால் நடுவில் வேறுபடும் ஒரு முகவரியை உருவாக்க முடியும்.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## முடிவுரை {#conclusion}

மேலே உள்ள பாதிப்புகளுக்கு மேலதிகமாக, இந்த வழிகாட்டியில் உள்ள தீர்வு பல குறைபாடுகளைக் கொண்டுள்ளது, அவற்றைத் தீர்க்க எத்திரியம் நமக்கு உதவ முடியும்.

- _தணிக்கை எதிர்ப்பு_. தற்போது, பயனர்கள் உங்கள் சேவையகத்தை, வேறொருவரால் அமைக்கப்பட்ட போட்டியிடும் சேவையகத்தைப் பயன்படுத்தலாம் அல்லது எத்திரியத்துடன் நேரடியாக இணைக்கலாம், இதற்கு எரிவாயுச் செலவுகள் ஏற்படும். [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337)-ஐப் பயன்படுத்துவது பயனர்கள் தங்கள் பரிவர்த்தனையை ஒரு பெரிய சேவையகத் தொகுப்பிற்கு வழங்க அனுமதிக்கிறது, இது அவர்களின் பரிவர்த்தனைகள் தணிக்கை செய்யப்படுவதற்கான வாய்ப்பைக் குறைக்கிறது.
- _EOA-க்குச் சொந்தமான சொத்துக்கள்_. மேலே குறிப்பிட்டுள்ளபடி, ஒரு EOA முகவரிக்கு ஏற்கனவே சொந்தமான சொத்துக்களை நிர்வகிக்க [EIP-7702](https://eip7702.io/)-ஐப் பயன்படுத்தலாம். இதில் அதன் சிரமங்கள் உள்ளன, ஆனால் சில நேரங்களில் இது அவசியமாகும்.

எதிர்காலத்தில் இந்த அம்சங்களைச் சேர்ப்பது பற்றிய வழிகாட்டிகளை வெளியிட நம்புகிறேன்.

[எனது மேலும் பல பணிகளுக்கு இங்கே பார்க்கவும்](https://cryptodocguy.pro/).
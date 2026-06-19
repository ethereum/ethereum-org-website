---
title: எத்திரியம் மேம்பாட்டைத் தொடங்குதல்
description: "எத்திரியம் மேம்பாட்டைத் தொடங்குவதற்கான தொடக்கநிலை வழிகாட்டி இது. API இறுதிப்புள்ளியை உருவாக்குவது முதல், கட்டளை வரி கோரிக்கையை உருவாக்குவது, உங்களின் முதல் Web3 ஸ்கிரிப்டை எழுதுவது வரை அனைத்தையும் நாங்கள் உங்களுக்குக் கற்றுத்தருவோம்! தொகுதிச்சங்கிலி மேம்பாட்டு அனுபவம் எதுவும் தேவையில்லை!"
author: "எலான் ஹால்பெர்ன்"
tags: ["javascript", "ethers.js", "கணுக்கள்", "வினவுதல்", "alchemy"]
skill: beginner
breadcrumb: தொடங்குதல்
lang: ta
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

இது எத்திரியம் மேம்பாட்டைத் தொடங்குவதற்கான தொடக்கநிலை வழிகாட்டியாகும். இந்த வழிகாட்டிக்கு, Maker, 0x, MyEtherWallet, Dharma மற்றும் Kyber உள்ளிட்ட சிறந்த தொகுதிச்சங்கிலி பயன்பாடுகளில் 70% இலிருந்து மில்லியன் கணக்கான பயனர்களுக்கு ஆற்றலளிக்கும் முன்னணி தொகுதிச்சங்கிலி டெவலப்பர் தளமான [Alchemy](https://alchemyapi.io/)-ஐப் பயன்படுத்துவோம். பரிவர்த்தனைகளைப் படிக்கவும் எழுதவும் எத்திரியம் சங்கிலியில் உள்ள API இறுதிப்புள்ளிக்கான அணுகலை Alchemy நமக்கு வழங்கும்.

Alchemy-இல் பதிவு செய்வது முதல் உங்களின் முதல் Web3 ஸ்கிரிப்டை எழுதுவது வரை அனைத்தையும் நாங்கள் உங்களுக்குக் கற்றுத்தருவோம்! தொகுதிச்சங்கிலி மேம்பாட்டு அனுபவம் எதுவும் தேவையில்லை!

## 1. இலவச Alchemy கணக்கிற்குப் பதிவு செய்யவும் {#sign-up-for-a-free-alchemy-account}

Alchemy-இல் கணக்கை உருவாக்குவது எளிதானது, [இங்கே இலவசமாகப் பதிவு செய்யவும்](https://auth.alchemy.com/).

## 2. ஒரு Alchemy பயன்பாட்டை உருவாக்கவும் {#create-an-alchemy-app}

எத்திரியம் சங்கிலியுடன் தொடர்புகொள்ளவும், Alchemy-இன் தயாரிப்புகளைப் பயன்படுத்தவும், உங்கள் கோரிக்கைகளை அங்கீகரிக்க உங்களுக்கு ஒரு API திறவுகோல் தேவை.

நீங்கள் [கட்டுப்பாட்டுப் பலகத்திலிருந்து API திறவுகோல்களை உருவாக்கலாம்](https://dashboard.alchemy.com/). புதிய திறவுகோலை உருவாக்க, கீழே காட்டப்பட்டுள்ளபடி “Create App” என்பதற்குச் செல்லவும்:

_தங்கள் கட்டுப்பாட்டுப் பலகத்தைக் காட்ட அனுமதித்த_ [_ShapeShift_](https://shapeshift.com/) _நிறுவனத்திற்குச் சிறப்பு நன்றிகள்!_

![Alchemy dashboard](./alchemy-dashboard.png)

உங்களின் புதிய திறவுகோலைப் பெற, “Create App” என்பதன் கீழ் உள்ள விவரங்களை நிரப்பவும். நீங்கள் முன்பு உருவாக்கிய பயன்பாடுகளையும் உங்கள் குழு உருவாக்கிய பயன்பாடுகளையும் இங்கே பார்க்கலாம். எந்தவொரு பயன்பாட்டிற்கும் “View Key” என்பதைக் கிளிக் செய்வதன் மூலம் ஏற்கனவே உள்ள திறவுகோல்களைப் பெறலாம்.

![Create app with Alchemy screenshot](./create-app.png)

“Apps” என்பதன் மீது கர்சரை வைத்து, ஒன்றைத் தேர்ந்தெடுப்பதன் மூலமும் ஏற்கனவே உள்ள API திறவுகோல்களைப் பெறலாம். குறிப்பிட்ட டொமைன்களை அனுமதிப்பட்டியலில் சேர்க்க, பல டெவலப்பர் கருவிகளைப் பார்க்க மற்றும் பகுப்பாய்வுகளைப் பார்க்க, நீங்கள் இங்கே “View Key” மற்றும் “Edit App” ஆகியவற்றைப் பயன்படுத்தலாம்.

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. கட்டளை வரியிலிருந்து ஒரு கோரிக்கையை உருவாக்கவும் {#make-a-request-from-the-command-line}

ஜேசன்-ஆர்பிசி மற்றும் curl-ஐப் பயன்படுத்தி Alchemy மூலம் எத்திரியம் தொகுதிச்சங்கிலியுடன் தொடர்புகொள்ளவும்.

கைமுறை கோரிக்கைகளுக்கு, `POST` கோரிக்கைகள் வழியாக `JSON-RPC` உடன் தொடர்புகொள்ளப் பரிந்துரைக்கிறோம். `Content-Type: application/json` தலைப்பையும், உங்கள் வினவலையும் `POST` உடலாகப் பின்வரும் புலங்களுடன் அனுப்பவும்:

- `jsonrpc`: ஜேசன்-ஆர்பிசி பதிப்பு—தற்போது, `2.0` மட்டுமே ஆதரிக்கப்படுகிறது.
- `method`: ETH API முறை. [API குறிப்பைப் பார்க்கவும்.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: முறைக்கு அனுப்ப வேண்டிய அளவுருக்களின் பட்டியல்.
- `id`: உங்கள் கோரிக்கையின் ஐடி. எந்தக் கோரிக்கைக்கு எந்தப் பதில் சொந்தமானது என்பதைக் கண்காணிக்க, இது பதிலால் திருப்பி அனுப்பப்படும்.

தற்போதைய எரிவாயு விலையைப் பெற, கட்டளை வரியிலிருந்து நீங்கள் இயக்கக்கூடிய ஒரு எடுத்துக்காட்டு இங்கே:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**குறிப்பு:** [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) என்பதை உங்களின் சொந்த API திறவுகோலான `https://eth-mainnet.alchemyapi.io/v2/**your-api-key` உடன் மாற்றவும்._

**முடிவுகள்:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. உங்கள் Web3 கிளையண்டை அமைக்கவும் {#set-up-your-web3-client}

**உங்களிடம் ஏற்கனவே ஒரு கிளையண்ட் இருந்தால்,** உங்களின் தற்போதைய கணு வழங்குநர் URL-ஐ உங்கள் API திறவுகோலுடன் கூடிய Alchemy URL-ஆக மாற்றவும்: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_குறிப்பு:_** கீழே உள்ள ஸ்கிரிப்ட்கள் கட்டளை வரியிலிருந்து இயக்கப்படாமல், ஒரு **கணு சூழலில் (node context)** இயக்கப்பட வேண்டும் அல்லது **ஒரு கோப்பில் சேமிக்கப்பட வேண்டும்**. உங்களிடம் ஏற்கனவே Node அல்லது npm நிறுவப்படவில்லை எனில், Mac-களுக்கான இந்த விரைவான [அமைப்பு வழிகாட்டியப்](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) பார்க்கவும்.

Alchemy-உடன் நீங்கள் ஒருங்கிணைக்கக்கூடிய ஏராளமான [Web3 நூலகங்கள்](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) உள்ளன, இருப்பினும், Web3.js-க்கு மாற்றாக, Alchemy-உடன் தடையின்றிச் செயல்படும் வகையில் உருவாக்கப்பட்டு உள்ளமைக்கப்பட்ட [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)-ஐப் பயன்படுத்தப் பரிந்துரைக்கிறோம். இது தானியங்கி மறுமுயற்சிகள் மற்றும் வலுவான WebSocket ஆதரவு போன்ற பல நன்மைகளை வழங்குகிறது.

AlchemyWeb3.js-ஐ நிறுவ, **உங்கள் திட்டக் கோப்பகத்திற்குச் சென்று** இயக்கவும்:

**Yarn உடன்:**

```
yarn add @alch/alchemy-web3
```

**NPM உடன்:**

```
npm install @alch/alchemy-web3
```

Alchemy-இன் கணு உள்கட்டமைப்புடன் தொடர்புகொள்ள, NodeJS-இல் இயக்கவும் அல்லது இதை ஒரு JavaScript கோப்பில் சேர்க்கவும்:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. உங்களின் முதல் Web3 ஸ்கிரிப்டை எழுதவும்! {#write-your-first-web3-script}

இப்போது Web3 நிரலாக்கத்தைச் சற்றுப் பழகுவதற்கு, எத்தேரியம் முதன்மை வலைப்பின்னலிலிருந்து சமீபத்திய தொகுதி எண்ணை அச்சிடும் எளிய ஸ்கிரிப்டை எழுதுவோம்.

**1. நீங்கள் இதுவரை செய்யவில்லை எனில், உங்கள் முனையத்தில் (terminal) புதிய திட்டக் கோப்பகத்தை உருவாக்கி, அதனுள் cd செய்யவும்:**

```
mkdir web3-example
cd web3-example
```

**2. நீங்கள் இதுவரை நிறுவவில்லை எனில், உங்கள் திட்டத்தில் Alchemy Web3 (அல்லது ஏதேனும் Web3) சார்பை நிறுவவும்:**

```
npm install @alch/alchemy-web3
```

**3. `index.js` என்ற பெயரில் ஒரு கோப்பை உருவாக்கி, பின்வரும் உள்ளடக்கங்களைச் சேர்க்கவும்:**

> நீங்கள் இறுதியாக `demo` என்பதை உங்கள் Alchemy HTTP API திறவுகோலுடன் மாற்ற வேண்டும்.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

ஒத்திசைவற்ற (async) விஷயங்கள் அறிமுகமில்லையா? இந்த [Medium பதிவைப்](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) பார்க்கவும்.

**4. node-ஐப் பயன்படுத்தி உங்கள் முனையத்தில் இதை இயக்கவும்**

```
node index.js
```

**5. இப்போது உங்கள் கன்சோலில் சமீபத்திய தொகுதி எண் வெளியீட்டைக் காண வேண்டும்!**

```
The latest block number is 11043912
```

**ஆஹா! வாழ்த்துகள்! Alchemy-ஐப் பயன்படுத்தி உங்களின் முதல் Web3 ஸ்கிரிப்டை எழுதிவிட்டீர்கள் 🎉**

அடுத்து என்ன செய்வது என்று தெரியவில்லையா? உங்களின் முதல் திறன் ஒப்பந்தத்தைப் பயன்படுத்த முயற்சிக்கவும், மேலும் எங்களின் [ஹலோ வேர்ல்ட் திறன் ஒப்பந்த வழிகாட்டியில்](https://www.alchemy.com/docs/hello-world-smart-contract) சில Solidity நிரலாக்கத்தைப் பழகவும் அல்லது [கட்டுப்பாட்டுப் பலக டெமோ பயன்பாட்டின்](https://docs.alchemyapi.io/tutorials/demo-app) மூலம் உங்கள் கட்டுப்பாட்டுப் பலக அறிவைச் சோதிக்கவும்!

_[Alchemy-இல் இலவசமாகப் பதிவு செய்யவும்](https://auth.alchemy.com/), எங்களின் [ஆவணங்களைப்](https://www.alchemy.com/docs/) பார்க்கவும், மேலும் சமீபத்திய செய்திகளுக்கு [Twitter](https://twitter.com/AlchemyPlatform)-இல் எங்களைப் பின்தொடரவும்_.
---
title: "எத்தேரியம் மேம்பாட்டைத் தொடங்குதல்"
description: "எத்தேரியம் மேம்பாட்டைத் தொடங்குவதற்கான தொடக்கநிலை வழிகாட்டி இது. API எண்ட்பாயிண்டை உருவாக்குவது முதல், கமாண்ட் லைன் கோரிக்கையை அனுப்புவது மற்றும் உங்களின் முதல் web3 ஸ்கிரிப்டை எழுதுவது வரை அனைத்தையும் நாங்கள் உங்களுக்குக் கற்றுத் தருவோம்! பிளாக்செயின் மேம்பாட்டு முன் அனுபவம் எதுவும் தேவையில்லை!"
author: "எலான் ஹால்பெர்ன்"
tags: ["JavaScript", "ethers.js", "முனைகள்", "வினவுதல்", "Alchemy"]
skill: beginner
breadcrumb: "தொடங்குதல்"
lang: ta
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![எத்தேரியம் மற்றும் அல்கெமி லோகோக்கள்](./ethereum-alchemy.png)

எத்தேரியம் மேம்பாட்டைத் தொடங்குவதற்கான தொடக்கநிலை வழிகாட்டி இது. இந்த டுடோரியலுக்கு, Maker, 0x, MyEtherWallet, Dharma மற்றும் Kyber உள்ளிட்ட சிறந்த பிளாக்செயின் பயன்பாடுகளில் 70% பயன்பாடுகளின் மில்லியன் கணக்கான பயனர்களுக்கு ஆற்றலளிக்கும் முன்னணி பிளாக்செயின் டெவலப்பர் தளமான [Alchemy](https://alchemyapi.io/)-ஐப் பயன்படுத்தப் போகிறோம். எத்தேரியம் செயினில் உள்ள API எண்ட்பாயிண்டிற்கான அணுகலை Alchemy நமக்கு வழங்கும், இதன் மூலம் நாம் பரிவர்த்தனைகளைப் படிக்கவும் எழுதவும் முடியும்.

Alchemy-இல் பதிவு செய்வது முதல் உங்களின் முதல் web3 ஸ்கிரிப்டை எழுதுவது வரை அனைத்தையும் நாங்கள் உங்களுக்குக் கற்றுத் தருவோம்! பிளாக்செயின் மேம்பாட்டு முன் அனுபவம் எதுவும் தேவையில்லை!

## 1. இலவச Alchemy கணக்கிற்குப் பதிவு செய்யவும் {#sign-up-for-a-free-alchemy-account}

Alchemy-இல் கணக்கை உருவாக்குவது எளிது, [இங்கே இலவசமாகப் பதிவு செய்யவும்](https://auth.alchemy.com/).

## 2. ஒரு Alchemy ஆப்-ஐ உருவாக்கவும் {#create-an-alchemy-app}

எத்தேரியம் செயினுடன் தொடர்புகொள்ளவும், Alchemy-இன் தயாரிப்புகளைப் பயன்படுத்தவும், உங்கள் கோரிக்கைகளை அங்கீகரிக்க ஒரு API விசை (key) தேவை.

நீங்கள் [டாஷ்போர்டிலிருந்து API விசைகளை உருவாக்கலாம்](https://dashboard.alchemy.com/). புதிய விசையை உருவாக்க, கீழே காட்டப்பட்டுள்ளபடி “Create App” என்பதற்குச் செல்லவும்:

_தங்கள் டாஷ்போர்டைக் காட்ட அனுமதித்த [_ShapeShift_](https://shapeshift.com/)-க்கு _சிறப்பு நன்றிகள்!_

![Alchemy டாஷ்போர்டு](./alchemy-dashboard.png)

உங்கள் புதிய விசையைப் பெற, “Create App” என்பதன் கீழ் உள்ள விவரங்களை நிரப்பவும். நீங்கள் முன்பு உருவாக்கிய ஆப்-களையும் உங்கள் குழு உருவாக்கியவற்றையும் இங்கே பார்க்கலாம். எந்தவொரு ஆப்-இற்கும் “View Key” என்பதைக் கிளிக் செய்வதன் மூலம் ஏற்கனவே உள்ள விசைகளைப் பெறலாம்.

![Alchemy மூலம் ஆப்-ஐ உருவாக்கும் ஸ்கிரீன்ஷாட்](./create-app.png)

“Apps” என்பதன் மீது கர்சரை வைத்து, ஒன்றைத் தேர்ந்தெடுப்பதன் மூலமும் ஏற்கனவே உள்ள API விசைகளைப் பெறலாம். குறிப்பிட்ட டொமைன்களை ஒயிட்லிஸ்ட் (whitelist) செய்ய, பல டெவலப்பர் கருவிகளைப் பார்க்க மற்றும் பகுப்பாய்வுகளைக் காண, நீங்கள் இங்கே “View Key” மற்றும் “Edit App” என்பதைப் பயன்படுத்தலாம்.

![API விசைகளை எவ்வாறு பெறுவது என்பதைப் பயனருக்குக் காட்டும் Gif](./pull-api-keys.gif)

## 3. கமாண்ட் லைனிலிருந்து ஒரு கோரிக்கையை அனுப்பவும் {#make-a-request-from-the-command-line}

JSON-RPC மற்றும் curl-ஐப் பயன்படுத்தி Alchemy மூலம் எத்தேரியம் பிளாக்செயினுடன் தொடர்புகொள்ளவும்.

கைமுறை கோரிக்கைகளுக்கு, `POST` கோரிக்கைகள் வழியாக `JSON-RPC`-உடன் தொடர்புகொள்ளப் பரிந்துரைக்கிறோம். `Content-Type: application/json` ஹெட்டரையும், உங்கள் வினவலை `POST` பாடியாகவும் பின்வரும் புலங்களுடன் (fields) அனுப்பவும்:

- `jsonrpc`: JSON-RPC பதிப்பு—தற்போது, `2.0` மட்டுமே ஆதரிக்கப்படுகிறது.
- `method`: ETH API முறை. [API குறிப்பைப் பார்க்கவும்.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: முறைக்கு அனுப்ப வேண்டிய அளவுருக்களின் (parameters) பட்டியல்.
- `id`: உங்கள் கோரிக்கையின் ID. இது பதிலளிப்பால் திருப்பி அனுப்பப்படும், எனவே எந்தக் கோரிக்கைக்கு எந்தப் பதில் சொந்தமானது என்பதைக் கண்காணிக்கலாம்.

தற்போதைய கேஸ் விலையைப் பெற கமாண்ட் லைனிலிருந்து நீங்கள் இயக்கக்கூடிய ஒரு எடுத்துக்காட்டு இங்கே:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**குறிப்பு:** [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) என்பதை உங்கள் சொந்த API விசை `https://eth-mainnet.alchemyapi.io/v2/**your-api-key` கொண்டு மாற்றவும்._

**முடிவுகள்:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. உங்கள் Web3 கிளையண்டை அமைக்கவும் {#set-up-your-web3-client}

**உங்களிடம் ஏற்கனவே ஒரு கிளையண்ட் இருந்தால்,** உங்கள் தற்போதைய நோடு புரொவைடர் URL-ஐ உங்கள் API விசையுடன் கூடிய Alchemy URL-ஆக மாற்றவும்: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_குறிப்பு:_** கீழே உள்ள ஸ்கிரிப்ட்கள் ஒரு **நோடு சூழலில் (node context)** இயக்கப்பட வேண்டும் அல்லது **ஒரு கோப்பில் சேமிக்கப்பட வேண்டும்**, கமாண்ட் லைனிலிருந்து இயக்கப்படக் கூடாது. உங்களிடம் ஏற்கனவே Node அல்லது npm நிறுவப்படவில்லை எனில், இந்த விரைவான [mac-களுக்கான அமைவு வழிகாட்டியைப்](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) பார்க்கவும்.

Alchemy-உடன் நீங்கள் ஒருங்கிணைக்கக்கூடிய பல [Web3 லைப்ரரிகள்](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) உள்ளன, இருப்பினும், web3.js-க்கு மாற்றாக, Alchemy-உடன் தடையின்றி செயல்பட வடிவமைக்கப்பட்டு உள்ளமைக்கப்பட்ட [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)-ஐப் பயன்படுத்தப் பரிந்துரைக்கிறோம். இது தானியங்கி மறுமுயற்சிகள் (automatic retries) மற்றும் வலுவான WebSocket ஆதரவு போன்ற பல நன்மைகளை வழங்குகிறது.

AlchemyWeb3.js-ஐ நிறுவ, **உங்கள் ப்ராஜெக்ட் டைரக்டரிக்குச் சென்று** இயக்கவும்:

**Yarn உடன்:**

```
yarn add @alch/alchemy-web3
```

**NPM உடன்:**

```
npm install @alch/alchemy-web3
```

Alchemy-இன் நோடு உள்கட்டமைப்புடன் தொடர்புகொள்ள, NodeJS-இல் இயக்கவும் அல்லது இதை ஒரு JavaScript கோப்பில் சேர்க்கவும்:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. உங்களின் முதல் Web3 ஸ்கிரிப்டை எழுதுங்கள்! {#write-your-first-web3-script}

இப்போது சிறிது web3 நிரலாக்கத்தைச் செய்து பார்க்க, எத்தேரியம் மெயின்நெட்டிலிருந்து சமீபத்திய பிளாக் எண்ணை அச்சிடும் ஒரு எளிய ஸ்கிரிப்டை எழுதுவோம்.

**1. நீங்கள் இதுவரை செய்யவில்லை எனில், உங்கள் டெர்மினலில் ஒரு புதிய ப்ராஜெக்ட் டைரக்டரியை உருவாக்கி, அதனுள் cd செய்யவும்:**

```
mkdir web3-example
cd web3-example
```

**2. நீங்கள் இதுவரை செய்யவில்லை எனில், உங்கள் ப்ராஜெக்ட்டில் Alchemy web3 (அல்லது ஏதேனும் web3) டிபென்டென்சியை (dependency) நிறுவவும்:**

```
npm install @alch/alchemy-web3
```

**3. `index.js` என்ற பெயரில் ஒரு கோப்பை உருவாக்கி, பின்வரும் உள்ளடக்கங்களைச் சேர்க்கவும்:**

> நீங்கள் இறுதியாக `demo` என்பதை உங்கள் Alchemy HTTP API விசையைக் கொண்டு மாற்ற வேண்டும்.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

async விஷயங்கள் பரிச்சயமில்லையா? இந்த [Medium பதிவைப்](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) பார்க்கவும்.

**4. node-ஐப் பயன்படுத்தி உங்கள் டெர்மினலில் இதை இயக்கவும்**

```
node index.js
```

**5. இப்போது உங்கள் கன்சோலில் சமீபத்திய பிளாக் எண் வெளியீட்டைக் காண வேண்டும்!**

```
The latest block number is 11043912
```

**வாவ்! வாழ்த்துகள்! Alchemy-ஐப் பயன்படுத்தி உங்களின் முதல் web3 ஸ்கிரிப்டை எழுதிவிட்டீர்கள் 🎉**

அடுத்து என்ன செய்வது என்று தெரியவில்லையா? உங்களின் முதல் ஸ்மார்ட் ஒப்பந்தத்தை டெப்லாய் (deploy) செய்ய முயலுங்கள் மற்றும் எங்களின் [ஹலோ வேர்ல்ட் ஸ்மார்ட் ஒப்பந்த வழிகாட்டியில் (Hello World Smart Contract Guide)](https://www.alchemy.com/docs/hello-world-smart-contract) சில Solidity நிரலாக்கத்தைச் செய்து பாருங்கள், அல்லது [டாஷ்போர்டு டெமோ ஆப் (Dashboard Demo App)](https://docs.alchemyapi.io/tutorials/demo-app) மூலம் உங்கள் டாஷ்போர்டு அறிவைச் சோதிக்கவும்!

_[Alchemy-இல் இலவசமாகப் பதிவு செய்யுங்கள்](https://auth.alchemy.com/), எங்களின் [ஆவணங்களைப்](https://www.alchemy.com/docs/) பார்க்கவும், மேலும் சமீபத்திய செய்திகளுக்கு, [Twitter](https://twitter.com/AlchemyPlatform)-இல் எங்களைப் பின்தொடரவும்_.
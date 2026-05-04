---
title: "JavaScript-இல் Ethereum பிளாக்செயினைப் பயன்படுத்த web3.js-ஐ அமைத்தல்"
description: "JavaScript பயன்பாடுகளிலிருந்து Ethereum பிளாக்செயினுடன் தொடர்புகொள்ள web3.js லைப்ரரியை எவ்வாறு அமைப்பது மற்றும் உள்ளமைப்பது என்பதை அறிக."
author: "jdourlens"
tags: ["web3.js", "JavaScript"]
skill: beginner
breadcrumb: "web3.js அமைப்பு"
lang: ta
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

இந்த டுடோரியலில், Ethereum பிளாக்செயினுடன் தொடர்புகொள்ள [web3.js](https://web3js.readthedocs.io/)-ஐ எவ்வாறு தொடங்குவது என்பதைப் பார்ப்போம். பிளாக்செயினிலிருந்து தரவைப் படிக்க அல்லது பரிவர்த்தனைகளைச் செய்ய மற்றும் ஸ்மார்ட் ஒப்பந்தங்களை (smart contracts) பயன்படுத்தவும் Web3.js-ஐ ஃபிரண்ட்எண்ட்கள் (frontends) மற்றும் பேக்எண்ட்கள் (backends) இரண்டிலும் பயன்படுத்தலாம்.

முதல் படி உங்கள் திட்டத்தில் web3.js-ஐச் சேர்ப்பதாகும். ஒரு வலைப்பக்கத்தில் இதைப் பயன்படுத்த, JSDeliver போன்ற CDN-ஐப் பயன்படுத்தி லைப்ரரியை நேரடியாக இறக்குமதி செய்யலாம்.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

உங்கள் பேக்எண்டில் அல்லது பில்டைப் (build) பயன்படுத்தும் ஃபிரண்ட்எண்ட் திட்டத்தில் பயன்படுத்த லைப்ரரியை நிறுவ விரும்பினால், npm-ஐப் பயன்படுத்தி அதை நிறுவலாம்:

```bash
npm install web3 --save
```

பின்னர் Web3.js-ஐ Node.js ஸ்கிரிப்ட் அல்லது Browserify ஃபிரண்ட்எண்ட் திட்டத்தில் இறக்குமதி செய்ய, பின்வரும் JavaScript வரியைப் பயன்படுத்தலாம்:

```js
const Web3 = require("web3")
```

இப்போது திட்டத்தில் லைப்ரரியைச் சேர்த்துள்ளதால், அதைத் துவக்க வேண்டும். உங்கள் திட்டம் பிளாக்செயினுடன் தொடர்புகொள்ளக்கூடியதாக இருக்க வேண்டும். பெரும்பாலான Ethereum லைப்ரரிகள் RPC அழைப்புகள் மூலம் ஒரு [நோடுடன் (node)](/developers/docs/nodes-and-clients/) தொடர்புகொள்கின்றன. எங்கள் Web3 புரொவைடரைத் (provider) தொடங்க, புரொவைடரின் URL-ஐ கன்ஸ்ட்ரக்டராக (constructor) அனுப்பி ஒரு Web3 இன்ஸ்டன்ஸை (instance) உருவாக்குவோம். உங்கள் கணினியில் ஒரு நோடு அல்லது [ganache இன்ஸ்டன்ஸ் இயங்கினால்](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/) அது இப்படி இருக்கும்:

```js
const web3 = new Web3("http://localhost:8545")
```

ஹோஸ்ட் செய்யப்பட்ட நோடை நேரடியாக அணுக விரும்பினால், [சேவையாக நோடுகள் (nodes as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service) என்பதில் விருப்பங்களைக் காணலாம்.

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

எங்கள் Web3 இன்ஸ்டன்ஸை சரியாக உள்ளமைத்துள்ளோமா என்பதைச் சோதிக்க, `getBlockNumber` செயல்பாட்டைப் பயன்படுத்தி சமீபத்திய பிளாக் எண்ணை மீட்டெடுக்க முயற்சிப்போம். இந்தச் செயல்பாடு ஒரு கால்பேக்கை (callback) அளவுருவாக ஏற்றுக்கொண்டு பிளாக் எண்ணை ஒரு முழு எண்ணாக (integer) வழங்குகிறது.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

இந்த நிரலை நீங்கள் இயக்கினால், அது சமீபத்திய பிளாக் எண்ணை அச்சிடும்: பிளாக்செயினின் உச்சி. உங்கள் குறியீட்டில் கால்பேக்குகள் நெஸ்ட் செய்யப்படுவதைத் தவிர்க்க `await/async` செயல்பாட்டு அழைப்புகளையும் பயன்படுத்தலாம்:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Web3 இன்ஸ்டன்ஸில் கிடைக்கும் அனைத்து செயல்பாடுகளையும் [அதிகாரப்பூர்வ web3.js ஆவணத்தில்](https://docs.web3js.org/) நீங்கள் காணலாம்.

பெரும்பாலான Web3 லைப்ரரிகள் ஒத்திசைவற்றவை (asynchronous), ஏனெனில் பின்னணியில் லைப்ரரி நோடிற்கு JSON-RPC அழைப்புகளைச் செய்கிறது, அது முடிவைத் திருப்பி அனுப்புகிறது.

<Divider />

நீங்கள் உலாவியில் (browser) பணிபுரிகிறீர்கள் என்றால், சில வாலெட்டுகள் நேரடியாக ஒரு Web3 இன்ஸ்டன்ஸை உட்செலுத்துகின்றன, மேலும் பரிவர்த்தனைகளைச் செய்ய பயனரின் Ethereum முகவரியுடன் தொடர்புகொள்ள நீங்கள் திட்டமிட்டால், முடிந்தவரை அதைப் பயன்படுத்த முயற்சிக்க வேண்டும்.

MetaMask வாலெட் உள்ளதா என்பதைக் கண்டறிந்து, இருந்தால் அதை இயக்க முயற்சிப்பதற்கான குறியீடு (snippet) இங்கே உள்ளது. இது பின்னர் பயனரின் இருப்பைப் படிக்க உங்களை அனுமதிக்கும், மேலும் Ethereum பிளாக்செயினில் நீங்கள் அவர்களைச் செய்ய விரும்பும் பரிவர்த்தனைகளைச் சரிபார்க்க அவர்களுக்கு உதவும்:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // தேவைப்பட்டால் கணக்கு அணுகலைக் கோரவும்
    await window.ethereum.enable()
    // கணக்குகள் இப்போது வெளிப்படுத்தப்பட்டுள்ளன
  } catch (error) {
    // பயனர் கணக்கு அணுகலை மறுத்துவிட்டார்...
  }
}
```

web3.js-க்கு மாற்றாக [Ethers.js](https://docs.ethers.io/) போன்றவையும் உள்ளன, மேலும் அவை பொதுவாகப் பயன்படுத்தப்படுகின்றன. அடுத்த டுடோரியலில் [பிளாக்செயினில் புதிதாக வரும் பிளாக்குகளை எவ்வாறு எளிதாகக் கேட்பது மற்றும் அவற்றில் என்ன இருக்கிறது என்பதைப் பார்ப்பது](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/) எப்படி என்று பார்ப்போம்.
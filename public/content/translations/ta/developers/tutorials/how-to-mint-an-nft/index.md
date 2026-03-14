---
title: "ஒரு NFT-ஐ எவ்வாறு உருவாக்குவது (NFT பயிற்சித் தொடரின் பகுதி 2/3)"
description: "இந்தப் பயிற்சியானது, எங்கள் ஸ்மார்ட் ஒப்பந்தம் மற்றும் Web3-ஐப் பயன்படுத்தி Ethereum பிளாக்செயினில் ஒரு NFT-ஐ எவ்வாறு உருவாக்குவது என்பதை விவரிக்கிறது."
author: "Sumi Mudgil"
tags:
  [
    "கருத்துகளுக்கான Ethereum கோரிக்கை 721",
    "அல்கெமி",
    "திட்பம்",
    "ஸ்மார்ட் ஒப்பந்தங்கள்"
  ]
skill: beginner
lang: ta
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 மில்லியன்
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 மில்லியன்
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 மில்லியன்

அவர்கள் அனைவரும் Alchemy-யின் சக்திவாய்ந்த API-ஐப் பயன்படுத்தி தங்கள் NFT-களை உருவாக்கினார்கள். இந்தப் பயிற்சியில், 10 நிமிடங்களுக்கும் குறைவான நேரத்தில் நீங்களும் அதை எப்படிச் செய்வது என்று நாங்கள் கற்றுத் தருவோம்.

“ஒரு NFT-ஐ உருவாக்குதல்” என்பது உங்கள் ERC-721 டோக்கனின் ஒரு தனித்துவமான நிகழ்வை பிளாக்செயினில் வெளியிடும் செயலாகும். [இந்த NFT பயிற்சித் தொடரின் பகுதி 1](/developers/tutorials/how-to-write-and-deploy-an-nft/)-இல் உள்ள நமது ஸ்மார்ட் ஒப்பந்தத்தைப் பயன்படுத்தி, நமது Web3 திறமைகளைக் காட்டி ஒரு NFT-ஐ உருவாக்குவோம். இந்தப் பயிற்சியின் முடிவில், உங்கள் இதயம் (மற்றும் பணப்பை) விரும்பும் அளவுக்கு NFT-களை உங்களால் உருவாக்க முடியும்!

வாருங்கள், தொடங்குவோம்!

## படி 1: Web3-ஐ நிறுவுங்கள் {#install-web3}

உங்கள் NFT ஸ்மார்ட் ஒப்பந்தத்தை உருவாக்குவது பற்றிய முதல் பயிற்சியை நீங்கள் பின்பற்றியிருந்தால், உங்களுக்கு ஏற்கனவே Ethers.js-ஐப் பயன்படுத்திய அனுபவம் இருக்கும். Web3 என்பது Ethers-ஐப் போன்றது, ஏனெனில் அது Ethereum பிளாக்செயினுக்கு கோரிக்கைகளை உருவாக்குவதை எளிதாக்கப் பயன்படும் ஒரு லைப்ரரி ஆகும். இந்தப் பயிற்சியில் நாம் [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)-ஐப் பயன்படுத்துவோம், இது தானியங்கு மறு முயற்சிகள் மற்றும் வலுவான WebSocket ஆதரவை வழங்கும் ஒரு மேம்படுத்தப்பட்ட Web3 லைப்ரரி ஆகும்.

உங்கள் ப்ராஜெக்ட் முகப்பு டைரக்டரியில் இதை இயக்கவும்:

```
npm install @alch/alchemy-web3
```

## படி 2: ஒரு `mint-nft.js` கோப்பை உருவாக்கவும் {#create-mintnftjs}

உங்கள் ஸ்கிரிப்ட்ஸ் டைரக்டரியின் உள்ளே, ஒரு `mint-nft.js` கோப்பை உருவாக்கி, பின்வரும் குறியீடு வரிகளைச் சேர்க்கவும்:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## படி 3: உங்கள் ஒப்பந்த ABI-ஐப் பெறுங்கள் {#contract-abi}

நமது ஒப்பந்த ABI (பயன்பாட்டு பைனரி இடைமுகம்) என்பது நமது ஸ்மார்ட் ஒப்பந்தத்துடன் தொடர்பு கொள்வதற்கான இடைமுகம் ஆகும். ஒப்பந்த ABI-கள் பற்றி மேலும் அறிய [இங்கே](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is) பார்க்கவும். Hardhat நமக்காக ஒரு ABI-ஐத் தானாக உருவாக்கி, அதை `MyNFT.json` கோப்பில் சேமிக்கிறது. இதைப் பயன்படுத்த, நமது `mint-nft.js` கோப்பில் பின்வரும் குறியீடு வரிகளைச் சேர்ப்பதன் மூலம் உள்ளடக்கங்களைப் பகுப்பாய்வு செய்ய வேண்டும்:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

நீங்கள் ABI-ஐப் பார்க்க விரும்பினால், அதை உங்கள் கன்சோலில் அச்சிடலாம்:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js` ஐ இயக்கி, உங்கள் ABI கன்சோலில் அச்சிடப்படுவதைப் பார்க்க, உங்கள் டெர்மினலுக்குச் சென்று இயக்கவும்:

```js
node scripts/mint-nft.js
```

## படி 4: IPFS-ஐப் பயன்படுத்தி உங்கள் NFT-க்கான மெட்டாடேட்டாவை உள்ளமைக்கவும் {#config-meta}

பகுதி 1-இல் உள்ள நமது பயிற்சியிலிருந்து உங்களுக்கு நினைவிருந்தால், நமது `mintNFT` ஸ்மார்ட் ஒப்பந்தச் செயல்பாடு ஒரு tokenURI அளவுருவை எடுத்துக்கொள்கிறது, அது NFT-யின் மெட்டாடேட்டாவை விவரிக்கும் ஒரு JSON ஆவணமாகத் தீர்க்கப்பட வேண்டும் — இதுதான் உண்மையில் NFT-க்கு உயிரூட்டுகிறது, இது பெயர், விளக்கம், படம் மற்றும் பிற பண்புக்கூறுகள் போன்ற உள்ளமைக்கக்கூடிய பண்புகளைக் கொண்டிருக்க அனுமதிக்கிறது.

> _கிரகங்களுக்கிடையேயான கோப்பு முறைமை (IPFS) என்பது ஒரு விநியோகிக்கப்பட்ட கோப்பு முறைமையில் தரவைச் சேமிப்பதற்கும் பகிர்வதற்கும் பயன்படும் ஒரு பரவலாக்கப்பட்ட நெறிமுறை மற்றும் பியர்-டு-பியர் நெட்வொர்க் ஆகும்._

நமது NFT உண்மையிலேயே பரவலாக்கப்பட்டிருப்பதை உறுதி செய்வதற்காக, நமது NFT சொத்து மற்றும் மெட்டாடேட்டாவைச் சேமிக்க, ஒரு வசதியான IPFS API மற்றும் கருவித்தொகுப்பான Pinata-வைப் பயன்படுத்துவோம். உங்களிடம் Pinata கணக்கு இல்லையென்றால், [இங்கே](https://app.pinata.cloud) ஒரு இலவச கணக்கிற்குப் பதிவுசெய்து, உங்கள் மின்னஞ்சலைச் சரிபார்க்கும் படிகளை முடிக்கவும்.

நீங்கள் ஒரு கணக்கை உருவாக்கியதும்:

- “Files” பக்கத்திற்குச் சென்று, பக்கத்தின் மேல்-இடதுபுறத்தில் உள்ள நீல நிற "Upload" பொத்தானைக் கிளிக் செய்யவும்.

- Pinata-வில் ஒரு படத்தைப் பதிவேற்றவும் — இது உங்கள் NFT-க்கான படச் சொத்தாக இருக்கும். சொத்துக்கு நீங்கள் விரும்பும் எந்தப் பெயரையும் இடலாம்

- நீங்கள் பதிவேற்றிய பிறகு, "Files" பக்கத்தில் உள்ள அட்டவணையில் கோப்புத் தகவலைப் பார்ப்பீர்கள். நீங்கள் ஒரு CID நெடுவரிசையையும் பார்ப்பீர்கள். அதற்கு அடுத்துள்ள நகலெடு பொத்தானைக் கிளிக் செய்வதன் மூலம் நீங்கள் CID-ஐ நகலெடுக்கலாம். உங்கள் பதிவேற்றத்தை `https://gateway.pinata.cloud/ipfs/<CID>` இல் பார்க்கலாம். உதாரணமாக, நாங்கள் IPFS-இல் பயன்படுத்திய படத்தை [இங்கே](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) காணலாம்.

காட்சி மூலம் கற்பவர்களுக்கு, மேலே உள்ள படிகள் இங்கே சுருக்கப்பட்டுள்ளன:

![உங்கள் படத்தை Pinata-வில் பதிவேற்றுவது எப்படி](./instructionsPinata.gif)

இப்போது, நாம் Pinata-வில் இன்னும் ஒரு ஆவணத்தைப் பதிவேற்ற உள்ளோம். ஆனால் அதைச் செய்வதற்கு முன், நாம் அதை உருவாக்க வேண்டும்!

உங்கள் ரூட் டைரக்டரியில், `nft-metadata.json` என்ற புதிய கோப்பை உருவாக்கி, பின்வரும் json குறியீட்டைச் சேர்க்கவும்:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

json-இல் உள்ள தரவை நீங்கள் தாராளமாக மாற்றலாம். நீங்கள் பண்புக்கூறுகள் பிரிவிலிருந்து அகற்றலாம் அல்லது அதில் சேர்க்கலாம். மிக முக்கியமாக, படப் புலம் உங்கள் IPFS படத்தின் இருப்பிடத்தைக் குறிப்பிடுவதை உறுதிசெய்யுங்கள் — இல்லையெனில், உங்கள் NFT ஒரு (மிகவும் அழகான!) புகைப்படத்தைக் கொண்டிருக்கும் நாய்.

நீங்கள் JSON கோப்பைத் திருத்தி முடித்ததும், அதைச் சேமித்து, படத்தைப் பதிவேற்றிய அதே படிகளைப் பின்பற்றி Pinata-வில் பதிவேற்றவும்.

![உங்கள் nft-metadata.json-ஐ Pinata-வில் பதிவேற்றுவது எப்படி](./uploadPinata.gif)

## படி 5: உங்கள் ஒப்பந்தத்தின் ஒரு நிகழ்வை உருவாக்கவும் {#instance-contract}

இப்போது, நமது ஒப்பந்தத்துடன் தொடர்பு கொள்ள, நமது குறியீட்டில் அதன் ஒரு நிகழ்வை உருவாக்க வேண்டும். அதைச் செய்ய, நமக்கு நமது ஒப்பந்த முகவரி தேவைப்படும், அதை நாம் வரிசைப்படுத்தலில் இருந்தோ அல்லது ஒப்பந்தத்தை வரிசைப்படுத்த நீங்கள் பயன்படுத்திய முகவரியை [Blockscout](https://eth-sepolia.blockscout.com/)-இல் தேடுவதன் மூலமோ பெறலாம்.

![Etherscan-இல் உங்கள் ஒப்பந்த முகவரியைக் காண்க](./view-contract-etherscan.png)

மேலே உள்ள எடுத்துக்காட்டில், நமது ஒப்பந்த முகவரி 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778 ஆகும்.

அடுத்து, ABI மற்றும் முகவரியைப் பயன்படுத்தி நமது ஒப்பந்தத்தை உருவாக்க, Web3 [ஒப்பந்த முறையை](https://docs.web3js.org/api/web3-eth-contract/class/Contract) பயன்படுத்துவோம். உங்கள் `mint-nft.js` கோப்பில், பின்வருவனவற்றைச் சேர்க்கவும்:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## படி 6: `.env` கோப்பைப் புதுப்பிக்கவும் {#update-env}

இப்போது, Ethereum சங்கிலிக்கு பரிவர்த்தனைகளை உருவாக்கி அனுப்ப, கணக்கு நான்ஸைப் பெற நாங்கள் உங்கள் பொது Ethereum கணக்கு முகவரியைப் பயன்படுத்துவோம் (கீழே விளக்குவோம்).

உங்கள் பொதுத் திறவுகோலை உங்கள் `.env` கோப்பில் சேர்க்கவும் — நீங்கள் பயிற்சியின் பகுதி 1-ஐ முடித்திருந்தால், நமது `.env` கோப்பு இப்போது இப்படி இருக்க வேண்டும்:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## படி 7: உங்கள் பரிவர்த்தனையை உருவாக்கவும் {#create-txn}

முதலில், `mintNFT(tokenData)` என்ற பெயரில் ஒரு செயல்பாட்டை வரையறுத்து, பின்வருவனவற்றைச் செய்வதன் மூலம் நமது பரிவர்த்தனையை உருவாக்குவோம்:

1. `.env` கோப்பிலிருந்து உங்கள் _PRIVATE_KEY_ மற்றும் _PUBLIC_KEY_-ஐப் பெறுங்கள்.

2. அடுத்து, நாம் கணக்கு நான்ஸைக் கண்டுபிடிக்க வேண்டும். நான்ஸ் விவரக்குறிப்பு உங்கள் முகவரியிலிருந்து அனுப்பப்பட்ட பரிவர்த்தனைகளின் எண்ணிக்கையைக் கண்காணிக்கப் பயன்படுகிறது — இது பாதுகாப்பு நோக்கங்களுக்காகவும் மற்றும் [மறு தாக்குதல்களைத்](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) தடுக்கவும் நமக்குத் தேவை. உங்கள் முகவரியிலிருந்து அனுப்பப்பட்ட பரிவர்த்தனைகளின் எண்ணிக்கையைப் பெற, நாம் [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)-ஐப் பயன்படுத்துகிறோம்.

3. இறுதியாக, பின்வரும் தகவலுடன் நமது பரிவர்த்தனையை அமைப்போம்:

- `'from': PUBLIC_KEY` — நமது பரிவர்த்தனையின் மூலம் நமது பொது முகவரி

- `'to': contractAddress` — நாம் தொடர்பு கொள்ள விரும்பும் மற்றும் பரிவர்த்தனையை அனுப்ப விரும்பும் ஒப்பந்தம்

- `'nonce': nonce` — நமது முகவரியிலிருந்து அனுப்பப்பட்ட பரிவர்த்தனைகளின் எண்ணிக்கையுடன் கூடிய கணக்கு நான்ஸ்

- `'gas': estimatedGas` — பரிவர்த்தனையை முடிக்கத் தேவையான மதிப்பிடப்பட்ட எரிவாயு

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — இந்தப் பரிவர்த்தனையில் நாம் செய்ய விரும்பும் கணக்கீடு — இது இந்த விஷயத்தில் ஒரு NFT-ஐ உருவாக்குவதாகும்

உங்கள் `mint-nft.js` கோப்பு இப்போது இப்படி இருக்க வேண்டும்:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //சமீபத்திய நான்ஸைப் பெறு

   //பரிவர்த்தனை
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## படி 8: பரிவர்த்தனையில் கையொப்பமிடுங்கள் {#sign-txn}

இப்போது நமது பரிவர்த்தனையை உருவாக்கியுள்ளோம், அதை அனுப்புவதற்காக நாம் அதில் கையொப்பமிட வேண்டும். இங்குதான் நமது தனிப்பட்ட திறவுகோலைப் பயன்படுத்துவோம்.

`web3.eth.sendSignedTransaction` நமக்கு பரிவர்த்தனை ஹாஷைத் தரும், அதை நாம் நமது பரிவர்த்தனை மைன் செய்யப்பட்டதா மற்றும் நெட்வொர்க்கால் கைவிடப்படவில்லையா என்பதை உறுதிப்படுத்த பயன்படுத்தலாம். பரிவர்த்தனை கையொப்பமிடும் பிரிவில், நமது பரிவர்த்தனை வெற்றிகரமாக நடந்ததா என்பதை நாம் அறிய சில பிழைச் சரிபார்ப்பைச் சேர்த்துள்ளோம் என்பதை நீங்கள் கவனிப்பீர்கள்.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //சமீபத்திய நான்ஸைப் பெறு

  //பரிவர்த்தனை
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "உங்கள் பரிவர்த்தனையின் ஹாஷ்: ",
              hash,
              "\nஉங்கள் பரிவர்த்தனையின் நிலையைப் பார்க்க Alchemy's Mempool-ஐச் சரிபார்க்கவும்!"
            )
          } else {
            console.log(
              "உங்கள் பரிவர்த்தனையைச் சமர்ப்பிக்கும்போது ஏதோ தவறு జరిగింది:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" வாக்குறுதி தோல்வியடைந்தது:", err)
    })
}
```

## படி 9: `mintNFT`-ஐ அழைத்து, நோட் `mint-nft.js`-ஐ இயக்கவும் {#call-mintnft-fn}

நீங்கள் Pinata-வில் பதிவேற்றிய `metadata.json` நினைவிருக்கிறதா? Pinata-விலிருந்து அதன் ஹாஷ்கோடைப் பெற்று, `mintNFT` செயல்பாட்டிற்கு அளவுருவாக `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` என்பதை அனுப்பவும்

ஹாஷ்கோடைப் பெறுவது எப்படி என்பது இங்கே:

![Pinata-வில் உங்கள் nft மெட்டாடேட்டா ஹாஷ்கோடைப் பெறுவது எப்படி](./metadataPinata.gif)_Pinata-வில் உங்கள் nft மெட்டாடேட்டா ஹாஷ்கோடைப் பெறுவது எப்படி_

> `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` என்பதை ஒரு தனி சாளரத்தில் ஏற்றுவதன் மூலம், நீங்கள் நகலெடுத்த ஹாஷ்கோடு உங்கள் **metadata.json**-க்கு இணைக்கப்பட்டுள்ளதா என்பதை இருமுறை சரிபார்க்கவும். அந்தப் பக்கம் கீழே உள்ள ஸ்கிரீன் ஷாட்டைப் போலவே இருக்க வேண்டும்:

![உங்கள் பக்கம் json மெட்டாடேட்டாவைக் காட்ட வேண்டும்](./metadataJSON.png)_உங்கள் பக்கம் json மெட்டாடேட்டாவைக் காட்ட வேண்டும்_

மொத்தத்தில், உங்கள் குறியீடு இதுபோன்று இருக்க வேண்டும்:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //சமீபத்திய நான்ஸைப் பெறு

  //பரிவர்த்தனை
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "உங்கள் பரிவர்த்தனையின் ஹாஷ்: ",
              hash,
              "\nஉங்கள் பரிவர்த்தனையின் நிலையைப் பார்க்க Alchemy's Mempool-ஐச் சரிபார்க்கவும்!"
            )
          } else {
            console.log(
              "உங்கள் பரிவர்த்தனையைச் சமர்ப்பிக்கும்போது ஏதோ தவறு జరిగింది:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("வாக்குறுதி தோல்வியடைந்தது:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

இப்போது, உங்கள் NFT-ஐ வரிசைப்படுத்த `node scripts/mint-nft.js` ஐ இயக்கவும். சில வினாடிகளுக்குப் பிறகு, உங்கள் டெர்மினலில் இது போன்ற ஒரு பதிலைக் காண்பீர்கள்:

    ```
    உங்கள் பரிவர்த்தனையின் ஹாஷ்: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    உங்கள் பரிவர்த்தனையின் நிலையைப் பார்க்க Alchemy's Mempool-ஐச் சரிபார்க்கவும்!
    ```

அடுத்து, உங்கள் பரிவர்த்தனையின் நிலையைப் பார்க்க (அது நிலுவையில் உள்ளதா, மைன் செய்யப்பட்டதா அல்லது நெட்வொர்க்கால் கைவிடப்பட்டதா என்பதைப் பார்க்க) உங்கள் [Alchemy mempool](https://dashboard.alchemyapi.io/mempool)-க்குச் செல்லவும். உங்கள் பரிவர்த்தனை கைவிடப்பட்டால், [Blockscout](https://eth-sepolia.blockscout.com/)-ஐச் சரிபார்த்து உங்கள் பரிவர்த்தனை ஹாஷைத் தேடுவதும் உதவியாக இருக்கும்.

![Etherscan-இல் உங்கள் NFT பரிவர்த்தனை ஹாஷைக் காண்க](./view-nft-etherscan.png)_Etherscan-இல் உங்கள் NFT பரிவர்த்தனை ஹாஷைக் காண்க_

அவ்வளவுதான்! நீங்கள் இப்போது Ethereum பிளாக்செயினில் ஒரு NFT-ஐ வரிசைப்படுத்தி மற்றும் உருவாக்கியுள்ளீர்கள் <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js`-ஐப் பயன்படுத்தி, உங்கள் இதயம் (மற்றும் பணப்பை) விரும்பும் அளவுக்கு நீங்கள் NFT-களை உருவாக்கலாம்! NFT-யின் மெட்டாடேட்டாவை விவரிக்கும் ஒரு புதிய tokenURI-ஐ அனுப்புவதை உறுதிப்படுத்திக் கொள்ளுங்கள் (இல்லையெனில், நீங்கள் வெவ்வேறு ID-களுடன் ஒரே மாதிரியான பலவற்றை உருவாக்குவதில் முடிவடையும்).

உங்கள் பணப்பையில் உங்கள் NFT-ஐக் காட்ட நீங்கள் விரும்புவீர்கள் — எனவே [பகுதி 3: உங்கள் பணப்பையில் உங்கள் NFT-ஐப் பார்ப்பது எப்படி](/developers/tutorials/how-to-view-nft-in-metamask/)-ஐப் பார்க்க மறக்காதீர்கள்!

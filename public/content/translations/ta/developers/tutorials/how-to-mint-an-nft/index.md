---
title: "ஒரு NFT-ஐ மின்ட் செய்வது எப்படி (NFT பயிற்சித் தொடரின் பகுதி 2/3)"
description: "எங்கள் ஸ்மார்ட் ஒப்பந்தம் மற்றும் Web3-ஐப் பயன்படுத்தி Ethereum பிளாக்செயினில் ஒரு NFT-ஐ எவ்வாறு மின்ட் செய்வது என்பதை இந்தப் பயிற்சி விவரிக்கிறது."
author: "சுமி முத்கில்"
tags: ["ERC-721", "Alchemy", "Solidity", "ஸ்மார்ட் ஒப்பந்தங்கள்"]
skill: beginner
breadcrumb: "ஒரு NFT-ஐ மின்ட் செய்தல்"
lang: ta
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 மில்லியன்
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 மில்லியன்
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 மில்லியன்

இவர்கள் அனைவரும் Alchemy-இன் சக்திவாய்ந்த API-ஐப் பயன்படுத்தி தங்களது NFT-களை மின்ட் செய்தனர். இந்தப் பயிற்சியில், 10 நிமிடங்களுக்குள் அதை எப்படிச் செய்வது என்பதை நாங்கள் உங்களுக்குக் கற்பிப்போம்.

"ஒரு NFT-ஐ மின்ட் செய்வது" என்பது பிளாக்செயினில் உங்கள் ERC-721 டோக்கனின் தனித்துவமான நிகழ்வை வெளியிடும் செயலாகும். [இந்த NFT பயிற்சித் தொடரின் பகுதி 1](/developers/tutorials/how-to-write-and-deploy-an-nft/)-இல் உள்ள எங்கள் ஸ்மார்ட் ஒப்பந்தத்தைப் பயன்படுத்தி, நமது Web3 திறன்களை வெளிப்படுத்தி ஒரு NFT-ஐ மின்ட் செய்வோம். இந்தப் பயிற்சியின் முடிவில், உங்கள் மனமும் (மற்றும் வாலட்டும்) விரும்பும் அளவுக்கு பல NFT-களை உங்களால் மின்ட் செய்ய முடியும்!

வாருங்கள் தொடங்கலாம்!

## படி 1: Web3-ஐ நிறுவுதல் {#install-web3}

உங்கள் NFT ஸ்மார்ட் ஒப்பந்தத்தை உருவாக்குவது குறித்த முதல் பயிற்சியை நீங்கள் பின்பற்றியிருந்தால், Ethers.js-ஐப் பயன்படுத்திய அனுபவம் உங்களுக்கு ஏற்கனவே இருக்கும். Web3 என்பது Ethers-ஐப் போன்றதே, ஏனெனில் இது [Ethereum](/) பிளாக்செயினுக்கு கோரிக்கைகளை உருவாக்குவதை எளிதாக்கப் பயன்படும் ஒரு லைப்ரரியாகும். இந்தப் பயிற்சியில் நாம் [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)-ஐப் பயன்படுத்துவோம், இது தானியங்கி மறுமுயற்சிகள் மற்றும் வலுவான WebSocket ஆதரவை வழங்கும் மேம்படுத்தப்பட்ட Web3 லைப்ரரியாகும்.

உங்கள் திட்டத்தின் முகப்பு கோப்பகத்தில் (home directory) இதை இயக்கவும்:

```
npm install @alch/alchemy-web3
```

## படி 2: `mint-nft.js` கோப்பை உருவாக்குதல் {#create-mintnftjs}

உங்கள் scripts கோப்பகத்திற்குள், `mint-nft.js` என்ற கோப்பை உருவாக்கி, பின்வரும் குறியீட்டு வரிகளைச் சேர்க்கவும்:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## படி 3: உங்கள் ஒப்பந்தத்தின் ABI-ஐப் பெறுதல் {#contract-abi}

நமது ஒப்பந்தத்தின் ABI (Application Binary Interface) என்பது நமது ஸ்மார்ட் ஒப்பந்தத்துடன் தொடர்புகொள்வதற்கான இடைமுகமாகும். ஒப்பந்த ABI-கள் பற்றி [இங்கே](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is) நீங்கள் மேலும் அறியலாம். Hardhat நமக்காக தானாகவே ஒரு ABI-ஐ உருவாக்கி அதை `MyNFT.json` கோப்பில் சேமிக்கிறது. இதைப் பயன்படுத்த, நமது `mint-nft.js` கோப்பில் பின்வரும் குறியீட்டு வரிகளைச் சேர்ப்பதன் மூலம் உள்ளடக்கங்களைப் பாகுபடுத்த (parse) வேண்டும்:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

நீங்கள் ABI-ஐப் பார்க்க விரும்பினால், அதை உங்கள் கன்சோலில் அச்சிடலாம்:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js`-ஐ இயக்கி, உங்கள் ABI கன்சோலில் அச்சிடப்பட்டிருப்பதைப் பார்க்க, உங்கள் டெர்மினலுக்குச் சென்று இதை இயக்கவும்:

```js
node scripts/mint-nft.js
```

## படி 4: IPFS-ஐப் பயன்படுத்தி உங்கள் NFT-க்கான மெட்டாடேட்டாவை உள்ளமைத்தல் {#config-meta}

பகுதி 1-இல் உள்ள நமது பயிற்சியிலிருந்து உங்களுக்கு நினைவிருந்தால், நமது `mintNFT` ஸ்மார்ட் ஒப்பந்தச் செயல்பாடு ஒரு tokenURI அளவுருவை எடுத்துக்கொள்கிறது, அது NFT-இன் மெட்டாடேட்டாவை விவரிக்கும் JSON ஆவணமாகத் தீர்க்கப்பட வேண்டும்— இதுவே உண்மையில் NFT-க்கு உயிரூட்டுகிறது, பெயர், விளக்கம், படம் மற்றும் பிற பண்புக்கூறுகள் போன்ற உள்ளமைக்கக்கூடிய பண்புகளைக் கொண்டிருக்க அனுமதிக்கிறது.

> _Interplanetary File System (IPFS) என்பது பரவலாக்கப்பட்ட கோப்பு முறைமையில் தரவைச் சேமிப்பதற்கும் பகிர்வதற்குமான ஒரு பரவலாக்கப்பட்ட நெறிமுறை மற்றும் பியர்-டு-பியர் (peer-to-peer) நெட்வொர்க் ஆகும்._

நமது NFT உண்மையிலேயே பரவலாக்கப்பட்டிருப்பதை உறுதிசெய்ய, நமது NFT சொத்து மற்றும் மெட்டாடேட்டாவைச் சேமிக்க, வசதியான IPFS API மற்றும் கருவித்தொகுப்பான Pinata-ஐப் பயன்படுத்துவோம். உங்களிடம் Pinata கணக்கு இல்லையென்றால், [இங்கே](https://app.pinata.cloud) இலவசக் கணக்கிற்குப் பதிவுசெய்து, உங்கள் மின்னஞ்சலைச் சரிபார்க்கும் படிகளை முடிக்கவும்.

நீங்கள் ஒரு கணக்கை உருவாக்கியதும்:

- "Files" பக்கத்திற்குச் சென்று, பக்கத்தின் மேல்-இடதுபுறத்தில் உள்ள நீல நிற "Upload" பொத்தானைக் கிளிக் செய்யவும்.

- Pinata-வில் ஒரு படத்தைப் பதிவேற்றவும் — இது உங்கள் NFT-க்கான படச் சொத்தாக இருக்கும். இந்தச் சொத்திற்கு நீங்கள் விரும்பும் எந்தப் பெயரையும் தயங்காமல் சூட்டலாம்

- நீங்கள் பதிவேற்றிய பிறகு, "Files" பக்கத்தில் உள்ள அட்டவணையில் கோப்புத் தகவலைக் காண்பீர்கள். நீங்கள் ஒரு CID நெடுவரிசையையும் காண்பீர்கள். அதன் பக்கத்தில் உள்ள நகலெடு பொத்தானைக் கிளிக் செய்வதன் மூலம் CID-ஐ நகலெடுக்கலாம். நீங்கள் பதிவேற்றியதை இங்கே பார்க்கலாம்: `https://gateway.pinata.cloud/ipfs/<CID>`. எடுத்துக்காட்டாக, IPFS-இல் நாங்கள் பயன்படுத்திய படத்தை [இங்கே](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) காணலாம்.

காட்சி மூலம் கற்பவர்களுக்கு, மேலே உள்ள படிகள் இங்கே சுருக்கப்பட்டுள்ளன:

![Pinata-வில் உங்கள் படத்தைப் பதிவேற்றுவது எப்படி](./instructionsPinata.gif)

இப்போது, நாம் Pinata-வில் மேலும் ஒரு ஆவணத்தைப் பதிவேற்றப் போகிறோம். ஆனால் அதைச் செய்வதற்கு முன், நாம் அதை உருவாக்க வேண்டும்!

உங்கள் ரூட் கோப்பகத்தில் (root directory), `nft-metadata.json` என்ற புதிய கோப்பை உருவாக்கி, பின்வரும் json குறியீட்டைச் சேர்க்கவும்:

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

json-இல் உள்ள தரவை நீங்கள் விரும்பியபடி மாற்றிக்கொள்ளலாம். பண்புக்கூறுகள் (attributes) பிரிவில் நீங்கள் நீக்கலாம் அல்லது சேர்க்கலாம். மிக முக்கியமாக, படப் புலம் (image field) உங்கள் IPFS படத்தின் இருப்பிடத்தைக் குறிக்கிறதா என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள் — இல்லையெனில், உங்கள் NFT-இல் ஒரு (மிகவும் அழகான!) நாயின் புகைப்படம் இடம்பெறும்.

JSON கோப்பைத் திருத்தி முடித்ததும், படத்தைப் பதிவேற்றுவதற்கு நாம் செய்த அதே படிகளைப் பின்பற்றி, அதைச் சேமித்து Pinata-வில் பதிவேற்றவும்.

![Pinata-வில் உங்கள் nft-metadata.json-ஐப் பதிவேற்றுவது எப்படி](./uploadPinata.gif)

## படி 5: உங்கள் ஒப்பந்தத்தின் நிகழ்வை (instance) உருவாக்குதல் {#instance-contract}

இப்போது, நமது ஒப்பந்தத்துடன் தொடர்புகொள்ள, நமது குறியீட்டில் அதன் நிகழ்வை (instance) உருவாக்க வேண்டும். அவ்வாறு செய்ய, நமது ஒப்பந்த முகவரி தேவைப்படும், அதை நீங்கள் ஒப்பந்தத்தைப் பயன்படுத்திய முகவரியைத் தேடுவதன் மூலம் வரிசைப்படுத்தலில் (deployment) இருந்தோ அல்லது [Blockscout](https://eth-sepolia.blockscout.com/)-இல் இருந்தோ பெறலாம்.

![Etherscan-இல் உங்கள் ஒப்பந்த முகவரியைப் பார்க்கவும்](./view-contract-etherscan.png)

மேலே உள்ள எடுத்துக்காட்டில், நமது ஒப்பந்த முகவரி 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778 ஆகும்.

அடுத்து, ABI மற்றும் முகவரியைப் பயன்படுத்தி நமது ஒப்பந்தத்தை உருவாக்க Web3 [ஒப்பந்த முறையை (contract method)](https://docs.web3js.org/api/web3-eth-contract/class/Contract) பயன்படுத்துவோம். உங்கள் `mint-nft.js` கோப்பில், பின்வருவனவற்றைச் சேர்க்கவும்:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## படி 6: `.env` கோப்பைப் புதுப்பித்தல் {#update-env}

இப்போது, Ethereum செயினுக்குப் பரிவர்த்தனைகளை உருவாக்கி அனுப்ப, கணக்கின் நான்ஸைப் (nonce) பெற உங்கள் பொது Ethereum கணக்கு முகவரியைப் பயன்படுத்துவோம் (கீழே விளக்கப்படும்).

உங்கள் `.env` கோப்பில் உங்கள் பொது விசையைச் (public key) சேர்க்கவும் — நீங்கள் பயிற்சியின் பகுதி 1-ஐ முடித்திருந்தால், நமது `.env` கோப்பு இப்போது இப்படி இருக்க வேண்டும்:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## படி 7: உங்கள் பரிவர்த்தனையை உருவாக்குதல் {#create-txn}

முதலில், `mintNFT(tokenData)` என்ற பெயரில் ஒரு செயல்பாட்டை வரையறுத்து, பின்வருவனவற்றைச் செய்வதன் மூலம் நமது பரிவர்த்தனையை உருவாக்குவோம்:

1. `.env` கோப்பிலிருந்து உங்கள் _PRIVATE_KEY_ மற்றும் _PUBLIC_KEY_-ஐப் பெறவும்.

1. அடுத்து, கணக்கின் நான்ஸை (nonce) நாம் கண்டுபிடிக்க வேண்டும். உங்கள் முகவரியிலிருந்து அனுப்பப்பட்ட பரிவர்த்தனைகளின் எண்ணிக்கையைக் கண்காணிக்க நான்ஸ் விவரக்குறிப்பு பயன்படுத்தப்படுகிறது — இது பாதுகாப்பு நோக்கங்களுக்காகவும் [ரீப்ளே தாக்குதல்களைத் (replay attacks)](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) தடுக்கவும் நமக்குத் தேவை. உங்கள் முகவரியிலிருந்து அனுப்பப்பட்ட பரிவர்த்தனைகளின் எண்ணிக்கையைப் பெற, நாம் [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)-ஐப் பயன்படுத்துகிறோம்.

1. இறுதியாக பின்வரும் தகவல்களுடன் நமது பரிவர்த்தனையை அமைப்போம்:

- `'from': PUBLIC_KEY` — நமது பரிவர்த்தனையின் தோற்றம் நமது பொது முகவரியாகும்

- `'to': contractAddress` — நாம் தொடர்புகொள்ளவும் பரிவர்த்தனையை அனுப்பவும் விரும்பும் ஒப்பந்தம்

- `'nonce': nonce` — நமது முகவரியிலிருந்து அனுப்பப்பட்ட பரிவர்த்தனைகளின் எண்ணிக்கையைக் கொண்ட கணக்கு நான்ஸ்

- `'gas': estimatedGas` — பரிவர்த்தனையை முடிக்கத் தேவையான மதிப்பிடப்பட்ட கேஸ்

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — இந்தப் பரிவர்த்தனையில் நாம் செய்ய விரும்பும் கணக்கீடு — இந்தச் சூழலில் இது ஒரு NFT-ஐ மின்ட் செய்வதாகும்

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // சமீபத்திய நான்ஸைப் பெறுக

   // பரிவர்த்தனை
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## படி 8: பரிவர்த்தனையில் கையொப்பமிடுதல் {#sign-txn}

இப்போது நாம் நமது பரிவர்த்தனையை உருவாக்கிவிட்டோம், அதை அனுப்புவதற்கு அதில் கையொப்பமிட வேண்டும். இங்குதான் நமது தனிப்பட்ட விசையைப் (private key) பயன்படுத்துவோம்.

`web3.eth.sendSignedTransaction` நமக்கு பரிவர்த்தனை ஹாஷை (transaction hash) வழங்கும், நமது பரிவர்த்தனை மைன் செய்யப்பட்டதா மற்றும் நெட்வொர்க்கால் கைவிடப்படவில்லையா என்பதை உறுதிப்படுத்த இதைப் பயன்படுத்தலாம். பரிவர்த்தனையில் கையொப்பமிடும் பிரிவில், சில பிழைச் சரிபார்ப்புகளைச் சேர்த்துள்ளதை நீங்கள் கவனிப்பீர்கள், இதன் மூலம் நமது பரிவர்த்தனை வெற்றிகரமாக நடந்ததா என்பதை நாம் அறியலாம்.

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") // சமீபத்திய நான்ஸைப் பெறுக

  // பரிவர்த்தனை
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
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## படி 9: `mintNFT`-ஐ அழைத்து node `mint-nft.js`-ஐ இயக்குதல் {#call-mintnft-fn}

Pinata-வில் நீங்கள் பதிவேற்றிய `metadata.json` நினைவிருக்கிறதா? Pinata-விலிருந்து அதன் ஹாஷ்கோடைப் (hashcode) பெற்று, பின்வருவனவற்றை `mintNFT` செயல்பாட்டிற்கு அளவுருவாக (parameter) அனுப்பவும் `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

ஹாஷ்கோடை எவ்வாறு பெறுவது என்பது இங்கே:

![Pinata-வில் உங்கள் nft மெட்டாடேட்டா ஹாஷ்கோடை எவ்வாறு பெறுவது](./metadataPinata.gif)_Pinata-வில் உங்கள் nft மெட்டாடேட்டா ஹாஷ்கோடை எவ்வாறு பெறுவது_

> நீங்கள் நகலெடுத்த ஹாஷ்கோடு உங்கள் **metadata.json**-உடன் இணைக்கப்பட்டுள்ளதா என்பதை `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`-ஐ ஒரு தனி சாளரத்தில் ஏற்றுவதன் மூலம் இருமுறை சரிபார்க்கவும். பக்கம் கீழே உள்ள ஸ்கிரீன்ஷாட்டைப் போலவே இருக்க வேண்டும்:

![உங்கள் பக்கம் json மெட்டாடேட்டாவைக் காட்ட வேண்டும்](./metadataJSON.png)_உங்கள் பக்கம் json மெட்டாடேட்டாவைக் காட்ட வேண்டும்_

ஒட்டுமொத்தமாக, உங்கள் குறியீடு இதுபோன்று இருக்க வேண்டும்:

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") // சமீபத்திய நான்ஸைப் பெறுக

  // பரிவர்த்தனை
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
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

இப்போது, உங்கள் NFT-ஐ வரிசைப்படுத்த `node scripts/mint-nft.js`-ஐ இயக்கவும். சில வினாடிகளுக்குப் பிறகு, உங்கள் டெர்மினலில் இது போன்ற ஒரு பதிலைக் காண வேண்டும்:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

அடுத்து, உங்கள் பரிவர்த்தனையின் நிலையைப் பார்க்க (அது நிலுவையில் உள்ளதா, மைன் செய்யப்பட்டதா அல்லது நெட்வொர்க்கால் கைவிடப்பட்டதா) உங்கள் [Alchemy mempool](https://dashboard.alchemyapi.io/mempool)-ஐப் பார்வையிடவும். உங்கள் பரிவர்த்தனை கைவிடப்பட்டால், [Blockscout](https://eth-sepolia.blockscout.com/)-ஐச் சரிபார்த்து உங்கள் பரிவர்த்தனை ஹாஷைத் தேடுவதும் உதவியாக இருக்கும்.

![Etherscan-இல் உங்கள் NFT பரிவர்த்தனை ஹாஷைப் பார்க்கவும்](./view-nft-etherscan.png)_Etherscan-இல் உங்கள் NFT பரிவர்த்தனை ஹாஷைப் பார்க்கவும்_

அவ்வளவுதான்! நீங்கள் இப்போது Ethereum பிளாக்செயினில் ஒரு NFT-ஐ வரிசைப்படுத்தி மின்ட் செய்துள்ளீர்கள் <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js`-ஐப் பயன்படுத்தி உங்கள் மனமும் (மற்றும் வாலட்டும்) விரும்பும் அளவுக்கு பல NFT-களை உங்களால் மின்ட் செய்ய முடியும்! NFT-இன் மெட்டாடேட்டாவை விவரிக்கும் புதிய tokenURI-ஐ அனுப்புவதை மட்டும் உறுதிப்படுத்திக் கொள்ளுங்கள் (இல்லையெனில், வெவ்வேறு ID-களுடன் ஒரே மாதிரியான பலவற்றை உருவாக்குவீர்கள்).

உங்கள் வாலட்டில் உங்கள் NFT-ஐக் காட்ட நீங்கள் விரும்புவீர்கள் — எனவே [பகுதி 3: உங்கள் வாலட்டில் உங்கள் NFT-ஐ எவ்வாறு பார்ப்பது](/developers/tutorials/how-to-view-nft-in-metamask/)-ஐச் சரிபார்க்கவும்!
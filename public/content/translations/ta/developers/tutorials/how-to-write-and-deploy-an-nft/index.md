---
title: "NFT-ஐ எவ்வாறு எழுதுவது மற்றும் Deploy செய்வது (NFT Tutorial தொடரின் பகுதி 1/3)"
description: "இந்த tutorial, NFTs பற்றிய தொடரின் பகுதி 1 ஆகும். இது Ethereum மற்றும் Inter Planetary File System (IPFS) ஆகியவற்றைப் பயன்படுத்தி Non Fungible Token (ERC-721 டோக்கன்) smart contract-ஐ எவ்வாறு எழுதுவது மற்றும் deploy செய்வது என்பதை படிப்படியாக உங்களுக்கு விளக்கும்."
author: "Sumi Mudgil"
tags:
  [
    "கருத்துகளுக்கான Ethereum கோரிக்கை 721",
    "அல்கெமி",
    "Solidity",
    "ஸ்மார்ட் ஒப்பந்தங்கள்"
  ]
skill: beginner
breadcrumb: "NFT எழுது நிறுவு"
lang: ta
published: 2021-04-22
---

NFT-கள் பிளாக்செயினை பொதுமக்களின் கவனத்திற்கு கொண்டு வருவதால், Ethereum பிளாக்செயினில் உங்கள் சொந்த NFT contract (ERC-721 டோக்கன்)-ஐ வெளியிடுவதன் மூலம் இந்த பிரபலத்தை நீங்களே புரிந்துகொள்ள இது ஒரு சிறந்த வாய்ப்பாகும்!

Makersplace (சமீபத்தில் Christie's இல் $69 மில்லியனுக்கு டிஜிட்டல் கலைப்படைப்பை சாதனை விலையில் விற்றது), Dapper Labs (NBA Top Shot & Crypto Kitties உருவாக்கியவர்கள்), OpenSea (உலகின் மிகப்பெரிய NFT சந்தை), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable மற்றும் பலவற்றை உள்ளடக்கிய NFT துறையில் மிகப்பெரிய பெயர்களுக்கு ஆற்றல் அளிப்பதில் Alchemy மிகவும் பெருமை கொள்கிறது.

இந்த tutorial-இல், [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) மற்றும் [Alchemy](https://alchemy.com/signup/eth) ஆகியவற்றைப் பயன்படுத்தி Sepolia test network-இல் ஒரு ERC-721 smart contract-ஐ உருவாக்கி மற்றும் deploy செய்வதை நாம் காண்போம் (இவற்றின் அர்த்தம் உங்களுக்கு இன்னும் புரியவில்லை என்றால் கவலைப்பட வேண்டாம் — நாங்கள் அதை விளக்குவோம்!).

இந்த tutorial-இன் பகுதி 2 இல், NFT-ஐ mint செய்ய நமது smart contract-ஐ எவ்வாறு பயன்படுத்தலாம் என்பதைப் பார்ப்போம், மேலும் பகுதி 3 இல், MetaMask-இல் உங்கள் NFT-ஐ எவ்வாறு பார்ப்பது என்பதை விளக்குவோம்.

நிச்சயமாக, உங்களுக்கு எந்த நேரத்திலும் கேள்விகள் இருந்தால், [Alchemy Discord](https://discord.gg/gWuC7zB)-இல் கேட்கத் தயங்காதீர்கள் அல்லது [Alchemy's NFT API ஆவணங்களை](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)-ஐப் பார்வையிடுங்கள்!

## படி 1: Ethereum நெட்வொர்க்குடன் இணையுங்கள் {#connect-to-ethereum}

Ethereum பிளாக்செயினுக்கு கோரிக்கைகளைச் செய்ய பல வழிகள் உள்ளன, ஆனால் விஷயங்களை எளிதாக்க, [Alchemy](https://alchemy.com/signup/eth) இல் ஒரு இலவச கணக்கைப் பயன்படுத்துவோம். இது ஒரு பிளாக்செயின் டெவலப்பர் தளம் மற்றும் API ஆகும். இது நமது சொந்த நோட்களை இயக்காமல் Ethereum சங்கிலியுடன் தொடர்பு கொள்ள அனுமதிக்கிறது.

இந்த tutorial-இல், நமது smart contract deployment-இல் என்ன நடக்கிறது என்பதைப் புரிந்துகொள்ள, கண்காணிப்பு மற்றும் பகுப்பாய்விற்கான Alchemy-இன் டெவலப்பர் கருவிகளையும் நாங்கள் பயன்படுத்திக் கொள்வோம். உங்களிடம் ஏற்கனவே Alchemy கணக்கு இல்லை என்றால், நீங்கள் [இங்கே](https://alchemy.com/signup/eth) இலவசமாக பதிவு செய்யலாம்.

## படி 2: உங்கள் பயன்பாட்டை (மற்றும் API கீயை) உருவாக்கவும் {#make-api-key}

நீங்கள் ஒரு Alchemy கணக்கை உருவாக்கியதும், ஒரு பயன்பாட்டை உருவாக்குவதன் மூலம் API கீயை உருவாக்கலாம். இது Sepolia test நெட்வொர்க்கிற்கு கோரிக்கைகளைச் செய்ய எங்களை அனுமதிக்கும். டெஸ்ட் நெட்வொர்க்குகள் பற்றி மேலும் அறிய ஆர்வமாக இருந்தால், [இந்த வழிகாட்டியைப்](https://docs.alchemyapi.io/guides/choosing-a-network) பாருங்கள்.

1. nav bar-இல் உள்ள “Apps” மீது ஹோவர் செய்து “Create App” என்பதைக் கிளிக் செய்வதன் மூலம் உங்கள் Alchemy டாஷ்போர்டில் உள்ள “Create App” பக்கத்திற்குச் செல்லவும்.

![உங்கள் பயன்பாட்டை உருவாக்கவும்](./create-your-app.png)

2. உங்கள் பயன்பாட்டிற்குப் பெயரிடுங்கள் (நாங்கள் “My First NFT!” என்பதைத் தேர்ந்தெடுத்தோம்), ஒரு சிறு விளக்கத்தை வழங்கவும், Chain-க்கு “Ethereum” என்பதைத் தேர்ந்தெடுக்கவும், மற்றும் உங்கள் நெட்வொர்க்கிற்கு “Sepolia”-வைத் தேர்ந்தெடுக்கவும். தி மெர்ஜிற்குப் பிறகு மற்ற டெஸ்ட்நெட்கள் வழக்கற்றுப் போய்விட்டன.

![உங்கள் பயன்பாட்டை உள்ளமைத்து வெளியிடவும்](./alchemy-explorer-sepolia.png)

3. “Create app” என்பதைக் கிளிக் செய்யவும், அவ்வளவுதான்! உங்கள் ஆப் கீழே உள்ள அட்டவணையில் தோன்றும்.

## படி 3: ஒரு Ethereum கணக்கை (முகவரி) உருவாக்கவும் {#create-eth-address}

பரிவர்த்தனைகளை அனுப்பவும் பெறவும் நமக்கு ஒரு Ethereum கணக்கு தேவை. இந்த tutorial-க்கு, உங்கள் Ethereum கணக்கு முகவரியை நிர்வகிக்கப் பயன்படும் உலாவியில் உள்ள ஒரு மெய்நிகர் பணப்பையான MetaMask-ஐப் பயன்படுத்துவோம். Ethereum-இல் பரிவர்த்தனைகள் எவ்வாறு செயல்படுகின்றன என்பதைப் பற்றி மேலும் புரிந்துகொள்ள விரும்பினால், Ethereum ஃபவுண்டேஷனில் இருந்து [இந்தப் பக்கத்தைப்](/developers/docs/transactions/) பார்க்கவும்.

நீங்கள் [இங்கே](https://metamask.io/download) இலவசமாக MetaMask கணக்கை பதிவிறக்கம் செய்து உருவாக்கலாம். நீங்கள் ஒரு கணக்கை உருவாக்கும்போது, அல்லது உங்களிடம் ஏற்கனவே ஒரு கணக்கு இருந்தால், மேல் வலதுபுறத்தில் உள்ள “Sepolia Test Network”க்கு மாறுவதை உறுதிசெய்யவும் (அதனால் நாங்கள் உண்மையான பணத்தைக் கையாளவில்லை).

![உங்கள் நெட்வொர்க்காக Sepolia-ஐ அமைக்கவும்](./metamask-goerli.png)

## படி 4: ஒரு Faucet-இலிருந்து ஈதரைச் சேர்க்கவும் {#step-4-add-ether-from-a-faucet}

நமது smart contract-ஐ test நெட்வொர்க்கிற்கு deploy செய்ய, நமக்கு சில போலி ETH தேவைப்படும். ETH-ஐப் பெற, நீங்கள் Alchemy வழங்கும் [Sepolia Faucet](https://sepoliafaucet.com/)-க்குச் சென்று, உள்நுழைந்து உங்கள் கணக்கு முகவரியை உள்ளிட்டு, “Send Me ETH” என்பதைக் கிளிக் செய்யவும். சிறிது நேரத்தில் உங்கள் MetaMask கணக்கில் ETH-ஐப் பார்க்க வேண்டும்!

## படி 5: உங்கள் இருப்பைச் சரிபார்க்கவும் {#check-balance}

நமது இருப்பு உள்ளதா என்பதை இருமுறை சரிபார்க்க, [Alchemy’s composer tool](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)-ஐப் பயன்படுத்தி [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) கோரிக்கையைச் செய்வோம். இது நமது பணப்பையில் உள்ள ETH-இன் அளவை வழங்கும். உங்கள் MetaMask கணக்கு முகவரியை உள்ளிட்டு “Send Request” என்பதைக் கிளிக் செய்த பிறகு, இதுபோன்ற பதிலை நீங்கள் பார்க்க வேண்டும்:

    ```
    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`
    ```

> **குறிப்பு** இந்த முடிவு ETH-இல் அல்ல, wei-இல் உள்ளது. Wei ஈதரின் மிகச்சிறிய அலகாக பயன்படுத்தப்படுகிறது. wei-இலிருந்து ETH-க்கு மாற்றுவது 1 eth = 10<sup>18</sup> wei. எனவே நாம் 0xde0b6b3a7640000-ஐ தசமமாக மாற்றினால், நமக்கு 1\*10<sup>18</sup> wei கிடைக்கும், இது 1 ETH-க்கு சமம்.

அப்பாடா! நமது போலிப் பணம் அனைத்தும் அங்கே உள்ளது.

## படி 6: நமது திட்டத்தைத் தொடங்கவும் {#initialize-project}

முதலில், நமது திட்டத்திற்காக ஒரு கோப்புறையை உருவாக்க வேண்டும். உங்கள் command line-க்குச் சென்று தட்டச்சு செய்யவும்:

    ```
    mkdir my-nft
    cd my-nft
    ```

இப்போது நாம் நமது திட்டக் கோப்புறைக்குள் இருக்கிறோம், திட்டத்தைத் தொடங்க npm init-ஐப் பயன்படுத்துவோம். நீங்கள் ஏற்கனவே npm-ஐ நிறுவவில்லை என்றால், [இந்த வழிமுறைகளைப்](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) பின்பற்றவும் (நமக்கு [Node.js](https://nodejs.org/en/download/)-ம் தேவைப்படும், எனவே அதையும் பதிவிறக்கவும்!).

    ```
    npm init
    ```

நிறுவல் கேள்விகளுக்கு நீங்கள் எவ்வாறு பதிலளிக்கிறீர்கள் என்பது முக்கியமல்ல; குறிப்புக்காக நாங்கள் அதை எப்படி செய்தோம் என்பது இங்கே:

```json
    தொகுப்பு பெயர்: (my-nft)
    பதிப்பு: (1.0.0)
    விளக்கம்: எனது முதல் NFT!
    நுழைவு புள்ளி: (index.js)
    சோதனை கட்டளை:
    git களஞ்சியம்:
    குறிச்சொற்கள்:
    ஆசிரியர்:
    உரிமம்: (ISC)
    /Users/thesuperb1/Desktop/my-nft/package.json-க்கு எழுதப் போகிறது:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "எனது முதல் NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

package.json-ஐ அங்கீகரிக்கவும், நாம் தொடரலாம்!

## படி 7: [Hardhat](https://hardhat.org/getting-started/#overview)-ஐ நிறுவவும் {#install-hardhat}

Hardhat என்பது உங்கள் Ethereum மென்பொருளைத் தொகுக்க, deploy செய்ய, சோதிக்க மற்றும் பிழைத்திருத்தம் செய்வதற்கான ஒரு மேம்பாட்டுச் சூழலாகும். நேரடி சங்கிலிக்கு deploy செய்வதற்கு முன்பு, smart contract-கள் மற்றும் dapps-களை உள்ளூரில் உருவாக்கும்போது இது டெவலப்பர்களுக்கு உதவுகிறது.

நமது my-nft திட்டத்தில் இயக்கவும்:

    ```
    npm install --save-dev hardhat
    ```

[நிறுவல் வழிமுறைகள்](https://hardhat.org/getting-started/#overview) குறித்த கூடுதல் விவரங்களுக்கு இந்தப் பக்கத்தைப் பார்க்கவும்.

## படி 8: Hardhat திட்டத்தை உருவாக்கவும் {#create-hardhat-project}

நமது திட்டக் கோப்புறைக்குள் இயக்கவும்:

    ```
    npx hardhat
    ```

நீங்கள் ஒரு வரவேற்பு செய்தியையும், நீங்கள் என்ன செய்ய விரும்புகிறீர்கள் என்பதைத் தேர்ந்தெடுக்கும் விருப்பத்தையும் காண்பீர்கள். “create an empty hardhat.config.js”-ஐத் தேர்ந்தெடுக்கவும்:

    ```
    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Hardhat v2.0.11-க்கு வரவேற்கிறோம் 👷‍
    ? நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்? …
    ஒரு மாதிரித் திட்டத்தை உருவாக்குங்கள்
    ❯ ஒரு வெற்று hardhat.config.js ஐ உருவாக்கவும்
    வெளியேறு
    ```

இது நமக்காக ஒரு hardhat.config.js கோப்பை உருவாக்கும், அங்குதான் நமது திட்டத்திற்கான அனைத்து அமைப்புகளையும் குறிப்பிடுவோம் (படி 13 இல்).

## படி 9: திட்டக் கோப்புறைகளைச் சேர்க்கவும் {#add-project-folders}

நமது திட்டத்தை ஒழுங்கமைக்க, இரண்டு புதிய கோப்புறைகளை உருவாக்குவோம். உங்கள் திட்டத்தின் மூல கோப்பகத்திற்கு உங்கள் command line-இல் சென்று தட்டச்சு செய்யவும்:

    ```
    mkdir contracts
    mkdir scripts
    ```

- contracts/ என்பது நமது NFT smart contract குறியீட்டை வைக்கும் இடமாகும்.

- scripts/ என்பது நமது smart contract-ஐ deploy செய்யவும், அதனுடன் தொடர்பு கொள்ளவும் ஸ்கிரிப்ட்களை வைக்கும் இடமாகும்.

## படி 10: நமது contract-ஐ எழுதுங்கள் {#write-contract}

இப்போது நமது சூழல் அமைக்கப்பட்டுள்ளது, மேலும் உற்சாகமான விஷயங்களுக்குச் செல்வோம்: _நமது smart contract குறியீட்டை எழுதுவது!_

உங்களுக்குப் பிடித்த எடிட்டரில் (நாங்கள் [VSCode](https://code.visualstudio.com/)-ஐ விரும்புகிறோம்) my-nft திட்டத்தைத் திறக்கவும். Smart contract-கள் Solidity எனப்படும் மொழியில் எழுதப்பட்டுள்ளன, அதைத்தான் நமது MyNFT.sol smart contract-ஐ எழுதப் பயன்படுத்துவோம்.‌

1. `contracts` கோப்புறைக்குச் சென்று MyNFT.sol என்ற புதிய கோப்பை உருவாக்கவும்.

2. கீழே உள்ளது நமது NFT smart contract குறியீடு, இது [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721) library-இன் ERC-721 செயலாக்கத்தை அடிப்படையாகக் கொண்டது. கீழே உள்ள உள்ளடக்கங்களை உங்கள் MyNFT.sol கோப்பில் நகலெடுத்து ஒட்டவும்.

   ```solidity
   //Contract [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)-ஐ அடிப்படையாகக் கொண்டது
   // SPDX-உரிம-அடையாளங்காட்டி: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. நாங்கள் OpenZeppelin contracts library-இலிருந்து வகுப்புகளைப் பெறுவதால், உங்கள் command line-இல் `npm install @openzeppelin/contracts^4.0.0` என்பதை இயக்கி, library-ஐ நமது கோப்புறையில் நிறுவவும்.

சரி, இந்த குறியீடு சரியாக என்ன _செய்கிறது_? அதை வரி வரியாகப் பார்ப்போம்.

நமது smart contract-இன் மேலே, மூன்று [OpenZeppelin](https://openzeppelin.com/) smart contract வகுப்புகளை இறக்குமதி செய்கிறோம்:

- @openzeppelin/contracts/token/ERC721/ERC721.sol என்பது ERC-721 தரநிலையின் செயலாக்கத்தைக் கொண்டுள்ளது, அதை நமது NFT smart contract மரபுரிமையாகப் பெறும். (செல்லுபடியாகும் NFT ஆக இருக்க, உங்கள் smart contract ERC-721 தரநிலையின் அனைத்து முறைகளையும் செயல்படுத்த வேண்டும்.) மரபுரிமையாகப் பெற்ற ERC-721 செயல்பாடுகளைப் பற்றி மேலும் அறிய, [இங்கே](https://eips.ethereum.org/EIPS/eip-721) இடைமுக வரையறையைப் பார்க்கவும்.

- @openzeppelin/contracts/utils/Counters.sol ஒன்றால் மட்டுமே அதிகரிக்க அல்லது குறைக்கக்கூடிய கவுண்டர்களை வழங்குகிறது. நமது smart contract, mint செய்யப்பட்ட NFT-களின் மொத்த எண்ணிக்கையைக் கண்காணிக்கவும், நமது புதிய NFT-இல் தனிப்பட்ட ஐடியை அமைக்கவும் ஒரு கவுண்டரைப் பயன்படுத்துகிறது. (ஒரு smart contract-ஐப் பயன்படுத்தி mint செய்யப்படும் ஒவ்வொரு NFT-க்கும் ஒரு தனிப்பட்ட ஐடி ஒதுக்கப்பட வேண்டும் — இங்கே நமது தனிப்பட்ட ஐடி தற்போதுள்ள NFT-களின் மொத்த எண்ணிக்கையால் தீர்மானிக்கப்படுகிறது. எடுத்துக்காட்டாக, நமது smart contract மூலம் நாம் mint செய்யும் முதல் NFT-இன் ஐடி "1," நமது இரண்டாவது NFT-இன் ஐடி "2," மற்றும் பல.)

- @openzeppelin/contracts/access/Ownable.sol நமது smart contract-இல் [அணுகல் கட்டுப்பாட்டை](https://docs.openzeppelin.com/contracts/3.x/access-control) அமைக்கிறது, எனவே smart contract-இன் உரிமையாளர் (நீங்கள்) மட்டுமே NFT-களை mint செய்ய முடியும். (குறிப்பு, அணுகல் கட்டுப்பாட்டைச் சேர்ப்பது முற்றிலும் ஒரு விருப்பத்தேர்வாகும். உங்கள் smart contract-ஐப் பயன்படுத்தி யார் வேண்டுமானாலும் NFT-ஐ mint செய்ய விரும்பினால், வரி 10-இல் உள்ள Ownable என்ற வார்த்தையையும், வரி 17-இல் உள்ள onlyOwner-ஐயும் அகற்றவும்.)

நமது இறக்குமதி அறிக்கைகளுக்குப் பிறகு, நமது தனிப்பயன் NFT smart contract உள்ளது, இது ஆச்சரியப்படத்தக்க வகையில் குறுகியது — இது ஒரு கவுண்டர், ஒரு கன்ஸ்ட்ரக்டர் மற்றும் ஒற்றைச் செயல்பாட்டை மட்டுமே கொண்டுள்ளது! இது நமது மரபுரிமையாகப் பெற்ற OpenZeppelin contract-களுக்கு நன்றி, NFT-ஐ உருவாக்குவதற்குத் தேவையான பெரும்பாலான முறைகளை இது செயல்படுத்துகிறது. எடுத்துக்காட்டாக, `ownerOf` NFT-இன் உரிமையாளரை வழங்குகிறது, மற்றும் `transferFrom` NFT-இன் உரிமையை ஒரு கணக்கிலிருந்து மற்றொரு கணக்கிற்கு மாற்றுகிறது.

நமது ERC-721 கன்ஸ்ட்ரக்டரில், நாங்கள் 2 சரங்களை, “MyNFT” மற்றும் “NFT”ஐ அனுப்புவதை நீங்கள் கவனிப்பீர்கள். முதல் மாறி smart contract-இன் பெயர், மற்றும் இரண்டாவது அதன் சின்னம். இந்த மாறிகள் ஒவ்வொன்றிற்கும் நீங்கள் விரும்பிய பெயரை இடலாம்!

இறுதியாக, நம்மிடம் `mintNFT(address recipient, string memory tokenURI)` என்ற செயல்பாடு உள்ளது, இது ஒரு NFT-ஐ mint செய்ய அனுமதிக்கிறது! இந்தச் செயல்பாடு இரண்டு மாறிகளை உள்ளீடாக எடுப்பதை நீங்கள் கவனிப்பீர்கள்:

- `address recipient` உங்கள் புதிதாக mint செய்யப்பட்ட NFT-ஐப் பெறும் முகவரியைக் குறிப்பிடுகிறது.

- `string memory tokenURI` என்பது ஒரு சரம், இது NFT-இன் மெட்டாடேட்டாவை விவரிக்கும் ஒரு JSON ஆவணத்திற்குத் தீர்வு காண வேண்டும். ஒரு NFT-இன் மெட்டாடேட்டா தான் உண்மையில் அதை உயிர்ப்பிக்கிறது, இது பெயர், விளக்கம், படம் மற்றும் பிற பண்புக்கூறுகள் போன்ற உள்ளமைக்கக்கூடிய பண்புகளைக் கொண்டிருக்க அனுமதிக்கிறது. இந்த tutorial-இன் பகுதி 2-இல், இந்த மெட்டாடேட்டாவை எவ்வாறு உள்ளமைப்பது என்பதை விவரிப்போம்.

`mintNFT` மரபுரிமையாகப் பெற்ற ERC-721 library-இலிருந்து சில முறைகளை அழைக்கிறது, மேலும் இறுதியில் புதிதாக mint செய்யப்பட்ட NFT-இன் ஐடியைக் குறிக்கும் ஒரு எண்ணைத் திருப்புகிறது.

## படி 11: MetaMask & Alchemy-ஐ உங்கள் திட்டத்துடன் இணைக்கவும் {#connect-metamask-and-alchemy}

இப்போது நாம் ஒரு MetaMask wallet, Alchemy கணக்கு மற்றும் நமது smart contract-ஐ எழுதியுள்ளோம், மூன்றையும் இணைக்க வேண்டிய நேரம் இது.

உங்கள் மெய்நிகர் பணப்பையிலிருந்து அனுப்பப்படும் ஒவ்வொரு பரிவர்த்தனைக்கும் உங்கள் தனிப்பட்ட private key-ஐப் பயன்படுத்தி ஒரு கையொப்பம் தேவை. நமது நிரலுக்கு இந்த அனுமதியை வழங்க, நமது private key (மற்றும் Alchemy API key) ஆகியவற்றை ஒரு சூழல் கோப்பில் பாதுகாப்பாக சேமிக்கலாம்.

பரிவர்த்தனைகளை அனுப்புவது பற்றி மேலும் அறிய, web3-ஐப் பயன்படுத்தி பரிவர்த்தனைகளை அனுப்புவது குறித்த [இந்த tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)-ஐப் பார்க்கவும்.

முதலில், உங்கள் திட்ட கோப்பகத்தில் dotenv தொகுப்பை நிறுவவும்:

    ```
    npm install dotenv --save
    ```

பின்னர், நமது திட்டத்தின் மூல கோப்பகத்தில் `.env` கோப்பை உருவாக்கி, அதில் உங்கள் MetaMask private key மற்றும் HTTP Alchemy API URL-ஐச் சேர்க்கவும்.

- MetaMask-இலிருந்து உங்கள் private key-ஐ ஏற்றுமதி செய்ய [இந்த வழிமுறைகளை](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) பின்பற்றவும்

- HTTP Alchemy API URL-ஐப் பெற கீழே பார்க்கவும் மற்றும் அதை உங்கள் கிளிப்போர்டுக்கு நகலெடுக்கவும்

![உங்கள் Alchemy API URL-ஐ நகலெடுக்கவும்](./copy-alchemy-api-url.gif)

உங்கள் `.env` இப்போது இப்படி இருக்க வேண்டும்:

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/உங்கள்-api-கீ"
    PRIVATE_KEY="உங்கள்-மெட்டமாஸ்க்-தனியார்-கீ"
    ```

இவற்றை உண்மையில் நமது குறியீட்டுடன் இணைக்க, படி 13-இல் நமது hardhat.config.js கோப்பில் இந்த மாறிகளை நாம் குறிப்பிடுவோம்.

<EnvWarningBanner />

## படி 12: Ethers.js-ஐ நிறுவவும் {#install-ethers}

Ethers.js என்பது ஒரு library ஆகும், இது [standard JSON-RPC முறைகளை](/developers/docs/apis/json-rpc/) அதிக பயனர் நட்பு முறைகளுடன் இணைப்பதன் மூலம் Ethereum உடன் தொடர்புகொள்வதையும் கோரிக்கைகளைச் செய்வதையும் எளிதாக்குகிறது.

கூடுதல் கருவி மற்றும் நீட்டிக்கப்பட்ட செயல்பாட்டிற்காக [Plugins](https://hardhat.org/plugins/)-ஐ ஒருங்கிணைப்பதை Hardhat மிகவும் எளிதாக்குகிறது. ஒப்பந்தத்தைப் பயன்படுத்த நாம் [Ethers செருகுநிரலைப்](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) பயன்படுத்திக் கொள்வோம் ([Ethers.js](https://github.com/ethers-io/ethers.js/)-இல் சில மிகத் தெளிவான ஒப்பந்தப் பயன்பாட்டு முறைகள் உள்ளன).

உங்கள் திட்ட கோப்பகத்தில் தட்டச்சு செய்யவும்:

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

அடுத்த படியில் நமது hardhat.config.js-இல் ethers-ஐயும் கோருவோம்.

## படி 13: hardhat.config.js-ஐப் புதுப்பிக்கவும் {#update-hardhat-config}

இதுவரை பல சார்புகள் மற்றும் செருகுநிரல்களைச் சேர்த்துள்ளோம், இப்போது hardhat.config.js-ஐப் புதுப்பிக்க வேண்டும், இதனால் நமது திட்டம் அவை அனைத்தையும் பற்றி அறியும்.

உங்கள் hardhat.config.js-ஐப் இதுபோலப் புதுப்பிக்கவும்:

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
       defaultNetwork: "sepolia",
       networks: {
          hardhat: {},
          sepolia: {
             url: API_URL,
             accounts: [`0x${PRIVATE_KEY}`]
          }
       },
    }
```

## படி 14: நமது contract-ஐத் தொகுக்கவும் {#compile-contract}

இதுவரை எல்லாம் செயல்படுகிறதா என்பதை உறுதிப்படுத்த, நமது contract-ஐத் தொகுப்போம். தொகுக்கும் பணி, உள்ளமைக்கப்பட்ட hardhat பணிகளில் ஒன்றாகும்.

command line-இலிருந்து இயக்கவும்:

    ```
    npx hardhat compile
    ```

மூலக் கோப்பில் SPDX உரிம அடையாளங்காட்டி வழங்கப்படவில்லை என்பது பற்றிய எச்சரிக்கையைப் பெறலாம், ஆனால் அதைப் பற்றி கவலைப்படத் தேவையில்லை — மற்ற அனைத்தும் நன்றாக இருக்கும் என்று நம்புகிறோம்! இல்லையெனில், நீங்கள் எப்போதும் [Alchemy discord](https://discord.gg/u72VCg3)-இல் செய்தி அனுப்பலாம்.

## படி 15: நமது deploy ஸ்கிரிப்டை எழுதவும் {#write-deploy}

இப்போது நமது contract எழுதப்பட்டு, நமது உள்ளமைவுக் கோப்பு தயாராக உள்ளது, நமது contract deploy ஸ்கிரிப்டை எழுத வேண்டிய நேரம் இது.

`scripts/` கோப்புறைக்குச் சென்று `deploy.js` என்ற புதிய கோப்பை உருவாக்கி, அதில் பின்வரும் உள்ளடக்கங்களைச் சேர்க்கவும்:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // பயன்படுத்தலைத் தொடங்கவும், ஒரு ஒப்பந்தப் பொருளுக்குத் தீர்க்கும் ஒரு வாக்குறுதியைத் திருப்பி அளிக்கவும்
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract இந்த முகவரிக்கு deploy செய்யப்பட்டது:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

இந்த ஒவ்வொரு குறியீட்டு வரிகளும் என்ன செய்கின்றன என்பதை Hardhat அவர்களின் [Contracts tutorial](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)-இல் அற்புதமாக விளக்குகிறது, நாங்கள் அவர்களின் விளக்கங்களை இங்கே எடுத்துள்ளோம்.

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

ethers.js-இல் உள்ள ஒரு ContractFactory என்பது புதிய smart contract-களை deploy செய்யப் பயன்படும் ஒரு சுருக்கமாகும், எனவே இங்குள்ள MyNFT என்பது நமது NFT contract-இன் நிகழ்வுகளுக்கான ஒரு factory ஆகும். hardhat-ethers செருகுநிரலைப் பயன்படுத்தும் போது, ContractFactory மற்றும் Contract நிகழ்வுகள் இயல்பாக முதல் கையொப்பமிடுபவருடன் இணைக்கப்பட்டுள்ளன.

    ```
    const myNFT = await MyNFT.deploy();
    ```

ஒரு ContractFactory-இல் deploy()-ஐ அழைப்பது, பயன்படுத்தலைத் தொடங்கும், மற்றும் ஒரு Contract-க்குத் தீர்க்கும் ஒரு Promise-ஐத் திருப்பும். இது நமது ஒவ்வொரு smart contract செயல்பாடுகளுக்கும் ஒரு முறையைக் கொண்ட பொருளாகும்.

## படி 16: நமது contract-ஐ deploy செய்யவும் {#deploy-contract}

இறுதியாக நமது smart contract-ஐ deploy செய்யத் தயாராகிவிட்டோம்! உங்கள் திட்ட கோப்பகத்தின் மூலத்திற்குத் திரும்பிச் சென்று, command line-இல் இயக்கவும்:

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

நீங்கள் இது போன்ற ஒன்றைக் காண்பீர்கள்:

    ```
    Contract இந்த முகவரிக்கு deploy செய்யப்பட்டது: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

[Sepolia etherscan](https://sepolia.etherscan.io/)-க்குச் சென்று நமது contract முகவரியைத் தேடினால், அது வெற்றிகரமாக deploy செய்யப்பட்டிருப்பதைக் காண முடியும். உங்களால் உடனடியாக அதைப் பார்க்க முடியாவிட்டால், சிறிது நேரம் காத்திருக்கவும், ஏனெனில் இதற்கு சிறிது நேரம் ஆகலாம். பரிவர்த்தனை இதுபோல இருக்கும்:

![Etherscan-இல் உங்கள் பரிவர்த்தனை முகவரியைக் காண்க](./etherscan-sepoila-contract-creation.png)

From முகவரி உங்கள் MetaMask கணக்கு முகவரியுடன் பொருந்த வேண்டும் மற்றும் To முகவரியில் “Contract Creation” என்று இருக்கும். பரிவர்த்தனைக்குள் கிளிக் செய்தால், To புலத்தில் நமது contract முகவரியைக் காண்போம்:

![Etherscan-இல் உங்கள் contract முகவரியைக் காண்க](./etherscan-sepolia-tx-details.png)

ஆஹா! உங்கள் NFT smart contract-ஐ Ethereum (testnet) சங்கிலிக்கு நீங்கள் இப்போது deploy செய்துவிட்டீர்கள்!

திரைக்குப் பின்னால் என்ன நடக்கிறது என்பதைப் புரிந்துகொள்ள, நமது [Alchemy dashboard](https://dashboard.alchemyapi.io/explorer)-இல் உள்ள Explorer தாவலுக்குச் செல்வோம். உங்களிடம் பல Alchemy ஆப்-கள் இருந்தால், ஆப் மூலம் வடிகட்டி “MyNFT”-ஐத் தேர்ந்தெடுப்பதை உறுதிசெய்யவும்.

![Alchemy's Explorer Dashboard-உடன் “திரைக்குப் பின்னால்” செய்யப்பட்ட அழைப்புகளைப் பார்க்கவும்](./alchemy-explorer-goerli.png)

நாம் .deploy() செயல்பாட்டை அழைத்தபோது Hardhat/Ethers நமக்காகத் திரைக்குப் பின்னால் செய்த சில JSON-RPC அழைப்புகளை இங்கே காண்பீர்கள். இங்கே குறிப்பிட வேண்டிய இரண்டு முக்கியமானவை [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), இது நமது smart contract-ஐ Sepolia சங்கிலியில் எழுதுவதற்கான கோரிக்கையாகும், மற்றும் [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) இது hash-ஐக் கொண்டு நமது பரிவர்த்தனை பற்றிய தகவலைப் படிக்கும் கோரிக்கையாகும் (பரிவர்த்தனைகளை அனுப்பும்போது ஒரு பொதுவான முறை). பரிவர்த்தனைகளை அனுப்புவது பற்றி மேலும் அறிய, [Web3-ஐப் பயன்படுத்தி பரிவர்த்தனைகளை அனுப்புவது](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) பற்றிய இந்த tutorial-ஐப் பார்க்கவும்.

இந்த tutorial-இன் பகுதி 1 இத்துடன் முடிவடைகிறது. [பகுதி 2-இல், ஒரு NFT-ஐ mint செய்வதன் மூலம் நமது smart contract-உடன் உண்மையில் தொடர்புகொள்வோம்](/developers/tutorials/how-to-mint-an-nft/), மற்றும் [பகுதி 3-இல் உங்கள் Ethereum wallet-இல் உங்கள் NFT-ஐ எவ்வாறு பார்ப்பது என்பதைக் காண்பிப்போம்](/developers/tutorials/how-to-view-nft-in-metamask/)!

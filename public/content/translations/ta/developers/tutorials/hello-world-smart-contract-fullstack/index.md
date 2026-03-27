---
title: "ஆரம்பநிலையாளர்களுக்கான Hello World ஸ்மார்ட் ஒப்பந்தம் - Fullstack"
description: "Ethereum இல் ஒரு எளிய ஸ்மார்ட் ஒப்பந்தத்தை எழுதி டெப்லாய் செய்வது குறித்த அறிமுகப் பயிற்சி."
author: "nstrike2"
breadcrumb: Hello World fullstack
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "ஸ்மார்ட் ஒப்பந்தங்கள்",
    "டெப்லாய் செய்தல்",
    "பிளாக் எக்ஸ்ப்ளோரர்",
    "frontend",
    "பரிவர்த்தனைகள்",
    "கட்டமைப்பு",
  ]
skill: beginner
lang: ta
published: 2021-10-25
---

நீங்கள் பிளாக்செயின் மேம்பாட்டிற்குப் புதியவராக இருந்து, எங்கு தொடங்குவது அல்லது ஸ்மார்ட் ஒப்பந்தங்களை எவ்வாறு டெப்லாய் செய்வது மற்றும் அவற்றுடன் தொடர்புகொள்வது என்று தெரியவில்லை என்றால், இந்த வழிகாட்டி உங்களுக்கானது. [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) மற்றும் [Alchemy](https://alchemy.com/eth) ஆகியவற்றைப் பயன்படுத்தி Goerli சோதனை நெட்வொர்க்கில் ஒரு எளிய ஸ்மார்ட் ஒப்பந்தத்தை உருவாக்கி டெப்லாய் செய்வதை நாங்கள் படிப்படியாகக் காண்பிப்போம்.

இந்தப் பயிற்சியை முடிக்க உங்களுக்கு ஒரு Alchemy கணக்கு தேவைப்படும். [இலவசக் கணக்கிற்குப் பதிவு செய்யவும்](https://www.alchemy.com/).

உங்களுக்கு எந்த நேரத்திலும் கேள்விகள் இருந்தால், [Alchemy Discord](https://discord.gg/gWuC7zB) இல் தயங்காமல் கேட்கவும்!

## பகுதி 1 - Hardhat ஐப் பயன்படுத்தி உங்கள் ஸ்மார்ட் ஒப்பந்தத்தை உருவாக்கி வரிசைப்படுத்துங்கள் {#part-1}

### Ethereum நெட்வொர்க்குடன் இணைக்கவும் {#connect-to-the-ethereum-network}

Ethereum செயினுக்கு கோரிக்கைகளைச் செய்ய பல வழிகள் உள்ளன. எளிமைக்காக, Alchemy-யில் ஒரு இலவச கணக்கைப் பயன்படுத்துவோம், இது ஒரு பிளாக்செயின் டெவலப்பர் தளம் மற்றும் API ஆகும், இது நாமே ஒரு நோடை இயக்காமல் Ethereum செயினுடன் தொடர்பு கொள்ள அனுமதிக்கிறது. Alchemy-யில் கண்காணிப்பு மற்றும் பகுப்பாய்விற்கான டெவலப்பர் கருவிகளும் உள்ளன; நமது ஸ்மார்ட் ஒப்பந்த வரிசைப்படுத்தலில் திரைக்குப் பின்னால் என்ன நடக்கிறது என்பதைப் புரிந்துகொள்ள இந்த டுடோரியலில் இவற்றைப் பயன்படுத்திக் கொள்வோம்.

### உங்கள் ஆப் மற்றும் API கீயை உருவாக்கவும் {#create-your-app-and-api-key}

நீங்கள் ஒரு Alchemy கணக்கை உருவாக்கியவுடன், ஒரு ஆப்பை உருவாக்குவதன் மூலம் API கீயை உருவாக்கலாம். இது Goerli டெஸ்ட்நெட்டிற்கு கோரிக்கைகளைச் செய்ய உங்களை அனுமதிக்கும். டெஸ்ட்நெட்கள் பற்றி உங்களுக்குத் தெரியாவிட்டால், [நெட்வொர்க்கைத் தேர்ந்தெடுப்பதற்கான Alchemy-யின் வழிகாட்டியைப் படிக்கலாம்](https://www.alchemy.com/docs/choosing-a-web3-network).

Alchemy டேஷ்போர்டில், நேவிகேஷன் பாரில் உள்ள **Apps** டிராப்டவுனைக் கண்டறிந்து **Create App** என்பதைக் கிளிக் செய்யவும்.

![Hello world create app](./hello-world-create-app.png)

உங்கள் ஆப்பிற்கு '_Hello World_' என்று பெயரிட்டு, ஒரு சிறிய விளக்கத்தை எழுதவும். உங்கள் சூழலாக **Staging** என்பதையும், உங்கள் நெட்வொர்க்காக **Goerli** என்பதையும் தேர்ந்தெடுக்கவும்.

![create app view hello world](./create-app-view-hello-world.png)

_குறிப்பு: **Goerli** என்பதைத் தேர்ந்தெடுப்பதை உறுதிசெய்யவும், இல்லையெனில் இந்த டுடோரியல் வேலை செய்யாது._

**Create app** என்பதைக் கிளிக் செய்யவும். உங்கள் ஆப் கீழே உள்ள அட்டவணையில் தோன்றும்.

### ஒரு Ethereum கணக்கை உருவாக்கவும் {#create-an-ethereum-account}

பரிவர்த்தனைகளை அனுப்பவும் பெறவும் உங்களுக்கு ஒரு Ethereum கணக்கு தேவை. பயனர்கள் தங்கள் Ethereum கணக்கு முகவரியை நிர்வகிக்க அனுமதிக்கும் உலாவியில் உள்ள மெய்நிகர் வாலட்டான MetaMask-ஐப் பயன்படுத்துவோம்.

நீங்கள் [இங்கே](https://metamask.io/download) இலவசமாக MetaMask கணக்கைப் பதிவிறக்கம் செய்து உருவாக்கலாம். நீங்கள் ஒரு கணக்கை உருவாக்கும்போது, அல்லது உங்களிடம் ஏற்கனவே கணக்கு இருந்தால், மேல் வலதுபுறத்தில் உள்ள “Goerli Test Network”-க்கு மாறுவதை உறுதிசெய்யவும் (இதனால் நாம் உண்மையான பணத்தைக் கையாள மாட்டோம்).

### படி 4: ஒரு Faucet-லிருந்து ஈதரைச் சேர்க்கவும் {#step-4-add-ether-from-a-faucet}

உங்கள் ஸ்மார்ட் ஒப்பந்தத்தை டெஸ்ட் நெட்வொர்க்கில் வரிசைப்படுத்த, உங்களுக்கு சில போலி ETH தேவைப்படும். Goerli நெட்வொர்க்கில் ETH-ஐப் பெற, ஒரு Goerli faucet-க்குச் சென்று உங்கள் Goerli கணக்கு முகவரியை உள்ளிடவும். சமீபத்தில் Goerli faucet-கள் சற்று நம்பகத்தன்மையற்றதாக இருக்கலாம் என்பதை நினைவில் கொள்ளவும் - முயற்சிக்க வேண்டிய விருப்பங்களின் பட்டியலுக்கு [டெஸ்ட் நெட்வொர்க்குகள் பக்கத்தைப்](/developers/docs/networks/#goerli) பார்க்கவும்:

_குறிப்பு: நெட்வொர்க் நெரிசல் காரணமாக, இதற்கு சிறிது நேரம் ஆகலாம்._
``

### படி 5: உங்கள் பேலன்ஸைச் சரிபார்க்கவும் {#step-5-check-your-balance}

உங்கள் வாலட்டில் ETH இருப்பதை இருமுறை சரிபார்க்க, [Alchemy-யின் composer கருவியைப்](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) பயன்படுத்தி ஒரு [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) கோரிக்கையைச் செய்வோம். இது நமது வாலட்டில் உள்ள ETH அளவை வழங்கும். மேலும் அறிய, [composer கருவியை எவ்வாறு பயன்படுத்துவது என்பது குறித்த Alchemy-யின் சிறிய டுடோரியலைப்](https://youtu.be/r6sjRxBZJuU) பார்க்கவும்.

உங்கள் MetaMask கணக்கு முகவரியை உள்ளிட்டு **Send Request** என்பதைக் கிளிக் செய்யவும். கீழே உள்ள குறியீட்டுத் துணுக்கைப் போன்ற ஒரு பதிலைக் காண்பீர்கள்.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _குறிப்பு: இந்த முடிவு wei-யில் உள்ளது, ETH-ல் அல்ல. ஈதரின் மிகச்சிறிய மதிப்பாக Wei பயன்படுத்தப்படுகிறது._

அப்பாடா! நமது போலி பணம் அனைத்தும் அங்கேயே உள்ளது.

### படி 6: நமது ப்ராஜெக்ட்டைத் தொடங்கவும் {#step-6-initialize-our-project}

முதலில், நமது ப்ராஜெக்ட்டிற்கான ஒரு கோப்புறையை உருவாக்க வேண்டும். உங்கள் கமாண்ட் லைனுக்குச் சென்று பின்வருவனவற்றை உள்ளிடவும்.

```
mkdir hello-world
cd hello-world
```

இப்போது நாம் நமது ப்ராஜெக்ட் கோப்புறைக்குள் இருப்பதால், ப்ராஜெக்ட்டைத் தொடங்க `npm init` ஐப் பயன்படுத்துவோம்.

> உங்களிடம் இன்னும் npm நிறுவப்படவில்லை என்றால், [Node.js மற்றும் npm-ஐ நிறுவ இந்த வழிமுறைகளைப் பின்பற்றவும்](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

இந்த டுடோரியலின் நோக்கத்திற்காக, தொடக்கக் கேள்விகளுக்கு நீங்கள் எவ்வாறு பதிலளிக்கிறீர்கள் என்பது முக்கியமல்ல. குறிப்புக்காக நாங்கள் அதை எவ்வாறு செய்தோம் என்பது இங்கே:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

package.json-ஐ அங்கீகரிக்கவும், நாம் தொடங்குவதற்குத் தயாராகிவிட்டோம்!

### படி 7: Hardhat-ஐப் பதிவிறக்கவும் {#step-7-download-hardhat}

Hardhat என்பது உங்கள் Ethereum மென்பொருளைத் தொகுக்க, வரிசைப்படுத்த, சோதிக்க மற்றும் பிழைத்திருத்தம் செய்வதற்கான ஒரு மேம்பாட்டுச் சூழலாகும். லைவ் செயினில் வரிசைப்படுத்துவதற்கு முன்பு ஸ்மார்ட் ஒப்பந்தங்கள் மற்றும் டாப்ஸ்களை (dapps) உள்ளூரில் உருவாக்கும்போது இது டெவலப்பர்களுக்கு உதவுகிறது.

நமது `hello-world` ப்ராஜெக்ட்டிற்குள் இதை இயக்கவும்:

```
npm install --save-dev hardhat
```

[நிறுவல் வழிமுறைகள்](https://hardhat.org/getting-started/#overview) குறித்த கூடுதல் விவரங்களுக்கு இந்தப் பக்கத்தைப் பார்க்கவும்.

### படி 8: Hardhat ப்ராஜெக்ட்டை உருவாக்கவும் {#step-8-create-hardhat-project}

நமது `hello-world` ப்ராஜெக்ட் கோப்புறைக்குள், இதை இயக்கவும்:

```
npx hardhat
```

நீங்கள் ஒரு வரவேற்பு செய்தியையும், நீங்கள் என்ன செய்ய விரும்புகிறீர்கள் என்பதைத் தேர்ந்தெடுப்பதற்கான விருப்பத்தையும் காண்பீர்கள். “create an empty hardhat.config.js” என்பதைத் தேர்ந்தெடுக்கவும்:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

இது ப்ராஜெக்ட்டில் ஒரு `hardhat.config.js` கோப்பை உருவாக்கும். நமது ப்ராஜெக்ட்டிற்கான அமைப்பைக் குறிப்பிட டுடோரியலில் பின்னர் இதைப் பயன்படுத்துவோம்.

### படி 9: ப்ராஜெக்ட் கோப்புறைகளைச் சேர்க்கவும் {#step-9-add-project-folders}

ப்ராஜெக்ட்டை ஒழுங்கமைக்க, இரண்டு புதிய கோப்புறைகளை உருவாக்குவோம். கமாண்ட் லைனில், உங்கள் `hello-world` ப்ராஜெக்ட்டின் ரூட் டைரக்டரிக்குச் சென்று தட்டச்சு செய்யவும்:

```
mkdir contracts
mkdir scripts
```

- `contracts/` என்பது நமது hello world ஸ்மார்ட் ஒப்பந்தக் குறியீட்டுக் கோப்பை வைத்திருக்கும் இடமாகும்
- `scripts/` என்பது நமது ஒப்பந்தத்தை வரிசைப்படுத்தவும் அதனுடன் தொடர்பு கொள்ளவுமான ஸ்கிரிப்ட்களை வைத்திருக்கும் இடமாகும்

### படி 10: நமது ஒப்பந்தத்தை எழுதவும் {#step-10-write-our-contract}

நாம் எப்போது குறியீட்டை எழுதப் போகிறோம் என்று நீங்கள் உங்களைக் கேட்டுக்கொள்ளலாம்? அதற்கான நேரம் வந்துவிட்டது!

உங்களுக்குப் பிடித்த எடிட்டரில் hello-world ப்ராஜெக்ட்டைத் திறக்கவும். ஸ்மார்ட் ஒப்பந்தங்கள் பொதுவாக Solidity-யில் எழுதப்படுகின்றன, நமது ஸ்மார்ட் ஒப்பந்தத்தை எழுத நாம் அதையே பயன்படுத்துவோம்.‌

1. `contracts` கோப்புறைக்குச் சென்று `HelloWorld.sol` என்ற புதிய கோப்பை உருவாக்கவும்
2. இந்த டுடோரியலுக்கு நாம் பயன்படுத்தப் போகும் ஒரு மாதிரி Hello World ஸ்மார்ட் ஒப்பந்தம் கீழே உள்ளது. கீழே உள்ள உள்ளடக்கங்களை `HelloWorld.sol` கோப்பில் நகலெடுக்கவும்.

_குறிப்பு: இந்த ஒப்பந்தம் என்ன செய்கிறது என்பதைப் புரிந்துகொள்ள கமெண்ட்களைப் படிக்க மறக்காதீர்கள்._

```
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

இது உருவாக்கப்பட்டவுடன் ஒரு செய்தியைச் சேமிக்கும் ஒரு அடிப்படை ஸ்மார்ட் ஒப்பந்தமாகும். `update` செயல்பாட்டை அழைப்பதன் மூலம் இதைப் புதுப்பிக்கலாம்.

### படி 11: உங்கள் ப்ராஜெக்ட்டுடன் MetaMask மற்றும் Alchemy-ஐ இணைக்கவும் {#step-11-connect-metamask-alchemy-to-your-project}

நாம் ஒரு MetaMask வாலட், Alchemy கணக்கை உருவாக்கி, நமது ஸ்மார்ட் ஒப்பந்தத்தை எழுதியுள்ளோம், இப்போது மூன்றையும் இணைக்க வேண்டிய நேரம் இது.

உங்கள் வாலட்டிலிருந்து அனுப்பப்படும் ஒவ்வொரு பரிவர்த்தனைக்கும் உங்கள் தனித்துவமான பிரைவேட் கீயைப் பயன்படுத்தி ஒரு கையொப்பம் தேவை. நமது நிரலுக்கு இந்த அனுமதியை வழங்க, நமது பிரைவேட் கீயை ஒரு environment கோப்பில் பாதுகாப்பாகச் சேமிக்கலாம். Alchemy-க்கான API கீயையும் இங்கே சேமிப்போம்.

> பரிவர்த்தனைகளை அனுப்புவது பற்றி மேலும் அறிய, web3-ஐப் பயன்படுத்தி பரிவர்த்தனைகளை அனுப்புவது குறித்த [இந்த டுடோரியலைப்](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) பார்க்கவும்.

முதலில், உங்கள் ப்ராஜெக்ட் டைரக்டரியில் dotenv பேக்கேஜை நிறுவவும்:

```
npm install dotenv --save
```

பின்னர், ப்ராஜெக்ட்டின் ரூட் டைரக்டரியில் ஒரு `.env` கோப்பை உருவாக்கவும். அதில் உங்கள் MetaMask பிரைவேட் கீ மற்றும் HTTP Alchemy API URL-ஐச் சேர்க்கவும்.

உங்கள் environment கோப்பிற்கு `.env` என்று பெயரிடப்பட வேண்டும், இல்லையெனில் அது ஒரு environment கோப்பாக அங்கீகரிக்கப்படாது.

அதற்கு `process.env` அல்லது `.env-custom` அல்லது வேறு எதையும் பெயரிட வேண்டாம்.

- உங்கள் பிரைவேட் கீயை எக்ஸ்போர்ட் செய்ய [இந்த வழிமுறைகளைப்](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) பின்பற்றவும்
- HTTP Alchemy API URL-ஐப் பெற கீழே பார்க்கவும்

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

உங்கள் `.env` இதுபோன்று இருக்க வேண்டும்:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

இவற்றை நமது குறியீட்டுடன் இணைக்க, படி 13-ல் உள்ள நமது `hardhat.config.js` கோப்பில் இந்த மாறிகளைக் குறிப்பிடுவோம்.

### படி 12: Ethers.js-ஐ நிறுவவும் {#step-12-install-ethersjs}

Ethers.js என்பது [நிலையான JSON-RPC முறைகளை](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) பயனர் நட்பு முறைகளுடன் இணைப்பதன் மூலம் Ethereum-உடன் தொடர்புகொள்வதையும் கோரிக்கைகளைச் செய்வதையும் எளிதாக்கும் ஒரு லைப்ரரியாகும்.

கூடுதல் கருவிகள் மற்றும் நீட்டிக்கப்பட்ட செயல்பாட்டிற்காக [பிளக்கின்களை](https://hardhat.org/plugins/) ஒருங்கிணைக்க Hardhat நம்மை அனுமதிக்கிறது. ஒப்பந்த வரிசைப்படுத்தலுக்கு [Ethers பிளக்கினைப்](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) பயன்படுத்திக் கொள்வோம்.

உங்கள் ப்ராஜெக்ட் டைரக்டரியில் தட்டச்சு செய்யவும்:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### படி 13: hardhat.config.js-ஐப் புதுப்பிக்கவும் {#step-13-update-hardhat-configjs}

இதுவரை பல சார்புகள் (dependencies) மற்றும் பிளக்கின்களைச் சேர்த்துள்ளோம், இப்போது நமது ப்ராஜெக்ட்டிற்கு அவை அனைத்தையும் பற்றித் தெரியப்படுத்த `hardhat.config.js`-ஐப் புதுப்பிக்க வேண்டும்.

உங்கள் `hardhat.config.js`-ஐ இதுபோன்று புதுப்பிக்கவும்:

```javascript
/* *
 * @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### படி 14: நமது ஒப்பந்தத்தைத் தொகுக்கவும் {#step-14-compile-our-contract}

இதுவரை எல்லாம் சரியாக வேலை செய்கிறதா என்பதை உறுதிப்படுத்த, நமது ஒப்பந்தத்தைத் தொகுப்போம். `compile` பணி என்பது உள்ளமைக்கப்பட்ட hardhat பணிகளில் ஒன்றாகும்.

கமாண்ட் லைனிலிருந்து இயக்கவும்:

```bash
npx hardhat compile
```

`SPDX license identifier not provided in source file` என்பது பற்றிய எச்சரிக்கையை நீங்கள் பெறலாம், ஆனால் அதைப் பற்றி கவலைப்படத் தேவையில்லை — மற்ற அனைத்தும் நன்றாக இருக்கும் என்று நம்புகிறோம்! இல்லையெனில், நீங்கள் எப்போதும் [Alchemy discord](https://discord.gg/u72VCg3)-ல் செய்தி அனுப்பலாம்.

### படி 15: நமது வரிசைப்படுத்தல் ஸ்கிரிப்டை எழுதவும் {#step-15-write-our-deploy-script}

இப்போது நமது ஒப்பந்தம் எழுதப்பட்டு, நமது உள்ளமைவு கோப்பு தயாராக உள்ளதால், நமது ஒப்பந்த வரிசைப்படுத்தல் ஸ்கிரிப்டை எழுத வேண்டிய நேரம் இது.

`scripts/` கோப்புறைக்குச் சென்று `deploy.js` என்ற புதிய கோப்பை உருவாக்கி, அதில் பின்வரும் உள்ளடக்கங்களைச் சேர்க்கவும்:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // வரிசைப்படுத்தலைத் தொடங்கி, ஒரு ஒப்பந்தப் பொருளாக (contract object) மாறும் ஒரு ப்ராமிஸை (promise) வழங்குகிறது
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

இந்த ஒவ்வொரு குறியீட்டு வரியும் என்ன செய்கிறது என்பதை Hardhat அவர்களின் [ஒப்பந்தங்கள் டுடோரியலில்](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) மிகச் சிறப்பாக விளக்குகிறது, அவர்களின் விளக்கங்களை நாங்கள் இங்கே ஏற்றுக்கொண்டுள்ளோம்.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js-ல் உள்ள `ContractFactory` என்பது புதிய ஸ்மார்ட் ஒப்பந்தங்களை வரிசைப்படுத்தப் பயன்படுத்தப்படும் ஒரு சுருக்கமாகும், எனவே இங்குள்ள `HelloWorld` என்பது நமது hello world ஒப்பந்தத்தின் நிகழ்வுகளுக்கான ஒரு [factory](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) ஆகும். `hardhat-ethers` பிளக்கின் `ContractFactory` மற்றும் `Contract`-ஐப் பயன்படுத்தும்போது, நிகழ்வுகள் இயல்பாகவே முதல் கையொப்பமிட்டவருடன் (உரிமையாளர்) இணைக்கப்படும்.

```javascript
const hello_world = await HelloWorld.deploy()
```

ஒரு `ContractFactory`-யில் `deploy()`-ஐ அழைப்பது வரிசைப்படுத்தலைத் தொடங்கும், மேலும் `Contract` ஆப்ஜெக்ட்டுக்குத் தீர்வு காணும் ஒரு `Promise`-ஐ வழங்கும். இது நமது ஒவ்வொரு ஸ்மார்ட் ஒப்பந்த செயல்பாடுகளுக்கும் ஒரு முறையைக் கொண்ட ஆப்ஜெக்ட் ஆகும்.

### படி 16: நமது ஒப்பந்தத்தை வரிசைப்படுத்தவும் {#step-16-deploy-our-contract}

இறுதியாக நமது ஸ்மார்ட் ஒப்பந்தத்தை வரிசைப்படுத்த நாம் தயாராகிவிட்டோம்! கமாண்ட் லைனுக்குச் சென்று இயக்கவும்:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

நீங்கள் இது போன்ற ஒன்றைக் காண வேண்டும்:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**தயவுசெய்து இந்த முகவரியைச் சேமிக்கவும்**. டுடோரியலில் பின்னர் இதைப் பயன்படுத்துவோம்.

நாம் [Goerli etherscan](https://goerli.etherscan.io)-க்குச் சென்று நமது ஒப்பந்த முகவரியைத் தேடினால், அது வெற்றிகரமாக வரிசைப்படுத்தப்பட்டிருப்பதைக் காண முடியும். பரிவர்த்தனை இதுபோன்று இருக்கும்:

![](./etherscan-contract.png)

`From` முகவரி உங்கள் MetaMask கணக்கு முகவரியுடன் பொருந்த வேண்டும் மற்றும் `To` முகவரி **Contract Creation** என்று கூறும். நாம் பரிவர்த்தனையைக் கிளிக் செய்தால், `To` புலத்தில் நமது ஒப்பந்த முகவரியைக் காண்போம்.

![](./etherscan-transaction.png)

வாழ்த்துக்கள்! நீங்கள் இப்போதுதான் ஒரு Ethereum டெஸ்ட்நெட்டில் ஒரு ஸ்மார்ட் ஒப்பந்தத்தை வரிசைப்படுத்தியுள்ளீர்கள்.

திரைக்குப் பின்னால் என்ன நடக்கிறது என்பதைப் புரிந்துகொள்ள, நமது [Alchemy டேஷ்போர்டில்](https://dashboard.alchemy.com/explorer) உள்ள Explorer தாவலுக்குச் செல்வோம். உங்களிடம் பல Alchemy ஆப்ஸ்கள் இருந்தால், ஆப் மூலம் வடிகட்டி **Hello World** என்பதைத் தேர்ந்தெடுப்பதை உறுதிசெய்யவும்.

![](./hello-world-explorer.png)

நாம் `.deploy()` செயல்பாட்டை அழைத்தபோது Hardhat/Ethers நமக்காகத் திரைக்குப் பின்னால் உருவாக்கிய சில JSON-RPC முறைகளை இங்கே காண்பீர்கள். இங்குள்ள இரண்டு முக்கியமான முறைகள் [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), இது Goerli செயினில் நமது ஒப்பந்தத்தை எழுதுவதற்கான கோரிக்கையாகும், மற்றும் [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), இது ஹாஷைக் கொண்டு நமது பரிவர்த்தனை பற்றிய தகவல்களைப் படிப்பதற்கான கோரிக்கையாகும். பரிவர்த்தனைகளை அனுப்புவது பற்றி மேலும் அறிய, [Web3-ஐப் பயன்படுத்தி பரிவர்த்தனைகளை அனுப்புவது குறித்த நமது டுடோரியலைப்](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) பார்க்கவும்.

## பகுதி 2: உங்கள் ஸ்மார்ட் ஒப்பந்தத்துடன் தொடர்புகொள்ளுங்கள் {#part-2-interact-with-your-smart-contract}

இப்போது நாம் Goerli நெட்வொர்க்கில் ஒரு ஸ்மார்ட் ஒப்பந்தத்தை வெற்றிகரமாகப் பயன்படுத்தியுள்ளோம், அதனுடன் எவ்வாறு தொடர்புகொள்வது என்பதைக் கற்றுக்கொள்வோம்.

### interact.js கோப்பை உருவாக்கவும் {#create-a-interactjs-file}

இந்தக் கோப்பில்தான் நமது தொடர்பு ஸ்கிரிப்டை எழுதுவோம். பகுதி 1-ல் நீங்கள் முன்பு நிறுவிய Ethers.js லைப்ரரியைப் பயன்படுத்துவோம்.

`scripts/` கோப்புறைக்குள், `interact.js` என்ற பெயரில் புதிய கோப்பை உருவாக்கி, பின்வரும் குறியீட்டைச் சேர்க்கவும்:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### உங்கள் .env கோப்பைப் புதுப்பிக்கவும் {#update-your-env-file}

நாம் புதிய சுற்றுச்சூழல் மாறிகளைப் (environment variables) பயன்படுத்தப் போகிறோம், எனவே [நாம் முன்பு உருவாக்கிய](#step-11-connect-metamask-&-alchemy-to-your-project) `.env` கோப்பில் அவற்றை வரையறுக்க வேண்டும்.

நமது Alchemy `API_KEY` மற்றும் உங்கள் ஸ்மார்ட் ஒப்பந்தம் பயன்படுத்தப்பட்ட `CONTRACT_ADDRESS` ஆகியவற்றிற்கான வரையறையைச் சேர்க்க வேண்டும்.

உங்கள் `.env` கோப்பு இதுபோன்று இருக்க வேண்டும்:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### உங்கள் ஒப்பந்தத்தின் ABI-ஐப் பெறவும் {#grab-your-contract-ABI}

நமது ஒப்பந்தத்தின் [ABI (Application Binary Interface)](/glossary/#abi) என்பது நமது ஸ்மார்ட் ஒப்பந்தத்துடன் தொடர்புகொள்வதற்கான இடைமுகமாகும். Hardhat தானாகவே ஒரு ABI-ஐ உருவாக்கி அதை `HelloWorld.json`-ல் சேமிக்கிறது. ABI-ஐப் பயன்படுத்த, நமது `interact.js` கோப்பில் பின்வரும் குறியீட்டு வரிகளைச் சேர்ப்பதன் மூலம் உள்ளடக்கங்களைப் பாகுபடுத்த (parse) வேண்டும்:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

நீங்கள் ABI-ஐப் பார்க்க விரும்பினால், அதை உங்கள் கன்சோலில் அச்சிடலாம்:

```javascript
console.log(JSON.stringify(contract.abi))
```

உங்கள் ABI கன்சோலில் அச்சிடப்பட்டிருப்பதைக் காண, உங்கள் டெர்மினலுக்குச் சென்று இதை இயக்கவும்:

```bash
npx hardhat run scripts/interact.js
```

### உங்கள் ஒப்பந்தத்தின் இன்ஸ்டன்ஸை (instance) உருவாக்கவும் {#create-an-instance-of-your-contract}

நமது ஒப்பந்தத்துடன் தொடர்புகொள்ள, நமது குறியீட்டில் ஒரு ஒப்பந்த இன்ஸ்டன்ஸை உருவாக்க வேண்டும். Ethers.js மூலம் இதைச் செய்ய, நாம் மூன்று கருத்துகளுடன் செயல்பட வேண்டும்:

1. Provider - பிளாக்செயினில் படிக்க மற்றும் எழுத அணுகலை வழங்கும் ஒரு நோடு புரொவைடர் (node provider)
2. Signer - பரிவர்த்தனைகளில் கையொப்பமிடக்கூடிய ஒரு Ethereum கணக்கைக் குறிக்கிறது
3. Contract - ஆன்செயினில் (onchain) பயன்படுத்தப்பட்ட ஒரு குறிப்பிட்ட ஒப்பந்தத்தைக் குறிக்கும் Ethers.js ஆப்ஜெக்ட்

ஒப்பந்தத்தின் இன்ஸ்டன்ஸை உருவாக்க முந்தைய படியிலிருந்து ஒப்பந்த ABI-ஐப் பயன்படுத்துவோம்:

```javascript
// interact.js

// புரோவைடர் (Provider)
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// கையொப்பமிடுபவர் (Signer)
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// ஒப்பந்தம் (Contract)
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Providers, Signers மற்றும் Contracts பற்றி [ethers.js ஆவணத்தில்](https://docs.ethers.io/v5/) மேலும் அறிக.

### init செய்தியைப் படிக்கவும் {#read-the-init-message}

நாம் `initMessage = "Hello world!"` உடன் நமது ஒப்பந்தத்தைப் பயன்படுத்தியது நினைவிருக்கிறதா? இப்போது நமது ஸ்மார்ட் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள அந்தச் செய்தியைப் படித்து கன்சோலில் அச்சிடப் போகிறோம்.

JavaScript-ல், நெட்வொர்க்குகளுடன் தொடர்புகொள்ளும்போது ஒத்திசைவற்ற செயல்பாடுகள் (asynchronous functions) பயன்படுத்தப்படுகின்றன. ஒத்திசைவற்ற செயல்பாடுகளைப் பற்றி மேலும் அறிய, [இந்த மீடியம் கட்டுரையைப் படிக்கவும்](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

நமது ஸ்மார்ட் ஒப்பந்தத்தில் உள்ள `message` செயல்பாட்டை அழைக்கவும், init செய்தியைப் படிக்கவும் கீழே உள்ள குறியீட்டைப் பயன்படுத்தவும்:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

டெர்மினலில் `npx hardhat run scripts/interact.js` என்பதைப் பயன்படுத்தி கோப்பை இயக்கிய பிறகு, இந்தப் பதிலைக் காண வேண்டும்:

```
The message is: Hello world!
```

வாழ்த்துகள்! நீங்கள் இப்போது Ethereum பிளாக்செயினிலிருந்து ஸ்மார்ட் ஒப்பந்தத் தரவை வெற்றிகரமாகப் படித்துவிட்டீர்கள், அருமை!

### செய்தியைப் புதுப்பிக்கவும் {#update-the-message}

செய்தியைப் படிப்பது மட்டுமின்றி, `update` செயல்பாட்டைப் பயன்படுத்தி நமது ஸ்மார்ட் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியைப் புதுப்பிக்கவும் முடியும்! மிகவும் அருமையாக உள்ளது, இல்லையா?

செய்தியைப் புதுப்பிக்க, நாம் உருவாக்கிய Contract ஆப்ஜெக்ட்டில் நேரடியாக `update` செயல்பாட்டை அழைக்கலாம்:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

வரி 11-ல், திரும்பப் பெறப்பட்ட பரிவர்த்தனை ஆப்ஜெக்ட்டில் `.wait()` என்ற அழைப்பைச் செய்கிறோம் என்பதைக் கவனிக்கவும். இது செயல்பாட்டிலிருந்து வெளியேறுவதற்கு முன்பு பிளாக்செயினில் பரிவர்த்தனை மைன் (mine) செய்யப்படும் வரை நமது ஸ்கிரிப்ட் காத்திருப்பதை உறுதிசெய்கிறது. `.wait()` அழைப்பு சேர்க்கப்படவில்லை என்றால், ஸ்கிரிப்ட் ஒப்பந்தத்தில் புதுப்பிக்கப்பட்ட `message` மதிப்பைக் காணாமல் போகலாம்.

### புதிய செய்தியைப் படிக்கவும் {#read-the-new-message}

புதுப்பிக்கப்பட்ட `message` மதிப்பைப் படிக்க நீங்கள் [முந்தைய படியை](#read-the-init-message) மீண்டும் செய்ய முடியும். அந்தப் புதிய மதிப்பை அச்சிடத் தேவையான மாற்றங்களைச் செய்ய முடியுமா என்று சிறிது நேரம் ஒதுக்கிப் பாருங்கள்!

உங்களுக்கு ஒரு குறிப்பு தேவைப்பட்டால், இந்த நேரத்தில் உங்கள் `interact.js` கோப்பு இப்படித்தான் இருக்க வேண்டும்:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// புரோவைடர் - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// கையொப்பமிடுபவர் - நீங்கள்
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// ஒப்பந்த நிகழ்வு (contract instance)
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

இப்போது ஸ்கிரிப்டை இயக்கவும், பழைய செய்தி, புதுப்பிக்கும் நிலை மற்றும் புதிய செய்தி ஆகியவை உங்கள் டெர்மினலில் அச்சிடப்பட்டிருப்பதை உங்களால் காண முடியும்!

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

அந்த ஸ்கிரிப்டை இயக்கும்போது, புதிய செய்தி ஏற்றப்படுவதற்கு முன்பு `Updating the message...` படி ஏற்றப்பட சிறிது நேரம் எடுப்பதை நீங்கள் கவனிக்கலாம். இது மைனிங் செயல்முறையின் காரணமாகும்; பரிவர்த்தனைகள் மைன் செய்யப்படும்போது அவற்றைக் கண்காணிப்பதில் உங்களுக்கு ஆர்வம் இருந்தால், பரிவர்த்தனையின் நிலையைக் காண [Alchemy mempool](https://dashboard.alchemyapi.io/mempool)-ஐப் பார்வையிடவும். பரிவர்த்தனை கைவிடப்பட்டால், [Goerli Etherscan](https://goerli.etherscan.io)-ஐச் சரிபார்த்து உங்கள் பரிவர்த்தனை ஹாஷைத் (transaction hash) தேடுவதும் உதவியாக இருக்கும்.

## பகுதி 3: உங்கள் ஸ்மார்ட் ஒப்பந்தத்தை Etherscan-இல் வெளியிடவும் {#part-3-publish-your-smart-contract-to-etherscan}

உங்கள் ஸ்மார்ட் ஒப்பந்தத்தை உருவாக்குவதற்கான அனைத்து கடின உழைப்பையும் நீங்கள் செய்துவிட்டீர்கள்; இப்போது அதை உலகத்துடன் பகிர்ந்துகொள்ள வேண்டிய நேரம் வந்துவிட்டது!

Etherscan-இல் உங்கள் ஸ்மார்ட் ஒப்பந்தத்தை சரிபார்ப்பதன் மூலம், யார் வேண்டுமானாலும் உங்கள் மூலக் குறியீட்டைப் (source code) பார்க்கலாம் மற்றும் உங்கள் ஸ்மார்ட் ஒப்பந்தத்துடன் தொடர்பு கொள்ளலாம். வாருங்கள் தொடங்கலாம்!

### படி 1: உங்கள் Etherscan கணக்கில் ஒரு API Key-ஐ உருவாக்கவும் {#step-1-generate-an-api-key-on-your-etherscan-account}

நீங்கள் வெளியிட முயற்சிக்கும் ஸ்மார்ட் ஒப்பந்தம் உங்களுக்குச் சொந்தமானது என்பதைச் சரிபார்க்க ஒரு Etherscan API Key அவசியமாகும்.

உங்களிடம் ஏற்கனவே Etherscan கணக்கு இல்லையென்றால், [ஒரு கணக்கைப் பதிவு செய்யவும்](https://etherscan.io/register).

உள்நுழைந்ததும், வழிசெலுத்தல் பட்டியில் (navigation bar) உங்கள் பயனர் பெயரைக் கண்டறிந்து, அதன் மீது கர்சரை வைத்து **My profile** பொத்தானைத் தேர்ந்தெடுக்கவும்.

உங்கள் சுயவிவரப் பக்கத்தில், ஒரு பக்க வழிசெலுத்தல் பட்டியைக் காண்பீர்கள். அந்தப் பக்க வழிசெலுத்தல் பட்டியில் இருந்து, **API Keys** என்பதைத் தேர்ந்தெடுக்கவும். அடுத்து, புதிய API key-ஐ உருவாக்க "Add" பொத்தானை அழுத்தி, உங்கள் பயன்பாட்டிற்கு **hello-world** எனப் பெயரிட்டு, **Create New API Key** பொத்தானை அழுத்தவும்.

உங்கள் புதிய API key இப்போது API key அட்டவணையில் தோன்றும். அந்த API key-ஐ உங்கள் கிளிப்போர்டுக்கு நகலெடுக்கவும்.

அடுத்து, நாம் Etherscan API key-ஐ நமது `.env` கோப்பில் சேர்க்க வேண்டும்.

அதைச் சேர்த்த பிறகு, உங்கள் `.env` கோப்பு இதுபோன்று இருக்க வேண்டும்:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhat மூலம் பயன்படுத்தப்பட்ட ஸ்மார்ட் ஒப்பந்தங்கள் {#hardhat-deployed-smart-contracts}

#### hardhat-etherscan-ஐ நிறுவவும் {#install-hardhat-etherscan}

Hardhat-ஐப் பயன்படுத்தி உங்கள் ஒப்பந்தத்தை Etherscan-இல் வெளியிடுவது நேரடியானது. தொடங்குவதற்கு நீங்கள் முதலில் `hardhat-etherscan` செருகுநிரலை (plugin) நிறுவ வேண்டும். `hardhat-etherscan` தானாகவே ஸ்மார்ட் ஒப்பந்தத்தின் மூலக் குறியீட்டையும் ABI-யையும் Etherscan-இல் சரிபார்க்கும். இதைச் சேர்க்க, `hello-world` கோப்பகத்தில் (directory) பின்வருவனவற்றை இயக்கவும்:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

நிறுவியதும், உங்கள் `hardhat.config.js`-இன் மேற்புறத்தில் பின்வரும் அறிக்கையைச் சேர்த்து, Etherscan கட்டமைப்பு விருப்பங்களைச் (config options) சேர்க்கவும்:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Etherscan-க்கான உங்கள் API திறவுகோல் (key)
    // https://etherscan.io/ இலிருந்து ஒன்றைப் பெறவும்
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Etherscan-இல் உங்கள் ஸ்மார்ட் ஒப்பந்தத்தை சரிபார்க்கவும் {#verify-your-smart-contract-on-etherscan}

அனைத்து கோப்புகளும் சேமிக்கப்பட்டுள்ளதா மற்றும் அனைத்து `.env` மாறிகளும் (variables) சரியாக உள்ளமைக்கப்பட்டுள்ளதா என்பதை உறுதிப்படுத்தவும்.

ஒப்பந்த முகவரி மற்றும் அது பயன்படுத்தப்பட்டுள்ள நெட்வொர்க்கை வழங்கி, `verify` பணியை இயக்கவும்:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Goerli சோதனை நெட்வொர்க்கில் பயன்படுத்தப்பட்ட உங்கள் ஸ்மார்ட் ஒப்பந்தத்தின் முகவரியே `DEPLOYED_CONTRACT_ADDRESS` என்பதை உறுதிப்படுத்திக் கொள்ளவும். மேலும், இறுதி மதிப்பு (`'Hello World!'`) [பகுதி 1-இல் உள்ள வரிசைப்படுத்தல் (deploy) படியின் போது](#write-our-deploy-script) பயன்படுத்தப்பட்ட அதே சரம் (string) மதிப்பாக இருக்க வேண்டும்.

எல்லாம் சரியாக நடந்தால், உங்கள் டெர்மினலில் பின்வரும் செய்தியைக் காண்பீர்கள்:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https: // goerli.etherscan.io/address/<contract-address>#contracts
```

வாழ்த்துகள்! உங்கள் ஸ்மார்ட் ஒப்பந்தக் குறியீடு இப்போது Etherscan-இல் உள்ளது!

### Etherscan-இல் உங்கள் ஸ்மார்ட் ஒப்பந்தத்தைப் பார்க்கவும்! {#check-out-your-smart-contract-on-etherscan}

உங்கள் டெர்மினலில் வழங்கப்பட்ட இணைப்பிற்குச் செல்லும்போது, Etherscan-இல் வெளியிடப்பட்ட உங்கள் ஸ்மார்ட் ஒப்பந்தக் குறியீடு மற்றும் ABI-ஐ உங்களால் பார்க்க முடியும்!

**வாவ் - நீங்கள் சாதித்துவிட்டீர்கள் சாம்பியன்! இப்போது யார் வேண்டுமானாலும் உங்கள் ஸ்மார்ட் ஒப்பந்தத்தை அழைக்கலாம் அல்லது அதில் எழுதலாம்! அடுத்து நீங்கள் என்ன உருவாக்கப் போகிறீர்கள் என்பதைப் பார்க்க நாங்கள் ஆவலுடன் காத்திருக்கிறோம்!**

## பகுதி 4 - உங்கள் ஸ்மார்ட் ஒப்பந்தத்தை முன்பக்கத்துடன் ஒருங்கிணைத்தல் {#part-4-integrating-your-smart-contract-with-the-frontend}

இந்த வழிகாட்டியின் முடிவில், நீங்கள் பின்வருவனவற்றை எப்படிச் செய்வது என்று தெரிந்துகொள்வீர்கள்:

- உங்கள் dapp உடன் MetaMask வாலட்டை இணைப்பது
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API-ஐப் பயன்படுத்தி உங்கள் ஸ்மார்ட் ஒப்பந்தத்திலிருந்து தரவைப் படிப்பது
- MetaMask-ஐப் பயன்படுத்தி Ethereum பரிவர்த்தனைகளில் கையொப்பமிடுவது

இந்த dapp-க்கு, நாங்கள் [React](https://react.dev/)-ஐ எங்கள் முன்பக்க கட்டமைப்பாகப் பயன்படுத்துவோம்; இருப்பினும், அதன் அடிப்படைகளை விளக்குவதற்கு நாங்கள் அதிக நேரம் செலவிட மாட்டோம் என்பதை கவனத்தில் கொள்ள வேண்டும், ஏனெனில் நாங்கள் பெரும்பாலும் எங்கள் திட்டத்திற்கு Web3 செயல்பாட்டைக் கொண்டுவருவதில் கவனம் செலுத்துவோம்.

முன்தேவையாக, உங்களுக்கு React பற்றிய தொடக்க நிலை புரிதல் இருக்க வேண்டும். இல்லையெனில், அதிகாரப்பூர்வ [Intro to React tutorial](https://react.dev/learn)-ஐ முடிக்குமாறு பரிந்துரைக்கிறோம்.

### ஸ்டார்ட்டர் கோப்புகளை குளோன் செய்தல் {#clone-the-starter-files}

முதலில், இந்தத் திட்டத்திற்கான ஸ்டார்ட்டர் கோப்புகளைப் பெற [hello-world-part-four GitHub repository](https://github.com/alchemyplatform/hello-world-part-four-tutorial)-க்குச் சென்று, இந்த ரெப்போசிட்டரியை உங்கள் லோக்கல் கணினியில் குளோன் செய்யவும்.

குளோன் செய்யப்பட்ட ரெப்போசிட்டரியை லோக்கலில் திறக்கவும். அதில் இரண்டு கோப்புறைகள் இருப்பதை கவனிக்கவும்: `starter-files` மற்றும் `completed`.

- `starter-files`- **நாங்கள் இந்த டைரக்டரியில்தான் வேலை செய்வோம்**, UI-ஐ உங்கள் Ethereum வாலட்டுடனும், [பகுதி 3](#part-3)-இல் Etherscan-இல் நாங்கள் வெளியிட்ட ஸ்மார்ட் ஒப்பந்தத்துடனும் இணைப்போம்.
- `completed` என்பது முழுமையாக முடிக்கப்பட்ட வழிகாட்டியைக் கொண்டுள்ளது, மேலும் நீங்கள் எங்காவது சிக்கிக்கொண்டால் மட்டுமே இதை ஒரு குறிப்பாகப் பயன்படுத்த வேண்டும்.

அடுத்து, உங்களுக்குப் பிடித்த குறியீடு எடிட்டரில் `starter-files` நகலைத் திறந்து, பின்னர் `src` கோப்புறைக்குச் செல்லவும்.

நாங்கள் எழுதும் அனைத்து குறியீடுகளும் `src` கோப்புறையின் கீழ் இருக்கும். எங்கள் திட்டத்திற்கு Web3 செயல்பாட்டை வழங்க `HelloWorld.js` காம்போனென்ட் மற்றும் `util/interact.js` JavaScript கோப்புகளைத் திருத்துவோம்.

### ஸ்டார்ட்டர் கோப்புகளைச் சரிபார்த்தல் {#check-out-the-starter-files}

நாங்கள் குறியீட்டை எழுதத் தொடங்குவதற்கு முன், ஸ்டார்ட்டர் கோப்புகளில் எங்களுக்கு என்ன வழங்கப்பட்டுள்ளது என்பதை ஆராய்வோம்.

#### உங்கள் react திட்டத்தை இயக்குதல் {#get-your-react-project-running}

எங்கள் உலாவியில் React திட்டத்தை இயக்குவதன் மூலம் தொடங்குவோம். React-இன் சிறப்பம்சம் என்னவென்றால், எங்கள் திட்டம் உலாவியில் இயங்கியவுடன், நாங்கள் சேமிக்கும் எந்த மாற்றங்களும் எங்கள் உலாவியில் நேரடியாகப் புதுப்பிக்கப்படும்.

திட்டத்தை இயக்க, `starter-files` கோப்புறையின் ரூட் டைரக்டரிக்குச் சென்று, திட்டத்தின் சார்புகளை (dependencies) நிறுவ உங்கள் டெர்மினலில் `npm install` என்பதை இயக்கவும்:

```bash
cd starter-files
npm install
```

அவை நிறுவப்பட்டதும், உங்கள் டெர்மினலில் `npm start` என்பதை இயக்கவும்:

```bash
npm start
```

அவ்வாறு செய்வது உங்கள் உலாவியில் [http://localhost:3000/](http://localhost:3000/)-ஐத் திறக்க வேண்டும், அங்கு எங்கள் திட்டத்திற்கான முன்பக்கத்தைக் காண்பீர்கள். இது ஒரு புலம் (உங்கள் ஸ்மார்ட் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியைப் புதுப்பிப்பதற்கான இடம்), "Connect Wallet" பட்டன் மற்றும் "Update" பட்டன் ஆகியவற்றைக் கொண்டிருக்க வேண்டும்.

நீங்கள் எந்த பட்டனையும் கிளிக் செய்ய முயன்றால், அவை வேலை செய்யாது என்பதை நீங்கள் கவனிப்பீர்கள்—ஏனென்றால் அவற்றின் செயல்பாட்டை நாங்கள் இன்னும் நிரல் செய்ய வேண்டும்.

#### `HelloWorld.js` காம்போனென்ட் {#the-helloworld-js-component}

எங்கள் எடிட்டரில் உள்ள `src` கோப்புறைக்குத் திரும்பிச் சென்று `HelloWorld.js` கோப்பைத் திறப்போம். இந்தக் கோப்பில் உள்ள அனைத்தையும் நாங்கள் புரிந்துகொள்வது மிகவும் முக்கியம், ஏனெனில் இது நாங்கள் வேலை செய்யும் முதன்மை React காம்போனென்ட் ஆகும்.

இந்தக் கோப்பின் மேற்புறத்தில், எங்கள் திட்டத்தை இயக்குவதற்குத் தேவையான பல import ஸ்டேட்மெண்ட்கள் இருப்பதை நீங்கள் கவனிப்பீர்கள், இதில் React லைப்ரரி, useEffect மற்றும் useState ஹூக்குகள், `./util/interact.js`-லிருந்து சில உருப்படிகள் (அவற்றை விரைவில் விரிவாக விவரிப்போம்!), மற்றும் Alchemy லோகோ ஆகியவை அடங்கும்.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

அடுத்து, குறிப்பிட்ட நிகழ்வுகளுக்குப் பிறகு நாங்கள் புதுப்பிக்கும் எங்கள் state மாறிகள் (variables) உள்ளன.

```javascript
// HelloWorld.js

// நிலை மாறிகள் (State variables)
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

ஒவ்வொரு மாறியும் எதைக் குறிக்கிறது என்பது இங்கே:

- `walletAddress` - பயனரின் வாலட் முகவரியைச் சேமிக்கும் ஒரு ஸ்ட்ரிங்
- `status`- dapp உடன் எவ்வாறு தொடர்புகொள்வது என்பது குறித்து பயனருக்கு வழிகாட்டும் பயனுள்ள செய்தியைச் சேமிக்கும் ஒரு ஸ்ட்ரிங்
- `message` - ஸ்மார்ட் ஒப்பந்தத்தில் தற்போதைய செய்தியைச் சேமிக்கும் ஒரு ஸ்ட்ரிங்
- `newMessage` - ஸ்மார்ட் ஒப்பந்தத்தில் எழுதப்படும் புதிய செய்தியைச் சேமிக்கும் ஒரு ஸ்ட்ரிங்

state மாறிகளுக்குப் பிறகு, செயல்படுத்தப்படாத ஐந்து ஃபங்ஷன்களைக் காண்பீர்கள்: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed`, மற்றும் `onUpdatePressed`. அவை என்ன செய்கின்றன என்பதை கீழே விளக்குவோம்:

```javascript
// HelloWorld.js

// ஒரு முறை மட்டுமே அழைக்கப்படும்
useEffect(async () => {
  // செய்ய வேண்டியவை: செயல்படுத்தவும்
}, [])

function addSmartContractListener() {
  // செய்ய வேண்டியவை: செயல்படுத்தவும்
}

function addWalletListener() {
  // செய்ய வேண்டியவை: செயல்படுத்தவும்
}

const connectWalletPressed = async () => {
  // செய்ய வேண்டியவை: செயல்படுத்தவும்
}

const onUpdatePressed = async () => {
  // செய்ய வேண்டியவை: செயல்படுத்தவும்
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- இது உங்கள் காம்போனென்ட் ரெண்டர் செய்யப்பட்ட பிறகு அழைக்கப்படும் ஒரு React ஹூக் ஆகும். இதில் வெற்று அரே `[]` ப்ராப் அனுப்பப்பட்டுள்ளதால் (வரி 4-ஐப் பார்க்கவும்), இது காம்போனென்ட்டின் _முதல்_ ரெண்டரில் மட்டுமே அழைக்கப்படும். இங்கே எங்கள் ஸ்மார்ட் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள தற்போதைய செய்தியை ஏற்றுவோம், எங்கள் ஸ்மார்ட் ஒப்பந்தம் மற்றும் வாலட் லிசன்னர்களை அழைப்போம், மேலும் வாலட் ஏற்கனவே இணைக்கப்பட்டுள்ளதா என்பதைப் பிரதிபலிக்க எங்கள் UI-ஐப் புதுப்பிப்போம்.
- `addSmartContractListener`- இந்த ஃபங்ஷன் எங்கள் HelloWorld ஒப்பந்தத்தின் `UpdatedMessages` நிகழ்வைக் கண்காணிக்கும் ஒரு லிசன்னரை அமைக்கிறது, மேலும் எங்கள் ஸ்மார்ட் ஒப்பந்தத்தில் செய்தி மாற்றப்படும்போது எங்கள் UI-ஐப் புதுப்பிக்கும்.
- `addWalletListener`- இந்த ஃபங்ஷன் பயனரின் MetaMask வாலட் நிலையில் ஏற்படும் மாற்றங்களைக் கண்டறியும் ஒரு லிசன்னரை அமைக்கிறது, அதாவது பயனர் தங்கள் வாலட்டைத் துண்டிக்கும்போது அல்லது முகவரிகளை மாற்றும்போது.
- `connectWalletPressed`- பயனரின் MetaMask வாலட்டை எங்கள் dapp உடன் இணைக்க இந்த ஃபங்ஷன் அழைக்கப்படும்.
- `onUpdatePressed` - ஸ்மார்ட் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியைப் பயனர் புதுப்பிக்க விரும்பும்போது இந்த ஃபங்ஷன் அழைக்கப்படும்.

இந்தக் கோப்பின் முடிவில், எங்கள் காம்போனென்ட்டின் UI உள்ளது.

```javascript
// HelloWorld.js

// எங்கள் கூறின் (component) பயனர் இடைமுகம் (UI)
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
 
</div>
 
</div>
)
```

இந்தக் குறியீட்டை நீங்கள் கவனமாக ஸ்கேன் செய்தால், எங்கள் UI-இல் பல்வேறு state மாறிகளை எங்கு பயன்படுத்துகிறோம் என்பதை நீங்கள் கவனிப்பீர்கள்:

- வரிகள் 6-12-இல், பயனரின் வாலட் இணைக்கப்பட்டிருந்தால் (அதாவது, `walletAddress.length > 0`), "walletButton" என்ற ID-ஐக் கொண்ட பட்டனில் பயனர் `walletAddress`-இன் சுருக்கப்பட்ட பதிப்பைக் காண்பிப்போம்; இல்லையெனில் அது வெறுமனே "Connect Wallet" என்று கூறும்.
- வரி 17-இல், ஸ்மார்ட் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள தற்போதைய செய்தியைக் காண்பிப்போம், இது `message` ஸ்ட்ரிங்கில் பிடிக்கப்பட்டுள்ளது.
- வரிகள் 23-26-இல், உரைப்புலத்தில் உள்ளீடு மாறும்போது எங்கள் `newMessage` state மாறியைப் புதுப்பிக்க [கட்டுப்படுத்தப்பட்ட காம்போனென்ட்டைப்](https://legacy.reactjs.org/docs/forms.html#controlled-components) பயன்படுத்துகிறோம்.

எங்கள் state மாறிகளுக்கு மேலதிகமாக, `publishButton` மற்றும் `walletButton` என்ற ID-களைக் கொண்ட பட்டன்கள் முறையே கிளிக் செய்யப்படும்போது `connectWalletPressed` மற்றும் `onUpdatePressed` ஃபங்ஷன்கள் அழைக்கப்படுவதையும் நீங்கள் காண்பீர்கள்.

இறுதியாக, இந்த `HelloWorld.js` காம்போனென்ட் எங்கு சேர்க்கப்பட்டுள்ளது என்பதைப் பார்ப்போம்.

மற்ற அனைத்து காம்போனென்ட்களுக்கும் ஒரு கண்டெய்னராகச் செயல்படும் React-இன் முக்கிய காம்போனென்ட்டான `App.js` கோப்பிற்குச் சென்றால், எங்கள் `HelloWorld.js` காம்போனென்ட் வரி 7-இல் உட்செலுத்தப்பட்டிருப்பதைக் காண்பீர்கள்.

கடைசியாக, உங்களுக்கு வழங்கப்பட்டுள்ள மற்றொரு கோப்பான `interact.js` கோப்பைச் சரிபார்ப்போம்.

#### `interact.js` கோப்பு {#the-interact-js-file}

நாங்கள் [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) முன்னுதாரணத்தைப் பின்பற்ற விரும்புவதால், எங்கள் dapp-இன் லாஜிக், தரவு மற்றும் விதிகளை நிர்வகிப்பதற்கான எங்கள் அனைத்து ஃபங்ஷன்களையும் கொண்ட ஒரு தனி கோப்பு எங்களுக்குத் தேவைப்படும், பின்னர் அந்த ஃபங்ஷன்களை எங்கள் முன்பக்கத்திற்கு (எங்கள் `HelloWorld.js` காம்போனென்ட்) எக்ஸ்போர்ட் செய்ய முடியும்.

👆🏽இதுவே எங்கள் `interact.js` கோப்பின் சரியான நோக்கமாகும்!

உங்கள் `src` டைரக்டரியில் உள்ள `util` கோப்புறைக்குச் செல்லவும், எங்கள் ஸ்மார்ட் ஒப்பந்த தொடர்பு மற்றும் வாலட் ஃபங்ஷன்கள் மற்றும் மாறிகள் அனைத்தையும் கொண்ட `interact.js` என்ற கோப்பை நாங்கள் சேர்த்துள்ளதை நீங்கள் கவனிப்பீர்கள்.

```javascript
// interact.js

// export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

கோப்பின் மேற்புறத்தில் `helloWorldContract` ஆப்ஜெக்ட்டை நாங்கள் கமெண்ட் செய்துள்ளதை நீங்கள் கவனிப்பீர்கள். இந்த வழிகாட்டியின் பிற்பகுதியில், இந்த ஆப்ஜெக்ட்டை அன்கமெண்ட் செய்து, இந்த மாறியில் எங்கள் ஸ்மார்ட் ஒப்பந்தத்தை இன்ஸ்டான்ஷியேட் செய்வோம், பின்னர் அதை எங்கள் `HelloWorld.js` காம்போனென்ட்டிற்கு எக்ஸ்போர்ட் செய்வோம்.

எங்கள் `helloWorldContract` ஆப்ஜெக்ட்டிற்குப் பிறகு செயல்படுத்தப்படாத நான்கு ஃபங்ஷன்கள் பின்வருவனவற்றைச் செய்கின்றன:

- `loadCurrentMessage` - இந்த ஃபங்ஷன் ஸ்மார்ட் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள தற்போதைய செய்தியை ஏற்றுவதற்கான லாஜிக்கைக் கையாள்கிறது. இது [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3)-ஐப் பயன்படுத்தி Hello World ஸ்மார்ட் ஒப்பந்தத்திற்கு ஒரு _read_ அழைப்பை மேற்கொள்ளும்.
- `connectWallet` - இந்த ஃபங்ஷன் பயனரின் MetaMask-ஐ எங்கள் dapp உடன் இணைக்கும்.
- `getCurrentWalletConnected` - பக்க ஏற்றத்தின்போது ஒரு Ethereum கணக்கு ஏற்கனவே எங்கள் dapp உடன் இணைக்கப்பட்டுள்ளதா என்பதை இந்த ஃபங்ஷன் சரிபார்த்து, அதற்கேற்ப எங்கள் UI-ஐப் புதுப்பிக்கும்.
- `updateMessage` - இந்த ஃபங்ஷன் ஸ்மார்ட் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியைப் புதுப்பிக்கும். இது Hello World ஸ்மார்ட் ஒப்பந்தத்திற்கு ஒரு _write_ அழைப்பை மேற்கொள்ளும், எனவே செய்தியைப் புதுப்பிக்க பயனரின் MetaMask வாலட் ஒரு Ethereum பரிவர்த்தனையில் கையொப்பமிட வேண்டும்.

இப்போது நாங்கள் எதனுடன் வேலை செய்கிறோம் என்பதைப் புரிந்துகொண்டதால், எங்கள் ஸ்மார்ட் ஒப்பந்தத்திலிருந்து எவ்வாறு படிப்பது என்பதைக் கண்டுபிடிப்போம்!

### படி 3: உங்கள் ஸ்மார்ட் ஒப்பந்தத்திலிருந்து படித்தல் {#step-3-read-from-your-smart-contract}

உங்கள் ஸ்மார்ட் ஒப்பந்தத்திலிருந்து படிக்க, நீங்கள் பின்வருவனவற்றை வெற்றிகரமாக அமைக்க வேண்டும்:

- Ethereum செயினுக்கு ஒரு API இணைப்பு
- உங்கள் ஸ்மார்ட் ஒப்பந்தத்தின் ஏற்றப்பட்ட இன்ஸ்டன்ஸ்
- உங்கள் ஸ்மார்ட் ஒப்பந்த ஃபங்ஷனை அழைப்பதற்கான ஒரு ஃபங்ஷன்
- ஸ்மார்ட் ஒப்பந்தத்திலிருந்து நீங்கள் படிக்கும் தரவு மாறும்போது புதுப்பிப்புகளைக் கண்காணிக்க ஒரு லிசன்னர்

இது பல படிகள் போல் தோன்றலாம், ஆனால் கவலைப்பட வேண்டாம்! அவை ஒவ்வொன்றையும் படிப்படியாக எப்படிச் செய்வது என்று நாங்கள் உங்களுக்கு வழிகாட்டுவோம்! :)

#### Ethereum செயினுக்கு ஒரு API இணைப்பை நிறுவுதல் {#establish-an-api-connection-to-the-ethereum-chain}

இந்த வழிகாட்டியின் பகுதி 2-இல், [எங்கள் ஸ்மார்ட் ஒப்பந்தத்திலிருந்து படிக்க எங்கள் Alchemy Web3 திறவுகோலை](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library) எவ்வாறு பயன்படுத்தினோம் என்பது நினைவிருக்கிறதா? செயினிலிருந்து படிக்க உங்கள் dapp-இலும் ஒரு Alchemy Web3 திறவுகோல் தேவைப்படும்.

உங்களிடம் அது ஏற்கனவே இல்லையென்றால், முதலில் உங்கள் `starter-files`-இன் ரூட் டைரக்டரிக்குச் சென்று உங்கள் டெர்மினலில் பின்வருவனவற்றை இயக்குவதன் மூலம் [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)-ஐ நிறுவவும்:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) என்பது [Web3.js](https://docs.web3js.org/)-ஐச் சுற்றியுள்ள ஒரு ரேப்பர் ஆகும், இது மேம்பட்ட API முறைகள் மற்றும் பிற முக்கியமான நன்மைகளை வழங்கி ஒரு web3 டெவலப்பராக உங்கள் வாழ்க்கையை எளிதாக்குகிறது. இது குறைந்தபட்ச உள்ளமைவு தேவைப்படும் வகையில் வடிவமைக்கப்பட்டுள்ளது, எனவே நீங்கள் அதை உடனடியாக உங்கள் பயன்பாட்டில் பயன்படுத்தத் தொடங்கலாம்!

பின்னர், உங்கள் திட்ட டைரக்டரியில் [dotenv](https://www.npmjs.com/package/dotenv) பேக்கேஜை நிறுவவும், இதனால் எங்கள் API திறவுகோலைப் பெற்ற பிறகு அதைச் சேமிக்க ஒரு பாதுகாப்பான இடம் கிடைக்கும்.

```text
npm install dotenv --save
```

எங்கள் dapp-க்கு, எங்கள் HTTP API திறவுகோலுக்குப் பதிலாக **எங்கள் Websockets API திறவுகோலைப் பயன்படுத்துவோம்**, ஏனெனில் ஸ்மார்ட் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தி மாறும்போது அதைக் கண்டறியும் ஒரு லிசன்னரை அமைக்க இது எங்களை அனுமதிக்கும்.

உங்கள் API திறவுகோலைப் பெற்றவுடன், உங்கள் ரூட் டைரக்டரியில் ஒரு `.env` கோப்பை உருவாக்கி, அதில் உங்கள் Alchemy Websockets url-ஐச் சேர்க்கவும். அதன் பிறகு, உங்கள் `.env` கோப்பு இப்படி இருக்க வேண்டும்:

```javascript
REACT_APP_ALCHEMY_KEY = wss: // eth-goerli.ws.alchemyapi.io/v2/<key>
```

இப்போது, எங்கள் dapp-இல் எங்கள் Alchemy Web3 எண்ட்பாயிண்ட்டை அமைக்க நாங்கள் தயாராக உள்ளோம்! எங்கள் `util` கோப்புறைக்குள் உள்ள `interact.js`-க்குத் திரும்பிச் சென்று, கோப்பின் மேற்புறத்தில் பின்வரும் குறியீட்டைச் சேர்ப்போம்:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

// export const helloWorldContract;
```

மேலே, நாங்கள் முதலில் எங்கள் `.env` கோப்பிலிருந்து Alchemy திறவுகோலை இம்போர்ட் செய்தோம், பின்னர் எங்கள் Alchemy Web3 எண்ட்பாயிண்ட்டை நிறுவ எங்கள் `alchemyKey`-ஐ `createAlchemyWeb3`-க்கு அனுப்பினோம்.

இந்த எண்ட்பாயிண்ட் தயாரான நிலையில், எங்கள் ஸ்மார்ட் ஒப்பந்தத்தை ஏற்றுவதற்கான நேரம் இது!

#### உங்கள் Hello World ஸ்மார்ட் ஒப்பந்தத்தை ஏற்றுதல் {#loading-your-hello-world-smart-contract}

உங்கள் Hello World ஸ்மார்ட் ஒப்பந்தத்தை ஏற்ற, உங்களுக்கு அதன் ஒப்பந்த முகவரி மற்றும் ABI தேவைப்படும், [இந்த வழிகாட்டியின் பகுதி 3](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)-ஐ நீங்கள் முடித்திருந்தால் இவை இரண்டையும் Etherscan-இல் காணலாம்.

#### Etherscan-இலிருந்து உங்கள் ஒப்பந்த ABI-ஐ எவ்வாறு பெறுவது {#how-to-get-your-contract-abi-from-etherscan}

இந்த வழிகாட்டியின் பகுதி 3-ஐ நீங்கள் தவிர்த்திருந்தால், [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) என்ற முகவரியுடன் கூடிய HelloWorld ஒப்பந்தத்தைப் பயன்படுத்தலாம். அதன் ABI-ஐ [இங்கே](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) காணலாம்.

ஒரு ஒப்பந்தம் எந்த ஃபங்ஷனை அழைக்கும் என்பதைக் குறிப்பிடுவதற்கும், நீங்கள் எதிர்பார்க்கும் வடிவத்தில் ஃபங்ஷன் தரவை வழங்கும் என்பதை உறுதி செய்வதற்கும் ஒரு ஒப்பந்த ABI அவசியமாகும். எங்கள் ஒப்பந்த ABI-ஐ நகலெடுத்தவுடன், அதை உங்கள் `src` டைரக்டரியில் `contract-abi.json` என்ற JSON கோப்பாகச் சேமிப்போம்.

உங்கள் contract-abi.json உங்கள் src கோப்புறையில் சேமிக்கப்பட வேண்டும்.

எங்கள் ஒப்பந்த முகவரி, ABI மற்றும் Alchemy Web3 எண்ட்பாயிண்ட் ஆகியவற்றைக் கொண்டு, எங்கள் ஸ்மார்ட் ஒப்பந்தத்தின் இன்ஸ்டன்ஸை ஏற்ற [contract method](https://docs.web3js.org/api/web3-eth-contract/class/Contract)-ஐப் பயன்படுத்தலாம். உங்கள் ஒப்பந்த ABI-ஐ `interact.js` கோப்பில் இம்போர்ட் செய்து உங்கள் ஒப்பந்த முகவரியைச் சேர்க்கவும்.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

இப்போது நாங்கள் இறுதியாக எங்கள் `helloWorldContract` மாறியை அன்கமெண்ட் செய்து, எங்கள் AlchemyWeb3 எண்ட்பாயிண்ட்டைப் பயன்படுத்தி ஸ்மார்ட் ஒப்பந்தத்தை ஏற்றலாம்:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

சுருக்கமாகச் சொன்னால், உங்கள் `interact.js`-இன் முதல் 12 வரிகள் இப்போது இப்படி இருக்க வேண்டும்:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

இப்போது எங்கள் ஒப்பந்தம் ஏற்றப்பட்டதால், எங்கள் `loadCurrentMessage` ஃபங்ஷனைச் செயல்படுத்தலாம்!

#### உங்கள் `interact.js` கோப்பில் `loadCurrentMessage`-ஐச் செயல்படுத்துதல் {#implementing-loadCurrentMessage-in-your-interact-js-file}

இந்த ஃபங்ஷன் மிகவும் எளிமையானது. எங்கள் ஒப்பந்தத்திலிருந்து படிக்க ஒரு எளிய async web3 அழைப்பை மேற்கொள்ளப் போகிறோம். எங்கள் ஃபங்ஷன் ஸ்மார்ட் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியை வழங்கும்:

உங்கள் `interact.js` கோப்பில் உள்ள `loadCurrentMessage`-ஐப் பின்வருமாறு புதுப்பிக்கவும்:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

இந்த ஸ்மார்ட் ஒப்பந்தத்தை எங்கள் UI-இல் காண்பிக்க விரும்புவதால், எங்கள் `HelloWorld.js` காம்போனென்ட்டில் உள்ள `useEffect` ஃபங்ஷனைப் பின்வருமாறு புதுப்பிப்போம்:

```javascript
// HelloWorld.js

// ஒரு முறை மட்டுமே அழைக்கப்படும்
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

கவனிக்கவும், காம்போனென்ட்டின் முதல் ரெண்டரின் போது எங்கள் `loadCurrentMessage` ஒருமுறை மட்டுமே அழைக்கப்பட வேண்டும் என்று நாங்கள் விரும்புகிறோம். ஸ்மார்ட் ஒப்பந்தத்தில் செய்தி மாறிய பிறகு UI-ஐத் தானாகவே புதுப்பிக்க `addSmartContractListener`-ஐ விரைவில் செயல்படுத்துவோம்.

எங்கள் லிசன்னருக்குள் நுழைவதற்கு முன், இதுவரை எங்களிடம் உள்ளதைச் சரிபார்ப்போம்! உங்கள் `HelloWorld.js` மற்றும் `interact.js` கோப்புகளைச் சேமித்து, பின்னர் [http://localhost:3000/](http://localhost:3000/)-க்குச் செல்லவும்

தற்போதைய செய்தி இனி "No connection to the network" என்று கூறவில்லை என்பதை நீங்கள் கவனிப்பீர்கள். அதற்குப் பதிலாக இது ஸ்மார்ட் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியைப் பிரதிபலிக்கிறது. அருமை!

#### உங்கள் UI இப்போது ஸ்மார்ட் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியைப் பிரதிபலிக்க வேண்டும் {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

இப்போது அந்த லிசன்னரைப் பற்றிப் பேசுகையில்...

#### `addSmartContractListener`-ஐச் செயல்படுத்துதல் {#implement-addsmartcontractlistener}

[இந்த வழிகாட்டித் தொடரின் பகுதி 1](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract)-இல் நாங்கள் எழுதிய `HelloWorld.sol` கோப்பை நீங்கள் நினைத்துப் பார்த்தால், எங்கள் ஸ்மார்ட் ஒப்பந்தத்தின் `update` ஃபங்ஷன் அழைக்கப்பட்ட பிறகு வெளியிடப்படும் `UpdatedMessages` என்ற ஸ்மார்ட் ஒப்பந்த நிகழ்வு இருப்பதை நீங்கள் நினைவுகூருவீர்கள் (வரிகள் 9 மற்றும் 27-ஐப் பார்க்கவும்):

```javascript
// HelloWorld.sol

// சொற்பொருள் பதிப்பைப் (semantic versioning) பயன்படுத்தி, Solidity-இன் பதிப்பைக் குறிப்பிடுகிறது.
// மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// `HelloWorld` என்ற பெயரில் ஒரு ஒப்பந்தத்தை வரையறுக்கிறது.
// ஒப்பந்தம் என்பது செயல்பாடுகள் மற்றும் தரவுகளின் (அதன் நிலை) தொகுப்பாகும். வரிசைப்படுத்தப்பட்டவுடன், ஒரு ஒப்பந்தம் Ethereum பிளாக்செயினில் ஒரு குறிப்பிட்ட முகவரியில் இருக்கும். மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // update செயல்பாடு அழைக்கப்படும்போது வெளியிடப்படும்
   // ஸ்மார்ட் ஒப்பந்த நிகழ்வுகள் (events) என்பது பிளாக்செயினில் ஏதோ நடந்துள்ளது என்பதை உங்கள் பயன்பாட்டின் முன்-முனைக்கு (front-end) தெரிவிக்கும் ஒரு வழியாகும், இது குறிப்பிட்ட நிகழ்வுகளுக்காக 'காத்திருந்து' அவை நிகழும்போது நடவடிக்கை எடுக்கலாம்.
   event UpdatedMessages(string oldStr, string newStr);

   // `string` வகையிலான `message` என்ற நிலை மாறியை (state variable) அறிவிக்கிறது.
   // நிலை மாறிகள் என்பவை ஒப்பந்த சேமிப்பகத்தில் நிரந்தரமாக சேமிக்கப்படும் மதிப்புகளைக் கொண்ட மாறிகள் ஆகும். `public` என்ற முக்கியச்சொல் (keyword) மாறிகளை ஒப்பந்தத்திற்கு வெளியேயும் அணுகக்கூடியதாக ஆக்குகிறது, மேலும் பிற ஒப்பந்தங்கள் அல்லது கிளையண்டுகள் மதிப்பை அணுகுவதற்கு அழைக்கக்கூடிய ஒரு செயல்பாட்டை உருவாக்குகிறது.
   string public message;

   // பல வகுப்பு அடிப்படையிலான (class-based) பொருள் சார்ந்த (object-oriented) மொழிகளைப் போலவே, கன்ஸ்ட்ரக்டர் (constructor) என்பது ஒப்பந்தம் உருவாக்கப்படும்போது மட்டுமே செயல்படுத்தப்படும் ஒரு சிறப்புச் செயல்பாடாகும்.
   // ஒப்பந்தத்தின் தரவைத் துவக்க கன்ஸ்ட்ரக்டர்கள் பயன்படுத்தப்படுகின்றன. மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // `initMessage` என்ற சரம் (string) வாதத்தை ஏற்றுக்கொண்டு, ஒப்பந்தத்தின் `message` சேமிப்பக மாறியில் மதிப்பை அமைக்கிறது).
      message = initMessage;
   }

   // ஒரு சரம் வாதத்தை ஏற்றுக்கொண்டு `message` சேமிப்பக மாறியைப் புதுப்பிக்கும் ஒரு பொதுவான (public) செயல்பாடு.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

ஸ்மார்ட் ஒப்பந்த நிகழ்வுகள் என்பது பிளாக்செயினில் ஏதோ நடந்துள்ளது (அதாவது, ஒரு _நிகழ்வு_ இருந்தது) என்பதை உங்கள் முன்பக்கப் பயன்பாட்டிற்குத் தொடர்புகொள்வதற்கான ஒரு வழியாகும், இது குறிப்பிட்ட நிகழ்வுகளுக்காக 'காத்திருக்கலாம்' (listening) மற்றும் அவை நிகழும்போது நடவடிக்கை எடுக்கலாம்.

`addSmartContractListener` ஃபங்ஷன் எங்கள் Hello World ஸ்மார்ட் ஒப்பந்தத்தின் `UpdatedMessages` நிகழ்வைக் குறிப்பாகக் கண்காணித்து, புதிய செய்தியைக் காண்பிக்க எங்கள் UI-ஐப் புதுப்பிக்கப் போகிறது.

`addSmartContractListener`-ஐப் பின்வருமாறு மாற்றவும்:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

லிசன்னர் ஒரு நிகழ்வைக் கண்டறியும்போது என்ன நடக்கிறது என்பதைப் பார்ப்போம்:

- நிகழ்வு வெளியிடப்படும்போது பிழை ஏற்பட்டால், அது எங்கள் `status` state மாறி வழியாக UI-இல் பிரதிபலிக்கும்.
- இல்லையெனில், நாங்கள் வழங்கப்பட்ட `data` ஆப்ஜெக்ட்டைப் பயன்படுத்துவோம். `data.returnValues` என்பது பூஜ்ஜியத்தில் குறியிடப்பட்ட ஒரு அரே ஆகும், இதில் அரேயின் முதல் உறுப்பு முந்தைய செய்தியையும் இரண்டாவது உறுப்பு புதுப்பிக்கப்பட்ட செய்தியையும் சேமிக்கிறது. ஒட்டுமொத்தமாக, ஒரு வெற்றிகரமான நிகழ்வில் எங்கள் `message` ஸ்ட்ரிங்கைப் புதுப்பிக்கப்பட்ட செய்திக்கு அமைப்போம், `newMessage` ஸ்ட்ரிங்கை அழிப்போம், மேலும் எங்கள் ஸ்மார்ட் ஒப்பந்தத்தில் புதிய செய்தி வெளியிடப்பட்டுள்ளது என்பதைப் பிரதிபலிக்க எங்கள் `status` state மாறியைப் புதுப்பிப்போம்.

இறுதியாக, எங்கள் `useEffect` ஃபங்ஷனில் எங்கள் லிசன்னரை அழைப்போம், இதனால் அது `HelloWorld.js` காம்போனென்ட்டின் முதல் ரெண்டரில் துவக்கப்படும். ஒட்டுமொத்தமாக, உங்கள் `useEffect` ஃபங்ஷன் இப்படி இருக்க வேண்டும்:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

இப்போது எங்கள் ஸ்மார்ட் ஒப்பந்தத்திலிருந்து படிக்க முடிகிறது என்பதால், அதில் எவ்வாறு எழுதுவது என்பதைக் கண்டுபிடிப்பதும் சிறப்பாக இருக்கும்! இருப்பினும், எங்கள் dapp-இல் எழுத, முதலில் அதனுடன் இணைக்கப்பட்ட ஒரு Ethereum வாலட் எங்களிடம் இருக்க வேண்டும்.

எனவே, அடுத்து எங்கள் Ethereum வாலட்டை (MetaMask) அமைப்பதையும் பின்னர் அதை எங்கள் dapp உடன் இணைப்பதையும் கையாளுவோம்!

### படி 4: உங்கள் Ethereum வாலட்டை அமைத்தல் {#step-4-set-up-your-ethereum-wallet}

Ethereum செயினில் எதையும் எழுத, பயனர்கள் தங்கள் விர்ச்சுவல் வாலட்டின் பிரைவேட் கீகளைப் பயன்படுத்தி பரிவர்த்தனைகளில் கையொப்பமிட வேண்டும். இந்த வழிகாட்டிக்கு, உங்கள் Ethereum கணக்கு முகவரியை நிர்வகிக்கப் பயன்படுத்தப்படும் உலாவியில் உள்ள விர்ச்சுவல் வாலட்டான [MetaMask](https://metamask.io/)-ஐப் பயன்படுத்துவோம், ஏனெனில் இது இறுதிப் பயனருக்கு இந்தப் பரிவர்த்தனை கையொப்பமிடுதலை மிகவும் எளிதாக்குகிறது.

Ethereum-இல் பரிவர்த்தனைகள் எவ்வாறு செயல்படுகின்றன என்பதைப் பற்றி மேலும் புரிந்துகொள்ள விரும்பினால், Ethereum அறக்கட்டளையின் [இந்தப் பக்கத்தைப்](/developers/docs/transactions/) பார்க்கவும்.

#### MetaMask-ஐப் பதிவிறக்குதல் {#download-metamask}

நீங்கள் [இங்கே](https://metamask.io/download) இலவசமாக MetaMask கணக்கைப் பதிவிறக்கம் செய்து உருவாக்கலாம். நீங்கள் ஒரு கணக்கை உருவாக்கும்போது, அல்லது உங்களிடம் ஏற்கனவே கணக்கு இருந்தால், மேல் வலதுபுறத்தில் உள்ள “Goerli Test Network”-க்கு மாறுவதை உறுதிசெய்யவும் (இதனால் நாங்கள் உண்மையான பணத்தைக் கையாள மாட்டோம்).

#### Faucet-இலிருந்து ether-ஐச் சேர்த்தல் {#add-ether-from-a-faucet}

Ethereum பிளாக்செயினில் ஒரு பரிவர்த்தனையில் கையொப்பமிட, எங்களுக்குச் சில போலி Eth தேவைப்படும். Eth-ஐப் பெற நீங்கள் [FaucETH](https://fauceth.komputing.org)-க்குச் சென்று உங்கள் Goerli கணக்கு முகவரியை உள்ளிட்டு, “Request funds” என்பதைக் கிளிக் செய்து, பின்னர் கீழ்தோன்றும் பட்டியலில் “Ethereum Testnet Goerli” என்பதைத் தேர்ந்தெடுத்து இறுதியாக மீண்டும் “Request funds” பட்டனைக் கிளிக் செய்யலாம். சிறிது நேரத்திலேயே உங்கள் MetaMask கணக்கில் Eth-ஐக் காண வேண்டும்!

#### உங்கள் இருப்பைச் சரிபார்த்தல் {#check-your-balance}

எங்கள் இருப்பு அங்கு உள்ளதா என்பதை இருமுறை சரிபார்க்க, [Alchemy’s composer tool](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)-ஐப் பயன்படுத்தி ஒரு [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) கோரிக்கையை மேற்கொள்வோம். இது எங்கள் வாலட்டில் உள்ள Eth-இன் அளவை வழங்கும். உங்கள் MetaMask கணக்கு முகவரியை உள்ளிட்டு “Send Request” என்பதைக் கிளிக் செய்த பிறகு, இது போன்ற ஒரு பதிலைக் காண வேண்டும்:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**குறிப்பு:** இந்த முடிவு wei-இல் உள்ளது, eth-இல் அல்ல. Wei என்பது ether-இன் மிகச்சிறிய மதிப்பாகப் பயன்படுத்தப்படுகிறது. wei-இலிருந்து eth-க்கு மாற்றுவது: 1 eth = 10¹⁸ wei. எனவே 0xde0b6b3a7640000-ஐ தசமமாக மாற்றினால் 1\*10¹⁸ கிடைக்கும், இது 1 eth-க்குச் சமம்.

அப்பாடா! எங்கள் போலி பணம் அனைத்தும் அங்கு உள்ளது! 🤑

### படி 5: MetaMask-ஐ உங்கள் UI உடன் இணைத்தல் {#step-5-connect-metamask-to-your-UI}

இப்போது எங்கள் MetaMask வாலட் அமைக்கப்பட்டுள்ளதால், எங்கள் dapp-ஐ அதனுடன் இணைப்போம்!

#### `connectWallet` ஃபங்ஷன் {#the-connectWallet-function}

எங்கள் `interact.js` கோப்பில், `connectWallet` ஃபங்ஷனைச் செயல்படுத்துவோம், பின்னர் அதை எங்கள் `HelloWorld.js` காம்போனென்ட்டில் அழைக்கலாம்.

`connectWallet`-ஐப் பின்வருமாறு மாற்றுவோம்:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

எனவே இந்த பெரிய குறியீட்டுத் தொகுதி சரியாக என்ன செய்கிறது?

சரி, முதலில், உங்கள் உலாவியில் `window.ethereum` இயக்கப்பட்டிருக்கிறதா என்பதை இது சரிபார்க்கிறது.

`window.ethereum` என்பது MetaMask மற்றும் பிற வாலட் வழங்குநர்களால் உட்செலுத்தப்பட்ட ஒரு உலகளாவிய API ஆகும், இது பயனர்களின் Ethereum கணக்குகளைக் கோர இணையதளங்களை அனுமதிக்கிறது. அங்கீகரிக்கப்பட்டால், பயனர் இணைக்கப்பட்டுள்ள பிளாக்செயின்களிலிருந்து தரவைப் படிக்கலாம், மேலும் செய்திகள் மற்றும் பரிவர்த்தனைகளில் கையொப்பமிட பயனருக்குப் பரிந்துரைக்கலாம். மேலும் தகவலுக்கு [MetaMask docs](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)-ஐப் பார்க்கவும்!

`window.ethereum` _இல்லையென்றால்_, MetaMask நிறுவப்படவில்லை என்று அர்த்தம். இதன் விளைவாக ஒரு JSON ஆப்ஜெக்ட் வழங்கப்படுகிறது, அங்கு வழங்கப்படும் `address` ஒரு வெற்று ஸ்ட்ரிங் ஆகும், மேலும் `status` JSX ஆப்ஜெக்ட் பயனர் MetaMask-ஐ நிறுவ வேண்டும் என்பதைத் தெரிவிக்கிறது.

இப்போது `window.ethereum` _இருந்தால்_, அப்போதுதான் விஷயங்கள் சுவாரஸ்யமாகின்றன.

ஒரு try/catch லூப்பைப் பயன்படுத்தி, [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts)-ஐ அழைப்பதன் மூலம் MetaMask உடன் இணைக்க முயற்சிப்போம். இந்த ஃபங்ஷனை அழைப்பது உலாவியில் MetaMask-ஐத் திறக்கும், இதன் மூலம் பயனர் தங்கள் வாலட்டை உங்கள் dapp உடன் இணைக்கத் தூண்டப்படுவார்.

- பயனர் இணைக்கத் தேர்வுசெய்தால், `method: "eth_requestAccounts"` dapp உடன் இணைக்கப்பட்ட பயனரின் அனைத்து கணக்கு முகவரிகளையும் கொண்ட ஒரு அரேயை வழங்கும். ஒட்டுமொத்தமாக, எங்கள் `connectWallet` ஃபங்ஷன் இந்த அரேயில் உள்ள _முதல்_ `address` (வரி 9-ஐப் பார்க்கவும்) மற்றும் ஸ்மார்ட் ஒப்பந்தத்திற்கு ஒரு செய்தியை எழுத பயனரைத் தூண்டும் ஒரு `status` செய்தியைக் கொண்ட ஒரு JSON ஆப்ஜெக்ட்டை வழங்கும்.
- பயனர் இணைப்பை நிராகரித்தால், JSON ஆப்ஜெக்ட் வழங்கப்படும் `address`-க்கு ஒரு வெற்று ஸ்ட்ரிங்கையும், பயனர் இணைப்பை நிராகரித்ததைப் பிரதிபலிக்கும் ஒரு `status` செய்தியையும் கொண்டிருக்கும்.

இப்போது நாங்கள் இந்த `connectWallet` ஃபங்ஷனை எழுதியுள்ளதால், அடுத்த படியாக அதை எங்கள் `HelloWorld.js` காம்போனென்ட்டிற்கு அழைப்பதாகும்.

#### உங்கள் `HelloWorld.js` UI காம்போனென்ட்டில் `connectWallet` ஃபங்ஷனைச் சேர்த்தல் {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

`HelloWorld.js`-இல் உள்ள `connectWalletPressed` ஃபங்ஷனுக்குச் சென்று, அதைப் பின்வருமாறு புதுப்பிக்கவும்:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

எங்கள் பெரும்பாலான செயல்பாடுகள் `interact.js` கோப்பிலிருந்து எங்கள் `HelloWorld.js` காம்போனென்ட்டிலிருந்து எவ்வாறு சுருக்கப்பட்டுள்ளன என்பதைக் கவனிக்கிறீர்களா? நாங்கள் M-V-C முன்னுதாரணத்துடன் இணங்குவதற்காகவே இது!

`connectWalletPressed`-இல், நாங்கள் இம்போர்ட் செய்யப்பட்ட `connectWallet` ஃபங்ஷனுக்கு ஒரு await அழைப்பை மேற்கொள்கிறோம், மேலும் அதன் பதிலைப் பயன்படுத்தி, அவற்றின் state ஹூக்குகள் வழியாக எங்கள் `status` மற்றும் `walletAddress` மாறிகளைப் புதுப்பிக்கிறோம்.

இப்போது, இரண்டு கோப்புகளையும் (`HelloWorld.js` மற்றும் `interact.js`) சேமித்து, இதுவரை எங்கள் UI-ஐச் சோதிப்போம்.

[http://localhost:3000/](http://localhost:3000/) பக்கத்தில் உங்கள் உலாவியைத் திறந்து, பக்கத்தின் மேல் வலதுபுறத்தில் உள்ள "Connect Wallet" பட்டனை அழுத்தவும்.

நீங்கள் MetaMask-ஐ நிறுவியிருந்தால், உங்கள் வாலட்டை உங்கள் dapp உடன் இணைக்கத் தூண்டப்படுவீர்கள். இணைப்பதற்கான அழைப்பை ஏற்கவும்.

வாலட் பட்டன் இப்போது உங்கள் முகவரி இணைக்கப்பட்டுள்ளதைப் பிரதிபலிப்பதை நீங்கள் காண வேண்டும்! ஆமாம் 🔥

அடுத்து, பக்கத்தைப் புதுப்பிக்க முயற்சிக்கவும்... இது விசித்திரமாக உள்ளது. எங்கள் வாலட் பட்டன் ஏற்கனவே இணைக்கப்பட்டிருந்தாலும், MetaMask-ஐ இணைக்க எங்களைத் தூண்டுகிறது...

இருப்பினும், பயப்பட வேண்டாம்! `getCurrentWalletConnected`-ஐச் செயல்படுத்துவதன் மூலம் அதை நாங்கள் எளிதாகத் தீர்க்கலாம் (address that - புரிகிறதா?), இது ஒரு முகவரி ஏற்கனவே எங்கள் dapp உடன் இணைக்கப்பட்டுள்ளதா என்பதைச் சரிபார்த்து அதற்கேற்ப எங்கள் UI-ஐப் புதுப்பிக்கும்!

#### `getCurrentWalletConnected` ஃபங்ஷன் {#the-getcurrentwalletconnected-function}

`interact.js` கோப்பில் உள்ள உங்கள் `getCurrentWalletConnected` ஃபங்ஷனைப் பின்வருமாறு புதுப்பிக்கவும்:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

இந்தக் குறியீடு முந்தைய படியில் நாங்கள் எழுதிய `connectWallet` ஃபங்ஷனைப் _மிகவும்_ ஒத்திருக்கிறது.

முக்கிய வேறுபாடு என்னவென்றால், பயனர் தங்கள் வாலட்டை இணைக்க MetaMask-ஐத் திறக்கும் `eth_requestAccounts` முறையை அழைப்பதற்குப் பதிலாக, இங்கே நாங்கள் `eth_accounts` முறையை அழைக்கிறோம், இது தற்போது எங்கள் dapp உடன் இணைக்கப்பட்டுள்ள MetaMask முகவரிகளைக் கொண்ட ஒரு அரேயை வெறுமனே வழங்குகிறது.

இந்த ஃபங்ஷன் செயல்படுவதைக் காண, எங்கள் `HelloWorld.js` காம்போனென்ட்டின் `useEffect` ஃபங்ஷனில் அதை அழைப்போம்:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

கவனிக்கவும், எங்கள் `walletAddress` மற்றும் `status` state மாறிகளைப் புதுப்பிக்க `getCurrentWalletConnected`-க்கான எங்கள் அழைப்பின் பதிலைப் பயன்படுத்துகிறோம்.

இப்போது நீங்கள் இந்தக் குறியீட்டைச் சேர்த்துள்ளதால், எங்கள் உலாவி சாளரத்தைப் புதுப்பிக்க முயற்சிப்போம்.

அருமை! பட்டன் நீங்கள் இணைக்கப்பட்டுள்ளீர்கள் என்று கூற வேண்டும், மேலும் நீங்கள் புதுப்பித்த பிறகும் - உங்கள் இணைக்கப்பட்ட வாலட்டின் முகவரியின் முன்னோட்டத்தைக் காட்ட வேண்டும்!

#### `addWalletListener`-ஐச் செயல்படுத்துதல் {#implement-addwalletlistener}

எங்கள் dapp வாலட் அமைப்பில் இறுதிப் படியாக வாலட் லிசன்னரைச் செயல்படுத்துவதாகும், இதனால் பயனர் கணக்குகளைத் துண்டிக்கும்போது அல்லது மாற்றும்போது போன்ற எங்கள் வாலட்டின் நிலை மாறும்போது எங்கள் UI புதுப்பிக்கப்படும்.

உங்கள் `HelloWorld.js` கோப்பில், உங்கள் `addWalletListener` ஃபங்ஷனைப் பின்வருமாறு மாற்றவும்:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

இந்தக் கட்டத்தில் இங்கே என்ன நடக்கிறது என்பதைப் புரிந்துகொள்ள உங்களுக்கு எங்கள் உதவி கூடத் தேவையில்லை என்று நான் பந்தயம் கட்டுகிறேன், ஆனால் முழுமைக்காக, அதை விரைவாகப் பார்ப்போம்:

- முதலில், எங்கள் ஃபங்ஷன் `window.ethereum` இயக்கப்பட்டிருக்கிறதா (அதாவது, MetaMask நிறுவப்பட்டுள்ளதா) என்பதைச் சரிபார்க்கிறது.
  - இல்லையென்றால், MetaMask-ஐ நிறுவ பயனரைத் தூண்டும் ஒரு JSX ஸ்ட்ரிங்கிற்கு எங்கள் `status` state மாறியை வெறுமனே அமைக்கிறோம்.
  - அது இயக்கப்பட்டிருந்தால், வரி 3-இல் `window.ethereum.on("accountsChanged")` என்ற லிசன்னரை அமைக்கிறோம், இது MetaMask வாலட்டில் ஏற்படும் நிலை மாற்றங்களைக் கண்காணிக்கிறது, இதில் பயனர் dapp உடன் கூடுதல் கணக்கை இணைக்கும்போது, கணக்குகளை மாற்றும்போது அல்லது கணக்கைத் துண்டிக்கும்போது ஆகியவை அடங்கும். குறைந்தது ஒரு கணக்காவது இணைக்கப்பட்டிருந்தால், லிசன்னரால் வழங்கப்பட்ட `accounts` அரேயில் முதல் கணக்காக `walletAddress` state மாறி புதுப்பிக்கப்படும். இல்லையெனில், `walletAddress` ஒரு வெற்று ஸ்ட்ரிங்காக அமைக்கப்படும்.

கடைசியாக, அதை எங்கள் `useEffect` ஃபங்ஷனில் அழைக்க வேண்டும்:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

அவ்வளவுதான்! எங்கள் வாலட் செயல்பாடுகள் அனைத்தையும் நிரல் செய்வதை வெற்றிகரமாக முடித்துவிட்டோம்! இப்போது எங்கள் கடைசிப் பணிக்கு: எங்கள் ஸ்மார்ட் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியைப் புதுப்பித்தல்!

### படி 6: `updateMessage` ஃபங்ஷனைச் செயல்படுத்துதல் {#step-6-implement-the-updateMessage-function}

சரி நண்பர்களே, நாங்கள் இறுதி கட்டத்தை அடைந்துவிட்டோம்! உங்கள் `interact.js` கோப்பின் `updateMessage`-இல், நாங்கள் பின்வருவனவற்றைச் செய்யப் போகிறோம்:

1. எங்கள் ஸ்மார்ட் ஒப்பந்தத்தில் நாங்கள் வெளியிட விரும்பும் செய்தி செல்லுபடியாகும் என்பதை உறுதிசெய்தல்
2. MetaMask-ஐப் பயன்படுத்தி எங்கள் பரிவர்த்தனையில் கையொப்பமிடுதல்
3. எங்கள் `HelloWorld.js` முன்பக்க காம்போனென்ட்டிலிருந்து இந்த ஃபங்ஷனை அழைத்தல்

இதற்கு அதிக நேரம் ஆகாது; இந்த dapp-ஐ முடிப்போம்!

#### உள்ளீட்டுப் பிழையைக் கையாளுதல் {#input-error-handling}

இயற்கையாகவே, ஃபங்ஷனின் தொடக்கத்தில் ஒருவித உள்ளீட்டுப் பிழையைக் கையாளுவது அர்த்தமுள்ளதாக இருக்கும்.

MetaMask நீட்டிப்பு நிறுவப்படவில்லை என்றால், வாலட் இணைக்கப்படவில்லை என்றால் (அதாவது, அனுப்பப்பட்ட `address` ஒரு வெற்று ஸ்ட்ரிங்), அல்லது `message` ஒரு வெற்று ஸ்ட்ரிங் என்றால் எங்கள் ஃபங்ஷன் முன்கூட்டியே திரும்ப வேண்டும் என்று நாங்கள் விரும்புவோம். `updateMessage`-க்கு பின்வரும் பிழையைக் கையாளுதலைச் சேர்ப்போம்:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

இப்போது சரியான உள்ளீட்டுப் பிழையைக் கையாளுதல் உள்ளதால், MetaMask வழியாகப் பரிவர்த்தனையில் கையொப்பமிடுவதற்கான நேரம் இது!

#### எங்கள் பரிவர்த்தனையில் கையொப்பமிடுதல் {#signing-our-transaction}

பாரம்பரிய web3 Ethereum பரிவர்த்தனைகளில் நீங்கள் ஏற்கனவே வசதியாக இருந்தால், நாங்கள் அடுத்து எழுதும் குறியீடு மிகவும் பரிச்சயமானதாக இருக்கும். உங்கள் உள்ளீட்டுப் பிழையைக் கையாளும் குறியீட்டிற்குக் கீழே, `updateMessage`-க்கு பின்வருவனவற்றைச் சேர்க்கவும்:

```javascript
// interact.js

// பரிவர்த்தனை அளவுருக்களை (parameters) அமைக்கவும்
const transactionParameters = {
  to: contractAddress, // ஒப்பந்த வெளியீடுகளின் போது தவிர மற்ற நேரங்களில் தேவை.
  from: address, // பயனரின் செயலில் உள்ள முகவரியுடன் பொருந்த வேண்டும்.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

// பரிவர்த்தனையில் கையொப்பமிடவும்
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

என்ன நடக்கிறது என்பதைப் பார்ப்போம். முதலில், எங்கள் பரிவர்த்தனை அளவுருக்களை அமைக்கிறோம், அங்கு:

- `to` பெறுநரின் முகவரியைக் குறிப்பிடுகிறது (எங்கள் ஸ்மார்ட் ஒப்பந்தம்)
- `from` பரிவர்த்தனையில் கையொப்பமிடுபவரைக் குறிப்பிடுகிறது, எங்கள் ஃபங்ஷனுக்கு நாங்கள் அனுப்பிய `address` மாறி
- `data` எங்கள் Hello World ஸ்மார்ட் ஒப்பந்தத்தின் `update` முறைக்கான அழைப்பைக் கொண்டுள்ளது, எங்கள் `message` ஸ்ட்ரிங் மாறியை உள்ளீடாகப் பெறுகிறது

பின்னர், நாங்கள் ஒரு await அழைப்பை மேற்கொள்கிறோம், `window.ethereum.request`, அங்கு பரிவர்த்தனையில் கையொப்பமிட MetaMask-ஐக் கேட்கிறோம். கவனிக்கவும், வரிகள் 11 மற்றும் 12-இல், எங்கள் eth முறையான `eth_sendTransaction`-ஐக் குறிப்பிட்டு எங்கள் `transactionParameters`-ஐ அனுப்புகிறோம்.

இந்தக் கட்டத்தில், உலாவியில் MetaMask திறக்கப்படும், மேலும் பரிவர்த்தனையில் கையொப்பமிட அல்லது நிராகரிக்க பயனரைத் தூண்டும்.

- பரிவர்த்தனை வெற்றிகரமாக இருந்தால், ஃபங்ஷன் ஒரு JSON ஆப்ஜெக்ட்டை வழங்கும், அங்கு `status` JSX ஸ்ட்ரிங் பயனரின் பரிவர்த்தனை பற்றிய கூடுதல் தகவலுக்கு Etherscan-ஐச் சரிபார்க்க பயனரைத் தூண்டுகிறது.
- பரிவர்த்தனை தோல்வியுற்றால், ஃபங்ஷன் ஒரு JSON ஆப்ஜெக்ட்டை வழங்கும், அங்கு `status` ஸ்ட்ரிங் பிழைச் செய்தியைத் தெரிவிக்கிறது.

ஒட்டுமொத்தமாக, எங்கள் `updateMessage` ஃபங்ஷன் இப்படி இருக்க வேண்டும்:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  // உள்ளீட்டு பிழை கையாளுதல்
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  // பரிவர்த்தனை அளவுருக்களை (parameters) அமைக்கவும்
  const transactionParameters = {
    to: contractAddress, // ஒப்பந்த வெளியீடுகளின் போது தவிர மற்ற நேரங்களில் தேவை.
    from: address, // பயனரின் செயலில் உள்ள முகவரியுடன் பொருந்த வேண்டும்.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  // பரிவர்த்தனையில் கையொப்பமிடவும்
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

கடைசியாக, எங்கள் `updateMessage` ஃபங்ஷனை எங்கள் `HelloWorld.js` காம்போனென்ட்டுடன் இணைக்க வேண்டும்.

#### `updateMessage`-ஐ `HelloWorld.js` முன்பக்கத்துடன் இணைத்தல் {#connect-updatemessage-to-the-helloworld-js-frontend}

எங்கள் `onUpdatePressed` ஃபங்ஷன் இம்போர்ட் செய்யப்பட்ட `updateMessage` ஃபங்ஷனுக்கு ஒரு await அழைப்பை மேற்கொள்ள வேண்டும் மற்றும் எங்கள் பரிவர்த்தனை வெற்றிபெற்றதா அல்லது தோல்வியுற்றதா என்பதைப் பிரதிபலிக்க `status` state மாறியை மாற்ற வேண்டும்:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

இது மிகவும் சுத்தமாகவும் எளிமையாகவும் உள்ளது. மேலும் என்னவென்று யூகியுங்கள்... உங்கள் DAPP முடிந்தது!!!

முன்னோக்கிச் சென்று **Update** பட்டனைச் சோதிக்கவும்!

### உங்கள் சொந்த தனிப்பயன் dapp-ஐ உருவாக்குதல் {#make-your-own-custom-dapp}

வாவ், நீங்கள் வழிகாட்டியின் முடிவை அடைந்துவிட்டீர்கள்! சுருக்கமாகச் சொன்னால், நீங்கள் பின்வருவனவற்றை எப்படிச் செய்வது என்று கற்றுக்கொண்டீர்கள்:

- உங்கள் dapp திட்டத்துடன் MetaMask வாலட்டை இணைப்பது
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API-ஐப் பயன்படுத்தி உங்கள் ஸ்மார்ட் ஒப்பந்தத்திலிருந்து தரவைப் படிப்பது
- MetaMask-ஐப் பயன்படுத்தி Ethereum பரிவர்த்தனைகளில் கையொப்பமிடுவது

இப்போது உங்கள் சொந்த தனிப்பயன் dapp திட்டத்தை உருவாக்க இந்த வழிகாட்டியிலிருந்து திறன்களைப் பயன்படுத்த நீங்கள் முழுமையாகத் தயாராகிவிட்டீர்கள்! எப்போதும் போல, உங்களுக்கு ஏதேனும் கேள்விகள் இருந்தால், உதவிக்கு [Alchemy Discord](https://discord.gg/gWuC7zB)-இல் எங்களைத் தொடர்புகொள்ளத் தயங்க வேண்டாம். 🧙‍♂️

இந்த வழிகாட்டியை நீங்கள் முடித்தவுடன், உங்கள் அனுபவம் எப்படி இருந்தது அல்லது உங்களுக்கு ஏதேனும் கருத்துகள் இருந்தால் Twitter-இல் [@alchemyplatform](https://twitter.com/AlchemyPlatform) என்று எங்களைக் குறியிட்டு எங்களுக்குத் தெரியப்படுத்துங்கள்!
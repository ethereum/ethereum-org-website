---
title: "தொடக்கநிலையாளர்களுக்கான Hello World திறன் ஒப்பந்தம் - முழு அடுக்கு (Fullstack)"
description: "எத்திரியத்தில் ஒரு எளிய திறன் ஒப்பந்தத்தை எழுதி நிலைநிறுத்துவது குறித்த அறிமுகப் பயிற்சி."
author: "nstrike2"
breadcrumb: "Hello World முழு அடுக்கு (fullstack)"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "திறன் ஒப்பந்தங்கள்",
    "நிலைநிறுத்துதல்",
    "தொகுதி உலாவி",
    "முன்பக்கம்",
    "பரிவர்த்தனைகள்",
    "கட்டமைப்பு",
  ]
skill: beginner
lang: ta
published: 2021-10-25
---

நீங்கள் தொகுதிச்சங்கிலி மேம்பாட்டிற்குப் புதியவராக இருந்து, எங்கிருந்து தொடங்குவது அல்லது திறன் ஒப்பந்தங்களை எவ்வாறு நிலைநிறுத்துவது மற்றும் அவற்றுடன் தொடர்புகொள்வது என்று தெரியவில்லை என்றால், இந்த வழிகாட்டி உங்களுக்கானது. [மெட்டாமேஸ்க்](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) மற்றும் [Alchemy](https://alchemy.com/eth) ஆகியவற்றைப் பயன்படுத்தி கோர்லி சோதனை வலையமைப்பில் ஒரு எளிய திறன் ஒப்பந்தத்தை உருவாக்கி நிலைநிறுத்துவது குறித்து நாங்கள் வழிகாட்டுவோம்.

இந்தப் பயிற்சியை முடிக்க உங்களுக்கு ஒரு Alchemy கணக்கு தேவைப்படும். [இலவசக் கணக்கிற்குப் பதிவு செய்யவும்](https://www.alchemy.com/).

எந்த நேரத்திலும் உங்களுக்குக் கேள்விகள் இருந்தால், [Alchemy டிஸ்கார்ட்](https://discord.gg/gWuC7zB)-இல் தயங்காமல் தொடர்புகொள்ளவும்!

## பகுதி 1 - Hardhat ஐப் பயன்படுத்தி உங்கள் திறன் ஒப்பந்தத்தை உருவாக்கி நிலைநிறுத்துங்கள் {#part-1}

### எத்திரியம் பிணையத்துடன் இணைக்கவும் {#connect-to-the-ethereum-network}

எத்திரியம் சங்கிலிக்கு கோரிக்கைகளைச் செய்ய பல வழிகள் உள்ளன. எளிமைக்காக, தொகுதிச்சங்கிலி டெவலப்பர் தளமான மற்றும் API ஆன Alchemy-யில் ஒரு இலவச கணக்கைப் பயன்படுத்துவோம், இது நாமே ஒரு கணுவை இயக்காமல் எத்திரியம் சங்கிலியுடன் தொடர்பு கொள்ள அனுமதிக்கிறது. Alchemy கண்காணிப்பு மற்றும் பகுப்பாய்விற்கான டெவலப்பர் கருவிகளையும் கொண்டுள்ளது; நமது திறன் ஒப்பந்த நிலைநிறுத்தத்தில் தொழில்நுட்ப ரீதியாக என்ன நடக்கிறது என்பதைப் புரிந்துகொள்ள இந்த டுடோரியலில் இவற்றைப் பயன்படுத்திக் கொள்வோம்.

### உங்கள் செயலி மற்றும் API திறவுகோலை உருவாக்கவும் {#create-your-app-and-api-key}

நீங்கள் ஒரு Alchemy கணக்கை உருவாக்கியவுடன், ஒரு செயலியை உருவாக்குவதன் மூலம் API திறவுகோலை உருவாக்கலாம். இது கோர்லி சோதனை வலையமைப்புக்கு கோரிக்கைகளைச் செய்ய உங்களை அனுமதிக்கும். சோதனை வலையமைப்புகளைப் பற்றி உங்களுக்குத் தெரியாவிட்டால், [பிணையத்தைத் தேர்ந்தெடுப்பதற்கான Alchemy-யின் வழிகாட்டியைப் படிக்கலாம்](https://www.alchemy.com/docs/choosing-a-web3-network).

Alchemy டாஷ்போர்டில், வழிசெலுத்தல் பட்டியில் உள்ள **Apps** கீழ்தோன்றும் மெனுவைக் கண்டறிந்து, **Create App** என்பதைக் கிளிக் செய்யவும்.

![Hello world create app](./hello-world-create-app.png)

உங்கள் செயலிக்கு '_Hello World_' என்று பெயரிட்டு, ஒரு சிறிய விளக்கத்தை எழுதவும். உங்கள் சூழலாக **Staging** என்பதையும், உங்கள் பிணையமாக **Goerli** என்பதையும் தேர்ந்தெடுக்கவும்.

![create app view hello world](./create-app-view-hello-world.png)

_குறிப்பு: **Goerli** என்பதைத் தேர்ந்தெடுப்பதை உறுதிசெய்யவும், இல்லையெனில் இந்த டுடோரியல் வேலை செய்யாது._

**Create app** என்பதைக் கிளிக் செய்யவும். உங்கள் செயலி கீழே உள்ள அட்டவணையில் தோன்றும்.

### ஒரு எத்திரியம் கணக்கை உருவாக்கவும் {#create-an-ethereum-account}

பரிவர்த்தனைகளை அனுப்பவும் பெறவும் உங்களுக்கு ஒரு எத்திரியம் கணக்கு தேவை. பயனர்கள் தங்கள் எத்திரியம் கணக்கு முகவரியை நிர்வகிக்க அனுமதிக்கும் உலாவியில் உள்ள மெய்நிகர் பணப்பையான மெட்டாமேஸ்க்-ஐப் பயன்படுத்துவோம்.

நீங்கள் [இங்கே](https://metamask.io/download) இலவசமாக மெட்டாமேஸ்க் கணக்கைப் பதிவிறக்கம் செய்து உருவாக்கலாம். நீங்கள் ஒரு கணக்கை உருவாக்கும்போது, அல்லது உங்களிடம் ஏற்கனவே கணக்கு இருந்தால், மேல் வலதுபுறத்தில் உள்ள “Goerli Test Network”-க்கு மாறுவதை உறுதிசெய்யவும் (இதனால் நாம் உண்மையான பணத்தைக் கையாள மாட்டோம்).

### படி 4: ஒரு பாசெட்டிலிருந்து ஈதரைச் சேர்க்கவும் {#step-4-add-ether-from-a-faucet}

உங்கள் திறன் ஒப்பந்தத்தை சோதனை வலையமைப்பில் நிலைநிறுத்த, உங்களுக்கு சில போலி ETH தேவைப்படும். கோர்லி பிணையத்தில் ETH-ஐப் பெற, ஒரு கோர்லி பாசெட்டிற்குச் சென்று உங்கள் கோர்லி கணக்கு முகவரியை உள்ளிடவும். சமீபத்தில் கோர்லி பாசெட்கள் சற்று நம்பகத்தன்மையற்றதாக இருக்கலாம் என்பதை நினைவில் கொள்ளவும் - முயற்சிக்க வேண்டிய விருப்பங்களின் பட்டியலுக்கு [சோதனை வலையமைப்புகள் பக்கத்தைப்](/developers/docs/networks/#goerli) பார்க்கவும்:

_குறிப்பு: பிணைய நெரிசல் காரணமாக, இதற்கு சிறிது நேரம் ஆகலாம்._
``

### படி 5: உங்கள் இருப்பைச் சரிபார்க்கவும்

உங்கள் பணப்பையில் ETH இருப்பதை உறுதிசெய்ய, [Alchemy-யின் சாண்ட்பாக்ஸ் கருவியைப்](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) பயன்படுத்தி [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) கோரிக்கையைச் செய்வோம். இது நமது பணப்பையில் உள்ள ETH-இன் அளவை வழங்கும். மேலும் அறிய, [கம்போசர் கருவியை எவ்வாறு பயன்படுத்துவது என்பது குறித்த Alchemy-யின் சிறிய டுடோரியலைப்](https://youtu.be/r6sjRxBZJuU) பார்க்கவும்.

உங்கள் மெட்டாமேஸ்க் கணக்கு முகவரியை உள்ளிட்டு, **Send Request** என்பதைக் கிளிக் செய்யவும். கீழே உள்ள குறியீட்டுத் துணுக்கைப் போன்ற ஒரு பதிலை நீங்கள் காண்பீர்கள்.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _குறிப்பு: இந்த முடிவு wei-யில் உள்ளது, ETH-இல் அல்ல. ஈதரின் மிகச்சிறிய மதிப்பாக wei பயன்படுத்தப்படுகிறது._

அப்பாடா! நமது போலிப் பணம் அனைத்தும் அங்கேயே உள்ளது.
### படி 6: நமது திட்டத்தைத் துவக்கவும்

முதலில், நமது திட்டத்திற்காக ஒரு கோப்புறையை உருவாக்க வேண்டும். உங்கள் கட்டளை வரிக்குச் சென்று பின்வருவனவற்றை உள்ளிடவும்.

```
mkdir hello-world
cd hello-world
```

இப்போது நாம் நமது திட்டக் கோப்புறைக்குள் இருப்பதால், திட்டத்தைத் துவக்க `npm init` ஐப் பயன்படுத்துவோம்.

> உங்களிடம் இன்னும் npm நிறுவப்படவில்லை என்றால், Node.js மற்றும் npm ஐ நிறுவ [Node.js நிறுவல் வழிமுறைகளைப்](https://nodejs.org/en/download/) பின்பற்றவும்.

இந்த டுடோரியலின் நோக்கத்திற்காக, துவக்கக் கேள்விகளுக்கு நீங்கள் எவ்வாறு பதிலளிக்கிறீர்கள் என்பது முக்கியமல்ல. குறிப்புக்காக நாங்கள் அதை எவ்வாறு செய்தோம் என்பது இங்கே:

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

package.json ஐ அங்கீகரிக்கவும், நாம் தொடங்குவதற்குத் தயாராகிவிட்டோம்!
### படி 7: Hardhat-ஐப் பதிவிறக்கவும் {#step-7-download-hardhat}

Hardhat என்பது உங்கள் எத்திரியம் மென்பொருளைத் தொகுக்க, நிலைநிறுத்த, சோதிக்க மற்றும் பிழைத்திருத்தம் செய்வதற்கான ஒரு மேம்பாட்டுச் சூழலாகும். நேரடி சங்கிலியில் நிலைநிறுத்துவதற்கு முன்பு, திறன் ஒப்பந்தங்கள் மற்றும் பரவலாக்கப்பட்ட செயலிகளை (dapps) உள்ளூரில் உருவாக்கும்போது இது டெவலப்பர்களுக்கு உதவுகிறது.

நமது `hello-world` திட்டத்திற்குள் இதை இயக்கவும்:

```
npm install --save-dev hardhat
```

[நிறுவல் வழிமுறைகள்](https://hardhat.org/getting-started/#overview) குறித்த கூடுதல் விவரங்களுக்கு இந்தப் பக்கத்தைப் பார்க்கவும்.

### படி 8: Hardhat திட்டத்தை உருவாக்கவும் {#step-8-create-hardhat-project}

நமது `hello-world` திட்டக் கோப்புறைக்குள், இதை இயக்கவும்:

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

இது திட்டத்தில் ஒரு `hardhat.config.js` கோப்பை உருவாக்கும். நமது திட்டத்திற்கான அமைப்பைக் குறிப்பிட டுடோரியலில் பின்னர் இதைப் பயன்படுத்துவோம்.

### படி 9: திட்டக் கோப்புறைகளைச் சேர்க்கவும் {#step-9-add-project-folders}

திட்டத்தை ஒழுங்கமைக்க, இரண்டு புதிய கோப்புறைகளை உருவாக்குவோம். கட்டளை வரியில், உங்கள் `hello-world` திட்டத்தின் மூலக் கோப்பகத்திற்குச் சென்று தட்டச்சு செய்யவும்:

```
mkdir contracts
mkdir scripts
```

- `contracts/` என்பது நமது hello world திறன் ஒப்பந்தக் குறியீட்டுக் கோப்பை வைத்திருக்கும் இடமாகும்
- `scripts/` என்பது நமது ஒப்பந்தத்தை நிலைநிறுத்தவும் அதனுடன் தொடர்பு கொள்ளவுமான ஸ்கிரிப்ட்களை வைத்திருக்கும் இடமாகும்

### படி 10: நமது ஒப்பந்தத்தை எழுதவும் {#step-10-write-our-contract}

நாம் எப்போது குறியீட்டை எழுதப் போகிறோம் என்று நீங்கள் உங்களைக் கேட்டுக்கொள்ளலாம்? அதற்கான நேரம் வந்துவிட்டது!

உங்களுக்குப் பிடித்த எடிட்டரில் hello-world திட்டத்தைத் திறக்கவும். திறன் ஒப்பந்தங்கள் பொதுவாக Solidity-யில் எழுதப்படுகின்றன, நமது திறன் ஒப்பந்தத்தை எழுத நாம் அதையே பயன்படுத்துவோம்.‌

1. `contracts` கோப்புறைக்குச் சென்று `HelloWorld.sol` என்ற புதிய கோப்பை உருவாக்கவும்
2. இந்த டுடோரியலுக்கு நாம் பயன்படுத்தப் போகும் ஒரு மாதிரி Hello World திறன் ஒப்பந்தம் கீழே உள்ளது. கீழே உள்ள உள்ளடக்கங்களை `HelloWorld.sol` கோப்பில் நகலெடுக்கவும்.

_குறிப்பு: இந்த ஒப்பந்தம் என்ன செய்கிறது என்பதைப் புரிந்துகொள்ள கருத்துகளைப் (comments) படிக்க மறக்காதீர்கள்._

```
// சொற்பொருள் பதிப்பைப் பயன்படுத்தி, Solidity-யின் பதிப்பைக் குறிப்பிடுகிறது.
// மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// `HelloWorld` என்ற பெயரிலான ஒப்பந்தத்தை வரையறுக்கிறது.
// ஒப்பந்தம் என்பது செயல்பாடுகள் மற்றும் தரவுகளின் (அதன் நிலை) தொகுப்பாகும். நிலைநிறுத்தப்பட்டவுடன், ஒரு ஒப்பந்தம் எத்திரியம் தொகுதிச்சங்கிலியில் ஒரு குறிப்பிட்ட முகவரியில் இருக்கும். மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //update செயல்பாடு அழைக்கப்படும்போது வெளியிடப்படும்
   //திறன் ஒப்பந்த நிகழ்வுகள் (events) என்பது தொகுதிச்சங்கிலியில் ஏதோ நடந்துள்ளது என்பதை உங்கள் செயலியின் முன்பக்கத்திற்குத் தொடர்புகொள்வதற்கான ஒரு வழியாகும், இது சில நிகழ்வுகளுக்காக 'காத்திருக்கலாம்' மற்றும் அவை நிகழும்போது நடவடிக்கை எடுக்கலாம்.
   event UpdatedMessages(string oldStr, string newStr);

   // `string` வகையிலான `message` என்ற நிலை மாறியை அறிவிக்கிறது.
   // நிலை மாறிகள் என்பவை ஒப்பந்த சேமிப்பகத்தில் நிரந்தரமாகச் சேமிக்கப்படும் மதிப்புகளைக் கொண்ட மாறிகளாகும். `public` என்ற முக்கியச்சொல் மாறிகளை ஒப்பந்தத்திற்கு வெளியிலிருந்து அணுகக்கூடியதாக ஆக்குகிறது மற்றும் பிற ஒப்பந்தங்கள் அல்லது கிளையண்ட்கள் மதிப்பை அணுக அழைக்கக்கூடிய ஒரு செயல்பாட்டை உருவாக்குகிறது.
   string public message;

   // பல வகுப்பு அடிப்படையிலான பொருள் சார்ந்த மொழிகளைப் போலவே, கன்ஸ்ட்ரக்டர் (constructor) என்பது ஒப்பந்தம் உருவாக்கப்படும்போது மட்டுமே செயல்படுத்தப்படும் ஒரு சிறப்புச் செயல்பாடாகும்.
   // ஒப்பந்தத்தின் தரவைத் தொடங்க கன்ஸ்ட்ரக்டர்கள் பயன்படுத்தப்படுகின்றன. மேலும் அறிய:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // `initMessage` என்ற சரம் (string) வாதத்தை ஏற்றுக்கொண்டு, ஒப்பந்தத்தின் `message` சேமிப்பக மாறியில் மதிப்பை அமைக்கிறது).
      message = initMessage;
   }

   // ஒரு சரம் வாதத்தை ஏற்றுக்கொண்டு `message` சேமிப்பக மாறியைப் புதுப்பிக்கும் ஒரு பொதுச் செயல்பாடு.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

இது உருவாக்கப்படும்போது ஒரு செய்தியைச் சேமிக்கும் ஒரு அடிப்படைத் திறன் ஒப்பந்தமாகும். `update` செயல்பாட்டை அழைப்பதன் மூலம் இதைப் புதுப்பிக்கலாம்.

### படி 11: மெட்டாமேஸ்க் மற்றும் Alchemy-ஐ உங்கள் திட்டத்துடன் இணைக்கவும் {#step-11-connect-metamask-alchemy-to-your-project}

நாம் ஒரு மெட்டாமேஸ்க் பணப்பை, Alchemy கணக்கு ஆகியவற்றை உருவாக்கி, நமது திறன் ஒப்பந்தத்தையும் எழுதியுள்ளோம், இப்போது மூன்றையும் இணைக்க வேண்டிய நேரம் வந்துவிட்டது.

உங்கள் பணப்பையிலிருந்து அனுப்பப்படும் ஒவ்வொரு பரிவர்த்தனைக்கும் உங்களின் தனித்துவமான தனிப்பட்ட திறவுகோலைப் பயன்படுத்தி ஒரு கையொப்பம் தேவை. நமது நிரலுக்கு இந்த அனுமதியை வழங்க, நமது தனிப்பட்ட திறவுகோலை ஒரு சூழல் கோப்பில் (environment file) பாதுகாப்பாகச் சேமிக்கலாம். Alchemy-க்கான API திறவுகோலையும் இங்கே சேமிப்போம்.

> பரிவர்த்தனைகளை அனுப்புவது பற்றி மேலும் அறிய, Web3-ஐப் பயன்படுத்தி பரிவர்த்தனைகளை அனுப்புவது குறித்த [இந்த டுடோரியலைப்](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) பார்க்கவும்.

முதலில், உங்கள் திட்டக் கோப்பகத்தில் dotenv தொகுப்பை நிறுவவும்:

```
npm install dotenv --save
```

பின்னர், திட்டத்தின் மூலக் கோப்பகத்தில் ஒரு `.env` கோப்பை உருவாக்கவும். அதில் உங்கள் மெட்டாமேஸ்க் தனிப்பட்ட திறவுகோல் மற்றும் HTTP Alchemy API URL-ஐச் சேர்க்கவும்.

உங்கள் சூழல் கோப்பிற்கு `.env` என்று பெயரிடப்பட வேண்டும், இல்லையெனில் அது ஒரு சூழல் கோப்பாக அங்கீகரிக்கப்படாது.

அதற்கு `process.env` அல்லது `.env-custom` அல்லது வேறு எந்தப் பெயரையும் சூட்ட வேண்டாம்.

- உங்கள் தனிப்பட்ட திறவுகோலை ஏற்றுமதி செய்ய [இந்த வழிமுறைகளைப்](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) பின்பற்றவும்
- HTTP Alchemy API URL-ஐப் பெற கீழே பார்க்கவும்

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

உங்கள் `.env` இதுபோன்று இருக்க வேண்டும்:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

இவற்றை நமது குறியீட்டுடன் உண்மையில் இணைக்க, படி 13-ல் உள்ள நமது `hardhat.config.js` கோப்பில் இந்த மாறிகளைக் குறிப்பிடுவோம்.

### படி 12: Ethers.js-ஐ நிறுவவும் {#step-12-install-ethersjs}

Ethers.js என்பது [நிலையான JSON-RPC முறைகளை](/developers/docs/apis/json-rpc/) அதிக பயனர் நட்பு முறைகளுடன் மூடுவதன் மூலம் எத்திரியத்துடன் தொடர்புகொள்வதையும் கோரிக்கைகளைச் செய்வதையும் எளிதாக்கும் ஒரு நூலகமாகும்.

கூடுதல் கருவிகள் மற்றும் நீட்டிக்கப்பட்ட செயல்பாட்டிற்கான [செருகுநிரல்களை (plugins)](https://hardhat.org/plugins/) ஒருங்கிணைக்க Hardhat நம்மை அனுமதிக்கிறது. ஒப்பந்த நிலைநிறுத்தத்திற்காக [Ethers செருகுநிரலை](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) நாம் பயன்படுத்திக் கொள்வோம்.

உங்கள் திட்டக் கோப்பகத்தில் தட்டச்சு செய்யவும்:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### படி 13: hardhat.config.js-ஐப் புதுப்பிக்கவும் {#step-13-update-hardhat-configjs}

இதுவரை நாம் பல சார்புகளையும் (dependencies) செருகுநிரல்களையும் சேர்த்துள்ளோம், இப்போது நமது திட்டத்திற்கு அவை அனைத்தையும் பற்றித் தெரியப்படுத்த `hardhat.config.js` ஐப் புதுப்பிக்க வேண்டும்.

உங்கள் `hardhat.config.js` ஐ இதுபோன்று புதுப்பிக்கவும்:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

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

கட்டளை வரியிலிருந்து இயக்கவும்:

```bash
npx hardhat compile
```

உங்களுக்கு `SPDX license identifier not provided in source file` பற்றிய எச்சரிக்கை வரலாம், ஆனால் அதைப் பற்றி கவலைப்படத் தேவையில்லை — மற்ற அனைத்தும் நன்றாக இருக்கும் என்று நம்புகிறோம்! இல்லையெனில், நீங்கள் எப்போதும் [Alchemy டிஸ்கார்ட்டில்](https://discord.gg/u72VCg3) செய்தி அனுப்பலாம்.

### படி 15: நமது நிலைநிறுத்த ஸ்கிரிப்டை எழுதவும் {#step-15-write-our-deploy-script}

இப்போது நமது ஒப்பந்தம் எழுதப்பட்டு, நமது உள்ளமைவுக் கோப்பு தயாராக உள்ளதால், நமது ஒப்பந்த நிலைநிறுத்த ஸ்கிரிப்டை எழுத வேண்டிய நேரம் வந்துவிட்டது.

`scripts/` கோப்புறைக்குச் சென்று `deploy.js` என்ற புதிய கோப்பை உருவாக்கி, அதில் பின்வரும் உள்ளடக்கங்களைச் சேர்க்கவும்:

```javascript
async function main() {
  const HelloWorld = await ethers.getஒப்பந்தம்Factory("HelloWorld")

  // நிலைநிறுத்தத்தைத் தொடங்கவும், இது ஒரு ஒப்பந்தப் பொருளாகத் தீர்க்கப்படும் ஒரு promise-ஐ வழங்கும்
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

இந்தக் குறியீட்டின் ஒவ்வொரு வரியும் என்ன செய்கிறது என்பதை Hardhat அவர்களின் [ஒப்பந்தங்கள் டுடோரியலில்](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) மிகச் சிறப்பாக விளக்குகிறது, அவர்களின் விளக்கங்களை நாங்கள் இங்கே ஏற்றுக்கொண்டுள்ளோம்.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js-ல் உள்ள `ContractFactory` என்பது புதிய திறன் ஒப்பந்தங்களை நிலைநிறுத்தப் பயன்படுத்தப்படும் ஒரு சுருக்கமாகும் (abstraction), எனவே இங்குள்ள `HelloWorld` என்பது நமது hello world ஒப்பந்தத்தின் நிகழ்வுகளுக்கான (instances) ஒரு [தொழிற்சாலையாகும் (factory)](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>). `hardhat-ethers` செருகுநிரலான `ContractFactory` மற்றும் `Contract` ஆகியவற்றைப் பயன்படுத்தும்போது, நிகழ்வுகள் இயல்பாகவே முதல் கையொப்பமிடுபவருடன் (உரிமையாளர்) இணைக்கப்படும்.

```javascript
const hello_world = await HelloWorld.deploy()
```

ஒரு `ContractFactory`-ல் `deploy()` ஐ அழைப்பது நிலைநிறுத்தத்தைத் தொடங்கும், மேலும் ஒரு `Contract` பொருளாகத் தீர்க்கப்படும் ஒரு `Promise` ஐ வழங்கும். இதுவே நமது திறன் ஒப்பந்தச் செயல்பாடுகள் ஒவ்வொன்றிற்கும் ஒரு முறையைக் கொண்ட பொருளாகும்.

### படி 16: நமது ஒப்பந்தத்தை நிலைநிறுத்தவும் {#step-16-deploy-our-contract}

இறுதியாக நமது திறன் ஒப்பந்தத்தை நிலைநிறுத்த நாம் தயாராகிவிட்டோம்! கட்டளை வரிக்குச் சென்று இயக்கவும்:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

நீங்கள் இதுபோன்று ஒன்றைக் காண்பீர்கள்:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**தயவுசெய்து இந்த முகவரியைச் சேமிக்கவும்**. டுடோரியலில் பின்னர் இதைப் பயன்படுத்துவோம்.

நாம் [கோர்லி Etherscan](https://goerli.etherscan.io)-க்குச் சென்று நமது ஒப்பந்த முகவரியைத் தேடினால், அது வெற்றிகரமாக நிலைநிறுத்தப்பட்டிருப்பதைக் காண முடியும். பரிவர்த்தனை இதுபோன்று இருக்கும்:

![](./etherscan-contract.png)

`From` முகவரி உங்கள் மெட்டாமேஸ்க் கணக்கு முகவரியுடன் பொருந்த வேண்டும் மற்றும் `To` முகவரி **Contract Creation** என்று கூறும். நாம் பரிவர்த்தனையைக் கிளிக் செய்தால், `To` புலத்தில் நமது ஒப்பந்த முகவரியைக் காண்போம்.

![](./etherscan-transaction.png)

வாழ்த்துகள்! நீங்கள் இப்போதுதான் ஒரு எத்திரியம் சோதனை வலையமைப்பில் ஒரு திறன் ஒப்பந்தத்தை நிலைநிறுத்தியுள்ளீர்கள்.

தொழில்நுட்ப ரீதியாக என்ன நடக்கிறது என்பதைப் புரிந்துகொள்ள, நமது [Alchemy டாஷ்போர்டில்](https://dashboard.alchemy.com/explorer) உள்ள Explorer தாவலுக்குச் செல்வோம். உங்களிடம் பல Alchemy செயலிகள் இருந்தால், செயலி வாரியாக வடிகட்டி **Hello World** என்பதைத் தேர்ந்தெடுப்பதை உறுதிசெய்யவும்.

![](./hello-world-explorer.png)

நாம் `.deploy()` செயல்பாட்டை அழைத்தபோது Hardhat/Ethers நமக்காக உட்புறமாக உருவாக்கிய சில JSON-RPC முறைகளை இங்கே காண்பீர்கள். இங்குள்ள இரண்டு முக்கியமான முறைகள் [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction), இது கோர்லி சங்கிலியில் நமது ஒப்பந்தத்தை எழுதுவதற்கான கோரிக்கையாகும், மற்றும் [`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash), இது ஹாஷ் கொடுக்கப்பட்ட நமது பரிவர்த்தனை பற்றிய தகவல்களைப் படிப்பதற்கான கோரிக்கையாகும். பரிவர்த்தனைகளை அனுப்புவது பற்றி மேலும் அறிய, [Web3-ஐப் பயன்படுத்தி பரிவர்த்தனைகளை அனுப்புவது குறித்த நமது டுடோரியலைப்](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) பார்க்கவும்.

## பகுதி 2: உங்கள் திறன் ஒப்பந்தத்துடன் தொடர்புகொள்ளுங்கள் {#part-2-interact-with-your-smart-contract}

இப்போது நாம் கோர்லி பிணையத்தில் ஒரு திறன் ஒப்பந்தத்தை வெற்றிகரமாக நிலைநிறுத்தியுள்ளோம், அதனுடன் எவ்வாறு தொடர்புகொள்வது என்பதைக் கற்றுக்கொள்வோம்.

### interact.js கோப்பை உருவாக்கவும் {#create-a-interactjs-file}

இந்தக் கோப்பில்தான் நமது தொடர்பு ஸ்கிரிப்டை எழுதுவோம். பகுதி 1-இல் நீங்கள் முன்பு நிறுவிய Ethers.js நூலகத்தைப் பயன்படுத்துவோம்.

`scripts/` கோப்புறைக்குள், `interact.js` என்ற பெயரில் புதிய கோப்பை உருவாக்கி, பின்வரும் குறியீட்டைச் சேர்க்கவும்:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### உங்கள் .env கோப்பைப் புதுப்பிக்கவும் {#update-your-env-file}

நாம் புதிய சூழல் மாறிகளைப் பயன்படுத்தப் போகிறோம், எனவே [நாம் முன்பு உருவாக்கிய](#step-11-connect-metamask-alchemy-to-your-project) `.env` கோப்பில் அவற்றை வரையறுக்க வேண்டும்.

நமது Alchemy `API_KEY` மற்றும் உங்கள் திறன் ஒப்பந்தம் நிலைநிறுத்தப்பட்ட `CONTRACT_ADDRESS` ஆகியவற்றிற்கான வரையறையை நாம் சேர்க்க வேண்டும்.

உங்கள் `.env` கோப்பு இதுபோன்று இருக்க வேண்டும்:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### உங்கள் ஒப்பந்தத்தின் ABI-ஐப் பெறவும் {#grab-your-contract-abi}

நமது ஒப்பந்தத்தின் [ABI (Application Binary Interface)](/glossary/#abi) என்பது நமது திறன் ஒப்பந்தத்துடன் தொடர்புகொள்வதற்கான இடைமுகமாகும். Hardhat தானாகவே ஒரு ABI-ஐ உருவாக்கி அதை `HelloWorld.json` இல் சேமிக்கிறது. ABI-ஐப் பயன்படுத்த, நமது `interact.js` கோப்பில் பின்வரும் குறியீட்டு வரிகளைச் சேர்ப்பதன் மூலம் உள்ளடக்கங்களைப் பாகுபடுத்த வேண்டும்:

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

### உங்கள் ஒப்பந்தத்தின் நிகழ்வை உருவாக்கவும் {#create-an-instance-of-your-contract}

நமது ஒப்பந்தத்துடன் தொடர்புகொள்ள, நமது குறியீட்டில் ஒரு ஒப்பந்த நிகழ்வை உருவாக்க வேண்டும். Ethers.js மூலம் இதைச் செய்ய, நாம் மூன்று கருத்துகளுடன் பணியாற்ற வேண்டும்:

1. வழங்குநர் - தொகுதிச்சங்கிலியில் படிக்க மற்றும் எழுத அணுகலை வழங்கும் ஒரு கணு வழங்குநர்
2. கையொப்பமிடுபவர் - பரிவர்த்தனைகளில் கையொப்பமிடக்கூடிய ஒரு எத்திரியம் கணக்கைக் குறிக்கிறது
3. Contract - சங்கிலியில் நிலைநிறுத்தப்பட்ட ஒரு குறிப்பிட்ட ஒப்பந்தத்தைக் குறிக்கும் Ethers.js பொருள்

ஒப்பந்தத்தின் நிகழ்வை உருவாக்க முந்தைய படியிலிருந்து ஒப்பந்த ABI-ஐப் பயன்படுத்துவோம்:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Providers, Signers மற்றும் Contracts பற்றி [ethers.js ஆவணத்தில்](https://docs.ethers.io/v5/) மேலும் அறிக.

### init செய்தியைப் படிக்கவும் {#read-the-init-message}

நாம் நமது ஒப்பந்தத்தை `initMessage = "Hello world!"` உடன் நிலைநிறுத்தியது நினைவிருக்கிறதா? இப்போது நமது திறன் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள அந்தச் செய்தியைப் படித்து கன்சோலில் அச்சிடப் போகிறோம்.

JavaScript-இல், பிணையங்களுடன் தொடர்புகொள்ளும்போது ஒத்திசைவற்ற (asynchronous) செயல்பாடுகள் பயன்படுத்தப்படுகின்றன. ஒத்திசைவற்ற செயல்பாடுகள் பற்றி மேலும் அறிய, [இந்த medium கட்டுரையைப் படிக்கவும்](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

நமது திறன் ஒப்பந்தத்தில் உள்ள `message` செயல்பாட்டை அழைக்கவும், init செய்தியைப் படிக்கவும் கீழே உள்ள குறியீட்டைப் பயன்படுத்தவும்:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

டெர்மினலில் `npx hardhat run scripts/interact.js` ஐப் பயன்படுத்தி கோப்பை இயக்கிய பிறகு, இந்த பதிலைக் காண வேண்டும்:

```
The message is: Hello world!
```

வாழ்த்துகள்! எத்திரியம் தொகுதிச்சங்கிலியிலிருந்து திறன் ஒப்பந்தத் தரவை வெற்றிகரமாகப் படித்துவிட்டீர்கள், அருமை!

### செய்தியைப் புதுப்பிக்கவும் {#update-the-message}

செய்தியைப் படிப்பது மட்டுமின்றி, `update` செயல்பாட்டைப் பயன்படுத்தி நமது திறன் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியைப் புதுப்பிக்கவும் முடியும்! மிகவும் அருமையாக உள்ளது, இல்லையா?

செய்தியைப் புதுப்பிக்க, நாம் உருவாக்கிய Contract பொருளில் நேரடியாக `update` செயல்பாட்டை அழைக்கலாம்:

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

வரி 11-இல், திரும்பப் பெறப்பட்ட பரிவர்த்தனை பொருளில் `.wait()` ஐ அழைக்கிறோம் என்பதை நினைவில் கொள்ளவும். இது செயல்பாட்டிலிருந்து வெளியேறுவதற்கு முன்பு, தொகுதிச்சங்கிலியில் பரிவர்த்தனை வெட்டியெடுக்கப்படும் (mined) வரை நமது ஸ்கிரிப்ட் காத்திருப்பதை உறுதிசெய்கிறது. `.wait()` அழைப்பு சேர்க்கப்படவில்லை என்றால், ஒப்பந்தத்தில் புதுப்பிக்கப்பட்ட `message` மதிப்பை ஸ்கிரிப்ட் பார்க்காமல் போகலாம்.

### புதிய செய்தியைப் படிக்கவும் {#read-the-new-message}

புதுப்பிக்கப்பட்ட `message` மதிப்பைப் படிக்க [முந்தைய படியை](#read-the-init-message) உங்களால் மீண்டும் செய்ய முடியும். அந்தப் புதிய மதிப்பை அச்சிடுவதற்குத் தேவையான மாற்றங்களைச் செய்ய முடியுமா என்று சிறிது நேரம் ஒதுக்கிப் பாருங்கள்!

உங்களுக்கு ஒரு குறிப்பு தேவைப்பட்டால், இந்த கட்டத்தில் உங்கள் `interact.js` கோப்பு இப்படித்தான் இருக்க வேண்டும்:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// வழங்குநர் - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// கையொப்பமிடுபவர் - நீங்கள்
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// ஒப்பந்த நிகழ்வு
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

இப்போது ஸ்கிரிப்டை இயக்கவும், பழைய செய்தி, புதுப்பிக்கும் நிலை மற்றும் புதிய செய்தி ஆகியவை உங்கள் டெர்மினலில் அச்சிடப்பட்டிருப்பதைக் காண முடியும்!

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

அந்த ஸ்கிரிப்டை இயக்கும்போது, புதிய செய்தி ஏற்றப்படுவதற்கு முன்பு `Updating the message...` படி ஏற்றப்பட சிறிது நேரம் எடுப்பதை நீங்கள் கவனிக்கலாம். இது வெட்டியெடுக்கும் (mining) செயல்முறையின் காரணமாகும்; பரிவர்த்தனைகள் வெட்டியெடுக்கப்படும்போது அவற்றைக் கண்காணிப்பதில் உங்களுக்கு ஆர்வம் இருந்தால், பரிவர்த்தனையின் நிலையைக் காண [Alchemy mempool](https://dashboard.alchemy.com/mempool) ஐப் பார்வையிடவும். பரிவர்த்தனை கைவிடப்பட்டால், [Goerli Etherscan](https://goerli.etherscan.io) ஐச் சரிபார்த்து உங்கள் பரிவர்த்தனை ஹாஷைத் தேடுவதும் உதவியாக இருக்கும்.

## பகுதி 3: உங்கள் திறன் ஒப்பந்தத்தை Etherscan இல் வெளியிடுங்கள் {#part-3-publish-your-smart-contract-to-etherscan}

உங்கள் திறன் ஒப்பந்தத்தை உருவாக்குவதற்கான அனைத்து கடின உழைப்பையும் நீங்கள் செய்துள்ளீர்கள்; இப்போது அதை உலகத்துடன் பகிர்ந்துகொள்ள வேண்டிய நேரம் வந்துவிட்டது!

Etherscan இல் உங்கள் திறன் ஒப்பந்தத்தைச் சரிபார்ப்பதன் மூலம், யார் வேண்டுமானாலும் உங்கள் மூலக் குறியீட்டைப் பார்க்கலாம் மற்றும் உங்கள் திறன் ஒப்பந்தத்துடன் தொடர்பு கொள்ளலாம். வாருங்கள் தொடங்கலாம்!

### படி 1: உங்கள் Etherscan கணக்கில் ஒரு API திறவுகோலை உருவாக்குங்கள் {#step-1-generate-an-api-key-on-your-etherscan-account}

நீங்கள் வெளியிட முயற்சிக்கும் திறன் ஒப்பந்தம் உங்களுக்குச் சொந்தமானது என்பதைச் சரிபார்க்க, Etherscan API திறவுகோல் அவசியமாகும்.

உங்களிடம் ஏற்கனவே Etherscan கணக்கு இல்லையென்றால், [ஒரு கணக்கிற்குப் பதிவு செய்யுங்கள்](https://etherscan.io/register).

உள்நுழைந்ததும், வழிசெலுத்தல் பட்டியில் (navigation bar) உங்கள் பயனர்பெயரைக் கண்டறிந்து, அதன் மீது சுட்டியை வைத்து, **My profile** பொத்தானைத் தேர்ந்தெடுக்கவும்.

உங்கள் சுயவிவரப் பக்கத்தில், ஒரு பக்கவாட்டு வழிசெலுத்தல் பட்டியைக் காண்பீர்கள். அந்தப் பக்கவாட்டு வழிசெலுத்தல் பட்டியில் இருந்து, **API Keys** என்பதைத் தேர்ந்தெடுக்கவும். அடுத்து, புதிய API திறவுகோலை உருவாக்க "Add" பொத்தானை அழுத்தி, உங்கள் செயலிக்கு **hello-world** எனப் பெயரிட்டு, **Create New API Key** பொத்தானை அழுத்தவும்.

உங்கள் புதிய API திறவுகோல், API திறவுகோல் அட்டவணையில் தோன்றும். அந்த API திறவுகோலை உங்கள் கிளிப்போர்டுக்கு நகலெடுக்கவும்.

அடுத்து, Etherscan API திறவுகோலை நமது `.env` கோப்பில் சேர்க்க வேண்டும்.

அதைச் சேர்த்த பிறகு, உங்கள் `.env` கோப்பு இப்படி இருக்க வேண்டும்:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhat மூலம் நிலைநிறுத்தப்பட்ட திறன் ஒப்பந்தங்கள் {#hardhat-deployed-smart-contracts}

#### hardhat-etherscan ஐ நிறுவவும் {#install-hardhat-etherscan}

Hardhat ஐப் பயன்படுத்தி உங்கள் ஒப்பந்தத்தை Etherscan இல் வெளியிடுவது மிகவும் எளிதானது. தொடங்குவதற்கு, நீங்கள் முதலில் `hardhat-etherscan` செருகுநிரலை (plugin) நிறுவ வேண்டும். `hardhat-etherscan` ஆனது Etherscan இல் திறன் ஒப்பந்தத்தின் மூலக் குறியீடு மற்றும் ABI ஐத் தானாகவே சரிபார்க்கும். இதைச் சேர்க்க, `hello-world` கோப்பகத்தில் (directory) பின்வருவனவற்றை இயக்கவும்:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

நிறுவியதும், உங்கள் `hardhat.config.js` இன் மேற்பகுதியில் பின்வரும் அறிக்கையைச் சேர்த்து, Etherscan உள்ளமைவு (config) விருப்பங்களைச் சேர்க்கவும்:

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
    // Etherscan-க்கான உங்கள் API திறவுகோல்
    // https://etherscan.io/ இல் ஒன்றைப் பெறவும்
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Etherscan இல் உங்கள் திறன் ஒப்பந்தத்தைச் சரிபார்க்கவும் {#verify-your-smart-contract-on-etherscan}

அனைத்து கோப்புகளும் சேமிக்கப்பட்டுள்ளதா என்பதையும், அனைத்து `.env` மாறிகளும் (variables) சரியாக உள்ளமைக்கப்பட்டுள்ளதா என்பதையும் உறுதிப்படுத்திக் கொள்ளவும்.

ஒப்பந்த முகவரி மற்றும் அது நிலைநிறுத்தப்பட்டுள்ள பிணையம் ஆகியவற்றை வழங்கி, `verify` பணியை இயக்கவும்:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

`DEPLOYED_CONTRACT_ADDRESS` என்பது கோர்லி சோதனை வலையமைப்பில் நிலைநிறுத்தப்பட்ட உங்கள் திறன் ஒப்பந்தத்தின் முகவரி என்பதை உறுதிப்படுத்திக் கொள்ளவும். மேலும், இறுதி மதிப்புருவானது (`'Hello World!'`) [பகுதி 1 இல் நிலைநிறுத்தும் படியின் போது](#step-15-write-our-deploy-script) பயன்படுத்தப்பட்ட அதே சர மதிப்பாக (string value) இருக்க வேண்டும்.

எல்லாம் சரியாக நடந்தால், உங்கள் முனையத்தில் (terminal) பின்வரும் செய்தியைக் காண்பீர்கள்:

```text
ஒப்பந்தத்திற்கான மூலக் குறியீடு வெற்றிகரமாகச் சமர்ப்பிக்கப்பட்டது
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
Etherscan இல் சரிபார்ப்பதற்காக. சரிபார்ப்பு முடிவுக்காகக் காத்திருக்கிறது...


Etherscan இல் HelloWorld ஒப்பந்தம் வெற்றிகரமாகச் சரிபார்க்கப்பட்டது.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

வாழ்த்துகள்! உங்கள் திறன் ஒப்பந்தக் குறியீடு Etherscan இல் உள்ளது!

### Etherscan இல் உங்கள் திறன் ஒப்பந்தத்தைப் பாருங்கள்! {#check-out-your-smart-contract-on-etherscan}

உங்கள் முனையத்தில் வழங்கப்பட்ட இணைப்பிற்குச் செல்லும்போது, Etherscan இல் வெளியிடப்பட்ட உங்கள் திறன் ஒப்பந்தக் குறியீடு மற்றும் ABI ஐ உங்களால் பார்க்க முடியும்!

**ஆஹா - நீங்கள் சாதித்துவிட்டீர்கள்! இப்போது யார் வேண்டுமானாலும் உங்கள் திறன் ஒப்பந்தத்தை அழைக்கலாம் அல்லது அதில் எழுதலாம்! அடுத்து நீங்கள் என்ன உருவாக்கப் போகிறீர்கள் என்பதைப் பார்க்க நாங்கள் ஆவலுடன் காத்திருக்கிறோம்!**

## பகுதி 4 - உங்கள் திறன் ஒப்பந்தத்தை முன்பக்கத்துடன் ஒருங்கிணைத்தல் {#part-4-integrating-your-smart-contract-with-the-frontend}

இந்த வழிகாட்டியின் முடிவில், நீங்கள் பின்வருவனவற்றை எப்படிச் செய்வது என்று தெரிந்துகொள்வீர்கள்:

- உங்கள் பரவலாக்கப்பட்ட செயலியுடன் (dapp) ஒரு மெட்டாமேஸ்க் பணப்பையை இணைப்பது
- [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) API-ஐப் பயன்படுத்தி உங்கள் திறன் ஒப்பந்தத்திலிருந்து தரவைப் படிப்பது
- மெட்டாமேஸ்க் பயன்படுத்தி எத்திரியம் பரிவர்த்தனைகளில் கையொப்பமிடுவது

இந்த dapp-க்கு, நாங்கள் [React](https://react.dev/)-ஐ எங்கள் முன்பக்க கட்டமைப்பாகப் பயன்படுத்துவோம்; இருப்பினும், அதன் அடிப்படைகளை விளக்குவதற்கு நாங்கள் அதிக நேரம் செலவிட மாட்டோம் என்பதைக் கவனத்தில் கொள்ள வேண்டும், ஏனெனில் நாங்கள் பெரும்பாலும் எங்கள் திட்டத்திற்கு Web3 செயல்பாட்டைக் கொண்டுவருவதில் கவனம் செலுத்துவோம்.

முன்தேவையாக, உங்களுக்கு React பற்றிய தொடக்க நிலை புரிதல் இருக்க வேண்டும். இல்லையெனில், அதிகாரப்பூர்வ [Intro to React வழிகாட்டியை](https://react.dev/learn) முடிக்குமாறு பரிந்துரைக்கிறோம்.

### தொடக்கக் கோப்புகளை குளோன் (Clone) செய்யவும் {#clone-the-starter-files}

முதலில், இந்தத் திட்டத்திற்கான தொடக்கக் கோப்புகளைப் பெற [hello-world-part-four GitHub களஞ்சியத்திற்குச்](https://github.com/alchemyplatform/hello-world-part-four-tutorial) சென்று, இந்தக் களஞ்சியத்தை உங்கள் கணினியில் குளோன் செய்யவும்.

குளோன் செய்யப்பட்ட களஞ்சியத்தை உங்கள் கணினியில் திறக்கவும். இதில் இரண்டு கோப்புறைகள் இருப்பதைக் கவனியுங்கள்: `starter-files` மற்றும் `completed`.

- `starter-files`- **நாங்கள் இந்த கோப்பகத்தில் தான் வேலை செய்வோம்**, [பகுதி 3](#part-3-publish-your-smart-contract-to-etherscan)-இல் Etherscan-இல் நாங்கள் வெளியிட்ட திறன் ஒப்பந்தம் மற்றும் உங்கள் எத்திரியம் பணப்பையுடன் UI-ஐ இணைப்போம்.
- `completed` முழுமையாக முடிக்கப்பட்ட வழிகாட்டியைக் கொண்டுள்ளது, மேலும் நீங்கள் எங்காவது சிக்கிக்கொண்டால் மட்டுமே இதை ஒரு குறிப்பாகப் பயன்படுத்த வேண்டும்.

அடுத்து, உங்களுக்குப் பிடித்த குறியீடு திருத்தியில் (code editor) உங்கள் `starter-files` நகலைத் திறந்து, பின்னர் `src` கோப்புறைக்குச் செல்லவும்.

நாம் எழுதும் அனைத்து குறியீடுகளும் `src` கோப்புறையின் கீழ் இருக்கும். எங்கள் திட்டத்திற்கு Web3 செயல்பாட்டை வழங்க `HelloWorld.js` கூறு மற்றும் `util/interact.js` ஜாவாஸ்கிரிப்ட் கோப்புகளைத் திருத்துவோம்.

### தொடக்கக் கோப்புகளைச் சரிபார்க்கவும் {#check-out-the-starter-files}

நாம் குறியீடு எழுதத் தொடங்குவதற்கு முன், தொடக்கக் கோப்புகளில் நமக்கு என்ன வழங்கப்பட்டுள்ளது என்பதை ஆராய்வோம்.

#### உங்கள் react திட்டத்தை இயக்கவும் {#get-your-react-project-running}

உலாவியில் React திட்டத்தை இயக்குவதன் மூலம் தொடங்குவோம். React-இன் சிறப்பம்சம் என்னவென்றால், எங்கள் திட்டம் உலாவியில் இயங்கியவுடன், நாங்கள் சேமிக்கும் எந்த மாற்றங்களும் எங்கள் உலாவியில் நேரடியாகப் புதுப்பிக்கப்படும்.

திட்டத்தை இயக்க, `starter-files` கோப்புறையின் மூலக் கோப்பகத்திற்குச் (root directory) சென்று, திட்டத்தின் சார்புகளை (dependencies) நிறுவ உங்கள் முனையத்தில் (terminal) `npm install`-ஐ இயக்கவும்:

```bash
cd starter-files
npm install
```

அவை நிறுவப்பட்டதும், உங்கள் முனையத்தில் `npm start`-ஐ இயக்கவும்:

```bash
npm start
```

இவ்வாறு செய்வது உங்கள் உலாவியில் [http://localhost:3000/](http://localhost:3000/)-ஐத் திறக்க வேண்டும், அங்கு எங்கள் திட்டத்திற்கான முன்பக்கத்தைக் காண்பீர்கள். இது ஒரு புலம் \(உங்கள் திறன் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியைப் புதுப்பிப்பதற்கான இடம்\), "Connect Wallet" பொத்தான் மற்றும் "Update" பொத்தான் ஆகியவற்றைக் கொண்டிருக்க வேண்டும்.

நீங்கள் எந்தப் பொத்தானையும் கிளிக் செய்ய முயன்றால், அவை வேலை செய்யாது என்பதை நீங்கள் கவனிப்பீர்கள்—ஏனென்றால் அவற்றின் செயல்பாட்டை நாங்கள் இன்னும் நிரல் செய்ய வேண்டும்.

#### `HelloWorld.js` கூறு {#the-helloworld-js-component}

எங்கள் திருத்தியில் உள்ள `src` கோப்புறைக்குத் திரும்பிச் சென்று `HelloWorld.js` கோப்பைத் திறப்போம். இந்தக் கோப்பில் உள்ள அனைத்தையும் நாம் புரிந்துகொள்வது மிகவும் முக்கியம், ஏனெனில் இது நாம் வேலை செய்யும் முதன்மை React கூறாகும்.

இந்தக் கோப்பின் மேற்புறத்தில், React நூலகம், useEffect மற்றும் useState ஹூக்குகள், `./util/interact.js`-இலிருந்து சில உருப்படிகள் (அவற்றை விரைவில் விரிவாக விவரிப்போம்!), மற்றும் Alchemy லோகோ உட்பட எங்கள் திட்டத்தை இயக்கத் தேவையான பல இறக்குமதி (import) அறிக்கைகள் இருப்பதைக் கவனிப்பீர்கள்.

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

அடுத்து, குறிப்பிட்ட நிகழ்வுகளுக்குப் பிறகு நாம் புதுப்பிக்கும் எங்கள் நிலை (state) மாறிகள் உள்ளன.

```javascript
// HelloWorld.js

//நிலை மாறிகள்
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

ஒவ்வொரு மாறியும் எதைக் குறிக்கிறது என்பது இங்கே:

- `walletAddress` - பயனரின் பணப்பை முகவரியைச் சேமிக்கும் ஒரு சரம் (string)
- `status`- dapp-உடன் எவ்வாறு தொடர்புகொள்வது என்பது குறித்து பயனருக்கு வழிகாட்டும் பயனுள்ள செய்தியைச் சேமிக்கும் ஒரு சரம்
- `message` - திறன் ஒப்பந்தத்தில் தற்போதைய செய்தியைச் சேமிக்கும் ஒரு சரம்
- `newMessage` - திறன் ஒப்பந்தத்தில் எழுதப்படும் புதிய செய்தியைச் சேமிக்கும் ஒரு சரம்

நிலை மாறிகளுக்குப் பிறகு, செயல்படுத்தப்படாத ஐந்து சார்புகளைக் (functions) காண்பீர்கள்: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed`, மற்றும் `onUpdatePressed`. அவை என்ன செய்கின்றன என்பதை கீழே விளக்குவோம்:

```javascript
// HelloWorld.js

//ஒரு முறை மட்டுமே அழைக்கப்படும்
useEffect(async () => {
  //TODO: செயல்படுத்தவும்
}, [])

function addSmartContractListener() {
  //TODO: செயல்படுத்தவும்
}

function addWalletListener() {
  //TODO: செயல்படுத்தவும்
}

const connectWalletPressed = async () => {
  //TODO: செயல்படுத்தவும்
}

const onUpdatePressed = async () => {
  //TODO: செயல்படுத்தவும்
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- இது உங்கள் கூறு ரெண்டர் (render) செய்யப்பட்ட பிறகு அழைக்கப்படும் ஒரு React ஹூக் ஆகும். இதில் வெற்று அணிவரிசை (empty array) `[]` ப்ராப் (prop) அனுப்பப்பட்டுள்ளதால் \(வரி 4-ஐப் பார்க்கவும்\), இது கூறின் _முதல்_ ரெண்டரில் மட்டுமே அழைக்கப்படும். இங்கே எங்கள் திறன் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள தற்போதைய செய்தியை ஏற்றுவோம், எங்கள் திறன் ஒப்பந்தம் மற்றும் பணப்பை கேட்பான்களை (listeners) அழைப்போம், மேலும் பணப்பை ஏற்கனவே இணைக்கப்பட்டுள்ளதா என்பதைப் பிரதிபலிக்க எங்கள் UI-ஐப் புதுப்பிப்போம்.
- `addSmartContractListener`- இந்தச் சார்பு எங்கள் HelloWorld ஒப்பந்தத்தின் `UpdatedMessages` நிகழ்வைக் கண்காணிக்கும் ஒரு கேட்பானை அமைக்கிறது மற்றும் எங்கள் திறன் ஒப்பந்தத்தில் செய்தி மாற்றப்படும்போது எங்கள் UI-ஐப் புதுப்பிக்கிறது.
- `addWalletListener`- இந்தச் சார்பு பயனரின் மெட்டாமேஸ்க் பணப்பை நிலையில் ஏற்படும் மாற்றங்களைக் கண்டறியும் ஒரு கேட்பானை அமைக்கிறது, அதாவது பயனர் தங்கள் பணப்பையைத் துண்டிக்கும்போது அல்லது முகவரிகளை மாற்றும்போது.
- `connectWalletPressed`- பயனரின் மெட்டாமேஸ்க் பணப்பையை எங்கள் dapp-உடன் இணைக்க இந்தச் சார்பு அழைக்கப்படும்.
- `onUpdatePressed` - திறன் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியைப் பயனர் புதுப்பிக்க விரும்பும்போது இந்தச் சார்பு அழைக்கப்படும்.

இந்தக் கோப்பின் முடிவில், எங்கள் கூறின் UI உள்ளது.

```javascript
// HelloWorld.js

//எங்கள் கூறின் UI
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

இந்தக் குறியீட்டை நீங்கள் கவனமாக ஸ்கேன் செய்தால், எங்கள் UI-இல் எங்கள் பல்வேறு நிலை மாறிகளை எங்கு பயன்படுத்துகிறோம் என்பதை நீங்கள் கவனிப்பீர்கள்:

- 6-12 வரிகளில், பயனரின் பணப்பை இணைக்கப்பட்டிருந்தால் \(அதாவது, `walletAddress.length > 0`\), "walletButton" என்ற ID-ஐக் கொண்ட பொத்தானில் பயனர் `walletAddress`-இன் சுருக்கப்பட்ட பதிப்பைக் காண்பிப்போம்; இல்லையெனில் அது வெறுமனே "Connect Wallet" என்று கூறும்.
- வரி 17-இல், திறன் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள தற்போதைய செய்தியைக் காண்பிக்கிறோம், இது `message` சரத்தில் பிடிக்கப்பட்டுள்ளது.
- 23-26 வரிகளில், உரைப்புலத்தில் (text field) உள்ளீடு மாறும்போது எங்கள் `newMessage` நிலை மாறியைப் புதுப்பிக்க [கட்டுப்படுத்தப்பட்ட கூறினைப் (controlled component)](https://legacy.reactjs.org/docs/forms.html#controlled-components) பயன்படுத்துகிறோம்.

எங்கள் நிலை மாறிகளுக்கு மேலதிகமாக, `publishButton` மற்றும் `walletButton` ஆகிய ID-களைக் கொண்ட பொத்தான்கள் முறையே கிளிக் செய்யப்படும்போது `connectWalletPressed` மற்றும் `onUpdatePressed` சார்புகள் அழைக்கப்படுவதையும் நீங்கள் காண்பீர்கள்.

இறுதியாக, இந்த `HelloWorld.js` கூறு எங்கு சேர்க்கப்பட்டுள்ளது என்பதைப் பார்ப்போம்.

மற்ற அனைத்து கூறுகளுக்கும் ஒரு கொள்கலனாகச் செயல்படும் React-இன் முக்கிய கூறான `App.js` கோப்பிற்கு நீங்கள் சென்றால், எங்கள் `HelloWorld.js` கூறு வரி 7-இல் உட்செலுத்தப்பட்டிருப்பதைக் காண்பீர்கள்.

கடைசியாக, உங்களுக்காக வழங்கப்பட்ட மற்றொரு கோப்பான `interact.js` கோப்பைச் சரிபார்ப்போம்.

#### `interact.js` கோப்பு {#the-interact-js-file}

நாங்கள் [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) முன்னுதாரணத்தைப் பின்பற்ற விரும்புவதால், எங்கள் dapp-இன் தர்க்கம், தரவு மற்றும் விதிகளை நிர்வகிப்பதற்கான எங்கள் அனைத்து சார்புகளையும் கொண்ட ஒரு தனி கோப்பு எங்களுக்குத் தேவைப்படும், பின்னர் அந்தச் சார்புகளை எங்கள் முன்பக்கத்திற்கு \(எங்கள் `HelloWorld.js` கூறு\) ஏற்றுமதி செய்ய முடியும்.

👆🏽இதுவே எங்கள் `interact.js` கோப்பின் சரியான நோக்கமாகும்!

உங்கள் `src` கோப்பகத்தில் உள்ள `util` கோப்புறைக்குச் செல்லவும், எங்கள் திறன் ஒப்பந்த தொடர்பு மற்றும் பணப்பை சார்புகள் மற்றும் மாறிகள் அனைத்தையும் கொண்ட `interact.js` என்ற கோப்பை நாங்கள் சேர்த்துள்ளதை நீங்கள் கவனிப்பீர்கள்.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

கோப்பின் மேற்புறத்தில் `helloWorldContract` பொருளை நாங்கள் கருத்துரைத்துள்ளதை (commented out) நீங்கள் கவனிப்பீர்கள். இந்த வழிகாட்டியின் பிற்பகுதியில், இந்த பொருளின் கருத்துரையை நீக்கி, இந்த மாறியில் எங்கள் திறன் ஒப்பந்தத்தை நிறுவுவோம், பின்னர் அதை எங்கள் `HelloWorld.js` கூறில் ஏற்றுமதி செய்வோம்.

எங்கள் `helloWorldContract` பொருளுக்குப் பிறகு செயல்படுத்தப்படாத நான்கு சார்புகள் பின்வருவனவற்றைச் செய்கின்றன:

- `loadCurrentMessage` - இந்தச் சார்பு திறன் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள தற்போதைய செய்தியை ஏற்றுவதற்கான தர்க்கத்தைக் கையாள்கிறது. இது [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3)-ஐப் பயன்படுத்தி Hello World திறன் ஒப்பந்தத்திற்கு ஒரு _படிக்க_ (read) அழைப்பை மேற்கொள்ளும்.
- `connectWallet` - இந்தச் சார்பு பயனரின் மெட்டாமேஸ்க்கை எங்கள் dapp-உடன் இணைக்கும்.
- `getCurrentWalletConnected` - பக்க ஏற்றத்தின்போது (page load) ஒரு எத்திரியம் கணக்கு ஏற்கனவே எங்கள் dapp-உடன் இணைக்கப்பட்டுள்ளதா என்பதை இந்தச் சார்பு சரிபார்த்து, அதற்கேற்ப எங்கள் UI-ஐப் புதுப்பிக்கும்.
- `updateMessage` - இந்தச் சார்பு திறன் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியைப் புதுப்பிக்கும். இது Hello World திறன் ஒப்பந்தத்திற்கு ஒரு _எழுத_ (write) அழைப்பை மேற்கொள்ளும், எனவே செய்தியைப் புதுப்பிக்க பயனரின் மெட்டாமேஸ்க் பணப்பை ஒரு எத்திரியம் பரிவர்த்தனையில் கையொப்பமிட வேண்டும்.

இப்போது நாம் எதனுடன் வேலை செய்கிறோம் என்பதைப் புரிந்துகொண்டதால், எங்கள் திறன் ஒப்பந்தத்திலிருந்து எவ்வாறு படிப்பது என்பதைக் கண்டுபிடிப்போம்!

### படி 3: உங்கள் திறன் ஒப்பந்தத்திலிருந்து படிக்கவும் {#step-3-read-from-your-smart-contract}

உங்கள் திறன் ஒப்பந்தத்திலிருந்து படிக்க, நீங்கள் பின்வருவனவற்றை வெற்றிகரமாக அமைக்க வேண்டும்:

- எத்திரியம் சங்கிலிக்கான API இணைப்பு
- உங்கள் திறன் ஒப்பந்தத்தின் ஏற்றப்பட்ட நிகழ்வு (instance)
- உங்கள் திறன் ஒப்பந்தச் சார்பை அழைப்பதற்கான ஒரு சார்பு
- திறன் ஒப்பந்தத்திலிருந்து நீங்கள் படிக்கும் தரவு மாறும்போது புதுப்பிப்புகளைக் கண்காணிக்க ஒரு கேட்பான்

இது பல படிகள் போல் தோன்றலாம், ஆனால் கவலைப்பட வேண்டாம்! அவை ஒவ்வொன்றையும் படிப்படியாக எப்படிச் செய்வது என்று நாங்கள் உங்களுக்கு வழிகாட்டுவோம்! :\)

#### எத்திரியம் சங்கிலிக்கான API இணைப்பை ஏற்படுத்துதல்

இந்த டுடோரியலின் பகுதி 2-இல், நமது திறன் ஒப்பந்தத்திலிருந்து படிக்க Alchemy Web3 திறவுகோலை எவ்வாறு பயன்படுத்தினோம் என்பது நினைவிருக்கிறதா? சங்கிலியிலிருந்து படிக்க உங்கள் பரவலாக்கப்பட்ட செயலியில் (dapp) ஒரு Alchemy Web3 திறவுகோல் உங்களுக்குத் தேவைப்படும்.

உங்களிடம் அது ஏற்கனவே இல்லையென்றால், முதலில் உங்கள் `starter-files`-இன் மூலக் கோப்பகத்திற்குச் சென்று உங்கள் டெர்மினலில் பின்வருவனவற்றை இயக்குவதன் மூலம் [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)-ஐ நிறுவவும்:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) என்பது [Web3.js](https://docs.web3js.org/)-ஐச் சுற்றியுள்ள ஒரு ரேப்பராகும் (wrapper), இது மேம்படுத்தப்பட்ட API முறைகள் மற்றும் பிற முக்கியமான நன்மைகளை வழங்கி ஒரு Web3 டெவலப்பராக உங்கள் வாழ்க்கையை எளிதாக்குகிறது. இது குறைந்தபட்ச உள்ளமைவு தேவைப்படும் வகையில் வடிவமைக்கப்பட்டுள்ளது, எனவே நீங்கள் உடனடியாக உங்கள் செயலியில் இதைப் பயன்படுத்தத் தொடங்கலாம்!

பின்னர், உங்கள் திட்டக் கோப்பகத்தில் [dotenv](https://www.npmjs.com/package/dotenv) தொகுப்பை நிறுவவும், இதனால் நமது API திறவுகோலைப் பெற்ற பிறகு அதைப் பாதுகாப்பாகச் சேமிக்க ஒரு இடம் கிடைக்கும்.

```text
npm install dotenv --save
```

நமது dapp-க்கு, நமது HTTP API திறவுகோலுக்குப் பதிலாக **நமது Websockets API திறவுகோலைப் பயன்படுத்துவோம்**, ஏனெனில் திறன் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தி மாறும்போது அதைக் கண்டறியும் ஒரு கேட்பானை (listener) அமைக்க இது நம்மை அனுமதிக்கும்.

உங்கள் API திறவுகோலைப் பெற்றவுடன், உங்கள் மூலக் கோப்பகத்தில் ஒரு `.env` கோப்பை உருவாக்கி, அதில் உங்கள் Alchemy Websockets URL-ஐச் சேர்க்கவும். அதன் பிறகு, உங்கள் `.env` கோப்பு இதுபோன்று இருக்க வேண்டும்:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

இப்போது, நமது dapp-இல் நமது Alchemy Web3 இறுதிப்புள்ளியை (endpoint) அமைக்க நாம் தயாராகிவிட்டோம்! நமது `util` கோப்புறைக்குள் உள்ள `interact.js`-க்குத் திரும்பிச் சென்று, கோப்பின் மேற்புறத்தில் பின்வரும் குறியீட்டைச் சேர்ப்போம்:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

மேலே, நாம் முதலில் நமது `.env` கோப்பிலிருந்து Alchemy திறவுகோலை இறக்குமதி செய்தோம், பின்னர் நமது Alchemy Web3 இறுதிப்புள்ளியை நிறுவ நமது `alchemyKey`-ஐ `createAlchemyWeb3`-க்கு அனுப்பினோம்.

இந்த இறுதிப்புள்ளி தயாராக உள்ளதால், நமது திறன் ஒப்பந்தத்தை ஏற்ற வேண்டிய நேரம் வந்துவிட்டது!
#### உங்கள் Hello World திறன் ஒப்பந்தத்தை ஏற்றுதல் {#loading-your-hello-world-smart-contract}

உங்கள் Hello World திறன் ஒப்பந்தத்தை ஏற்ற, உங்களுக்கு அதன் ஒப்பந்த முகவரி மற்றும் ABI தேவைப்படும், நீங்கள் [இந்த வழிகாட்டியின் பகுதி 3-ஐ](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan) முடித்திருந்தால் இவை இரண்டையும் Etherscan-இல் காணலாம்.

#### Etherscan-இலிருந்து உங்கள் ஒப்பந்த ABI-ஐ எவ்வாறு பெறுவது {#how-to-get-your-contract-abi-from-etherscan}

இந்த வழிகாட்டியின் பகுதி 3-ஐ நீங்கள் தவிர்த்திருந்தால், [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) என்ற முகவரியுடன் HelloWorld ஒப்பந்தத்தைப் பயன்படுத்தலாம். அதன் ABI-ஐ [இங்கே](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) காணலாம்.

ஒரு ஒப்பந்தம் எந்தச் சார்பை அழைக்கும் என்பதைக் குறிப்பிடுவதற்கும், நீங்கள் எதிர்பார்க்கும் வடிவத்தில் சார்பு தரவை வழங்கும் என்பதை உறுதி செய்வதற்கும் ஒரு ஒப்பந்த ABI அவசியமாகும். எங்கள் ஒப்பந்த ABI-ஐ நகலெடுத்தவுடன், அதை உங்கள் `src` கோப்பகத்தில் `contract-abi.json` என்ற JSON கோப்பாகச் சேமிப்போம்.

உங்கள் contract-abi.json உங்கள் src கோப்புறையில் சேமிக்கப்பட வேண்டும்.

எங்கள் ஒப்பந்த முகவரி, ABI மற்றும் Alchemy Web3 இறுதிப்புள்ளி ஆகியவற்றுடன், எங்கள் திறன் ஒப்பந்தத்தின் ஒரு நிகழ்வை ஏற்ற [ஒப்பந்த முறையைப் (contract method)](https://docs.web3js.org/api/web3-eth-contract/class/Contract) பயன்படுத்தலாம். உங்கள் ஒப்பந்த ABI-ஐ `interact.js` கோப்பில் இறக்குமதி செய்து உங்கள் ஒப்பந்த முகவரியைச் சேர்க்கவும்.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

இப்போது நாம் இறுதியாக எங்கள் `helloWorldContract` மாறியின் கருத்துரையை நீக்கலாம், மேலும் எங்கள் AlchemyWeb3 இறுதிப்புள்ளியைப் பயன்படுத்தி திறன் ஒப்பந்தத்தை ஏற்றலாம்:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

சுருக்கமாகக் கூறினால், உங்கள் `interact.js`-இன் முதல் 12 வரிகள் இப்போது இப்படி இருக்க வேண்டும்:

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

இப்போது எங்கள் ஒப்பந்தம் ஏற்றப்பட்டுள்ளதால், எங்கள் `loadCurrentMessage` சார்பைச் செயல்படுத்தலாம்!

#### உங்கள் `interact.js` கோப்பில் `loadCurrentMessage`-ஐச் செயல்படுத்துதல் {#implementing-loadcurrentmessage-in-your-interact-js-file}

இந்தச் சார்பு மிகவும் எளிமையானது. எங்கள் ஒப்பந்தத்திலிருந்து படிக்க ஒரு எளிய ஒத்திசைவற்ற (async) web3 அழைப்பை மேற்கொள்ளப் போகிறோம். எங்கள் சார்பு திறன் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியை வழங்கும்:

உங்கள் `interact.js` கோப்பில் உள்ள `loadCurrentMessage`-ஐப் பின்வருமாறு புதுப்பிக்கவும்:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

இந்தத் திறன் ஒப்பந்தத்தை எங்கள் UI-இல் காண்பிக்க விரும்புவதால், எங்கள் `HelloWorld.js` கூறில் உள்ள `useEffect` சார்பைப் பின்வருமாறு புதுப்பிப்போம்:

```javascript
// HelloWorld.js

//ஒரு முறை மட்டுமே அழைக்கப்படும்
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

கவனிக்கவும், கூறின் முதல் ரெண்டரின் போது எங்கள் `loadCurrentMessage` ஒருமுறை மட்டுமே அழைக்கப்பட வேண்டும் என்று நாங்கள் விரும்புகிறோம். திறன் ஒப்பந்தத்தில் செய்தி மாறிய பிறகு UI-ஐத் தானாகப் புதுப்பிக்க `addSmartContractListener`-ஐ விரைவில் செயல்படுத்துவோம்.

எங்கள் கேட்பானுக்குள் நுழைவதற்கு முன், இதுவரை எங்களிடம் உள்ளதைச் சரிபார்ப்போம்! உங்கள் `HelloWorld.js` மற்றும் `interact.js` கோப்புகளைச் சேமித்து, பின்னர் [http://localhost:3000/](http://localhost:3000/)-க்குச் செல்லவும்

தற்போதைய செய்தி இனி "பிணையத்துடன் இணைப்பு இல்லை" என்று கூறவில்லை என்பதை நீங்கள் கவனிப்பீர்கள். அதற்குப் பதிலாக இது திறன் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியைப் பிரதிபலிக்கிறது. அருமை!

#### உங்கள் UI இப்போது திறன் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியைப் பிரதிபலிக்க வேண்டும் {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

இப்போது அந்தக் கேட்பானைப் பற்றிப் பேசுகையில்...

#### `addSmartContractListener`-ஐச் செயல்படுத்தவும் {#implement-addsmartcontractlistener}

[இந்த வழிகாட்டித் தொடரின் பகுதி 1](#step-10-write-our-contract)-இல் நாங்கள் எழுதிய `HelloWorld.sol` கோப்பை நீங்கள் நினைத்துப் பார்த்தால், எங்கள் திறன் ஒப்பந்தத்தின் `update` சார்பு அழைக்கப்பட்ட பிறகு உமிழப்படும் (emitted) `UpdatedMessages` என்ற திறன் ஒப்பந்த நிகழ்வு இருப்பதை நீங்கள் நினைவுகூருவீர்கள் \(வரிகள் 9 மற்றும் 27-ஐப் பார்க்கவும்\):

```javascript
// HelloWorld.sol

// சொற்பொருள் பதிப்பாக்கத்தைப் பயன்படுத்தி, Solidity பதிப்பைக் குறிப்பிடுகிறது.
// மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// `HelloWorld` என்ற பெயரிலான ஒரு ஒப்பந்தத்தை வரையறுக்கிறது.
// ஒரு ஒப்பந்தம் என்பது செயல்பாடுகள் மற்றும் தரவுகளின் (அதன் நிலை) தொகுப்பாகும். நிலைநிறுத்தப்பட்டதும், ஒரு ஒப்பந்தம் எத்திரியம் தொகுதிச்சங்கிலியில் ஒரு குறிப்பிட்ட முகவரியில் இருக்கும். மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //புதுப்பிப்பு செயல்பாடு அழைக்கப்படும்போது வெளியிடப்படும்
   //திறன் ஒப்பந்த நிகழ்வுகள் என்பது தொகுதிச்சங்கிலியில் ஏதோ நடந்துள்ளது என்பதை உங்கள் செயலியின் முன்பக்கத்திற்கு உங்கள் ஒப்பந்தம் தொடர்புகொள்வதற்கான ஒரு வழியாகும், இது சில நிகழ்வுகளுக்காக 'காத்திருந்து' அவை நிகழும்போது நடவடிக்கை எடுக்கலாம்.
   event UpdatedMessages(string oldStr, string newStr);

   // `string` வகையிலான `message` என்ற நிலை மாறியை அறிவிக்கிறது.
   // நிலை மாறிகள் என்பவை ஒப்பந்த சேமிப்பகத்தில் நிரந்தரமாகச் சேமிக்கப்படும் மதிப்புகளைக் கொண்ட மாறிகள் ஆகும். `public` என்ற சிறப்புச்சொல் ஒரு ஒப்பந்தத்திற்கு வெளியேயிருந்து மாறிகளை அணுகக்கூடியதாக ஆக்குகிறது மற்றும் பிற ஒப்பந்தங்கள் அல்லது வாடிக்கையாளர்கள் மதிப்பை அணுக அழைக்கக்கூடிய ஒரு செயல்பாட்டை உருவாக்குகிறது.
   string public message;

   // பல வகுப்பு அடிப்படையிலான பொருள் சார்ந்த மொழிகளைப் போலவே, கன்ஸ்ட்ரக்டர் என்பது ஒப்பந்தம் உருவாக்கப்படும்போது மட்டுமே செயல்படுத்தப்படும் ஒரு சிறப்புச் செயல்பாடாகும்.
   // ஒப்பந்தத்தின் தரவைத் துவக்க கன்ஸ்ட்ரக்டர்கள் பயன்படுத்தப்படுகின்றன. மேலும் அறிய:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // `initMessage` என்ற சர வாதத்தை ஏற்றுக்கொண்டு, ஒப்பந்தத்தின் `message` சேமிப்பக மாறியில் மதிப்பை அமைக்கிறது).
      message = initMessage;
   }

   // ஒரு சர வாதத்தை ஏற்றுக்கொண்டு `message` சேமிப்பக மாறியைப் புதுப்பிக்கும் ஒரு பொதுச் செயல்பாடு.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

திறன் ஒப்பந்த நிகழ்வுகள் என்பது தொகுதிச்சங்கிலியில் ஏதோ நடந்துள்ளது \(அதாவது, ஒரு _நிகழ்வு_ இருந்தது\) என்பதை உங்கள் முன்பக்கச் செயலிக்குத் தொடர்புகொள்வதற்கான ஒரு வழியாகும், இது குறிப்பிட்ட நிகழ்வுகளுக்காக 'கேட்டுக்கொண்டிருக்கலாம்' மற்றும் அவை நிகழும்போது நடவடிக்கை எடுக்கலாம்.

`addSmartContractListener` சார்பு எங்கள் Hello World திறன் ஒப்பந்தத்தின் `UpdatedMessages` நிகழ்வைக் குறிப்பாகக் கேட்கப் போகிறது, மேலும் புதிய செய்தியைக் காண்பிக்க எங்கள் UI-ஐப் புதுப்பிக்கப் போகிறது.

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

கேட்பான் ஒரு நிகழ்வைக் கண்டறியும்போது என்ன நடக்கிறது என்பதைப் பார்ப்போம்:

- நிகழ்வு உமிழப்படும்போது பிழை ஏற்பட்டால், அது எங்கள் `status` நிலை மாறி வழியாக UI-இல் பிரதிபலிக்கும்.
- இல்லையெனில், நாங்கள் வழங்கப்பட்ட `data` பொருளைப் பயன்படுத்துவோம். `data.returnValues` என்பது பூஜ்ஜியத்தில் குறியிடப்பட்ட ஒரு அணிவரிசையாகும், அங்கு அணிவரிசையின் முதல் உறுப்பு முந்தைய செய்தியையும் இரண்டாவது உறுப்பு புதுப்பிக்கப்பட்ட செய்தியையும் சேமிக்கிறது. ஒட்டுமொத்தமாக, ஒரு வெற்றிகரமான நிகழ்வில் எங்கள் `message` சரத்தைப் புதுப்பிக்கப்பட்ட செய்திக்கு அமைப்போம், `newMessage` சரத்தை அழிப்போம், மேலும் எங்கள் திறன் ஒப்பந்தத்தில் புதிய செய்தி வெளியிடப்பட்டுள்ளது என்பதைப் பிரதிபலிக்க எங்கள் `status` நிலை மாறியைப் புதுப்பிப்போம்.

இறுதியாக, எங்கள் `useEffect` சார்பில் எங்கள் கேட்பானை அழைப்போம், இதனால் அது `HelloWorld.js` கூறின் முதல் ரெண்டரில் துவக்கப்படும். ஒட்டுமொத்தமாக, உங்கள் `useEffect` சார்பு இப்படி இருக்க வேண்டும்:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

இப்போது எங்கள் திறன் ஒப்பந்தத்திலிருந்து படிக்க முடிகிறது, அதில் எவ்வாறு எழுதுவது என்பதையும் கண்டுபிடிப்பது சிறப்பாக இருக்கும்! இருப்பினும், எங்கள் dapp-இல் எழுத, முதலில் அதனுடன் இணைக்கப்பட்ட ஒரு எத்திரியம் பணப்பை இருக்க வேண்டும்.

எனவே, அடுத்து எங்கள் எத்திரியம் பணப்பையை \(மெட்டாமேஸ்க்\) அமைப்பதையும் பின்னர் அதை எங்கள் dapp-உடன் இணைப்பதையும் கையாளுவோம்!

### படி 4: உங்கள் எத்திரியம் பணப்பையை அமைக்கவும் {#step-4-set-up-your-ethereum-wallet}

எத்திரியம் சங்கிலியில் எதையும் எழுத, பயனர்கள் தங்கள் மெய்நிகர் பணப்பையின் தனிப்பட்ட திறவுகோல்களைப் பயன்படுத்தி பரிவர்த்தனைகளில் கையொப்பமிட வேண்டும். இந்த வழிகாட்டிக்கு, உங்கள் எத்திரியம் கணக்கு முகவரியை நிர்வகிக்கப் பயன்படுத்தப்படும் உலாவியில் உள்ள மெய்நிகர் பணப்பையான [மெட்டாமேஸ்க்](https://metamask.io/)-ஐப் பயன்படுத்துவோம், ஏனெனில் இது இறுதிப் பயனருக்கு இந்தப் பரிவர்த்தனை கையொப்பமிடுதலை மிகவும் எளிதாக்குகிறது.

எத்திரியத்தில் பரிவர்த்தனைகள் எவ்வாறு செயல்படுகின்றன என்பதைப் பற்றி மேலும் புரிந்துகொள்ள விரும்பினால், எத்திரியம் அறக்கட்டளையின் [இந்தப் பக்கத்தைப்](/developers/docs/transactions/) பார்க்கவும்.

#### மெட்டாமேஸ்க்கைப் பதிவிறக்கவும் {#download-metamask}

நீங்கள் [இங்கே](https://metamask.io/download) இலவசமாக மெட்டாமேஸ்க் கணக்கைப் பதிவிறக்கம் செய்து உருவாக்கலாம். நீங்கள் ஒரு கணக்கை உருவாக்கும்போது, அல்லது உங்களிடம் ஏற்கனவே கணக்கு இருந்தால், மேல் வலதுபுறத்தில் உள்ள “Goerli Test Network”-க்கு மாறுவதை உறுதிசெய்து கொள்ளுங்கள் \(இதனால் நாங்கள் உண்மையான பணத்தைக் கையாள மாட்டோம்\).

#### ஒரு பாசெட்டிலிருந்து ஈதரைச் சேர்க்கவும் {#add-ether-from-a-faucet}

எத்திரியம் தொகுதிச்சங்கிலியில் ஒரு பரிவர்த்தனையில் கையொப்பமிட, எங்களுக்குச் சில போலி ETH தேவைப்படும். ETH-ஐப் பெற நீங்கள் [FaucETH](https://fauceth.komputing.org)-க்குச் சென்று உங்கள் கோர்லி கணக்கு முகவரியை உள்ளிட்டு, “Request funds”-ஐக் கிளிக் செய்து, பின்னர் கீழ்தோன்றும் பட்டியலில் “Ethereum Testnet Goerli”-ஐத் தேர்ந்தெடுத்து இறுதியாக மீண்டும் “Request funds” பொத்தானைக் கிளிக் செய்யலாம். சிறிது நேரத்திலேயே உங்கள் மெட்டாமேஸ்க் கணக்கில் ETH-ஐக் காண்பீர்கள்!

#### உங்கள் இருப்பைச் சரிபார்க்கவும்
நமது இருப்பு அங்கு உள்ளதா என்பதை இருமுறை சரிபார்க்க, [Alchemy-யின் சாண்ட்பாக்ஸ் கருவியைப்](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) பயன்படுத்தி ஒரு [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) கோரிக்கையைச் செய்வோம். இது நமது பணப்பையில் உள்ள ETH அளவை வழங்கும். உங்கள் மெட்டாமேஸ்க் கணக்கு முகவரியை உள்ளிட்டு, “Send Request” என்பதைக் கிளிக் செய்த பிறகு, இதுபோன்று ஒரு பதிலைக் காண வேண்டும்:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**குறிப்பு:** இந்த முடிவு wei-இல் உள்ளது, ETH-இல் அல்ல. ஈதரின் மிகச்சிறிய மதிப்பாக wei பயன்படுத்தப்படுகிறது. wei-இலிருந்து ETH-க்கு மாற்றுவது: 1 ETH = 10¹⁸ wei. எனவே 0xde0b6b3a7640000 என்பதை தசமத்திற்கு மாற்றினால் 1\*10¹⁸ கிடைக்கும், இது 1 ETH-க்கு சமம்.

அப்பாடா! நமது போலிப் பணம் அனைத்தும் அங்கு உள்ளது! 🤑
### படி 5: மெட்டாமேஸ்க்கை உங்கள் UI-உடன் இணைக்கவும் {#step-5-connect-metamask-to-your-ui}

இப்போது எங்கள் மெட்டாமேஸ்க் பணப்பை அமைக்கப்பட்டுள்ளதால், எங்கள் dapp-ஐ அதனுடன் இணைப்போம்!

#### `connectWallet` சார்பு {#the-connectwallet-function}

எங்கள் `interact.js` கோப்பில், `connectWallet` சார்பைச் செயல்படுத்துவோம், பின்னர் அதை எங்கள் `HelloWorld.js` கூறில் அழைக்கலாம்.

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

எனவே இந்த மாபெரும் குறியீட்டுத் தொகுதி சரியாக என்ன செய்கிறது?

சரி, முதலில், உங்கள் உலாவியில் `window.ethereum` இயக்கப்பட்டுள்ளதா என்பதை இது சரிபார்க்கிறது.

`window.ethereum` என்பது மெட்டாமேஸ்க் மற்றும் பிற பணப்பை வழங்குநர்களால் உட்செலுத்தப்பட்ட ஒரு உலகளாவிய API ஆகும், இது பயனர்களின் எத்திரியம் கணக்குகளைக் கோர வலைத்தளங்களை அனுமதிக்கிறது. அங்கீகரிக்கப்பட்டால், பயனர் இணைக்கப்பட்டுள்ள தொகுதிச்சங்கிலிகளிலிருந்து தரவைப் படிக்கலாம், மேலும் செய்திகள் மற்றும் பரிவர்த்தனைகளில் கையொப்பமிட பயனருக்குப் பரிந்துரைக்கலாம். மேலும் தகவலுக்கு [மெட்டாமேஸ்க் ஆவணங்களைப்](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) பார்க்கவும்!

`window.ethereum` _இல்லையென்றால்_, மெட்டாமேஸ்க் நிறுவப்படவில்லை என்று அர்த்தம். இதன் விளைவாக ஒரு JSON பொருள் வழங்கப்படுகிறது, அங்கு வழங்கப்பட்ட `address` ஒரு வெற்று சரமாகும், மேலும் `status` JSX பொருள் பயனர் மெட்டாமேஸ்க்கை நிறுவ வேண்டும் என்பதைத் தெரிவிக்கிறது.

இப்போது `window.ethereum` _இருந்தால்_, அப்போதுதான் விஷயங்கள் சுவாரஸ்யமாகின்றன.

ஒரு try/catch லூப்பைப் பயன்படுத்தி, [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts)-ஐ அழைப்பதன் மூலம் மெட்டாமேஸ்க்குடன் இணைக்க முயற்சிப்போம். இந்தச் சார்பை அழைப்பது உலாவியில் மெட்டாமேஸ்க்கைத் திறக்கும், இதன் மூலம் பயனர் தங்கள் பணப்பையை உங்கள் dapp-உடன் இணைக்கத் தூண்டப்படுவார்.

- பயனர் இணைக்கத் தேர்வுசெய்தால், `method: "eth_requestAccounts"` dapp-உடன் இணைக்கப்பட்ட பயனரின் அனைத்து கணக்கு முகவரிகளையும் கொண்ட ஒரு அணிவரிசையை வழங்கும். ஒட்டுமொத்தமாக, எங்கள் `connectWallet` சார்பு இந்த அணிவரிசையில் உள்ள _முதல்_ `address` \(வரி 9-ஐப் பார்க்கவும்\) மற்றும் திறன் ஒப்பந்தத்தில் ஒரு செய்தியை எழுத பயனரைத் தூண்டும் ஒரு `status` செய்தியைக் கொண்ட ஒரு JSON பொருளை வழங்கும்.
- பயனர் இணைப்பை நிராகரித்தால், JSON பொருள் வழங்கப்பட்ட `address`-க்கு ஒரு வெற்று சரத்தையும், பயனர் இணைப்பை நிராகரித்தார் என்பதைப் பிரதிபலிக்கும் ஒரு `status` செய்தியையும் கொண்டிருக்கும்.

இப்போது இந்த `connectWallet` சார்பை எழுதியுள்ளதால், அடுத்த படி அதை எங்கள் `HelloWorld.js` கூறில் அழைப்பதாகும்.

#### உங்கள் `HelloWorld.js` UI கூறில் `connectWallet` சார்பைச் சேர்க்கவும் {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

`HelloWorld.js`-இல் உள்ள `connectWalletPressed` சார்புக்குச் சென்று, அதைப் பின்வருமாறு புதுப்பிக்கவும்:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

எங்கள் செயல்பாட்டின் பெரும்பகுதி `interact.js` கோப்பிலிருந்து எங்கள் `HelloWorld.js` கூறிலிருந்து எவ்வாறு சுருக்கப்பட்டுள்ளது என்பதைக் கவனியுங்கள்? M-V-C முன்னுதாரணத்துடன் நாங்கள் இணங்குவதற்காகவே இது!

`connectWalletPressed`-இல், நாங்கள் இறக்குமதி செய்த `connectWallet` சார்புக்கு ஒரு await அழைப்பை மேற்கொள்கிறோம், மேலும் அதன் பதிலைப் பயன்படுத்தி, அவற்றின் நிலை ஹூக்குகள் வழியாக எங்கள் `status` மற்றும் `walletAddress` மாறிகளைப் புதுப்பிக்கிறோம்.

இப்போது, இரண்டு கோப்புகளையும் \(`HelloWorld.js` மற்றும் `interact.js`\) சேமித்து, இதுவரை எங்கள் UI-ஐச் சோதிப்போம்.

[http://localhost:3000/](http://localhost:3000/) பக்கத்தில் உங்கள் உலாவியைத் திறந்து, பக்கத்தின் மேல் வலதுபுறத்தில் உள்ள "Connect Wallet" பொத்தானை அழுத்தவும்.

நீங்கள் மெட்டாமேஸ்க்கை நிறுவியிருந்தால், உங்கள் பணப்பையை உங்கள் dapp-உடன் இணைக்கத் தூண்டப்படுவீர்கள். இணைப்பதற்கான அழைப்பை ஏற்கவும்.

பணப்பை பொத்தான் இப்போது உங்கள் முகவரி இணைக்கப்பட்டுள்ளதைப் பிரதிபலிப்பதை நீங்கள் காண வேண்டும்! ஆமாம் 🔥

அடுத்து, பக்கத்தைப் புதுப்பிக்க முயற்சிக்கவும்... இது விசித்திரமாக உள்ளது. எங்கள் பணப்பை பொத்தான் ஏற்கனவே இணைக்கப்பட்டிருந்தாலும், மெட்டாமேஸ்க்கை இணைக்க எங்களைத் தூண்டுகிறது...

இருப்பினும், பயப்பட வேண்டாம்! `getCurrentWalletConnected`-ஐச் செயல்படுத்துவதன் மூலம் அதை நாங்கள் எளிதாகக் கையாளலாம் (புரிகிறதா?), இது ஒரு முகவரி ஏற்கனவே எங்கள் dapp-உடன் இணைக்கப்பட்டுள்ளதா என்பதைச் சரிபார்த்து அதற்கேற்ப எங்கள் UI-ஐப் புதுப்பிக்கும்!

#### `getCurrentWalletConnected` சார்பு {#the-getcurrentwalletconnected-function}

`interact.js` கோப்பில் உள்ள உங்கள் `getCurrentWalletConnected` சார்பைப் பின்வருமாறு புதுப்பிக்கவும்:

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

இந்தக் குறியீடு முந்தைய படியில் நாம் எழுதிய `connectWallet` சார்புக்கு _மிகவும்_ ஒத்திருக்கிறது.

முக்கிய வேறுபாடு என்னவென்றால், பயனர் தங்கள் பணப்பையை இணைக்க மெட்டாமேஸ்க்கைத் திறக்கும் `eth_requestAccounts` முறையை அழைப்பதற்குப் பதிலாக, இங்கே நாங்கள் `eth_accounts` முறையை அழைக்கிறோம், இது தற்போது எங்கள் dapp-உடன் இணைக்கப்பட்டுள்ள மெட்டாமேஸ்க் முகவரிகளைக் கொண்ட ஒரு அணிவரிசையை வெறுமனே வழங்குகிறது.

இந்தச் சார்பு செயல்படுவதைக் காண, எங்கள் `HelloWorld.js` கூறின் `useEffect` சார்பில் அதை அழைப்போம்:

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

கவனிக்கவும், எங்கள் `walletAddress` மற்றும் `status` நிலை மாறிகளைப் புதுப்பிக்க `getCurrentWalletConnected`-க்கான எங்கள் அழைப்பின் பதிலைப் பயன்படுத்துகிறோம்.

இப்போது நீங்கள் இந்தக் குறியீட்டைச் சேர்த்துள்ளதால், எங்கள் உலாவி சாளரத்தைப் புதுப்பிக்க முயற்சிப்போம்.

அருமை! நீங்கள் இணைக்கப்பட்டுள்ளீர்கள் என்று பொத்தான் கூற வேண்டும், மேலும் நீங்கள் புதுப்பித்த பிறகும் - உங்கள் இணைக்கப்பட்ட பணப்பையின் முகவரியின் முன்னோட்டத்தைக் காட்ட வேண்டும்!

#### `addWalletListener`-ஐச் செயல்படுத்தவும் {#implement-addwalletlistener}

எங்கள் dapp பணப்பை அமைப்பில் இறுதிப் படி பணப்பை கேட்பானைச் செயல்படுத்துவதாகும், இதனால் பயனர் கணக்குகளைத் துண்டிக்கும்போது அல்லது மாற்றும்போது போன்ற எங்கள் பணப்பையின் நிலை மாறும்போது எங்கள் UI புதுப்பிக்கப்படும்.

உங்கள் `HelloWorld.js` கோப்பில், உங்கள் `addWalletListener` சார்பைப் பின்வருமாறு மாற்றவும்:

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

இந்தக் கட்டத்தில் இங்கே என்ன நடக்கிறது என்பதைப் புரிந்துகொள்ள உங்களுக்கு எங்கள் உதவி கூடத் தேவையில்லை என்று நான் பந்தயம் கட்டுகிறேன், ஆனால் முழுமைக்காக, அதை விரைவாகப் பிரிப்போம்:

- முதலில், எங்கள் சார்பு `window.ethereum` இயக்கப்பட்டுள்ளதா என்பதைச் சரிபார்க்கிறது \(அதாவது, மெட்டாமேஸ்க் நிறுவப்பட்டுள்ளது\).
  - இல்லையென்றால், மெட்டாமேஸ்க்கை நிறுவ பயனரைத் தூண்டும் ஒரு JSX சரத்திற்கு எங்கள் `status` நிலை மாறியை வெறுமனே அமைப்போம்.
  - அது இயக்கப்பட்டிருந்தால், வரி 3-இல் `window.ethereum.on("accountsChanged")` கேட்பானை அமைப்போம், இது மெட்டாமேஸ்க் பணப்பையில் நிலை மாற்றங்களைக் கேட்கிறது, இதில் பயனர் dapp-உடன் கூடுதல் கணக்கை இணைக்கும்போது, கணக்குகளை மாற்றும்போது அல்லது கணக்கைத் துண்டிக்கும்போது ஆகியவை அடங்கும். குறைந்தது ஒரு கணக்காவது இணைக்கப்பட்டிருந்தால், கேட்பான் வழங்கிய `accounts` அணிவரிசையில் முதல் கணக்காக `walletAddress` நிலை மாறி புதுப்பிக்கப்படும். இல்லையெனில், `walletAddress` ஒரு வெற்று சரமாக அமைக்கப்படும்.

கடைசியாக, அதை எங்கள் `useEffect` சார்பிலும் அழைக்க வேண்டும்:

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

அவ்வளவுதான்! எங்கள் பணப்பை செயல்பாடு அனைத்தையும் வெற்றிகரமாக நிரல் செய்து முடித்துவிட்டோம்! இப்போது எங்கள் கடைசிப் பணிக்கு: எங்கள் திறன் ஒப்பந்தத்தில் சேமிக்கப்பட்டுள்ள செய்தியைப் புதுப்பித்தல்!

### படி 6: `updateMessage` சார்பைச் செயல்படுத்தவும் {#step-6-implement-the-updatemessage-function}

சரி நண்பர்களே, நாங்கள் இறுதி கட்டத்தை அடைந்துவிட்டோம்! உங்கள் `interact.js` கோப்பின் `updateMessage`-இல், நாங்கள் பின்வருவனவற்றைச் செய்யப் போகிறோம்:

1. எங்கள் திறன் ஒப்பந்தத்தில் நாங்கள் வெளியிட விரும்பும் செய்தி செல்லுபடியாகும் என்பதை உறுதிப்படுத்தவும்
2. மெட்டாமேஸ்க் பயன்படுத்தி எங்கள் பரிவர்த்தனையில் கையொப்பமிடவும்
3. எங்கள் `HelloWorld.js` முன்பக்கக் கூறிலிருந்து இந்தச் சார்பை அழைக்கவும்

இதற்கு அதிக நேரம் ஆகாது; இந்த dapp-ஐ முடிப்போம்!

#### உள்ளீட்டுப் பிழையைக் கையாளுதல் {#input-error-handling}

இயற்கையாகவே, சார்பின் தொடக்கத்தில் ஒருவித உள்ளீட்டுப் பிழையைக் கையாளுவது அர்த்தமுள்ளதாக இருக்கும்.

மெட்டாமேஸ்க் நீட்டிப்பு நிறுவப்படவில்லை என்றால், பணப்பை இணைக்கப்படவில்லை என்றால் \(அதாவது, அனுப்பப்பட்ட `address` ஒரு வெற்று சரம்\), அல்லது `message` ஒரு வெற்று சரம் என்றால் எங்கள் சார்பு முன்கூட்டியே திரும்ப வேண்டும் என்று நாங்கள் விரும்புவோம். `updateMessage`-க்கு பின்வரும் பிழையைக் கையாளுதலைச் சேர்ப்போம்:

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

இப்போது அது சரியான உள்ளீட்டுப் பிழையைக் கையாளுதலைக் கொண்டிருப்பதால், மெட்டாமேஸ்க் வழியாகப் பரிவர்த்தனையில் கையொப்பமிடுவதற்கான நேரம் இது!

#### எங்கள் பரிவர்த்தனையில் கையொப்பமிடுதல் {#signing-our-transaction}

பாரம்பரிய web3 எத்திரியம் பரிவர்த்தனைகளில் நீங்கள் ஏற்கனவே வசதியாக இருந்தால், அடுத்து நாங்கள் எழுதும் குறியீடு மிகவும் பரிச்சயமானதாக இருக்கும். உங்கள் உள்ளீட்டுப் பிழையைக் கையாளும் குறியீட்டிற்குக் கீழே, `updateMessage`-க்கு பின்வருவனவற்றைச் சேர்க்கவும்:

```javascript
// interact.js

//பரிவர்த்தனை அளவுருக்களை அமைக்கவும்
const transactionParameters = {
  to: contractAddress, // ஒப்பந்த வெளியீடுகளின் போது தவிர மற்ற நேரங்களில் தேவை.
  from: address, // பயனரின் செயலில் உள்ள முகவரியுடன் பொருந்த வேண்டும்.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//பரிவர்த்தனையில் கையொப்பமிடவும்
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

என்ன நடக்கிறது என்பதைப் பிரிப்போம். முதலில், எங்கள் பரிவர்த்தனை அளவுருக்களை (parameters) அமைக்கிறோம், அங்கு:

- `to` பெறுநரின் முகவரியைக் குறிப்பிடுகிறது \(எங்கள் திறன் ஒப்பந்தம்\)
- `from` பரிவர்த்தனையில் கையொப்பமிடுபவரைக் குறிப்பிடுகிறது, எங்கள் சார்புக்கு நாங்கள் அனுப்பிய `address` மாறி
- `data` எங்கள் Hello World திறன் ஒப்பந்தத்தின் `update` முறைக்கான அழைப்பைக் கொண்டுள்ளது, எங்கள் `message` சரம் மாறியை உள்ளீடாகப் பெறுகிறது

பின்னர், நாங்கள் ஒரு await அழைப்பை மேற்கொள்கிறோம், `window.ethereum.request`, அங்கு பரிவர்த்தனையில் கையொப்பமிடுமாறு மெட்டாமேஸ்க்கைக் கேட்கிறோம். கவனிக்கவும், 11 மற்றும் 12 வரிகளில், எங்கள் eth முறையான `eth_sendTransaction`-ஐக் குறிப்பிடுகிறோம் மற்றும் எங்கள் `transactionParameters`-ஐ அனுப்புகிறோம்.

இந்தக் கட்டத்தில், மெட்டாமேஸ்க் உலாவியில் திறக்கப்படும், மேலும் பரிவர்த்தனையில் கையொப்பமிட அல்லது நிராகரிக்க பயனரைத் தூண்டும்.

- பரிவர்த்தனை வெற்றிகரமாக இருந்தால், சார்பு ஒரு JSON பொருளை வழங்கும், அங்கு `status` JSX சரம் பயனரின் பரிவர்த்தனை பற்றிய கூடுதல் தகவலுக்கு Etherscan-ஐப் பார்க்கத் தூண்டுகிறது.
- பரிவர்த்தனை தோல்வியுற்றால், சார்பு ஒரு JSON பொருளை வழங்கும், அங்கு `status` சரம் பிழைச் செய்தியைத் தெரிவிக்கிறது.

ஒட்டுமொத்தமாக, எங்கள் `updateMessage` சார்பு இப்படி இருக்க வேண்டும்:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //உள்ளீட்டுப் பிழை கையாளுதல்
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

  //பரிவர்த்தனை அளவுருக்களை அமைக்கவும்
  const transactionParameters = {
    to: contractAddress, // ஒப்பந்த வெளியீடுகளின் போது தவிர மற்ற நேரங்களில் தேவை.
    from: address, // பயனரின் செயலில் உள்ள முகவரியுடன் பொருந்த வேண்டும்.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //பரிவர்த்தனையில் கையொப்பமிடவும்
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

கடைசியாக, எங்கள் `updateMessage` சார்பை எங்கள் `HelloWorld.js` கூறுடன் இணைக்க வேண்டும்.

#### `updateMessage`-ஐ `HelloWorld.js` முன்பக்கத்துடன் இணைக்கவும் {#connect-updatemessage-to-the-helloworld-js-frontend}

எங்கள் `onUpdatePressed` சார்பு இறக்குமதி செய்யப்பட்ட `updateMessage` சார்புக்கு ஒரு await அழைப்பை மேற்கொள்ள வேண்டும் மற்றும் எங்கள் பரிவர்த்தனை வெற்றி பெற்றதா அல்லது தோல்வியடைந்ததா என்பதைப் பிரதிபலிக்க `status` நிலை மாறியை மாற்ற வேண்டும்:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

இது மிகவும் சுத்தமாகவும் எளிமையாகவும் உள்ளது. மேலும் என்னவென்று யூகியுங்கள்... உங்கள் DAPP முடிந்தது!!!

முன்னேறி **Update** பொத்தானைச் சோதிக்கவும்!

### உங்கள் சொந்த தனிப்பயன் dapp-ஐ உருவாக்கவும் {#make-your-own-custom-dapp}

வாவ், நீங்கள் வழிகாட்டியின் முடிவை அடைந்துவிட்டீர்கள்! சுருக்கமாகக் கூறினால், நீங்கள் பின்வருவனவற்றை எப்படிச் செய்வது என்று கற்றுக்கொண்டீர்கள்:

- உங்கள் dapp திட்டத்துடன் ஒரு மெட்டாமேஸ்க் பணப்பையை இணைப்பது
- [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) API-ஐப் பயன்படுத்தி உங்கள் திறன் ஒப்பந்தத்திலிருந்து தரவைப் படிப்பது
- மெட்டாமேஸ்க் பயன்படுத்தி எத்திரியம் பரிவர்த்தனைகளில் கையொப்பமிடுவது

இப்போது உங்கள் சொந்த தனிப்பயன் dapp திட்டத்தை உருவாக்க இந்த வழிகாட்டியிலிருந்து திறன்களைப் பயன்படுத்த நீங்கள் முழுமையாகத் தயாராகிவிட்டீர்கள்! எப்போதும் போல, உங்களுக்கு ஏதேனும் கேள்விகள் இருந்தால், [Alchemy டிஸ்கார்ட்டில்](https://discord.gg/gWuC7zB) உதவிக்கு எங்களைத் தொடர்புகொள்ளத் தயங்க வேண்டாம். 🧙‍♂️

இந்த வழிகாட்டியை நீங்கள் முடித்தவுடன், ட்விட்டரில் [@alchemyplatform](https://twitter.com/AlchemyPlatform)-ஐக் குறியிடுவதன் மூலம் உங்கள் அனுபவம் எப்படி இருந்தது அல்லது உங்களுக்கு ஏதேனும் கருத்துகள் இருந்தால் எங்களுக்குத் தெரியப்படுத்துங்கள்!

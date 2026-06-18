---
title: "JavaScript API நிரலகங்கள்"
description: "உங்கள் பயன்பாட்டிலிருந்து தொகுதிச்சங்கிலியுடன் தொடர்பு கொள்ள அனுமதிக்கும் JavaScript கிளையண்ட் நிரலகங்கள் பற்றிய அறிமுகம்."
lang: ta
---

ஒரு வலைப் பயன்பாடு எத்திரியம் தொகுதிச்சங்கிலியுடன் தொடர்பு கொள்ள (அதாவது, தொகுதிச்சங்கிலி தரவைப் படிக்க மற்றும்/அல்லது பிணையத்திற்கு பரிவர்த்தனைகளை அனுப்ப), அது ஒரு எத்திரியம் கணுவுடன் இணைக்கப்பட வேண்டும்.

இந்த நோக்கத்திற்காக, ஒவ்வொரு எத்திரியம் கிளையண்டும் [ஜேசன்-ஆர்பிசி](/developers/docs/apis/json-rpc/) விவரக்குறிப்பைச் செயல்படுத்துகிறது, எனவே பயன்பாடுகள் நம்பியிருக்கக்கூடிய சீரான [முறைகள்](/developers/docs/apis/json-rpc/#json-rpc-methods) உள்ளன.

எத்திரியம் கணுவுடன் இணைக்க நீங்கள் JavaScript-ஐப் பயன்படுத்த விரும்பினால், சாதாரண JavaScript-ஐப் பயன்படுத்த முடியும், ஆனால் இதை மிகவும் எளிதாக்கும் பல வசதியான நிரலகங்கள் சுற்றுச்சூழல் அமைப்பிற்குள் உள்ளன. இந்த நிரலகங்கள் மூலம், டெவலப்பர்கள் எத்திரியத்துடன் தொடர்பு கொள்ளும் ஜேசன்-ஆர்பிசி கோரிக்கைகளை (உள்நிலையில்) தொடங்குவதற்கு உள்ளுணர்வுள்ள, ஒரு வரி முறைகளை எழுதலாம்.

[ஒருங்கிணைப்பு](/roadmap/merge/) முதல், ஒரு கணுவை இயக்க இரண்டு இணைக்கப்பட்ட எத்திரியம் மென்பொருள்கள் - ஒரு செயலாக்கக் கிளையண்ட் மற்றும் ஒரு ஒருமித்த கிளையன்ட் - தேவை என்பதை நினைவில் கொள்ளவும். உங்கள் கணுவில் செயலாக்க மற்றும் ஒருமித்த கிளையன்ட் இரண்டும் இருப்பதை உறுதிசெய்யவும். உங்கள் கணு உங்கள் உள்ளூர் கணினியில் இல்லை என்றால் (எ.கா., உங்கள் கணு AWS நிகழ்வில் இயங்குகிறது) அதற்கேற்ப டுடோரியலில் உள்ள IP முகவரிகளைப் புதுப்பிக்கவும். மேலும் தகவலுக்கு, [கணுவை இயக்குவது](/developers/docs/nodes-and-clients/run-a-node/) குறித்த எங்கள் பக்கத்தைப் பார்க்கவும்.

## முன்நிபந்தனைகள் {#prerequisites}

JavaScript-ஐப் புரிந்துகொள்வதோடு, [எத்திரியம் அடுக்கு](/developers/docs/ethereum-stack/) மற்றும் [எத்திரியம் கிளையண்டுகளைப்](/developers/docs/nodes-and-clients/) புரிந்துகொள்வதும் உதவியாக இருக்கும்.

## நிரலகத்தை ஏன் பயன்படுத்த வேண்டும்? {#why-use-a-library}

இந்த நிரலகங்கள் எத்திரியம் கணுவுடன் நேரடியாகத் தொடர்புகொள்வதில் உள்ள சிக்கலான தன்மையைப் பெரிதும் குறைக்கின்றன. அவை பயன்பாட்டுச் செயல்பாடுகளையும் (எ.கா., ETH-ஐ Gwei ஆக மாற்றுவது) வழங்குகின்றன, எனவே ஒரு டெவலப்பராக நீங்கள் எத்திரியம் கிளையண்டுகளின் சிக்கல்களைக் கையாள்வதில் குறைந்த நேரத்தையும், உங்கள் பயன்பாட்டின் தனித்துவமான செயல்பாட்டில் அதிக நேரத்தையும் செலவிடலாம்.

## நிரலகத்தின் அம்சங்கள் {#library-features}

### எத்திரியம் கணுக்களுடன் இணைக்கவும் {#connect-to-ethereum-nodes}

வழங்குநர்களைப் பயன்படுத்தி, ஜேசன்-ஆர்பிசி, Infura, Etherscan, Alchemy அல்லது மெட்டாமேஸ்க் வழியாக இருந்தாலும், எத்திரியத்துடன் இணைக்கவும் அதன் தரவைப் படிக்கவும் இந்த நிரலகங்கள் உங்களை அனுமதிக்கின்றன.

> **எச்சரிக்கை:** Web3.js மார்ச் 4, 2025 அன்று காப்பகப்படுத்தப்பட்டது. [அறிவிப்பைப் படிக்கவும்](https://blog.chainsafe.io/web3-js-sunset/). புதிய திட்டங்களுக்கு [Ethers.js](https://ethers.அல்லதுg) அல்லது [Viem](https://viem.sh) போன்ற மாற்று நிரலகங்களைப் பயன்படுத்துவதைக் கருத்தில் கொள்ளவும்.

**Ethers எடுத்துக்காட்டு**

```js
// ஒரு BrowserProvider ஒரு நிலையான Web3 வழங்குநரை மூடுகிறது, இது
// மெட்டாமேஸ்க் ஒவ்வொரு பக்கத்திலும் window.ethereum ஆக உட்செலுத்துகிறது
const provider = new ethers.BrowserProvider(window.ethereum)

// மெட்டாமேஸ்க் செருகுநிரல் பரிவர்த்தனைகளில் கையொப்பமிடவும் அனுமதிக்கிறது
// ஈதரை அனுப்பவும், தொகுதிச்சங்கிலிக்குள் நிலையை மாற்ற பணம் செலுத்தவும்.
// இதற்கு, நமக்கு கணக்கு கையொப்பமிடுபவர் தேவை...
const signer = provider.getSigner()
```

**Web3.js எடுத்துக்காட்டு**

```js
var web3 = new Web3("http://localhost:8545")
// அல்லது
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// வழங்குநரை மாற்றவும்
web3.setProvider("ws://localhost:8546")
// அல்லது
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// node.js இல் IPC வழங்குநரைப் பயன்படுத்துதல்
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os பாதை
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os பாதை
// windows இல் பாதை: "\\\\.\\pipe\\geth.ipc"
// linux இல் பாதை: "/users/myuser/.ethereum/geth.ipc"
```

அமைக்கப்பட்டதும், தொகுதிச்சங்கிலியில் பின்வருவனவற்றைக் கேட்க முடியும்:

- தொகுதி எண்கள்
- எரிவாயு மதிப்பீடுகள்
- திறன் ஒப்பந்த நிகழ்வுகள்
- பிணைய ஐடி
- மற்றும் பல...

### பணப்பை செயல்பாடு {#wallet-functionality}

பணப்பைகளை உருவாக்கவும், திறவுகோல்களை நிர்வகிக்கவும் மற்றும் பரிவர்த்தனைகளில் கையொப்பமிடவும் இந்த நிரலகங்கள் உங்களுக்குச் செயல்பாட்டை வழங்குகின்றன.

Ethers-லிருந்து ஒரு எடுத்துக்காட்டு இங்கே

```js
// நினைவூட்டலிலிருந்து ஒரு பணப்பை நிகழ்வை உருவாக்கவும்...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...அல்லது தனிப்பட்ட திறவுகோலிலிருந்து
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Signer API இன் படி ஒரு Promise ஆக முகவரி
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// ஒரு பணப்பை முகவரி ஒத்திசைவாகவும் கிடைக்கிறது
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// உள் கிரிப்டோகிராஃபிக் கூறுகள்
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// பணப்பை நினைவூட்டல்
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// குறிப்பு: தனிப்பட்ட திறவுகோலைக் கொண்டு உருவாக்கப்பட்ட பணப்பை
//       நினைவூட்டலைக் கொண்டிருக்காது (வழித்தோன்றல் அதைத் தடுக்கிறது)
walletPrivateKey.mnemonic
// null

// ஒரு செய்தியில் கையொப்பமிடுதல்
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// ஒரு பரிவர்த்தனையில் கையொப்பமிடுதல்
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// connect முறையானது இதன் புதிய நிகழ்வை வழங்குகிறது
// வழங்குநருடன் இணைக்கப்பட்ட பணப்பை
wallet = walletMnemonic.connect(provider)

// பிணையத்தை வினவுதல்
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// ஈதரை அனுப்புதல்
wallet.sendTransaction(tx)
```

[முழு ஆவணங்களையும் படிக்கவும்](https://docs.ethers.io/v5/api/signer/#Wallet)

அமைக்கப்பட்டதும் உங்களால் பின்வருவனவற்றைச் செய்ய முடியும்:

- கணக்குகளை உருவாக்க
- பரிவர்த்தனைகளை அனுப்ப
- பரிவர்த்தனைகளில் கையொப்பமிட
- மற்றும் பல...

### திறன் ஒப்பந்தச் செயல்பாடுகளுடன் தொடர்பு கொள்ளவும் {#interact-with-smart-contract-functions}

தொகுக்கப்பட்ட ஒப்பந்தத்தின் பயன்பாட்டு பைனரி இடைமுகத்தை (Application Binary Interface - ABI) படிப்பதன் மூலம் திறன் ஒப்பந்தச் செயல்பாடுகளை அழைக்க JavaScript கிளையண்ட் நிரலகங்கள் உங்கள் பயன்பாட்டை அனுமதிக்கின்றன.

ABI அடிப்படையில் ஒப்பந்தத்தின் செயல்பாடுகளை JSON வடிவத்தில் விளக்குகிறது மற்றும் அதை ஒரு சாதாரண JavaScript பொருளைப் போலப் பயன்படுத்த உங்களை அனுமதிக்கிறது.

எனவே பின்வரும் Solidity ஒப்பந்தம்:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

பின்வரும் JSON-ஐ விளைவிக்கும்:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

இதன் பொருள் உங்களால் முடியும்:

- திறன் ஒப்பந்தத்திற்கு ஒரு பரிவர்த்தனையை அனுப்பி அதன் முறையைச் செயல்படுத்த
- EVM-இல் செயல்படுத்தப்படும் போது ஒரு முறை செயலாக்கத்திற்குத் தேவைப்படும் எரிவாயுவை மதிப்பிட அழைக்க
- ஒரு ஒப்பந்தத்தை நிலைநிறுத்த
- மற்றும் பல...

### பயன்பாட்டுச் செயல்பாடுகள் {#utility-functions}

பயன்பாட்டுச் செயல்பாடுகள் எத்திரியத்துடன் உருவாக்குவதை சற்று எளிதாக்கும் எளிமையான குறுக்குவழிகளை உங்களுக்கு வழங்குகின்றன.

ETH மதிப்புகள் இயல்பாகவே Wei-இல் இருக்கும். 1 ETH = 1,000,000,000,000,000,000 WEI – அதாவது நீங்கள் நிறைய எண்களைக் கையாளுகிறீர்கள்! `web3.utils.toWei` உங்களுக்காக ஈதரை Wei ஆக மாற்றுகிறது.

மேலும் Ethers-இல் இது இப்படித் தெரிகிறது:

```js
// ஒரு கணக்கின் இருப்பைப் பெறவும் (முகவரி அல்லது ENS பெயர் மூலம்)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// பெரும்பாலும் நீங்கள் பயனருக்கான வெளியீட்டை வடிவமைக்க வேண்டும்
// அவர்கள் மதிப்புகளை (Wei க்கு பதிலாக) ஈதரில் பார்க்க விரும்புவார்கள்
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3.js பயன்பாட்டுச் செயல்பாடுகள்](https://docs.web3js.org/api/web3-utils)
- [Ethers பயன்பாட்டுச் செயல்பாடுகள்](https://docs.ethers.org/v6/api/utils/)

## கிடைக்கும் நிரலகங்கள் {#available-libraries}

**Web3.js -** **_எத்திரியம் JavaScript API._**

- [ஆவணங்கள்](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_JavaScript மற்றும் TypeScript-இல் முழுமையான எத்திரியம் பணப்பைச் செயலாக்கம் மற்றும் பயன்பாடுகள்._**

- [Ethers.js முகப்பு](https://ethers.org/)
- [ஆவணங்கள்](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_எத்திரியம் மற்றும் IPFS தரவை அட்டவணைப்படுத்துவதற்கும் GraphQL-ஐப் பயன்படுத்தி அதைக் கேட்பதற்குமான ஒரு நெறிமுறை._**

- [The Graph](https://thegraph.com)
- [Graph எக்ஸ்ப்ளோரர்](https://thegraph.com/explorer)
- [ஆவணங்கள்](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [டிஸ்கார்ட்](https://thegraph.com/discord)

**Alchemy SDK -** **_மேம்படுத்தப்பட்ட API-களுடன் Ethers.js-ஐச் சுற்றியுள்ள ரேப்பர்._**

- [ஆவணங்கள்](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**Viem -** **_எத்திரியத்திற்கான TypeScript இடைமுகம்._**

- [ஆவணங்கள்](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_டஜன் கணக்கான சங்கிலிகளில் நிகழ்நேர, செறிவூட்டப்பட்ட தொகுதிச்சங்கிலி தரவு API._**

- [ஆவணங்கள்](https://docs.codex.io)
- [எக்ஸ்ப்ளோரர்](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [டிஸ்கார்ட்](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_உள்ளமைக்கப்பட்ட தேக்ககம், ஹூக்குகள் மற்றும் சோதனை மாக்குகளைக் கொண்ட TypeScript மெட்டா-நிரலகம்._**

- [ஆவணங்கள்](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## மேலும் படிக்க {#further-reading}

_உங்களுக்கு உதவிய சமூக வளம் பற்றித் தெரியுமா? இந்தப் பக்கத்தைத் திருத்தி அதைச் சேர்க்கவும்!_

## தொடர்புடைய தலைப்புகள் {#related-topics}

- [கணுக்கள் மற்றும் கிளையண்டுகள்](/developers/docs/nodes-and-clients/)
- [மேம்பாட்டுச் சட்டகங்கள்](/developers/docs/frameworks/)

## தொடர்புடைய டுடோரியல்கள் {#related-tutorials}

- [JavaScript-இல் எத்திரியம் தொகுதிச்சங்கிலியைப் பயன்படுத்த Web3.js-ஐ அமைக்கவும்](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– உங்கள் திட்டத்தில் Web3.js-ஐ அமைப்பதற்கான வழிமுறைகள்._
- [JavaScript-இலிருந்து ஒரு திறன் ஒப்பந்தத்தை அழைத்தல்](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI வில்லையைப் பயன்படுத்தி, JavaScript-ஐப் பயன்படுத்தி ஒப்பந்தச் செயல்பாட்டை எவ்வாறு அழைப்பது என்பதைப் பார்க்கவும்._
- [Web3 மற்றும் Alchemy-ஐப் பயன்படுத்திப் பரிவர்த்தனைகளை அனுப்புதல்](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– பின்தளத்திலிருந்து பரிவர்த்தனைகளை அனுப்புவதற்கான படிப்படியான வழிகாட்டி._

## டுடோரியல்கள்: எத்திரியத்தில் JavaScript API-கள் & WebSocket-கள் {#tutorials}

- [WebSocket-களைப் பயன்படுத்துதல்](/developers/tutorials/using-websockets/) _– எத்திரியம் நிகழ்வுகளுக்குச் சந்தா பெறவும், நிகழ்நேர ஜேசன்-ஆர்பிசி கோரிக்கைகளைச் செய்யவும் Alchemy உடன் WebSocket-களை எவ்வாறு பயன்படுத்துவது._
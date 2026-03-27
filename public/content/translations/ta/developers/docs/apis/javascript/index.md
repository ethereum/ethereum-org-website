---
title: "ஜாவாஸ்கிரிப்ட் API நூலகங்கள்"
description: "உங்கள் பயன்பாட்டிலிருந்து பிளாக்செயினுடன் தொடர்பு கொள்ள அனுமதிக்கும் ஜாவாஸ்கிரிப்ட் கிளையன்ட் நூலகங்கள் பற்றிய அறிமுகம்."
lang: ta
---

ஒரு வலைப் பயன்பாடு (web app) எத்தேரியம் பிளாக்செயினுடன் தொடர்பு கொள்ள (அதாவது, பிளாக்செயின் தரவைப் படிக்க மற்றும்/அல்லது நெட்வொர்க்கிற்கு பரிவர்த்தனைகளை அனுப்ப), அது ஒரு எத்தேரியம் நோடுடன் (node) இணைக்கப்பட வேண்டும்.

இந்த நோக்கத்திற்காக, ஒவ்வொரு எத்தேரியம் கிளையன்ட்டும் [JSON-RPC](/developers/docs/apis/json-rpc/) விவரக்குறிப்பைச் செயல்படுத்துகிறது, எனவே பயன்பாடுகள் நம்பியிருக்கக்கூடிய ஒரு சீரான [முறைகள்](/developers/docs/apis/json-rpc/#json-rpc-methods) உள்ளன.

எத்தேரியம் நோடுடன் இணைக்க நீங்கள் ஜாவாஸ்கிரிப்டைப் பயன்படுத்த விரும்பினால், வெனிலா ஜாவாஸ்கிரிப்டைப் (vanilla JavaScript) பயன்படுத்த முடியும், ஆனால் இதை மிகவும் எளிதாக்கும் பல வசதியான நூலகங்கள் சுற்றுச்சூழல் அமைப்பில் உள்ளன. இந்த நூலகங்கள் மூலம், டெவலப்பர்கள் எத்தேரியத்துடன் தொடர்பு கொள்ளும் JSON-RPC கோரிக்கைகளை (பின்னணியில்) தொடங்குவதற்கு உள்ளுணர்வுள்ள, ஒரு வரி முறைகளை எழுதலாம்.

[தி மெர்ஜ்](/roadmap/merge/) (The Merge) முதல், ஒரு நோடை இயக்க இரண்டு இணைக்கப்பட்ட எத்தேரியம் மென்பொருள்கள் - ஒரு எக்ஸிகியூஷன் கிளையன்ட் (execution client) மற்றும் ஒரு கன்சென்சஸ் கிளையன்ட் (consensus client) - தேவை என்பதை நினைவில் கொள்ளவும். உங்கள் நோடில் எக்ஸிகியூஷன் மற்றும் கன்சென்சஸ் கிளையன்ட் இரண்டும் இருப்பதை உறுதிசெய்யவும். உங்கள் நோடு உங்கள் உள்ளூர் கணினியில் இல்லை என்றால் (எ.கா., உங்கள் நோடு AWS இன்ஸ்டன்ஸில் இயங்குகிறது) அதற்கேற்ப டுடோரியலில் உள்ள IP முகவரிகளைப் புதுப்பிக்கவும். மேலும் தகவலுக்கு, [ஒரு நோடை இயக்குவது](/developers/docs/nodes-and-clients/run-a-node/) குறித்த எங்கள் பக்கத்தைப் பார்க்கவும்.

## முன்நிபந்தனைகள் {#prerequisites}

ஜாவாஸ்கிரிப்டைப் புரிந்துகொள்வதோடு, [எத்தேரியம் ஸ்டாக்](/developers/docs/ethereum-stack/) மற்றும் [எத்தேரியம் கிளையன்ட்களைப்](/developers/docs/nodes-and-clients/) புரிந்துகொள்வதும் உதவியாக இருக்கும்.

## நூலகத்தை ஏன் பயன்படுத்த வேண்டும்? {#why-use-a-library}

இந்த நூலகங்கள் எத்தேரியம் நோடுடன் நேரடியாகத் தொடர்புகொள்வதில் உள்ள சிக்கல்களைப் பெருமளவு குறைக்கின்றன. அவை பயன்பாட்டுச் செயல்பாடுகளையும் (utility functions) வழங்குகின்றன (எ.கா., ETH-ஐ Gwei ஆக மாற்றுவது), எனவே ஒரு டெவலப்பராக நீங்கள் எத்தேரியம் கிளையன்ட்களின் சிக்கல்களைக் கையாள்வதில் குறைந்த நேரத்தையும், உங்கள் பயன்பாட்டின் தனித்துவமான செயல்பாட்டில் அதிக நேரத்தையும் செலவிடலாம்.

## நூலகத்தின் அம்சங்கள் {#library-features}

### எத்தேரியம் நோடுகளுடன் இணைத்தல் {#connect-to-ethereum-nodes}

புரொவைடர்களைப் (providers) பயன்படுத்தி, இந்த நூலகங்கள் எத்தேரியத்துடன் இணைக்கவும் அதன் தரவைப் படிக்கவும் உங்களை அனுமதிக்கின்றன, அது JSON-RPC, INFURA, Etherscan, Alchemy அல்லது MetaMask வழியாக இருந்தாலும் சரி.

> **எச்சரிக்கை:** Web3.js மார்ச் 4, 2025 அன்று காப்பகப்படுத்தப்பட்டது. [அறிவிப்பைப் படிக்கவும்](https://blog.chainsafe.io/web3-js-sunset/). புதிய திட்டங்களுக்கு [ethers.js](https://ethers.org) அல்லது [viem](https://viem.sh) போன்ற மாற்று நூலகங்களைப் பயன்படுத்துவதைக் கருத்தில் கொள்ளவும்.

**Ethers எடுத்துக்காட்டு**

```js
// ஒரு BrowserProvider ஒரு நிலையான Web3 provider-ஐ உள்ளடக்கியுள்ளது, இது
// MetaMask ஒவ்வொரு பக்கத்திலும் window.ethereum ஆக உட்செலுத்துவதாகும்
const provider = new ethers.BrowserProvider(window.ethereum)

// MetaMask செருகுநிரல் பரிவர்த்தனைகளில் கையொப்பமிடவும் அனுமதிக்கிறது
// ஈதரை (ether) அனுப்பவும் மற்றும் பிளாக்செயினுக்குள் நிலையை (state) மாற்ற பணம் செலுத்தவும்.
// இதற்கு, நமக்கு கணக்கு கையொப்பமிடுபவர் (account signer) தேவை...
const signer = provider.getSigner()
```

**Web3js எடுத்துக்காட்டு**

```js
var web3 = new Web3("http://localhost:8545")
// அல்லது
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// provider-ஐ மாற்றவும்
web3.setProvider("ws://localhost:8546")
// அல்லது
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// node.js இல் IPC provider-ஐப் பயன்படுத்துதல்
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os பாதை
// அல்லது
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os பாதை
// windows-இல் பாதை: "\\\\.\\pipe\\geth.ipc"
// linux-இல் பாதை: "/users/myuser/.ethereum/geth.ipc"
```

அமைக்கப்பட்டதும், பிளாக்செயினில் பின்வருவனவற்றைக் கோர முடியும்:

- பிளாக் எண்கள் (block numbers)
- கேஸ் மதிப்பீடுகள் (gas estimates)
- ஸ்மார்ட் ஒப்பந்த நிகழ்வுகள் (smart contract events)
- நெட்வொர்க் ஐடி (network id)
- மற்றும் பல...

### வாலட் செயல்பாடு {#wallet-functionality}

இந்த நூலகங்கள் வாலட்களை உருவாக்கவும், திறவுகோல்களை (keys) நிர்வகிக்கவும் மற்றும் பரிவர்த்தனைகளில் கையொப்பமிடவும் உங்களுக்குச் செயல்பாட்டை வழங்குகின்றன.

Ethers-லிருந்து ஒரு எடுத்துக்காட்டு இங்கே

```js
// ஒரு நிமோனிக்கிலிருந்து (mnemonic) வாலட் நிகழ்வை உருவாக்கவும்...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...அல்லது ஒரு தனிப்பட்ட திறவுகோலிலிருந்து (private key)
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Signer API-இன் படி முகவரி ஒரு Promise ஆக
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// ஒரு வாலட் முகவரி ஒத்திசைவாகவும் (synchronously) கிடைக்கிறது
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// உள் கிரிப்டோகிராஃபிக் கூறுகள்
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// வாலட் நிமோனிக் (mnemonic)
walletMnemonic.mnemonic
// {
// locale: 'en',
// path: 'm/44\'/60\'/0\'/0/0',
// phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// குறிப்பு: தனிப்பட்ட திறவுகோலால் (private key) உருவாக்கப்பட்ட வாலட்டில்
// நிமோனிக் இருக்காது (derivation அதைத் தடுக்கிறது)
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

// connect முறையானது (method) புதிய நிகழ்வை (instance) வழங்குகிறது, இது
// provider-உடன் இணைக்கப்பட்ட வாலட் ஆகும்
wallet = walletMnemonic.connect(provider)

// நெட்வொர்க்கை வினவுதல் (Querying)
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// ஈதரை (ether) அனுப்புதல்
wallet.sendTransaction(tx)
```

[முழு ஆவணங்களையும் படிக்கவும்](https://docs.ethers.io/v5/api/signer/#Wallet)

அமைக்கப்பட்டதும் உங்களால் பின்வருவனவற்றைச் செய்ய முடியும்:

- கணக்குகளை உருவாக்குதல்
- பரிவர்த்தனைகளை அனுப்புதல்
- பரிவர்த்தனைகளில் கையொப்பமிடுதல்
- மற்றும் பல...

### ஸ்மார்ட் ஒப்பந்த செயல்பாடுகளுடன் தொடர்புகொள்ளுதல் {#interact-with-smart-contract-functions}

தொகுக்கப்பட்ட ஒப்பந்தத்தின் அப்ளிகேஷன் பைனரி இன்டர்ஃபேஸை (ABI) படிப்பதன் மூலம் ஸ்மார்ட் ஒப்பந்த செயல்பாடுகளை அழைக்க ஜாவாஸ்கிரிப்ட் கிளையன்ட் நூலகங்கள் உங்கள் பயன்பாட்டை அனுமதிக்கின்றன.

ABI அடிப்படையில் ஒப்பந்தத்தின் செயல்பாடுகளை JSON வடிவத்தில் விளக்குகிறது மற்றும் அதை ஒரு சாதாரண ஜாவாஸ்கிரிப்ட் ஆப்ஜெக்ட் (object) போல பயன்படுத்த உங்களை அனுமதிக்கிறது.

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

பின்வரும் JSON-ஐ உருவாக்கும்:

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

- ஸ்மார்ட் ஒப்பந்தத்திற்கு ஒரு பரிவர்த்தனையை அனுப்பி அதன் முறையை (method) இயக்கலாம்
- EVM-ல் இயக்கப்படும் போது ஒரு முறை செயல்படுத்துவதற்குத் தேவைப்படும் கேஸை மதிப்பிட அழைக்கலாம்
- ஒரு ஒப்பந்தத்தை டெப்ளாய் (deploy) செய்யலாம்
- மற்றும் பல...

### பயன்பாட்டுச் செயல்பாடுகள் {#utility-functions}

பயன்பாட்டுச் செயல்பாடுகள் (Utility functions) எத்தேரியத்துடன் உருவாக்குவதை சற்று எளிதாக்கும் பயனுள்ள குறுக்குவழிகளை உங்களுக்கு வழங்குகின்றன.

ETH மதிப்புகள் இயல்பாகவே Wei-ல் இருக்கும். 1 ETH = 1,000,000,000,000,000,000 WEI – அதாவது நீங்கள் நிறைய எண்களைக் கையாளுகிறீர்கள்! `web3.utils.toWei` உங்களுக்காக ஈதரை Wei ஆக மாற்றுகிறது.

மேலும் ethers-ல் இது இப்படி இருக்கும்:

```js
// ஒரு கணக்கின் இருப்பைப் பெறுதல் (முகவரி அல்லது ENS பெயர் மூலம்)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// பயனருக்காக வெளியீட்டை (output) நீங்கள் அடிக்கடி வடிவமைக்க (format) வேண்டியிருக்கும்
// அவர்கள் மதிப்புகளை (wei-க்கு பதிலாக) ஈதரில் பார்க்க விரும்புவார்கள்
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js பயன்பாட்டுச் செயல்பாடுகள்](https://docs.web3js.org/api/web3-utils)
- [Ethers பயன்பாட்டுச் செயல்பாடுகள்](https://docs.ethers.org/v6/api/utils/)

## கிடைக்கும் நூலகங்கள் {#available-libraries}

**Web3.js -** **_எத்தேரியம் ஜாவாஸ்கிரிப்ட் API._**

- [ஆவணங்கள்](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_ஜாவாஸ்கிரிப்ட் மற்றும் டைப்ஸ்கிரிப்ட்டில் முழுமையான எத்தேரியம் வாலட் செயலாக்கம் மற்றும் பயன்பாடுகள்._**

- [Ethers.js முகப்பு](https://ethers.org/)
- [ஆவணங்கள்](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_எத்தேரியம் மற்றும் IPFS தரவை அட்டவணைப்படுத்துவதற்கும் GraphQL-ஐப் பயன்படுத்தி அதைக் கோருவதற்குமான ஒரு நெறிமுறை._**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [ஆவணங்கள்](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_மேம்படுத்தப்பட்ட API-களுடன் Ethers.js-ஐச் சுற்றியுள்ள ரேப்பர் (Wrapper)._**

- [ஆவணங்கள்](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_எத்தேரியத்திற்கான டைப்ஸ்கிரிப்ட் இன்டர்ஃபேஸ்._**

- [ஆவணங்கள்](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_டஜன் கணக்கான செயின்களில் நிகழ்நேர, செறிவூட்டப்பட்ட பிளாக்செயின் தரவு API._**

- [ஆவணங்கள்](https://docs.codex.io)
- [Explorer](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_உள்ளமைக்கப்பட்ட கேச்சிங் (caching), ஹூக்ஸ் (hooks) மற்றும் சோதனை மாக்குகளுடன் (test mocks) கூடிய டைப்ஸ்கிரிப்ட் மெட்டா-நூலகம்._**

- [ஆவணங்கள்](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## மேலும் படிக்க {#further-reading}

_உங்களுக்கு உதவிய சமூக வளம் பற்றித் தெரியுமா? இந்தப் பக்கத்தைத் திருத்தி அதைச் சேர்க்கவும்!_

## தொடர்புடைய தலைப்புகள் {#related-topics}

- [நோடுகள் மற்றும் கிளையன்ட்கள்](/developers/docs/nodes-and-clients/)
- [மேம்பாட்டு கட்டமைப்புகள்](/developers/docs/frameworks/)

## தொடர்புடைய டுடோரியல்கள் {#related-tutorials}

- [ஜாவாஸ்கிரிப்ட்டில் எத்தேரியம் பிளாக்செயினைப் பயன்படுத்த Web3js-ஐ அமைத்தல்](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– உங்கள் திட்டத்தில் web3.js-ஐ அமைப்பதற்கான வழிமுறைகள்._
- [ஜாவாஸ்கிரிப்ட்டிலிருந்து ஸ்மார்ட் ஒப்பந்தத்தை அழைத்தல்](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI டோக்கனைப் பயன்படுத்தி, ஜாவாஸ்கிரிப்ட்டைப் பயன்படுத்தி ஒப்பந்தங்களின் செயல்பாட்டை எவ்வாறு அழைப்பது என்பதைப் பார்க்கவும்._
- [web3 மற்றும் Alchemy-ஐப் பயன்படுத்தி பரிவர்த்தனைகளை அனுப்புதல்](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– பின்தளத்திலிருந்து (backend) பரிவர்த்தனைகளை அனுப்புவதற்கான படிப்படியான வழிகாட்டி._

## டுடோரியல்கள்: எத்தேரியத்தில் ஜாவாஸ்கிரிப்ட் API-கள் & வெப்சாக்கெட்டுகள் {#tutorials}

- [வெப்சாக்கெட்டுகளைப் பயன்படுத்துதல்](/developers/tutorials/using-websockets/) _– எத்தேரியம் நிகழ்வுகளுக்குச் சந்தாதாரராகவும், நிகழ்நேர JSON-RPC கோரிக்கைகளைச் செய்யவும் Alchemy உடன் வெப்சாக்கெட்டுகளை எவ்வாறு பயன்படுத்துவது._
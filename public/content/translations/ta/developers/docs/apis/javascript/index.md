---
title: ஜாவாஸ்கிரிப்ட் API நூலகங்கள்
description: உங்கள் பயன்பாட்டிலிருந்து பிளாக்செயினுடன் ஊடாட உதவும் ஜாவாஸ்கிரிப்ட் கிளையன்ட் நூலகங்கள் குறித்த அறிமுகம்.
lang: ta
---

ஒரு வலைப் பயன்பாடு எத்தேரியம் பிளாக்செயினுடன் ஊடாட (அதாவது, பிளாக்செயின் தரவைப் படிக்க மற்றும்/அல்லது நெட்வொர்க்கிற்கு பரிவர்த்தனைகளை அனுப்ப), அது ஒரு எத்தேரியம் முனையுடன் இணைக்கப்பட வேண்டும்.

இந்த நோக்கத்திற்காக, ஒவ்வொரு எத்தேரியம் கிளையண்டும் [JSON-RPC](/developers/docs/apis/json-rpc/) விவரக்குறிப்பைச் செயல்படுத்துகிறது, எனவே பயன்பாடுகள் நம்பியிருக்கக்கூடிய ஒரே மாதிரியான [முறைகளின்](/developers/docs/apis/json-rpc/#json-rpc-methods) தொகுப்பு உள்ளது.

ஒரு எத்தேரியம் முனையுடன் இணைக்க நீங்கள் ஜாவாஸ்கிரிப்டைப் பயன்படுத்த விரும்பினால், வெண்ணிலா ஜாவாஸ்கிரிப்டைப் பயன்படுத்தலாம், ஆனால் இதை மிகவும் எளிதாக்கும் பல வசதியான நூலகங்கள் இந்தச் சூழல் அமைப்பில் உள்ளன. இந்த நூலகங்கள் மூலம், உருவாக்குநர்கள் எத்தேரியத்துடன் தொடர்பு கொள்ளும் JSON-RPC கோரிக்கைகளை (பின்னணியில்) துவக்குவதற்கு, உள்ளுணர்வுமிக்க, ஒரு-வரி முறைகளை எழுத முடியும்.

கவனத்தில் கொள்ளவும், [ஒருங்கிணைப்பு](/roadmap/merge/) முதல், ஒரு முனையை இயக்க இரண்டு இணைக்கப்பட்ட எத்தேரியம் மென்பொருள் பாகங்கள் - ஒரு செயலாக்க கிளையன்ட் மற்றும் ஒரு ஒருமித்த கருத்து கிளையன்ட் - தேவைப்படுகின்றன. உங்கள் முனையில் ஒரு செயலாக்க கிளையன்ட் மற்றும் ஒரு ஒருமித்த கருத்து கிளையன்ட் இரண்டும் உள்ளதா என்பதை உறுதிப்படுத்திக் கொள்ளவும். உங்கள் முனை உங்கள் உள்ளூர் கணினியில் இல்லை என்றால் (எ.கா., உங்கள் முனை ஒரு AWS நிகழ்வில் இயங்குகிறது), பயிற்சியில் உள்ள IP முகவரிகளை அதற்கேற்பப் புதுப்பிக்கவும். மேலும் தகவலுக்கு, [ஒரு முனையை இயக்குவது](/developers/docs/nodes-and-clients/run-a-node/) குறித்த எங்கள் பக்கத்தைப் பார்க்கவும்.

## முன்னேற்றக் கட்டுரை {#prerequisites}

ஜாவாஸ்கிரிப்டைப் புரிந்துகொள்வதுடன், [எத்தேரியம் அடுக்கையும்](/developers/docs/ethereum-stack/) [எத்தேரியம் கிளையண்டுகளையும்](/developers/docs/nodes-and-clients/) புரிந்துகொள்வது உதவியாக இருக்கும்.

## ஏன் ஒரு நூலகத்தைப் பயன்படுத்த வேண்டும்? {#why-use-a-library}

இந்த நூலகங்கள் ஒரு எத்தேரியம் முனையுடன் நேரடியாகத் தொடர்புகொள்வதில் உள்ள சிக்கல்களில் பெரும்பாலானவற்றை நீக்கிவிடுகின்றன. அவை பயன்பாட்டுச் செயல்பாடுகளையும் (எ.கா., ETH-ஐ Gwei ஆக மாற்றுவது) வழங்குகின்றன, எனவே ஒரு உருவாக்குநராக நீங்கள் எத்தேரியம் வாடிக்கையாளர்களின் நுணுக்கங்களைக் கையாள்வதில் குறைந்த நேரத்தைச் செலவிட்டு, உங்கள் பயன்பாட்டின் தனித்துவமான செயல்பாட்டில் அதிக கவனம் செலுத்த முடியும்.

## நூலக அம்சங்கள் {#library-features}

### எத்தேரியம் முனைகளுடன் இணைத்தல் {#connect-to-ethereum-nodes}

வழங்குநர்களைப் பயன்படுத்தி, இந்த நூலகங்கள் JSON-RPC, INFURA, Etherscan, Alchemy அல்லது MetaMask வழியாக இருந்தாலும், எத்தேரியத்துடன் இணைவதற்கும் அதன் தரவைப் படிப்பதற்கும் உங்களை அனுமதிக்கின்றன.

> **எச்சரிக்கை:** Web3.js மார்ச் 4, 2025 அன்று காப்பகப்படுத்தப்பட்டது. [அறிவிப்பைப் படிக்கவும்](https://blog.chainsafe.io/web3-js-sunset/). புதிய திட்டங்களுக்கு [ethers.js](https://ethers.org) அல்லது [viem](https://viem.sh) போன்ற மாற்று நூலகங்களைப் பயன்படுத்துவதைக் கருத்தில் கொள்ளுங்கள்.

**Ethers உதாரணம்**

```js
// ஒரு BrowserProvider ஒரு நிலையான Web3 வழங்குநரை உள்ளடக்கியது, அதுதான்
// ஒவ்வொரு பக்கத்திலும் window.ethereum என MetaMask செலுத்துகிறது
const provider = new ethers.BrowserProvider(window.ethereum)

// MetaMask செருகுநிரல் பரிவர்த்தனைகளில் கையொப்பமிடவும் அனுமதிக்கிறது
// ஈதரை அனுப்பவும், பிளாக்செயினில் நிலையை மாற்றவும் பணம் செலுத்தவும்.
// இதற்காக, நமக்கு கணக்கு கையொப்பமிடுபவர் தேவை...
const signer = provider.getSigner()
```

**Web3js உதாரணம்**

```js
var web3 = new Web3("http://localhost:8545")
// அல்லது
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// வழங்குநரை மாற்றவும்
web3.setProvider("ws://localhost:8546")
// அல்லது
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// node.js-இல் IPC வழங்குநரைப் பயன்படுத்துதல்
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os பாதை
// அல்லது
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os பாதை
// விண்டோஸில் பாதை: "\\\\.\\pipe\\geth.ipc"
// லினக்ஸில் பாதை: "/users/myuser/.ethereum/geth.ipc"
```

அமைத்தவுடன், பிளாக்செயினில் பின்வருவனவற்றிற்காக நீங்கள் வினவ முடியும்:

- பிளாக் எண்கள்
- எரிவாயு மதிப்பீடுகள்
- ஸ்மார்ட் ஒப்பந்த நிகழ்வுகள்
- நெட்வொர்க் ஐடி
- மேலும் பல...

### பணப்பைச் செயல்பாடு {#wallet-functionality}

இந்த நூலகங்கள் பணப்பைகளை உருவாக்க, விசைகளை நிர்வகிக்க மற்றும் பரிவர்த்தனைகளில் கையெழுத்திட உங்களுக்குச் செயல்பாட்டை வழங்குகின்றன.

Ethers-இலிருந்து ஒரு உதாரணம் இதோ

```js
// ஒரு நினைவூட்டலிலிருந்து ஒரு பணப்பை நிகழ்வை உருவாக்கவும்...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...அல்லது ஒரு தனிப்பட்ட விசையிலிருந்து
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// சரி

// கையொப்பமிட்டவர் API-இன்படி முகவரி ஒரு Promise ஆக இருக்கும்
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// ஒரு பணப்பை முகவரி ஒத்திசைவாகவும் கிடைக்கிறது
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// உள்ளக கிரிப்டோகிராஃபிக் கூறுகள்
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

// குறிப்பு: ஒரு தனிப்பட்ட விசையுடன் உருவாக்கப்பட்ட பணப்பையில் நினைவூட்டல் இருக்காது
//       (வழித்தோன்றல் அதைத் தடுக்கிறது)
walletPrivateKey.mnemonic
// பூஜ்யம்

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

// இணைப்பு முறை ஒரு புதிய நிகழ்வைத் தரும்
// வழங்குநருடன் இணைக்கப்பட்ட பணப்பை
wallet = walletMnemonic.connect(provider)

// நெட்வொர்க்கில் வினவுதல்
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// ஈதரை அனுப்புதல்
wallet.sendTransaction(tx)
```

[முழு ஆவணங்களையும் படிக்கவும்](https://docs.ethers.io/v5/api/signer/#Wallet)

அமைத்தவுடன், உங்களால் முடியும்:

- கணக்குகளை உருவாக்கவும்
- பரிவர்த்தனைகளை அனுப்பவும்
- பரிவர்த்தனைகளில் கையொப்பமிடவும்
- மேலும் பல...

### ஸ்மார்ட் ஒப்பந்த செயல்பாடுகளுடன் ஊடாடுதல் {#interact-with-smart-contract-functions}

ஜாவாஸ்கிரிப்ட் கிளையன்ட் நூலகங்கள், தொகுக்கப்பட்ட ஒப்பந்தத்தின் பயன்பாட்டு பைனரி இடைமுகத்தை (ABI) படிப்பதன் மூலம் உங்கள் பயன்பாட்டை ஸ்மார்ட் ஒப்பந்த செயல்பாடுகளை அழைக்க அனுமதிக்கின்றன.

ABI அடிப்படையில் ஒப்பந்தத்தின் செயல்பாடுகளை ஒரு JSON வடிவத்தில் விளக்குகிறது மற்றும் அதை ஒரு சாதாரண ஜாவாஸ்கிரிப்ட் பொருளைப் போலப் பயன்படுத்த உங்களை அனுமதிக்கிறது.

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

- ஸ்மார்ட் ஒப்பந்தத்திற்கு ஒரு பரிவர்த்தனையை அனுப்பி அதன் முறையை இயக்கவும்
- EVM-இல் செயல்படுத்தப்படும்போது ஒரு முறை செயலாக்கத்திற்குத் தேவைப்படும் எரிவாயுவை மதிப்பிட அழைக்கவும்
- ஒரு ஒப்பந்தத்தை வரிசைப்படுத்தவும்
- மேலும் பல...

### பயன்பாட்டு செயல்பாடுகள் {#utility-functions}

பயன்பாட்டு செயல்பாடுகள், எத்தேரியத்துடன் உருவாக்குவதை இன்னும் கொஞ்சம் எளிதாக்கும் எளிதான குறுக்குவழிகளை உங்களுக்கு வழங்குகின்றன.

ETH மதிப்புகள் இயல்பாக Wei-இல் உள்ளன. 1 ETH = 1,000,000,000,000,000,000 WEI – இதன் பொருள் நீங்கள் நிறைய எண்களைக் கையாளுகிறீர்கள்! `web3.utils.toWei` உங்களுக்காக ஈதரை Wei-ஆக மாற்றுகிறது.

மேலும் ethers-இல் இது இப்படி இருக்கும்:

```js
// ஒரு கணக்கின் இருப்பைப் பெறவும் (முகவரி அல்லது ENS பெயர் மூலம்)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// வெளியீட்டை பயனருக்காக வடிவமைக்க உங்களுக்கு அடிக்கடி தேவைப்படும்
// அவர்கள் மதிப்புகளை ஈதரில் (wei க்கு பதிலாக) பார்க்க விரும்புவார்கள்
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js பயன்பாட்டு செயல்பாடுகள்](https://docs.web3js.org/api/web3-utils)
- [Ethers பயன்பாட்டு செயல்பாடுகள்](https://docs.ethers.org/v6/api/utils/)

## கிடைக்கும் நூலகங்கள் {#available-libraries}

**Web3.js -** **_எத்தேரியம் ஜாவாஸ்கிரிப்ட் API._**

- [ஆவணம்](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_ஜாவாஸ்கிரிப்ட் மற்றும் டைப்ஸ்கிரிப்டில் உள்ள முழுமையான எத்தேரியம் பணப்பைச் செயலாக்கம் மற்றும் பயன்பாடுகள்._**

- [Ethers.js முகப்பு](https://ethers.org/)
- [ஆவணம்](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**தி கிராஃப் -** **_எத்தேரியம் மற்றும் IPFS தரவைக் குறியிடுவதற்கும் GraphQL-ஐப் பயன்படுத்தி அதை வினவுவதற்கும் ஒரு நெறிமுறை._**

- [தி கிராஃப்](https://thegraph.com)
- [கிராஃப் எக்ஸ்ப்ளோரர்](https://thegraph.com/explorer)
- [ஆவணம்](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**அல்கெமி SDK -** **_மேம்படுத்தப்பட்ட API-களுடன் Ethers.js-ஐ சுற்றியுள்ள ஒரு சுற்று._**

- [ஆவணம்](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_எத்தேரியத்திற்கான டைப்ஸ்கிரிப்ட் இடைமுகம்._**

- [ஆவணம்](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift -** **_உள்ளமைக்கப்பட்ட தற்காலிக சேமிப்பு, கொக்கிகள் மற்றும் சோதனை மாதிரிகளுடன் கூடிய டைப்ஸ்கிரிப்ட் மெட்டா-நூலகம்._**

- [ஆவணம்](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## மேலும் வாசிக்க {#further-reading}

_உங்களுக்கு உதவிய ஒரு சமூக வளம் பற்றி தெரியுமா?_ இந்தப் பக்கத்தைத் திருத்தி அதைச் சேர்க்கவும்!_

## தொடர்புடைய தலைப்புகள் {#related-topics}

- [முனைகள் மற்றும் வாடிக்கையாளர்கள்](/developers/docs/nodes-and-clients/)
- [உருவாக்க கட்டமைப்புகள்](/developers/docs/frameworks/)

## தொடர்புடைய பயிற்சிகள் {#related-tutorials}

- [ஜாவாஸ்கிரிப்டில் எத்தேரியம் பிளாக்செயினைப் பயன்படுத்த Web3js-ஐ அமைத்தல்](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– உங்கள் திட்டத்தில் web3.js-ஐ அமைப்பதற்கான வழிமுறைகள்._
- [ஜாவாஸ்கிரிப்டிலிருந்து ஒரு ஸ்மார்ட் ஒப்பந்தத்தை அழைத்தல்](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI டோக்கனைப் பயன்படுத்தி, ஜாவாஸ்கிரிப்ட் மூலம் ஒப்பந்தங்களின் செயல்பாடுகளை எப்படி அழைப்பது என்று பாருங்கள்._
- [web3 மற்றும் அல்கெமியைப் பயன்படுத்தி பரிவர்த்தனைகளை அனுப்புதல்](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– பின்தளத்திலிருந்து பரிவர்த்தனைகளை அனுப்புவதற்கான படிப்படியான வழிகாட்டி._

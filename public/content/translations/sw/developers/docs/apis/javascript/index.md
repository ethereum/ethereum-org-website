---
title: Maktaba za JavaScript API
description: Utangulizi wa maktaba za wateja za JavaScript zinazokuwezesha kuingiliana na mnyororo wa bloku kutoka kwa programu yako.
lang: sw
---

Ili programu ya wavuti iweze kuingiliana na mnyororo wa bloku wa Ethereum (yaani, kusoma data ya mnyororo wa bloku na/au kutuma miamala kwenye mtandao), lazima iunganishwe na nodi ya Ethereum.

Kwa madhumuni haya, kila mteja wa Ethereum hutekeleza vipimo vya [JSON-RPC](/developers/docs/apis/json-rpc/), kwa hivyo kuna seti sare ya [mbinu](/developers/docs/apis/json-rpc/#json-rpc-methods) ambazo programu zinaweza kutegemea.

Ikiwa unataka kutumia JavaScript kuungana na nodi ya Ethereum, inawezekana kutumia JavaScript tupu lakini maktaba kadhaa za kurahisisha zipo ndani ya mfumo ikolojia zinazofanya hili kuwa rahisi zaidi. Kwa maktaba hizi, wasanidi programu wanaweza kuandika njia angavu, za mstari mmoja ili kuanzisha maombi ya JSON-RPC (chini ya pazia) yanayoingiliana na Ethereum.

Tafadhali kumbuka kuwa tangu [Muungano](/roadmap/merge/), sehemu mbili zilizounganishwa za programu ya Ethereum - mteja wa utekelezaji na mteja wa makubaliano - zinahitajika ili kuendesha nodi. Tafadhali hakikisha nodi yako inajumuisha mteja wa utekelezaji na mteja wa makubaliano. Ikiwa nodi yako haiko kwenye mashine yako ya karibu (k.m., nodi yako inaendeshwa kwenye kielelezo cha AWS) sasisha anwani za IP katika mafunzo ipasavyo. Kwa maelezo zaidi tafadhali angalia ukurasa wetu kuhusu [kuendesha nodi](/developers/docs/nodes-and-clients/run-a-node/).

## Mahitaji ya awali {#prerequisites}

Pamoja na kuelewa JavaScript, inaweza kusaidia kuelewa [rundo la Ethereum](/developers/docs/ethereum-stack/) na [wateja wa Ethereum](/developers/docs/nodes-and-clients/).

## Kwa nini utumie maktaba? {#why-use-a-library}

Maktaba hizi hurahisisha sehemu kubwa ya utata wa kuingiliana moja kwa moja na nodi ya Ethereum. Pia hutoa kazi za matumizi (k.m., kubadilisha ETH kwenda Gwei) hivyo kama msanidi programu unaweza kutumia muda mfupi kushughulikia ugumu wa wateja wa Ethereum na muda mwingi zaidi kulenga utendaji wa kipekee wa programu yako.

## Vipengele vya maktaba {#library-features}

### Ungana na nodi za Ethereum {#connect-to-ethereum-nodes}

Kwa kutumia watoa huduma, maktaba hizi zinakuruhusu kuungana na Ethereum na kusoma data yake, iwe ni kupitia JSON-RPC, INFURA, Etherscan, Alchemy au MetaMask.

> **Onyo:** Web3.js iliwekwa kwenye kumbukumbu tarehe 4 Machi 2025. [Soma tangazo](https://blog.chainsafe.io/web3-js-sunset/). Fikiria kutumia maktaba mbadala kama [ethers.js](https://ethers.org) au [viem](https://viem.sh) kwa miradi mipya.

**Mfano wa Ethers**

```js
// A BrowserProvider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
const provider = new ethers.BrowserProvider(window.ethereum)

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, we need the account signer...
const signer = provider.getSigner()
```

**Mfano wa Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// or
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// change provider
web3.setProvider("ws://localhost:8546")
// or
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Using the IPC provider in node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os path
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os path
// on windows the path is: "\\\\.\\pipe\\geth.ipc"
// on linux the path is: "/users/myuser/.ethereum/geth.ipc"
```

Baada ya kusanidi utaweza kuuliza mnyororo wa bloku kwa:

- nambari za bloku
- makadirio ya gesi
- matukio ya mkataba-erevu
- kitambulisho cha mtandao
- na zaidi...

### Utendaji wa mkoba {#wallet-functionality}

Maktaba hizi hukupa utendaji wa kuunda mikoba, kusimamia funguo na kusaini miamala.

Huu hapa ni mfano kutoka kwa Ethers

```js
// Create a wallet instance from a mnemonic...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...or from a private key
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// The address as a Promise per the Signer API
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// A Wallet address is also available synchronously
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// The internal cryptographic components
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// The wallet mnemonic
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Note: A wallet created with a private key does not
//       have a mnemonic (the derivation prevents it)
walletPrivateKey.mnemonic
// null

// Signing a message
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Signing a transaction
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// The connect method returns a new instance of the
// Wallet connected to a provider
wallet = walletMnemonic.connect(provider)

// Querying the network
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Sending ether
wallet.sendTransaction(tx)
```

[Soma hati kamili](https://docs.ethers.io/v5/api/signer/#Wallet)

Baada ya kusanidi utaweza:

- kuunda akaunti
- kutuma miamala
- kusaini miamala
- na zaidi...

### Ingiliana na utendaji wa mkataba-erevu {#interact-with-smart-contract-functions}

Maktaba za wateja za JavaScript huruhusu programu yako kuita utendaji wa mkataba-erevu kwa kusoma Kiolesura cha Binary cha Programu (ABI) ya mkataba uliokusanywa.

Kimsingi ABI inaelezea utendaji wa mkataba katika muundo wa JSON na hukuruhusu kuitumia kama kitu cha kawaida cha JavaScript.

Kwa hivyo mkataba ufuatao wa Solidity:

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

Itasababisha JSON ifuatayo:

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

Hii inamaanisha unaweza:

- Tuma muamala kwa mkataba-erevu na utekeleze mbinu yake
- Piga simu ili kukadiria gesi ambayo utekelezaji wa mbinu utachukua unapotekelezwa katika EVM
- Sambaza mkataba
- Na zaidi...

### Utendaji wa matumizi {#utility-functions}

Utendaji wa matumizi hukupa njia za mkato zinazofaa ambazo hufanya ujenzi na Ethereum kuwa rahisi kidogo.

Thamani za ETH ziko katika Wei kwa chaguo-msingi. ETH 1 = WEI 1,000,000,000,000,000,000 – hii inamaanisha unashughulika na nambari nyingi! `web3.utils.toWei` hubadilisha ether kuwa Wei kwa ajili yako.

Na katika ethers inaonekana kama hivi:

```js
// Get the balance of an account (by address or ENS name)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Often you will need to format the output for the user
// which prefer to see values in ether (instead of wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Utendaji wa matumizi wa Web3js](https://docs.web3js.org/api/web3-utils)
- [Utendaji wa matumizi wa Ethers](https://docs.ethers.org/v6/api/utils/)

## Maktaba zinazopatikana {#available-libraries}

**Web3.js -** **_API ya JavaScript ya Ethereum._**

- [Nyaraka](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_Utekelezaji kamili wa mkoba wa Ethereum na huduma katika JavaScript na TypeScript._**

- [Nyumbani kwa Ethers.js](https://ethers.org/)
- [Nyaraka](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_Itifaki ya kuorodhesha data ya Ethereum na IPFS na kuiuliza kwa kutumia GraphQL._**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [Nyaraka](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_Kifuniko karibu na Ethers.js na api zilizoboreshwa._**

- [Nyaraka](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_Kiolesura cha TypeScript cha Ethereum._**

- [Nyaraka](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift -** **_Maktaba-meta ya TypeScript iliyo na kashe iliyojengewa ndani, ndoano, na dhihaka za majaribio._**

- [Nyaraka](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Masomo zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Nodi na wateja](/developers/docs/nodes-and-clients/)
- [Mifumo ya uundaji](/developers/docs/frameworks/)

## Mafunzo yanayohusiana {#related-tutorials}

- [Sanidi Web3js kutumia blockchain ya Ethereum katika JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Maagizo ya kusanidi web3.js katika mradi wako._
- [Kuita mkataba-erevu kutoka JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Kwa kutumia tokeni ya DAI, ona jinsi ya kuita kazi za mikataba kwa kutumia JavaScript._
- [Kutuma miamala kwa kutumia web3 na Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Mwongozo wa hatua kwa hatua kwa ajili ya kutuma miamala kutoka sehemu ya nyuma._

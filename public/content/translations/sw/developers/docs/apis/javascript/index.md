---
title: Maktaba za API za JavaScript
description: Utangulizi wa maktaba za kiteja za JavaScript zinazokuruhusu kuingiliana na mnyororo wa vitalu kutoka kwenye programu yako.
lang: sw
---

Ili programu ya wavuti iweze kuingiliana na mnyororo wa vitalu wa Ethereum (yaani, kusoma data ya mnyororo wa vitalu na/au kutuma miamala kwenye mtandao), lazima iunganishwe na nodi ya Ethereum.

Kwa madhumuni haya, kila kiteja cha Ethereum hutekeleza vipimo vya [JSON-RPC](/developers/docs/apis/json-rpc/), kwa hivyo kuna seti sawa ya [njia](/developers/docs/apis/json-rpc/#json-rpc-methods) ambazo programu zinaweza kutegemea.

Ikiwa unataka kutumia JavaScript kuunganisha na nodi ya Ethereum, inawezekana kutumia JavaScript ya kawaida lakini kuna maktaba kadhaa za urahisi ndani ya mfumo ikolojia ambazo hufanya hili kuwa rahisi zaidi. Kwa maktaba hizi, wasanidi programu wanaweza kuandika njia angavu za mstari mmoja ili kuanzisha maombi ya JSON-RPC (kiufundi) yanayoingiliana na Ethereum.

Tafadhali kumbuka kuwa tangu [Unganisho](/roadmap/merge/), vipande viwili vilivyounganishwa vya programu ya Ethereum - kiteja cha utekelezaji na mteja wa mwafaka - vinahitajika ili kuendesha nodi. Tafadhali hakikisha nodi yako inajumuisha kiteja cha utekelezaji na mteja wa mwafaka. Ikiwa nodi yako haipo kwenye mashine yako ya ndani (k.m., nodi yako inaendeshwa kwenye mfumo wa AWS) sasisha anwani za IP katika mafunzo ipasavyo. Kwa maelezo zaidi tafadhali tazama ukurasa wetu kuhusu [kuendesha nodi](/developers/docs/nodes-and-clients/run-a-node/).

## Mahitaji ya awali {#prerequisites}

Pamoja na kuelewa JavaScript, inaweza kusaidia kuelewa [mrundikano wa Ethereum](/developers/docs/ethereum-stack/) na [viteja vya Ethereum](/developers/docs/nodes-and-clients/).

## Kwa nini utumie maktaba? {#why-use-a-library}

Maktaba hizi huondoa ugumu mwingi wa kuingiliana moja kwa moja na nodi ya Ethereum. Pia hutoa vitendaji vya matumizi (k.m., kubadilisha ETH kuwa Gwei) ili kama msanidi programu uweze kutumia muda mchache kushughulika na utata wa viteja vya Ethereum na muda mwingi kuzingatia utendaji wa kipekee wa programu yako.

## Vipengele vya maktaba {#library-features}

### Unganisha kwenye nodi za Ethereum {#connect-to-ethereum-nodes}

Kwa kutumia watoa huduma, maktaba hizi hukuruhusu kuunganisha kwenye Ethereum na kusoma data yake, iwe ni kupitia JSON-RPC, INFURA, Etherscan, Alchemy au MetaMask.

> **Onyo:** Web3.js iliwekwa kwenye kumbukumbu mnamo Machi 4, 2025. [Soma tangazo](https://blog.chainsafe.io/web3-js-sunset/). Fikiria kutumia maktaba mbadala kama [ethers.js](https://ethers.org) au [viem](https://viem.sh) kwa miradi mipya.

**Mfano wa Ethers**

```js
// BrowserProvider hufunika mtoa huduma wa kawaida wa Web3, ambaye ni
// kile ambacho MetaMask huingiza kama window.ethereum kwenye kila ukurasa
const provider = new ethers.BrowserProvider(window.ethereum)

// Programu-jalizi ya MetaMask pia inaruhusu kutia saini miamala ili
// kutuma ether na kulipa ili kubadilisha hali ndani ya mnyororo wa vitalu.
// Kwa hili, tunahitaji mtia saini wa akaunti...
const signer = provider.getSigner()
```

**Mfano wa Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// or
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// badilisha mtoa huduma
web3.setProvider("ws://localhost:8546")
// or
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Kutumia mtoa huduma wa IPC katika Node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // njia ya mac os
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // njia ya mac os
// kwenye windows njia ni: "\\\\.\\pipe\\geth.ipc"
// kwenye linux njia ni: "/users/myuser/.ethereum/geth.ipc"
```

Baada ya kusanidi utaweza kuuliza mnyororo wa vitalu kwa:

- nambari za kitalu
- makadirio ya gesi
- matukio ya mkataba mahiri
- kitambulisho cha mtandao
- na zaidi...

### Utendaji wa mkoba {#wallet-functionality}

Maktaba hizi hukupa utendaji wa kuunda mikoba, kudhibiti funguo na kutia saini miamala.

Huu hapa ni mfano kutoka Ethers

```js
// Unda mfano wa mkoba kutoka kwa nimoniki...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...au kutoka kwa ufunguo wa kibinafsi
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// kweli

// Anwani kama Ahadi kulingana na API ya Mtia Saini
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Anwani ya Mkoba inapatikana pia kwa usawazishaji
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Vipengele vya ndani vya kriptografia
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Nimoniki ya mkoba
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Kumbuka: Mkoba ulioundwa na ufunguo wa kibinafsi hauna
//       nimoniki (mnyambuliko unazuia hilo)
walletPrivateKey.mnemonic
// null

// Kutia saini ujumbe
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Kutia saini muamala
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Mbinu ya kuunganisha inarejesha mfano mpya wa
// Mkoba uliounganishwa na mtoa huduma
wallet = walletMnemonic.connect(provider)

// Kuuliza mtandao
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Kutuma ether
wallet.sendTransaction(tx)
```

[Soma hati kamili](https://docs.ethers.io/v5/api/signer/#Wallet)

Baada ya kusanidi utaweza:

- kuunda akaunti
- kutuma miamala
- kutia saini miamala
- na zaidi...

### Kuingiliana na vitendaji vya mkataba mahiri {#interact-with-smart-contract-functions}

Maktaba za kiteja za JavaScript huruhusu programu yako kuita vitendaji vya mkataba mahiri kwa kusoma kiolesura cha jozi cha programu (ABI) cha mkataba uliokusanywa.

Kimsingi ABI inaelezea vitendaji vya mkataba katika muundo wa JSON na inakuruhusu kuitumia kama kipengee cha kawaida cha JavaScript.

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

Utasababisha JSON ifuatayo:

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

- Kutuma muamala kwenye mkataba mahiri na kutekeleza njia yake
- Kuita ili kukadiria gesi ambayo utekelezaji wa njia utachukua unapofanywa katika EVM
- Kusambaza mkataba
- Na zaidi...

### Vitendaji vya matumizi {#utility-functions}

Vitendaji vya matumizi hukupa njia za mkato zinazofaa ambazo hufanya kujenga na Ethereum kuwa rahisi kidogo.

Thamani za ETH ziko katika Wei kwa chaguo-msingi. 1 ETH = 1,000,000,000,000,000,000 WEI – hii inamaanisha unashughulika na nambari nyingi! `web3.utils.toWei` inabadilisha Etha kuwa Wei kwa ajili yako.

Na katika ethers inaonekana hivi:

```js
// Pata salio la akaunti (kwa anwani au jina la ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Mara nyingi utahitaji kupangilia matokeo kwa ajili ya mtumiaji
// ambaye anapendelea kuona thamani katika ether (badala ya Wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Vitendaji vya matumizi vya Web3js](https://docs.web3js.org/api/web3-utils)
- [Vitendaji vya matumizi vya Ethers](https://docs.ethers.org/v6/api/utils/)

## Maktaba zinazopatikana {#available-libraries}

**Web3.js -** **_API ya JavaScript ya Ethereum._**

- [Nyaraka](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_Utekelezaji kamili wa mkoba wa Ethereum na matumizi katika JavaScript na TypeScript._**

- [Ukurasa wa mwanzo wa Ethers.js](https://ethers.org/)
- [Nyaraka](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_Itifaki ya kuorodhesha data ya Ethereum na IPFS na kuiuliza kwa kutumia GraphQL._**

- [The Graph](https://thegraph.com)
- [Kichunguzi cha Graph](https://thegraph.com/explorer)
- [Nyaraka](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_Kifuniko cha Ethers.js chenye API zilizoboreshwa._**

- [Nyaraka](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_Kiolesura cha TypeScript cha Ethereum._**

- [Nyaraka](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_API ya data ya mnyororo wa vitalu iliyoboreshwa na ya wakati halisi katika minyororo mingi._**

- [Nyaraka](https://docs.codex.io)
- [Kichunguzi](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_Maktaba kuu ya TypeScript yenye uakibishaji uliojengewa ndani, ndoano, na majaribio ya kuiga._**

- [Nyaraka](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Usomaji zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Nodi na viteja](/developers/docs/nodes-and-clients/)
- [Mifumo ya usanidi](/developers/docs/frameworks/)

## Mafunzo yanayohusiana {#related-tutorials}

- [Sanidi Web3js ili kutumia mnyororo wa vitalu wa Ethereum katika JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Maagizo ya kusanidi web3.js katika mradi wako._
- [Kuita mkataba mahiri kutoka JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Kwa kutumia tokeni ya DAI, ona jinsi ya kuita vitendaji vya mikataba kwa kutumia JavaScript._
- [Kutuma miamala kwa kutumia web3 na Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Mwongozo wa hatua kwa hatua wa kutuma miamala kutoka nyuma (backend)._

## Mafunzo: API za JavaScript & WebSockets kwenye Ethereum {#tutorials}

- [Kutumia WebSockets](/developers/tutorials/using-websockets/) _– Jinsi ya kutumia WebSockets na Alchemy ili kujiandikisha kwa matukio ya Ethereum na kufanya maombi ya JSON-RPC ya wakati halisi._
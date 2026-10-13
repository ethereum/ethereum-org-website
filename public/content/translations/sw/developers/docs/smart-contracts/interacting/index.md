---
title: Kuingiliana na mikataba mahiri
description: Jifunze jinsi ya kusoma na kuandika kwenye mikataba mahiri ambayo tayari imesambazwa kwenye Ethereum.
lang: sw
---

Sio lazima kila wakati uandike na kusambaza mkataba wako mahiri. Mara nyingi kama msanidi programu, utataka kuingiliana na mikataba mahiri ambayo wengine tayari wamesambaza kwenye mtandao wa Ethereum.

Ukurasa huu unashughulikia njia mbili za kimsingi za kuingiliana na mkataba mahiri—**kusoma** data na **kuandika** data—na zana unazohitaji kufanya yote mawili.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuelewa:

- [Jinsi mikataba mahiri inavyofanya kazi](/developers/docs/smart-contracts/)
- [Akaunti za Ethereum na jinsi zinavyosaini miamala](/developers/docs/accounts/)
- [Muamala ni nini](/developers/docs/transactions/)

## Njia mbili za kuingiliana na mkataba mahiri {#two-ways}

Kuingiliana na mkataba mahiri kunagawanywa katika makundi mawili:

### Kusoma kutoka kwenye mkataba {#reading-from-a-contract}

Kusoma ni operesheni ya **bure** ambayo haiundi muamala na haibadilishi hali yoyote kwenye mnyororo wa vitalu.

Unaposoma kutoka kwenye mkataba, unauliza tu data ambayo tayari ipo. Kwa mfano:

- Kuangalia salio la tokeni ya ERC-20
- Kusoma bei ya sasa kutoka kwenye soko la kubadilishana lililogatuliwa
- Kupata mmiliki wa NFT

Kwa sababu usomaji haubadilishi hali, haugharimu [gesi](/developers/docs/gas/) na unaweza kufanywa na mtu yeyote bila kuhitaji ETH.

### Kuandika kwenye mkataba {#writing-to-a-contract}

Kuandika ni operesheni ya **kubadilisha hali** ambayo inahitaji muamala na inagharimu gesi.

Unapoandika kwenye mkataba, unachochea utendakazi unaobadilisha hali ya mnyororo wa vitalu. Kwa mfano:

- Kuhamisha tokeni
- Kubadilishana tokeni kwenye soko la kubadilishana lililogatuliwa
- Ufuzi wa NFT

Kuandika kila wakati kunahitaji:

1. [Akaunti Inayomilikiwa na Nje (EOA)](/developers/docs/accounts/#types-of-account) yenye ETH ya kutosha kwa ajili ya gesi
2. Muamala uliosainiwa na ufunguo wa siri wa akaunti
3. Muamala kuchimbwa na kujumuishwa kwenye kitalu

Kwa [udhanifu wa akaunti](/roadmap/account-abstraction/), akaunti ya mkataba mahiri inaweza pia kuanzisha uandishi, na mlipiaji anaweza kulipia gesi kwa niaba ya mtumiaji—hivyo EOA inayoshikilia ETH haihitajiki kwa lazima.

## Kuelewa ABI za mkataba {#understanding-contract-abis}

Ili kuingiliana na mkataba mahiri, programu yako inahitaji kujua *nini* mkataba unaweza kufanya. Hapa ndipo **Application Binary Interface (ABI)** inapoingia.

ABI ni hati ya JSON inayoelezea:

- Kila utendakazi ambao mkataba unaonyesha (jina, pembejeo, matokeo)
- Kila tukio ambalo mkataba unaweza kutoa
- Jinsi ya kusimba na kusimbua data unapozungumza na mkataba

Fikiria ABI kama mwongozo wa maagizo wa mkataba—bila hiyo, programu yako haijui ni utendakazi gani upo au ni vigezo gani wanavyotarajia.

### Wapi pa kupata ABI ya mkataba {#where-to-find-abis}

- **Mikataba iliyothibitishwa kwenye Etherscan** - [Etherscan](https://etherscan.io) inaonyesha kiotomatiki ABI kwa msimbo wa chanzo uliothibitishwa
- **Kutoka kwa msanidi programu** - miradi mingi huchapisha ABI zao kwenye nyaraka zao au vifurushi vya npm
- **Tengeneza kutoka kwenye chanzo** - ikiwa una msimbo wa chanzo wa Solidity, unaweza [kuukusanya](/developers/docs/smart-contracts/compiling/) ili kutoa ABI

## Zana na maktaba za kuingiliana na mikataba {#tools-and-libraries}

Wasanidi programu kwa kawaida hutumia maktaba ya JavaScript/TypeScript kuingiliana na mikataba kutoka kwenye programu ya wavuti, mazingira ya nyuma, au hati.

### Maktaba za mteja (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - Kiolesura cha kisasa, chepesi cha TypeScript kwa Ethereum chenye usalama wa aina ya daraja la kwanza
- **[ethers.js](https://docs.ethers.org/)** - Maktaba iliyojaribiwa kwa kina kwa ajili ya kuingiliana na mnyororo wa vitalu wa Ethereum
- **[web3.js](https://web3js.org/)** - API asili ya JavaScript ya Ethereum

### Maktaba za mazingira ya nyuma {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - Pia inafanya kazi katika Node.js kwa hati za upande wa seva na roboti
- **[web3.py](https://web3py.readthedocs.io/)** - Maktaba ya Python kwa mwingiliano wa Ethereum
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Maktaba rasmi ya Go kutoka kwa timu ya Geth

### Mfano: kusoma salio la tokeni kwa kutumia Viem {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// Anwani ya mkataba wa USDC na ABI (sehemu, kwa ajili ya balanceOf)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC ina desimali 6
```

### Mfano: kutuma muamala kwa kutumia ethers.js {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ABI ya uhamisho wa ERC-20
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // subiri muamala uchimbwe
console.log(`Transferred! TX: ${tx.hash}`)
```

## Matukio na kumbukumbu {#events-and-logs}

Mikataba mahiri inaweza kutoa **matukio** kuashiria kwamba jambo fulani limetokea. Programu yako inaweza kusikiliza matukio haya ili kujibu kwa wakati halisi.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// Fuatilia matukio ya Uhamisho wa USDC
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## Kuiga miamala {#simulating}

Kabla ya kutuma muamala, unaweza **kuuiga** ili kuangalia ikiwa utafaulu—na kuona thamani yake ya kurejesha—bila kutumia gesi. Hii ni muhimu kwa kupata makosa mapema na kwa kuhakiki matokeo.

Maktaba nyingi za mteja zinaunga mkono hili kupitia `eth_call`:

```ts
// Kwa kutumia Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## Mikoba na kusaini {#wallets-and-signing}

Katika programu tumizi iliyogatuliwa (dapp), mkoba wa mtumiaji (kama MetaMask, Rainbow, au WalletConnect) hushughulikia kusaini. Husimamii funguo za siri moja kwa moja.

[Maktaba za mkoba na zana za muunganisho](/developers/docs/apis/javascript/) hudhanifu hili ili uweze kuzingatia kujenga mantiki ya programu yako.

## Mafunzo yanayohusiana {#related-tutorials}

- [Kuita mkataba mahiri kutoka kwenye JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Kutuma miamala kwa kutumia web3.js na Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Jinsi ya kutazama NFT yako kwenye mkoba wako](/developers/tutorials/how-to-view-nft-in-metamask/)

## Usomaji zaidi {#further-reading}

- [Nyaraka za Viem: Kusoma na kuandika kwenye mikataba](https://viem.sh/docs/contract/readContract)
- [Nyaraka za ethers.js: Mikataba](https://docs.ethers.org/v6/api/contract/)
- [Uainishaji wa ABI ya Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [ABI ni nini? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## Mada zinazohusiana {#related-topics}

- [Ukusanyaji wa mikataba mahiri](/developers/docs/smart-contracts/compiling/)
- [Kusambaza mikataba mahiri](/developers/docs/smart-contracts/deploying/)
- [API za JavaScript](/developers/docs/apis/javascript/)
- [API za mazingira ya nyuma](/developers/docs/apis/backend/)
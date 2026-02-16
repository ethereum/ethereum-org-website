---
title: Ethereum kwa wajenzi wa JavaScript
description: Jifunze jinsi ya kutengeneza Ethereum kwa kutumia miradi na zana zinazotegemea JavaScript.
lang: sw
---

JavaScript ni kati ya lugha maarufu katika mfumo ikolojia wa Ethereum. Kwa hakika, kuna [timu](https://github.com/ethereumjs) iliyojitolea kuleta kiasi kikubwa cha Ethereum kwenye JavaScript iwezekanavyo.

Kuna fursa za kuandika JavaScript (au kitu cha karibu) katika [viwango vyote vya mrundikano](/developers/docs/ethereum-stack/).

## Wasiliana na Ethereum {#interact-with-ethereum}

### Maktaba za API za JavaScript {#javascript-api-libraries}

Ikiwa ungependa kuandika JavaScript ili kuuliza maswali kwenye blockchain, kutuma miamala na zaidi, njia rahisi zaidi ya kufanya hivyo ni kutumia [maktaba ya API ya JavaScript](/developers/docs/apis/javascript/). API hizi huruhusu wasanidi programu kuwasiliana kwa urahisi na [nodi katika mtandao wa Ethereum](/developers/docs/nodes-and-clients/).

Unaweza kutumia maktaba hizi kuingiliana na mikataba mahiri kwenye Ethereum ili uweze kutengeneza dapp ambapo unatumia JavaScript kuingiliana na mikataba iliyokuwepo awali.

**Angalia**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _inajumuisha utekelezaji wa mkoba wa Ethereum na huduma katika JavaScript na TypeScript._
- [viem](https://viem.sh) – _Kiolesura cha TypeScript cha Ethereum ambacho hutoa viambajengo vya hali ya chini visivyo na hali kwa ajili ya kuwasiliana na Ethereum._
- [Drift](https://ryangoree.github.io/drift/) – _maktaba-meta ya TypeScript yenye kache iliyojengewa ndani, ndoano, na dhihaka za majaribio kwa ajili ya usanidi rahisi wa Ethereum katika maktaba za web3._

### Mikataba-erevu {#smart-contracts}

Ikiwa wewe ni msanidi programu wa JavaScript na unataka kuandika mkataba wako mahiri, unaweza kutaka kufahamiana na [Solidity](https://solidity.readthedocs.io). Hii ndiyo lugha mahiri ya mkataba maarufu na inafanana kisintaksia na JavaScript, ambayo inaweza kurahisisha kujifunza.

Zaidi kuhusu [mikataba mahiri](/developers/docs/smart-contracts/).

## Elewa itifaki {#understand-the-protocol}

### Mashine halisi ya Ethereum {#the-ethereum-virtual-machine}

Kuna utekelezaji wa JavaScript wa [mashine halisi ya Ethereum](/developers/docs/evm/). Inaauni sheria za hivi punde za uma. Sheria za uma hurejelea mabadiliko yaliyofanywa kwa EVM kama matokeo ya uboreshaji uliopangwa.

Imegawanywa katika vifurushi anuwai vya JavaScript ambavyo unaweza kuangalia ili kuelewa vyema:

- Akaunti
- Vipande
- Kiambajengo chenyewe
- Miamala
- Na zaidi...

Hii itakusaidia kuelewa mambo kama vile "muundo wa data wa akaunti ni upi?".

Ikiwa ungependa kusoma msimbo, JavaScript hii inaweza kuwa njia mbadala nzuri ya kusoma kupitia hati zetu.

**Angalia EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Nodi na wateja {#nodes-and-clients}

Mteja wa Ethereumjs yuko katika maendeleo amilifu ambayo hukuwezesha kuchunguza jinsi wateja wa Ethereum hufanya kazi katika lugha unayoelewa; JavaScript!

**Angalia mteja**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Miradi mingine {#other-projects}

Pia kuna mambo mengine mengi yanayoendelea katika ulimwengu wa JavaScript ya Ethereum, ikiwa ni pamoja na:

- maktaba za huduma za mkoba.
- zana za kuzalisha, kuingiza, na kuhamisha funguo za Ethereum.
- utekelezaji wa `merkle-patricia-tree` – muundo wa data ulioainishwa katika karatasi ya njano ya Ethereum.

Chunguza chochote kinachokuvutia zaidi kwenye [repo ya EthereumJS](https://github.com/ethereumjs)

## Masomo zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_

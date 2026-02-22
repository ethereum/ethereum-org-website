---
title: Kupeleka mikataba erevu
description: Jifunze jinsi ya kupeleka mikataba-erevu kwenye mitandao ya Ethereum, ikiwa ni pamoja na mahitaji ya lazima, zana, na hatua za upelekaji.
lang: sw
---

Unahitaji kupeleka mkataba wako-erevu ili uweze kupatikana kwa watumiaji wa mtandao wa Ethereum.

Ili kupeleka mkataba-erevu, unahitaji tu kutuma muamala wa Ethereum wenye msimbo ulioandaliwa wa mkataba-erevu bila kubainisha mpokeaji yeyote.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuelewa [mitandao ya Ethereum](/developers/docs/networks/), [miamala](/developers/docs/transactions/) na [muundo wa mikataba-erevu](/developers/docs/smart-contracts/anatomy/) kabla ya kupeleka mikataba-erevu.

Kupeleka mkataba pia hugharimu ether (ETH) kwa kuwa huhifadhiwa kwenye mnyororo wa bloku, kwa hivyo unapaswa kufahamu [gesi na ada](/developers/docs/gas/) kwenye Ethereum.

Mwisho, utahitaji kuandaa mkataba wako kabla ya kuuwasilisha, kwa hiyo hakikisha umesoma kuhusu [kuandaa mikataba-erevu](/developers/docs/smart-contracts/compiling/).

## Jinsi ya kupeleka mkataba-erevu {#how-to-deploy-a-smart-contract}

### Vitu utakavyohitaji {#what-youll-need}

- Bytecode ya mkataba wako – hii hutengenezwa kupitia [uandaaji](/developers/docs/smart-contracts/compiling/)
- ETH ya gesi – utaweka kikomo chako cha gesi kama miamala mingine kwa hiyo fahamu kwamba upelekaji wa mkataba unahitaji gesi nyingi zaidi kuliko uhamisho rahisi wa ETH
- hati ya upelekaji au programu-jalizi
- ufikiaji wa [nodi ya Ethereum](/developers/docs/nodes-and-clients/), ama kwa kuendesha yako mwenyewe, kuunganisha kwenye nodi ya umma, au kupitia ufunguo wa API kwa kutumia [huduma ya nodi](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Hatua za kupeleka mkataba-erevu {#steps-to-deploy}

Hatua mahususi zinazohusika zitatategemea mfumo wa usanidi unaohusika. Kwa mfano, unaweza kuangalia [nyaraka za Hardhat kuhusu kupeleka mikataba yako](https://hardhat.org/docs/tutorial/deploying) au [nyaraka za Foundry kuhusu kupeleka na kuthibitisha mkataba-erevu](https://book.getfoundry.sh/forge/deploying). Mara tu utakapowasilishwa, mkataba wako utakuwa na anwani ya Ethereum kama [akaunti](/developers/docs/accounts/) zingine na unaweza kuthibitishwa kwa kutumia [zana za uthibitishaji wa msimbo chanzo](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Zana zinazohusiana {#related-tools}

**Remix - _Remix IDE huruhusu kusanidi, kupeleka na kusimamia mikataba-erevu kwa minyororo ya bloku kama Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Jukwaa la usanidi la Web3 ambalo hutoa utatuzi, uangalizi, na vizuizi vya ujenzi wa miundombinu kwa ajili ya kusanidi, kujaribu, kufuatilia na kuendesha mikataba-erevu_**

- [tenderly.co](https://tenderly.co/)
- [Nyaraka](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Mazingira ya usanidi ya kuandaa, kupeleka, kujaribu na kutatua programu yako ya Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Nyaraka kuhusu kupeleka mikataba yako](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Peleka mkataba wowote kwa urahisi kwenye mnyororo wowote unaoendana na EVM, kwa kutumia amri moja_**

- [Nyaraka](https://portal.thirdweb.com/deploy/)

**Crossmint - _Jukwaa la usanidi la web3 la kiwango cha biashara la kupeleka mikataba-erevu, kuwezesha malipo ya kadi za mkopo na mnyororo-mbali, na kutumia API kuunda, kusambaza, kuuza, kuhifadhi na kuhariri NFTs._**

- [crossmint.com](https://www.crossmint.com)
- [Nyaraka](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Mafunzo yanayohusiana {#related-tutorials}

- [Kupeleka mkataba wako wa kwanza-erevu](/developers/tutorials/deploying-your-first-smart-contract/) _– Utangulizi wa kupeleka mkataba wako wa kwanza-erevu kwenye mtandao wa majaribio wa Ethereum._
- [Hello World | mafunzo ya mkataba-erevu](/developers/tutorials/hello-world-smart-contract/) _– Mafunzo rahisi kufuata ya kuunda na kupeleka mkataba-erevu wa msingi kwenye Ethereum._
- [Kuingiliana na mikataba mingine kutoka Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Jinsi ya kupeleka mkataba mahiri kutoka kwa mkataba uliopo na kuingiliana nao._
- [Jinsi ya kupunguza ukubwa wa mkataba wako](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Jinsi ya kupunguza ukubwa wa mkataba wako ili ukae chini ya kikomo na kuokoa kwenye gesi_

## Masomo zaidi {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Kupeleka mikataba yako na Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Mifumo ya uundaji](/developers/docs/frameworks/)
- [Endesha nodi ya Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Nodi-kama-huduma](/developers/docs/nodes-and-clients/nodes-as-a-service)

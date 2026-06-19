---
title: Kusambaza mikataba mahiri
description: Jifunze jinsi ya kusambaza mikataba mahiri kwenye mitandao ya Ethereum, ikijumuisha mahitaji ya awali, zana, na hatua za usambazaji.
lang: sw
---

Unahitaji kusambaza mkataba mahiri wako ili upatikane kwa watumiaji wa mtandao wa Ethereum.

Ili kusambaza mkataba mahiri, unatuma tu muamala wa Ethereum ulio na msimbo uliokusanywa wa mkataba mahiri bila kubainisha mpokeaji yeyote.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuelewa [mitandao ya Ethereum](/developers/docs/networks/), [miamala](/developers/docs/transactions/) na [muundo wa mikataba mahiri](/developers/docs/smart-contracts/anatomy/) kabla ya kusambaza mikataba mahiri.

Kusambaza mkataba pia hugharimu Etha (ETH) kwa kuwa huhifadhiwa kwenye mnyororo wa vitalu, kwa hivyo unapaswa kufahamu [gesi na ada](/developers/docs/gas/) kwenye Ethereum.

Hatimaye, utahitaji kukusanya mkataba wako kabla ya kuusambaza, kwa hivyo hakikisha umesoma kuhusu [ukusanyaji wa mikataba mahiri](/developers/docs/smart-contracts/compiling/).

## Jinsi ya kusambaza mkataba mahiri {#how-to-deploy-a-smart-contract}

### Unachohitaji {#what-youll-need}

- Msimbo wa baiti wa mkataba wako – huu unazalishwa kupitia [ukusanyaji](/developers/docs/smart-contracts/compiling/)
- ETH kwa ajili ya gesi – utaweka kikomo cha gesi chako kama miamala mingine kwa hivyo fahamu kuwa usambazaji wa mkataba unahitaji gesi nyingi zaidi kuliko hamisho rahisi la ETH
- hati ya usambazaji au programu-jalizi
- ufikiaji wa [nodi ya Ethereum](/developers/docs/nodes-and-clients/), iwe kwa kuendesha yako mwenyewe, kuunganisha kwenye nodi ya umma, au kupitia ufunguo wa API ukitumia [huduma ya nodi](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Hatua za kusambaza mkataba mahiri {#steps-to-deploy}

Hatua mahususi zinazohusika zitategemea mfumo wa uundaji unaohusika. Kwa mfano, unaweza kuangalia [nyaraka za Hardhat kuhusu kusambaza mikataba yako](https://hardhat.org/docs/tutorial/deploying) au [nyaraka za Foundry kuhusu kusambaza na kuthibitisha mkataba mahiri](https://book.getfoundry.sh/forge/deploying). Ukisambazwa, mkataba wako utakuwa na anwani ya Ethereum kama [akaunti](/developers/docs/accounts/) zingine na unaweza kuthibitishwa kwa kutumia [zana za uthibitishaji wa msimbo chanzo](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Zana zinazohusiana {#related-tools}

**Remix - _Remix IDE inaruhusu kuunda, kusambaza na kusimamia mikataba mahiri kwa minyororo ya vitalu kama Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Jukwaa la uundaji la Web3 ambalo hutoa utatuzi, uwezo wa kuangalia, na vizuizi vya ujenzi wa miundombinu kwa ajili ya kuunda, kujaribu, kufuatilia, na kuendesha mikataba mahiri_**

- [tenderly.co](https://tenderly.co/)
- [Nyaraka](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Mazingira ya uundaji ya kukusanya, kusambaza, kujaribu, na kutatua programu yako ya Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Nyaraka kuhusu kusambaza mikataba yako](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Sambaza kwa urahisi mkataba wowote kwenye mnyororo wowote unaoendana na EVM, kwa kutumia amri moja_**

- [Nyaraka](https://portal.thirdweb.com/deploy/)

**Crossmint - _Jukwaa la uundaji la Web3 la kiwango cha biashara ili kusambaza mikataba mahiri, kuwezesha malipo ya kadi ya mkopo na malipo ya minyororo tofauti, na kutumia API kuunda, kusambaza, kuuza, kuhifadhi, na kuhariri NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Nyaraka](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blogu](https://blog.crossmint.com)

## Mafunzo yanayohusiana {#related-tutorials}

- [Kusambaza mkataba mahiri wako wa kwanza](/developers/tutorials/deploying-your-first-smart-contract/) _– Utangulizi wa kusambaza mkataba mahiri wako wa kwanza kwenye mtandao wa majaribio wa Ethereum._
- [Hello World | mafunzo ya mkataba mahiri](/developers/tutorials/hello-world-smart-contract/) _– Mafunzo rahisi kufuata ili kuunda na kusambaza mkataba mahiri wa msingi kwenye Ethereum._
- [Kutangamana na mikataba mingine kutoka kwenye Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Jinsi ya kusambaza mkataba mahiri kutoka kwenye mkataba uliopo na kutangamana nao._
- [Jinsi ya kupunguza ukubwa wa mkataba wako](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Jinsi ya kupunguza ukubwa wa mkataba wako ili kuuacha chini ya kikomo na kuokoa gesi_

## Usomaji zaidi {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Kusambaza mikataba yako na Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Mifumo ya uundaji](/developers/docs/frameworks/)
- [Endesha nodi ya Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Nodi kama huduma](/developers/docs/nodes-and-clients/nodes-as-a-service)
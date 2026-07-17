---
title: Mitandao ya Maendeleo
description: Muhtasari wa mitandao ya maendeleo na zana zinazopatikana kusaidia kujenga programu za Ethereum.
lang: sw
---

Unapojenga programu ya [Ethereum](/) yenye mikataba mahiri, utataka kuiendesha kwenye mtandao wa ndani ili kuona jinsi inavyofanya kazi kabla ya kuisambaza.

Sawa na jinsi unavyoweza kuendesha seva ya ndani kwenye kompyuta yako kwa maendeleo ya wavuti, unaweza kutumia mtandao wa maendeleo kuunda mfano wa mnyororo wa vitalu wa ndani ili kujaribu programu tumizi iliyogatuliwa (dapp) yako. Mitandao hii ya maendeleo ya Ethereum hutoa vipengele vinavyoruhusu urudiaji wa haraka zaidi kuliko mtandao wa majaribio wa umma (kwa mfano huhitaji kushughulika na kupata ETH kutoka kwenye bomba la mtandao wa majaribio).

## Mahitaji ya awali {#prerequisites}

Unapaswa kuelewa [misingi ya steki ya Ethereum](/developers/docs/ethereum-stack/) na [mitandao ya Ethereum](/developers/docs/networks/) kabla ya kuzama kwenye mitandao ya maendeleo.

## Mtandao wa maendeleo ni nini? {#what-is-a-development-network}

Mitandao ya maendeleo kimsingi ni wateja wa Ethereum (utekelezaji wa Ethereum) iliyoundwa mahususi kwa maendeleo ya ndani.

**Kwa nini usiendeshaji tu nodi ya kawaida ya Ethereum ndani?**

_Unaweza_ [kuendesha nodi](/developers/docs/nodes-and-clients/#running-your-own-node) lakini kwa kuwa mitandao ya maendeleo imejengwa kwa madhumuni ya maendeleo, mara nyingi huja na vipengele vinavyofaa kama vile:

- Kupanda data kwa uhakika kwenye mnyororo wa vitalu wako wa ndani (k.m., akaunti zenye salio la ETH)
- Kuzalisha vitalu papo hapo kwa kila muamala inaopokea, kwa mpangilio na bila kuchelewa
- Utendaji ulioboreshwa wa utatuzi na uwekaji kumbukumbu

## Zana zinazopatikana {#available-projects}

**Kumbuka**: [Mifumo mingi ya maendeleo](/developers/docs/frameworks/) inajumuisha mtandao wa maendeleo uliojengewa ndani. Tunapendekeza kuanza na mfumo ili [kuweka mazingira yako ya maendeleo ya ndani](/developers/local-environment/).

### Mtandao wa Hardhat {#hardhat-network}

Mtandao wa ndani wa Ethereum ulioundwa kwa ajili ya maendeleo. Inakuruhusu kusambaza mikataba yako, kuendesha majaribio yako na kutatua msimbo wako.

Mtandao wa Hardhat unakuja umejengewa ndani na Hardhat, mazingira ya maendeleo ya Ethereum kwa wataalamu.

- [Tovuti](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Minyororo ya Beacon ya Ndani {#local-beacon-chains}

Baadhi ya wateja wa mwafaka wana zana zilizojengewa ndani za kuanzisha minyororo ya beacon ya ndani kwa madhumuni ya majaribio. Maagizo ya Lighthouse, Nimbus na Lodestar yanapatikana:

- [Mtandao wa majaribio wa ndani kwa kutumia Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Mtandao wa majaribio wa ndani kwa kutumia Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Minyororo ya Majaribio ya Umma ya Ethereum {#public-beacon-testchains}

Pia kuna utekelezaji miwili ya majaribio ya umma ya Ethereum inayodumishwa: Sepolia na Hoodi. Mtandao wa majaribio unaopendekezwa wenye usaidizi wa muda mrefu ni Hoodi, ambao mtu yeyote yuko huru kuthibitisha. Sepolia inatumia seti ya mthibitishaji yenye ruhusa, ikimaanisha hakuna ufikiaji wa jumla kwa wathibitishaji wapya kwenye mtandao huu wa majaribio.

- [Jukwaa la Uzinduzi la Uwekaji Dhamana la Hoodi](https://hoodi.launchpad.ethereum.org/)

### Kifurushi cha Ethereum cha Kurtosis {#kurtosis}

Kurtosis ni mfumo wa ujenzi wa mazingira ya majaribio ya kontena nyingi ambao huwawezesha wasanidi programu kuanzisha ndani mifano inayoweza kuzalishwa tena ya mitandao ya mnyororo wa vitalu.

Kifurushi cha Kurtosis cha Ethereum kinaweza kutumika kuanzisha haraka mtandao wa majaribio wa Ethereum unaoweza kuwekewa vigezo, unaoweza kupanuka sana, na wa faragha kupitia Docker au Kubernetes. Kifurushi hiki kinaauni wateja wote wakuu wa Tabaka la Utekelezaji (EL) na Tabaka la Mwafaka (CL). Kurtosis inashughulikia kwa ustadi uchoraji wote wa bandari za ndani na miunganisho ya huduma kwa mtandao wakilishi utakaotumika katika uthibitishaji na mtiririko wa kazi wa majaribio unaohusiana na miundombinu ya msingi ya Ethereum.

- [Kifurushi cha mtandao wa Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Tovuti](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Nyaraka](https://docs.kurtosis.com/)

## Usomaji zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Mifumo ya maendeleo](/developers/docs/frameworks/)
- [Weka mazingira ya maendeleo ya ndani](/developers/local-environment/)

## Mafunzo: Mitandao ya maendeleo na mazingira ya majaribio kwenye Ethereum {#tutorials}

- [Tengeneza na ujaribu programu tumizi zilizogatuliwa (dapps) ukitumia mtandao wa majaribio wa ndani wa Ethereum wa wateja wengi](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Jinsi ya kuanzisha mtandao wa majaribio wa ndani wa Ethereum wa wateja wengi ukitumia Kurtosis kwa maendeleo na majaribio ya dapp._
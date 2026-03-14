---
title: Mitandao ya Maendeleo
description: Muhtasari wa mitandao ya maendeleo na zana zinazopatikana kusaidia kujenga programu za Ethereum.
lang: sw
---

Unapounda programu ya Ethereum na mikataba-erevu, utataka kuiendesha kwenye mtandao wa ndani ili kuona jinsi inavyofanya kazi kabla ya kuipeleka.

Sawa na jinsi unavyoweza kuendesha seva ya ndani kwenye kompyuta yako kwa ajili ya maendeleo ya wavuti, unaweza kutumia mtandao wa maendeleo kuunda mfano wa mnyororo wa bloku wa ndani ili kujaribu mfumo wako uliotawanywa. Mitandao hii ya maendeleo ya Ethereum hutoa vipengele vinavyoruhusu uradidi wa haraka zaidi kuliko testnet ya umma (kwa mfano, huhitaji kushughulika na kupata ETH kutoka kwenye bomba la testnet).

## Mahitaji ya awali {#prerequisites}

Unapaswa kuelewa [misingi ya mkusanyiko wa Ethereum](/developers/docs/ethereum-stack/) na [mitandao ya Ethereum](/developers/docs/networks/) kabla ya kuzama katika mitandao ya maendeleo.

## Mtandao wa maendeleo ni nini? {#what-is-a-development-network}

Mitandao ya maendeleo kimsingi ni wateja wa Ethereum (utekelezaji wa Ethereum) iliyoundwa mahususi kwa maendeleo ya ndani.

**Kwa nini usiendeshe tu nodi ya kawaida ya Ethereum kwenye kompyuta yako?**

Wewe _unaweza_ [kuendesha nodi](/developers/docs/nodes-and-clients/#running-your-own-node) lakini kwa kuwa mitandao ya maendeleo imeundwa kwa ajili ya maendeleo, mara nyingi huja na vipengele rahisi kama vile:

- Kuweka data kwenye mnyororo wako wa bloku wa ndani kwa njia bainifu (k.m., akaunti zenye salio za ETH)
- Kuzalisha bloku papo hapo kwa kila muamala inaopokea, kwa utaratibu na bila kuchelewa
- Utendaji ulioboreshwa wa utatuzi na uwekaji kumbukumbu

## Zana zinazopatikana {#available-projects}

**Kumbuka**: [Mifumo mingi ya maendeleo](/developers/docs/frameworks/) hujumuisha mtandao wa maendeleo uliojengewa ndani. Tunapendekeza kuanza na mfumo ili [kuweka mazingira yako ya maendeleo ya ndani](/developers/local-environment/).

### Mtandao wa Hardhat {#hardhat-network}

Mtandao wa ndani wa Ethereum ulioundwa kwa ajili ya maendeleo. Inakuruhusu kupeleka mikataba yako, kuendesha majaribio yako na kutatua msimbo wako.

Mtandao wa Hardhat huja ukiwa umejengewa ndani na Hardhat, mazingira ya maendeleo ya Ethereum kwa wataalamu.

- [Tovuti](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Minyororo Kioleza ya Ndani {#local-beacon-chains}

Baadhi ya wateja wa makubaliano wana zana zilizojengewa ndani za kuanzisha minyororo kioleza ya ndani kwa madhumuni ya majaribio. Maagizo ya Lighthouse, Nimbus na Lodestar yanapatikana:

- [Testnet ya ndani kwa kutumia Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Testnet ya ndani kwa kutumia Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Minyororo-Majaribio ya Umma ya Ethereum {#public-beacon-testchains}

Pia kuna utekelezaji wa majaribio mawili ya umma yanayodumishwa ya Ethereum: Sepolia na Hoodi. Testnet inayopendekezwa yenye usaidizi wa muda mrefu ni Hoodi, ambayo mtu yeyote yuko huru kuthibitisha. Sepolia hutumia seti ya wathibitishaji wenye ruhusa, kumaanisha hakuna ufikiaji wa jumla kwa wathibitishaji wapya kwenye testnet hii.

- [Launchpad ya Kusimamisha ya Hoodi](https://hoodi.launchpad.ethereum.org/)

### Kifurushi cha Ethereum cha Kurtosis {#kurtosis}

Kurtosis ni mfumo wa ujenzi wa mazingira ya majaribio ya makontena mengi ambayo huwawezesha wasanidi programu kuanzisha kwenye kompyuta zao mifano inayoweza kurudiwa ya mitandao ya mnyororo wa bloku.

Kifurushi cha Ethereum cha Kurtosis kinaweza kutumika kuanzisha haraka testnet ya Ethereum inayoweza kugeuzwa, inayoweza kupanuka sana, na ya faragha juu ya Docker au Kubernetes. Kifurushi hiki kinasaidia wateja wote wakuu wa Safu ya Utekelezaji (EL) na Safu ya Makubaliano (CL). Kurtosis hushughulikia kwa urahisi ramani zote za bandari za ndani na miunganisho ya huduma kwa mtandao wakilishi utakaotumika katika uthibitishaji na mtiririko wa kazi wa majaribio unaohusiana na miundombinu ya msingi ya Ethereum.

- [Kifurushi cha mtandao wa Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Tovuti](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Nyaraka](https://docs.kurtosis.com/)

## Masomo zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Mifumo ya uundaji](/developers/docs/frameworks/)
- [Weka mazingira ya maendeleo ya ndani](/developers/local-environment/)

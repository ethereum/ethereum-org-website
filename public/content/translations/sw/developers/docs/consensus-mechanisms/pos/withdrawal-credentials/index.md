---
title: Vitambulisho vya uondoaji
description: Maelezo ya aina za vitambulisho vya uondoaji vya mthibitishaji (0x00, 0x01, 0x02) na athari zake kwa waweka dhamana wa Ethereum.
lang: sw
---

Kila mthibitishaji ana **vitambulisho vya uondoaji** vinavyoamua jinsi na wapi ETH yao iliyowekwa dhamana na tuzo zinaweza kutolewa. Aina ya kitambulisho inaonyeshwa na baiti ya kwanza: `0x00`, `0x01`, au `0x02`. Kuelewa aina hizi ni muhimu kwa wathibitishaji wanaosimamia dhamana yao.

## 0x00: Vitambulisho vya kabla ya Shapella {#0x00-credentials}

Aina ya `0x00` ni muundo asili wa vitambulisho vya uondoaji kutoka kabla ya uboreshaji wa Shapella (Aprili 2023). Wathibitishaji wenye aina hii ya kitambulisho hawana anwani ya utoaji ya tabaka la utekelezaji iliyowekwa, ikimaanisha fedha zao zinabaki zimefungiwa kwenye tabaka la mwafaka. Ikiwa bado una vitambulisho vya `0x00`, lazima uboreshe hadi `0x01` au `0x02` kabla ya kupokea utoaji wowote.

## 0x01: Vitambulisho vya uondoaji vya zamani {#0x01-credentials}

Aina ya `0x01` ilianzishwa pamoja na uboreshaji wa Shapella na ikawa kiwango kwa wathibitishaji waliotaka kuweka anwani ya utoaji ya tabaka la utekelezaji. Ukiwa na vitambulisho vya `0x01`:

- Salio lolote linalozidi ETH 32 **linapelekwa moja kwa moja** kwenye anwani yako ya utoaji
- Kujitoa kikamilifu kunapitia foleni ya kawaida ya kujitoa
- Tuzo zinazozidi ETH 32 haziwezi kujilimbikiza—zinapelekwa nje mara kwa mara

**Kwa nini baadhi ya wathibitishaji bado wanatumia 0x01:** Ni rahisi na inafahamika. Wathibitishaji wengi waliweka amana baada ya Shapella na tayari wana aina hii, na inafanya kazi vizuri kwa wale wanaotaka utoaji wa moja kwa moja wa salio la ziada.

**Kwa nini haipendekezwi:** Ukiwa na `0x01`, unapoteza uwezo wa kulimbikiza tuzo zinazozidi ETH 32. Kila kiasi cha ziada kinapelekwa nje moja kwa moja, jambo ambalo linapunguza uwezo wa mthibitishaji wako wa kupata mapato na inahitaji kusimamia fedha zilizotolewa kando.

## 0x02: Vitambulisho vya uondoaji vinavyolimbikiza {#0x02-credentials}

Aina ya `0x02` ilianzishwa pamoja na uboreshaji wa Pectra na ndiyo **chaguo linalopendekezwa** kwa wathibitishaji leo. Wathibitishaji wenye vitambulisho vya `0x02` wakati mwingine huitwa "wathibitishaji wanaolimbikiza."

Ukiwa na vitambulisho vya `0x02`:

- Tuzo zinazozidi ETH 32 **zinalimbikizwa** kwa nyongeza za ETH 1 hadi kufikia kiwango cha juu cha salio tendaji cha ETH 2048
- Utoaji wa kiasi lazima uombwe kwa mikono (upelekaji wa moja kwa moja unatokea tu juu ya kikomo cha ETH 2048)
- Wathibitishaji wanaweza kuunganisha wathibitishaji wengi wa ETH 32 kuwa mthibitishaji mmoja mwenye salio kubwa zaidi
- Kujitoa kikamilifu bado kunasaidiwa kupitia foleni ya kawaida ya kujitoa

Utoaji wa kiasi na uunganishaji vinaweza kufanywa kupitia [Vitendo vya Mthibitishaji vya Launchpad](https://launchpad.ethereum.org/en/validator-actions).

**Kwa nini wathibitishaji wanapaswa kupendelea 0x02:** Inatoa ufanisi bora wa mtaji kupitia ulimbikizaji, udhibiti zaidi wa wakati utoaji unafanyika, na inasaidia uunganishaji wa wathibitishaji. Kwa waweka dhamana binafsi wanaokusanya tuzo kadiri muda unavyopita, hii inamaanisha salio tendaji lao—na hivyo tuzo zao—zinaweza kukua zaidi ya ETH 32 bila kuingilia kati kwa mikono.

**Muhimu:** Ukishabadilisha kutoka `0x01` kwenda `0x02`, huwezi kutengua.

Kwa mwongozo wa kina kuhusu kubadilisha kwenda kwenye vitambulisho vya Aina ya 2 na kipengele cha MaxEB, tazama [ukurasa wa maelezo wa MaxEB](/roadmap/pectra/maxeb/).

## Ninapaswa kuchagua nini? {#what-should-i-pick}

- **Wathibitishaji wapya:** Chagua `0x02`. Ni kiwango cha kisasa chenye ulimbikizaji bora na unyumbufu.
- **Wathibitishaji waliopo wa 0x01:** Fikiria kubadilisha kwenda `0x02` ikiwa unataka tuzo zilimbikizwe zaidi ya ETH 32 au unapanga kuunganisha wathibitishaji.
- **Wathibitishaji waliopo wa 0x00:** Boresha mara moja—huwezi kutoa bila kusasisha vitambulisho vyako. Lazima kwanza ubadilishe kwenda `0x01`, kisha unaweza kubadilisha kwenda `0x02`.

## Zana za kusimamia vitambulisho vya uondoaji {#withdrawal-credential-tools}

Zana kadhaa zinasaidia kuchagua au kubadilisha kati ya aina za vitambulisho:

- **[Ethereum Staking Launchpad](https://launchpad.ethereum.org/en/validator-actions)** - Zana rasmi kwa ajili ya amana na usimamizi wa mthibitishaji, ikijumuisha ubadilishaji wa vitambulisho na uunganishaji
- **[Pectra Staking Manager](https://pectrastaking.com)** - Kiolesura cha Wavuti (Web UI) chenye usaidizi wa kuunganisha mkoba kwa ajili ya ubadilishaji na uunganishaji
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** - Zana ya mstari wa amri kwa ajili ya ubadilishaji wa mkupuo
- **[Ethereal](https://github.com/wealdtech/ethereal)** - Zana ya CLI kwa ajili ya shughuli za Ethereum ikijumuisha usimamizi wa mthibitishaji

Kwa orodha kamili ya zana za uunganishaji na maagizo ya kina ya ubadilishaji, tazama [Zana za uunganishaji za MaxEB](/roadmap/pectra/maxeb/#consolidation-tooling).

## Usomaji zaidi {#further-reading}

- [Funguo katika Uthibitisho wa Dau (PoS) wa Ethereum](/developers/docs/consensus-mechanisms/pos/keys/) - Jifunze kuhusu funguo za mthibitishaji na jinsi zinavyohusiana na vitambulisho vya uondoaji
- [MaxEB](/roadmap/pectra/maxeb/) - Mwongozo wa kina kuhusu uboreshaji wa Pectra na kipengele cha kiwango cha juu cha salio tendaji
---
title: Vitambulisho vya utoaji
description: Ufafanuzi wa aina za vitambulisho vya utoaji vya mthibitishaji (0x00, 0x01, 0x02) na athari zake kwa watia dau wa Ethereum.
lang: sw
---

Kila mthibitishaji ana **kitambulisho cha utoaji** ambacho huamua jinsi na wapi ETH yake iliyowekwa dau na zawadi zinaweza kutolewa. Aina ya kitambulisho huonyeshwa na baiti ya kwanza: `0x00`, `0x01`, au `0x02`. Kuelewa aina hizi ni muhimu kwa wathibitishaji wanaosimamia dau lao.

## 0x00: Vitambulisho vya kabla ya Shapella {#0x00-credentials}

Aina ya `0x00` ni muundo asili wa kitambulisho cha utoaji kutoka kabla ya sasisho la Shapella (Aprili 2023). Wathibitishaji walio na aina hii ya kitambulisho hawana anwani ya utoaji ya safu ya utekelezaji iliyowekwa, ikimaanisha pesa zao hubaki zimefungwa kwenye safu ya makubaliano. Ikiwa bado una vitambulisho vya `0x00`, lazima usasishe hadi `0x01` au `0x02` kabla ya kupokea utoaji wowote.

## 0x01: Vitambulisho vya utoaji vya zamani {#0x01-credentials}

Aina ya `0x01` ilianzishwa na sasisho la Shapella na ikawa kiwango kwa wathibitishaji waliotaka kuweka anwani ya utoaji ya safu ya utekelezaji. Na vitambulisho vya `0x01`:

- Salio lolote lililo juu ya ETH 32 **huondolewa kiotomatiki** kwenda kwenye anwani yako ya utoaji
- Uondoaji kamili hupitia foleni ya kawaida ya uondoaji
- Zawadi zilizo juu ya ETH 32 haziwezi kujikusanya—huondolewa mara kwa mara

**Kwa nini baadhi ya wathibitishaji bado wanatumia 0x01:** Ni rahisi na inajulikana. Wathibitishaji wengi waliweka amana baada ya Shapella na tayari wana aina hii, na inafanya kazi vizuri kwa wale wanaotaka utoaji wa kiotomatiki wa salio la ziada.

**Kwa nini haipendekezwi:** Na `0x01`, unapoteza uwezo wa kujikusanyia zawadi zilizo juu ya ETH 32. Kila kiasi cha ziada huondolewa kiotomatiki, jambo ambalo linapunguza uwezo wa mthibitishaji wako wa kupata mapato na linahitaji usimamizi tofauti wa fedha zilizotolewa.

## 0x02: Vitambulisho vya utoaji vinavyojikusanya {#0x02-credentials}

Aina ya `0x02` ilianzishwa na sasisho la Pectra na ndiyo **chaguo linalopendekezwa** kwa wathibitishaji leo. Wathibitishaji walio na vitambulisho vya `0x02` wakati mwingine huitwa "wathibitishaji wanaojikusanya."

Na vitambulisho vya `0x02`:

- Zawadi zilizo juu ya ETH 32 **hujikusanya** kwa nyongeza za ETH 1 hadi kufikia salio la juu la ufanisi la ETH 2048
- Utoaji wa sehemu lazima uombwe mwenyewe (uondoaji wa kiotomatiki hutokea tu juu ya kiwango cha ETH 2048)
- Wathibitishaji wanaweza kuunganisha wathibitishaji wengi wa ETH 32 kuwa mthibitishaji mmoja mwenye salio la juu
- Uondoaji kamili bado unaungwa mkono kupitia foleni ya kawaida ya uondoaji

Utoaji wa sehemu na uunganishaji vinaweza kufanywa kupitia [Vitendo vya Mthibitishaji vya Launchpad](https://launchpad.ethereum.org/en/validator-actions).

**Kwa nini wathibitishaji wanapaswa kupendelea 0x02:** Inatoa ufanisi bora wa mtaji kupitia kujikusanya, udhibiti zaidi wa wakati utoaji unafanyika, na inaunga mkono uunganishaji wa wathibitishaji. Kwa watia dau wa pekee wanaokusanya zawadi kadri muda unavyopita, hii inamaanisha salio lao la ufanisi—na hivyo zawadi zao—zinaweza kukua zaidi ya ETH 32 bila kuingilia kati mwenyewe.

**Muhimu:** Mara tu unapobadilisha kutoka `0x01` hadi `0x02`, huwezi kurudi nyuma.

Kwa mwongozo wa kina juu ya kubadilisha hadi vitambulisho vya Aina ya 2 na kipengele cha MaxEB, tazama [ukurasa wa maelezo wa MaxEB](/roadmap/pectra/maxeb/).

## Nichague nini? {#what-should-i-pick}

- **Wathibitishaji wapya:** Chagua `0x02`. Ni kiwango cha kisasa chenye kujikusanya bora na unyumbufu.
- **Wathibitishaji waliopo wa 0x01:** Fikiria kubadilisha hadi `0x02` ikiwa unataka zawadi zijikusanye juu ya ETH 32 au unapanga kuunganisha wathibitishaji.
- **Wathibitishaji waliopo wa 0x00:** Sasisha mara moja—huwezi kutoa bila kusasisha vitambulisho vyako. Lazima kwanza ubadilishe hadi `0x01`, kisha unaweza kubadilisha hadi `0x02`.

## Zana za kusimamia vitambulisho vya utoaji {#withdrawal-credential-tools}

Zana kadhaa zinaunga mkono kuchagua au kubadilisha kati ya aina za vitambulisho:

- **[Launchpad ya Kusimamisha ya Ethereum](https://launchpad.ethereum.org/en/validator-actions)** - Zana rasmi ya amana na usimamizi wa wathibitishaji, pamoja na ubadilishaji na uunganishaji wa vitambulisho
- **[Meneja wa Kusimamisha wa Pectra](https://pectrastaking.com)** - UI ya wavuti yenye usaidizi wa kuunganisha mkoba kwa ubadilishaji na uunganishaji
- **[Zana ya CLI ya Ops ya Mthibitishaji wa Pectra](https://github.com/Luganodes/Pectra-Batch-Contract)** - Zana ya mstari wa amri kwa ubadilishaji wa makundi
- **[Ethereal](https://github.com/wealdtech/ethereal)** - Zana ya CLI kwa shughuli za Ethereum pamoja na usimamizi wa wathibitishaji

Kwa orodha kamili ya zana za uunganishaji na maagizo ya kina ya ubadilishaji, tazama [zana za uunganishaji za MaxEB](/roadmap/pectra/maxeb/#consolidation-tooling).

## Masomo zaidi {#further-reading}

- [Funguo katika uthibitisho wa hisa wa Ethereum](/developers/docs/consensus-mechanisms/pos/keys/) - Jifunze kuhusu funguo za mthibitishaji na jinsi zinavyohusiana na vitambulisho vya utoaji
- [MaxEB](/roadmap/pectra/maxeb/) - Mwongozo wa kina juu ya sasisho la Pectra na kipengele cha salio la juu la ufanisi

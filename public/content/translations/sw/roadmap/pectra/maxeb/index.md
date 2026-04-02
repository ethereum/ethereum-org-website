---
title: Pectra MaxEB
description: Jifunze zaidi kuhusu MaxEB katika toleo la Pectra
lang: sw
---

# MaxEB {#maxeb}

_tl;dr:_ Mgawanyiko mkali wa Pectra unaruhusu wathibitishaji wa Ethereum kuchagua salio la juu la ufanisi na kujumuisha kwa kubadilisha kutoka stakabadhi za uondoaji za **Aina ya 1** hadi **Aina ya 2**. Zana rasmi ya kufanya hivi ni Launchpad. Operesheni hii haiwezi kubadilishwa.

## Muhtasari {#overview}

### Nani anayeathirika? {#who-is-affected}

Mtu yeyote anayeendesha mthibitishaji - huyu anawezekana kuwa mtu anayejua faharasa (k.m., [Mthibitishaji #12345](https://beaconcha.in/validator/12345)) ya mthibitishaji anayemdhibiti. Ikiwa unatumia itifaki kuendesha mthibitishaji (k.m., Lido CSM au Rocket Pool), utalazimika kuwasiliana nao ili kuona ikiwa na lini wanasaidia maxEB.

Ikiwa unasimamisha kwa kutumia tokeni ya kusimamisha kioevu (k.m., rETH au stETH), hakuna hatua inayohitajika au inayopendekezwa.

### Nini maana ya "maxEB"? {#what-is-maxeb}

maxEB = Salio la Juu la Ufanisi la mthibitishaji. Hadi mgawanyiko mkali wa Pectra, kila mthibitishaji anapata faida kwenye kiwango cha juu cha ETH 32. Baada ya Pectra, wathibitishaji wana fursa ya kupata faida kwenye salio lolote kati ya ETH 32 na 2048, kwa nyongeza za ETH 1 kwa kukubali mabadiliko.

### Mthibitishaji anachaguaje kuingia? {#how-does-a-validator-opt-in}

Mthibitishaji anachagua kuingia kwenye mabadiliko ya maxEB kwa kubadilisha kutoka stakabadhi za uondoaji za **Aina ya 1** hadi **Aina ya 2**. Hili linaweza kufanywa kwenye [Launchpad (Vitendo vya Mthibitishaji)](https://launchpad.ethereum.org/validator-actions) baada ya mgawanyiko mkali wa Pectra kuanza kutumika. Kama ilivyo kwa **Aina ya 0** → **Aina ya 1**, kubadilisha kutoka **Aina ya 1** → **Aina ya 2** ni mchakato usioweza kubadilishwa.

### Stakabadhi ya uondoaji ni nini? {#whats-a-withdrawal-credential}

Unapoendesha mthibitishaji, unakuwa na seti ya stakabadhi za uondoaji. Hizi zinaweza kupatikana kwenye data yako ya json ya amana au unaweza kuzitazama kwenye [kichupo cha amana](https://beaconcha.in/validator/12345#deposits) cha beaconcha.in cha mthibitishaji wako.

1. Stakabadhi za uondoaji za **Aina ya 0**: Ikiwa stakabadhi za uondoaji za mthibitishaji wako zinaanza na `0x00...`, uliweka amana kabla ya mgawanyiko mkali wa Shapella na bado hujaweka anwani ya uondoaji.

![Stakabadhi ya uondoaji ya Aina ya 0](./0x00-wd.png)

2. Stakabadhi za uondoaji za **Aina ya 1**: Ikiwa stakabadhi za uondoaji za mthibitishaji wako zinaanza na `0x01...`, uliweka amana baada ya mgawanyiko mkali wa Shapella au tayari umebadilisha stakabadhi zako za **Aina ya 0** kuwa stakabadhi za **Aina ya 1**.

![Stakabadhi ya uondoaji ya Aina ya 1](./0x01-wd.png)

3. Stakabadhi za uondoaji za **Aina ya 2**: Aina hii mpya ya stakabadhi ya uondoaji itaanza na `0x02...` na itawashwa baada ya Pectra. Wathibitishaji walio na stakabadhi za uondoaji za **Aina ya 2** wakati mwingine huitwa "**wathibitishaji wanaojumuisha**"

| **Inaruhusiwa**         | **Hairuhusiwi**         |
| ----------------------- | ----------------------- |
| ✅ Aina ya 0 → Aina ya 1 | ❌ Aina ya 0 → Aina ya 2 |
| ✅ Aina ya 1 → Aina ya 2 | ❌ Aina ya 1 → Aina ya 0 |
|                         | ❌ Aina ya 2 → Aina ya 1 |
|                         | ❌ Aina ya 2 → Aina ya 0 |

### Hatari {#risks}

MaxEB inamwezesha mthibitishaji kutuma salio lake lote kwa mthibitishaji mwingine. Watumiaji wanaowasilisha ombi la ujumuishaji wanapaswa kuthibitisha chanzo na yaliyomo kwenye muamala wanaosaini. Zana rasmi ya kutumia vipengele vya maxEB ni Launchpad. Ukiamua kutumia zana ya mtu mwingine, unapaswa kuthibitisha kuwa:

- Ufunguo wa umma na anwani ya uondoaji ya mthibitishaji chanzo zinafanana na mthibitishaji anayemdhibiti
- Ufunguo wa umma wa mthibitishaji lengwa ni sahihi na ni mali yake
- Ombi ni la ubadilishaji, si ujumuishaji, ikiwa hawakusudii kutuma fedha kwa mthibitishaji mwingine
- Muamala unasainiwa na anwani sahihi ya uondoaji

**Tunapendekeza sana** kujadili zana yoyote ya mtu mwingine unayopanga kutumia na [jamii ya EthStaker](https://ethstaker.org/about). Ni mahali pazuri pa kuthibitisha usahihi wa mbinu yako na kuepuka makosa. Ukitumia zana mbovu au iliyosanidiwa vibaya, **salio lote la mthibitishaji wako linaweza kutumwa kwa mthibitishaji usiyemdhibiti** — bila njia ya kulirudisha.

## Maelezo ya kiufundi {#technical-details}

### Mtiririko {#the-flow}

Kutakuwa na matumizi mawili ya operesheni ya `ConsolidationRequest`:

1. Kubadilisha mthibitishaji aliyepo kutoka mthibitishaji wa **Aina ya 1** hadi **Aina ya 2**
2. Kujumuisha wathibitishaji wengine katika mthibitishaji aliyepo wa **Aina ya 2**

Katika ubadilishaji wa mthibitishaji wa **Aina ya 1** hadi **Aina ya 2**, _chanzo_ na _lengo_ vitakuwa mthibitishaji unayembadilisha. Operesheni itagharimu gesi na itawekwa kwenye foleni nyuma ya maombi mengine ya ujumuishaji. Foleni hii ni **tofauti** na foleni ya amana na haiathiriwi na amana mpya za wathibitishaji na inaweza kutazamwa kwenye [pectrified.com](https://pectrified.com/).

Ili kujumuisha wathibitishaji, lazima uwe na _mthibitishaji lengwa_ aliye na stakabadhi ya uondoaji ya **Aina ya 2**. Hii ndiyo sehemu ya salio la mthibitishaji yeyote anayejumuishwa, na faharasa inayohifadhiwa.

### Mahitaji ya kubadilisha hadi Aina ya 2 {#requirements-for-converting-to-type-2}

Hili litahitajika kwa mthibitishaji wa kwanza unayembadilisha kuwa **Aina ya 2**. Faharasa ya mthibitishaji huyu inahifadhiwa na iko hai. Kwa ubadilishaji, _mthibitishaji chanzo_ == _mthibitishaji lengwa._

Mthibitishaji lazima...

- awe hai
- awe na stakabadhi za uondoaji za **Aina ya 1**
- asiwe katika hali ya kutoka (au kupunguzwa)
- asiwe na uondoaji unaosubiri ulioanzishwa mwenyewe (haitumiki kwa kufagia)

![mfano wa ubadilishaji](./conversion.png)

### Mahitaji ya ujumuishaji {#requirements-for-consolidating}

Hii ni _operesheni sawa_ na kubadilisha lakini ni wakati _mthibitishaji chanzo_ ni tofauti na _mthibitishaji lengwa_. Faharasa ya mthibitishaji lengwa inahifadhiwa na inapokea salio kutoka kwa mthibitishaji chanzo. Faharasa ya mthibitishaji chanzo inawekwa katika hali ya `EXITED`.

Katika kesi hii, mthibitishaji chanzo ana mahitaji yote sawa na hapo juu pamoja na:

- amekuwa hai kwa angalau saa ~27.3 (moja `SHARD_COMMITTEE_PERIOD`)

Mthibitishaji lengwa lazima

- awe na stakabadhi za uondoaji za **Aina ya 2**
- asiwe katika hali ya kutoka.

![mfano wa ujumuishaji](./consolidation.png)

### Ombi la ujumuishaji {#the-consolidation-request}

Ombi la ujumuishaji litasainiwa na anwani ya uondoaji inayohusiana na mthibitishaji chanzo na litakuwa na:

1. Anwani ya mthibitishaji chanzo (k.m., `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Ufunguo wa umma wa mthibitishaji chanzo (k.m., `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Ufunguo wa umma wa mthibitishaji lengwa huyo

Katika ubadilishaji, 2 & 3 zitakuwa sawa. Operesheni hii inaweza kufanywa kwenye [Launchpad](https://launchpad.ethereum.org/).

### Mahitaji ya kusaini {#signing-requirements}

Ili kuwasilisha `ConsolidationRequest`, **anwani ya uondoaji ya mthibitishaji chanzo** lazima isaini ombi. Hii inathibitisha udhibiti juu ya fedha za mthibitishaji.

### Nini kinasainiwa? {#what-is-signed}

Mzizi wa kusaini uliotenganishwa na kikoa wa kitu cha `ConsolidationRequest` hutumiwa.

- **Kikoa:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Sehemu za mzizi wa kusaini:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

Sahihi ya **BLS** inayotokana inawasilishwa pamoja na ombi.

Kumbuka: Usainiaji unafanywa na anwani ya uondoaji, sio ufunguo wa mthibitishaji.

### Uondoaji wa sehemu {#partial-withdrawals}

Wathibitishaji walio na stakabadhi za **Aina ya 1** hupata ufagiaji wa kiotomatiki, usio na gesi wa salio lao la ziada (chochote zaidi ya ETH 32) hadi kwenye anwani yao ya uondoaji. Kwa sababu **Aina ya 2** inaruhusu mthibitishaji kujumuisha salio kwa nyongeza za ETH 1, haitafagia salio kiotomatiki hadi ifike ETH 2048. Uondoaji wa sehemu kwa wathibitishaji wa **Aina ya 2** lazima uanzishwe mwenyewe na utagharimu gesi.

## Zana za ujumuishaji {#consolidation-tooling}

Kuna zana kadhaa zinazopatikana za kudhibiti ujumuishaji. Zana rasmi, iliyoundwa na Ethereum Foundation, ni [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Pia kuna zana za watu wengine zilizoundwa na mashirika kutoka kwa jamii ya kusimamisha ambazo zinaweza kutoa vipengele visivyotolewa na Launchpad. Ingawa zana zilizopo hapa hazijakaguliwa au kuidhinishwa na Ethereum Foundation, zifuatazo ni zana za chanzo-wazi kutoka kwa wanajamii wanaojulikana.

| Zana                                                 | Tovuti                                                                                                    | Chanzo cha wazi                  | Muundaji                                       | Iliyokaguliwa                                                                                                                                        | Kiolesura                                                                              | Vipengele muhimu                                                               |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Meneja wa Kusimamisha wa Pectra                      | pectrastaking.com                                                                         | Ndio, Apache 2.0 | [Pier Two](https://piertwo.com/)               | Hapana                                                                                                                                               | UI ya Wavuti                                                                           | Wallet Connect, inafanya kazi na SAFE                                          |
| Zana ya CLI ya Uendeshaji wa Mthibitishaji wa Pectra | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract)                                              | Ndio, MIT                        | [Luganodes](https://www.luganodes.com/)        | Ndio, Quantstamp [Mei 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Mstari wa amri                                                                         | Kukusanya, kwa wathibitishaji wengi kwa wakati mmoja                           |
| Ethereal                                             | [GitHub](https://github.com/wealdtech/ethereal)                                                           | Ndio, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Hapana                                                                                                                                               | Mstari wa amri                                                                         | Seti kamili ya vipengele kwa ajili ya usimamizi wa wathibitishaji na nodi      |
| Siren                                                | [GitHub](https://github.com/sigp/siren)                                                                   | Ndio, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/)          | Hapana                                                                                                                                               | Mstari fulani wa amri, lakini hasa UI ya wavuti                                        | Inafanya kazi tu ikiwa unatumia mteja wa makubaliano wa Lighthouse             |
| Consolideth.app                      | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Ndio, leseni za MIT              | [Stakely](https://stakely.io/)                 | Hapana                                                                                                                                               | UI ya wavuti, inayopangishwa na Stakely na iko tayari kupangishwa mwenyewe bila malipo | Inasaidia viunganisho vikuu vya mkoba ikiwa ni pamoja na Safe na WalletConnect |

## Maswali Yanayoulizwa Mara kwa Mara {#faq}

### Je, kuchagua kuingia kunabadilisha bahati yangu ya pendekezo au zawadi? {#change-luck-or-rewards}

Hapana. Kuchagua kuingia hakupunguzi mabadiliko yako ya pendekezo - majukumu yako na uteuzi wa pendekezo vinabaki vile vile. Kwa mfano, ikiwa una wathibitishaji wawili wa ETH 32 dhidi ya mthibitishaji mmoja wa ETH 64, utakuwa na nafasi sawa za jumla za kuchaguliwa kupendekeza bloku na kupata zawadi.

### Je, kuchagua kuingia kunabadilisha hatari yangu ya kupunguzwa? {#change-slashing-risk}

Kwa waendeshaji wadogo au wasio wa kitaalamu, jibu fupi ni hapana. Jibu refu ni kwamba, kwa waendeshaji wa kitaalamu wanaoendesha wathibitishaji wengi kwa kila nodi na arifa za haraka, kujumuisha katika wathibitishaji wachache kunaweza kupunguza uwezo wao wa kukabiliana na upunguzaji na kuzuia matukio ya mfululizo. Adhabu ya awali ya _upunguzaji_ kwa wathibitishaji wote imepunguzwa sana kutoka ETH 1 (kwa ETH 32) hadi ETH 0.0078125 (kwa ETH 32) ili kukabiliana na hatari hii.

### Je, ni lazima niondoke kwenye mthibitishaji wangu ili kubadilisha? {#exit-validator}

Hapana. Unaweza kubadilisha papo hapo bila kutoka.

### Itachukua muda gani kubadilisha / kujumuisha? {#how-long}

Kiwango cha chini cha saa 27.3 lakini ujumuishaji pia unategemea foleni. Foleni hii ni huru kutoka kwa foleni za amana na uondoaji na haiathiriwi nazo.

### Je, naweza kuweka faharasa yangu ya mthibitishaji? {#keep-validator-index}

Ndiyo. Ubadilishaji wa papo hapo huhifadhi faharasa sawa ya mthibitishaji. Ukijumuisha wathibitishaji wengi, utaweza tu kuweka faharasa ya _mthibitishaji lengwa_.

### Je, nitakosa uthibitisho? {#miss-attestations}

Wakati wa ujumuishaji katika mthibitishaji mwingine, mthibitishaji chanzo hutoka na kuna kipindi cha kusubiri cha takriban saa 27 kabla salio kuwa hai kwenye mthibitishaji lengwa. Kipindi hiki **hakiathiri vipimo vya utendaji**.

### Je, nitapata adhabu? {#incur-penalties}

Hapana. Muda wote mthibitishaji wako yuko mtandaoni, hutapata adhabu.

### Je, anwani za uondoaji za wathibitishaji wanaojumuishwa zinapaswa kufanana? {#withdrawal-addresses-match}

Hapana. Lakini _chanzo_ lazima kiidhinishe ombi kutoka kwa anwani yake yenyewe.

### Je, zawadi zangu zitajumuika baada ya kubadilisha? {#rewards-compound}

Ndiyo. Kwa stakabadhi za **Aina ya 2**, zawadi zilizo juu ya ETH 32 huwekwa tena kiotomatiki — lakini si papo hapo. Kwa sababu ya bafa ndogo (inayoitwa [_hysteresis_](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)), salio lako linahitaji kufikia **takriban ETH 1.25 zaidi** kabla ya ziada kuwekwa tena. Kwa hivyo badala ya kujumuisha kwa ETH 33.0, inatokea kwa 33.25 (salio la ufanisi = ETH 33), kisha 34.25 (salio la ufanisi = ETH 34), na kadhalika.

### Je, bado naweza kupata ufagiaji wa kiotomatiki baada ya kubadilisha? {#automatic-sweep}

Ufagiaji wa kiotomatiki utatokea tu kwa salio la ziada zaidi ya 2048. Kwa uondoaji mwingine wote wa sehemu, utahitaji kuuanzisha mwenyewe.

### Je, naweza kubadilisha mawazo yangu na kurudi kutoka Aina ya 2 hadi Aina ya 1? {#go-back-to-type1}

Hapana. Kubadilisha kuwa **Aina ya 2** hakuwezi kubadilishwa.

### Ikiwa ninataka kujumuisha wathibitishaji wengi, je, ni lazima nibadilishe kila mmoja kuwa Aina ya 2 kwanza? {#consolidate-multiple-validators}

Hapana! Badilisha mthibitishaji mmoja kuwa Aina ya 2 kisha tumia huyo kama lengo. Wathibitishaji wengine wote waliojumuishwa katika lengo hilo la Aina ya 2 wanaweza kuwa Aina ya 1 au Aina ya 2

### Mthibitishaji wangu yuko nje ya mtandao au chini ya ETH 32 - je, bado naweza kuubadilisha? {#offline-or-below-32eth}

Ndiyo. Muda wote ukiwa hai (haujatoka) na unaweza kusaini na anwani yake ya uondoaji, unaweza kuubadilisha.

## Rasilimali {#resources}

- [Vipimo vya makubaliano ya Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md): Hili ndilo toleo 'halisi' zaidi unalopaswa kutegemea. Ukiwa na shaka, soma vipimo
- Sio kila mtu anayestarehe kupitia msimbo, kwa hivyo [hii maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) inaweza kusaidia kutafsiri vipimo. _Kanusho: Vipimo, sio AI, vinapaswa kutegemewa kama ukweli, kwani AI inaweza kutafsiri taarifa vibaya au kutoa majibu ya kubuni_
- [pectrified.com](https://pectrified.com/): Tazama hali ya ujumuishaji, amana, na muda wa kusubiri kwenye foleni
- [Ethereal](https://github.com/wealdtech/ethereal): Zana ya CLI iliyoundwa na jamii kwa ajili ya kudhibiti kazi za kawaida za wathibitishaji
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Mkataba ulioundwa na jamii unaoruhusu wathibitishaji wengi wa Ethereum kuwekwa amana katika muamala mmoja

---
title: MaxEB
metaTitle: Pectra MaxEB
description: Jifunze zaidi kuhusu MaxEB katika toleo la Pectra
lang: sw
authors: ["Nixo"]
---

*Kwa ufupi:* Mchepuo mgumu wa Pectra unaruhusu wathibitishaji wa Ethereum kuchagua salio tendaji la juu zaidi na kujilimbikiza kwa kubadilisha kutoka **Aina ya 1** hadi **Aina ya 2** ya vitambulisho vya uondoaji. Zana rasmi ya kufanya hivi ni Launchpad. Operesheni hii haiwezi kutenguliwa.

## Muhtasari {#overview}

### Nani anaathirika? {#who-is-affected}

Mtu yeyote anayeendesha mthibitishaji - huyu huenda ni mtu anayejua faharisi (k.m., [Mthibitishaji #12345](https://beaconcha.in/validator/12345)) ya mthibitishaji anayemdhibiti. Ikiwa unatumia itifaki kuendesha mthibitishaji (k.m., Lido CSM au Rocket Pool), itabidi uangalie nao ili kuona kama na lini wanaunga mkono maxEB.

Ikiwa unaweka dhamana ukitumia tokani ya uwekaji amana wenye ukwasi (lst) (k.m., rETH au stETH), hakuna hatua inayohitajika au kupendekezwa.

### "maxEB" ni nini? {#what-is-maxeb}

maxEB = Salio Tendaji la JUU ZAIDI la mthibitishaji. Hadi mchepuo mgumu wa Pectra, kila mthibitishaji anachuma kwa kiwango cha juu cha 32 ETH. Baada ya Pectra, wathibitishaji wana chaguo la kuchuma kwenye salio lolote kati ya 32 na 2048 ETH, katika nyongeza za 1 ETH kwa kuchagua mabadiliko hayo.

### Mthibitishaji anachaguaje kushiriki? {#how-does-a-validator-opt-in}

Mthibitishaji anachagua mabadiliko ya maxEB kwa kubadilisha kutoka **Aina ya 1** hadi **Aina ya 2** ya vitambulisho vya uondoaji. Hili linaweza kufanywa kwenye [Launchpad (Vitendo vya Mthibitishaji)](https://launchpad.ethereum.org/validator-actions) baada ya mchepuo mgumu wa Pectra kuanza kutumika. Kama ilivyo kwa **Aina ya 0** → **Aina ya 1**, kubadilisha kutoka **Aina ya 1** → **Aina ya 2** ni mchakato usioweza kutenguliwa.

### Kitambulisho cha uondoaji ni nini? {#whats-a-withdrawal-credential}

Unapoendesha mthibitishaji, unakuwa na seti ya vitambulisho vya uondoaji. Hivi vinaweza kupatikana katika json yako ya data ya amana au unaweza kuvitazama kwenye [kichupo cha amana](https://beaconcha.in/validator/12345#deposits) cha beaconcha.in cha mthibitishaji wako.

1. Vitambulisho vya uondoaji vya **Aina ya 0**: Ikiwa vitambulisho vya uondoaji vya mthibitishaji wako vinaanza na `0x00...`, uliweka amana kabla ya mchepuo mgumu wa Shapella na bado hujaweka anwani ya utoaji.

![Type 0 withdrawal credential](./0x00-wd.png)

2. Vitambulisho vya uondoaji vya **Aina ya 1**: Ikiwa vitambulisho vya uondoaji vya mthibitishaji wako vinaanza na `0x01...`, uliweka amana baada ya mchepuo mgumu wa Shapella au tayari ulibadilisha vitambulisho vyako vya **Aina ya 0** kuwa vitambulisho vya **Aina ya 1**.

 ![Type 1 withdrawal credential](./0x01-wd.png)

3. Vitambulisho vya uondoaji vya **Aina ya 2**: Aina hii mpya ya kitambulisho cha uondoaji itaanza na `0x02...` na itawezeshwa baada ya Pectra. Wathibitishaji wenye vitambulisho vya uondoaji vya **Aina ya 2** wakati mwingine huitwa "**wathibitishaji wanaolimbikiza**"

| **Inaruhusiwa** | **Hairuhusiwi** |
| --- | --- |
| ✅ Aina ya 0 → Aina ya 1 | ❌ Aina ya 0 → Aina ya 2 |
| ✅ Aina ya 1 → Aina ya 2 | ❌ Aina ya 1 → Aina ya 0 |
|  | ❌ Aina ya 2 → Aina ya 1 |
|  | ❌ Aina ya 2 → Aina ya 0 |

### Hatari {#risks}

MaxEB inamwezesha mthibitishaji kutuma salio lake lote kwa mthibitishaji mwingine. Watumiaji wanaowasilisha ombi la ujumuishaji wanapaswa kuthibitisha chanzo na yaliyomo kwenye muamala wanaosaini. Zana rasmi ya kutumia vipengele vya maxEB ni Launchpad. Ikiwa utaamua kutumia zana ya wahusika wengine, unapaswa kuthibitisha kwamba:

- Ufunguo wa umma wa mthibitishaji chanzo na anwani ya utoaji vinalingana na mthibitishaji wanayemdhibiti
- Ufunguo wa umma wa mthibitishaji lengwa ni sahihi na ni wao
- Ombi ni ubadilishaji, sio ujumuishaji, ikiwa hawakusudii kutuma fedha kwa mthibitishaji mwingine
- Muamala unasainiwa na anwani sahihi ya utoaji

Tunapendekeza **kwa dhati** kujadili zana yoyote ya wahusika wengine unayopanga kutumia na [jumuiya ya EthStaker](https://ethstaker.org/about). Ni mahali pazuri pa kuhakiki mbinu yako na kuepuka makosa. Ikiwa unatumia zana hasidi au iliyosanidiwa vibaya, **salio lako lote la mthibitishaji linaweza kutumwa kwa mthibitishaji usiyemdhibiti** — bila njia ya kulipata tena.

## Maelezo ya kiufundi {#technical-details}

### Mtiririko {#the-flow}

Kutakuwa na matumizi mawili ya operesheni ya `ConsolidationRequest`:

1. Kubadilisha mthibitishaji aliyepo kutoka mthibitishaji wa **Aina ya 1** hadi **Aina ya 2**
2. Kujumuisha wathibitishaji wengine kwenye mthibitishaji wa **Aina ya 2** aliyepo

Katika ubadilishaji wa mthibitishaji wa **Aina ya 1** hadi **Aina ya 2**, *chanzo* na *lengo* vitakuwa mthibitishaji unayembadilisha. Operesheni itagharimu gesi na itawekwa kwenye foleni nyuma ya maombi mengine ya ujumuishaji. Foleni hii inajitegemea **kando** na foleni ya amana na haiathiriwi na amana mpya za wathibitishaji na inaweza kutazamwa kwenye [pectrified.com](https://pectrified.com/).

Ili kujumuisha wathibitishaji, lazima uwe na *mthibitishaji lengwa* ambaye ana kitambulisho cha uondoaji cha **Aina ya 2**. Hiki ndicho kituo cha mwisho cha salio lolote la mthibitishaji linalojumuishwa, na faharisi inayohifadhiwa.

### Mahitaji ya kubadilisha hadi Aina ya 2 {#requirements-for-converting-to-type-2}

Hili litahitajika kwa mthibitishaji wa kwanza unayembadilisha kuwa **Aina ya 2**. Faharisi ya mthibitishaji huyu inahifadhiwa na inafanya kazi. Kwa ubadilishaji, *mthibitishaji chanzo* == *mthibitishaji lengwa.*

Mthibitishaji lazima...

- awe anafanya kazi
- awe na vitambulisho vya uondoaji vya **Aina ya 1**
- asiwe katika hali ya kujitoa (au kufanyiwa ukataji)
- asiwe na utoaji unaosubiri ulioanzishwa kwa mikono (haitumiki kwa ufagiaji)

![conversion illustration](./conversion.png)

### Mahitaji ya kujumuisha {#requirements-for-consolidating}

Hii ni *operesheni sawa* na kubadilisha lakini ni wakati *mthibitishaji chanzo* ni tofauti na *mthibitishaji lengwa*. Faharisi ya mthibitishaji lengwa inahifadhiwa na inapokea salio kutoka kwa mthibitishaji chanzo. Faharisi ya mthibitishaji chanzo inawekwa katika hali ya `EXITED`.

Katika hali hii, mthibitishaji chanzo ana mahitaji yote sawa na hapo juu pamoja na:

- amekuwa akifanya kazi kwa angalau saa ~27.3 (moja `SHARD_COMMITTEE_PERIOD`)

Mthibitishaji lengwa lazima

- awe na vitambulisho vya uondoaji vya **Aina ya 2**
- asiwe katika hali ya kujitoa.

![consolidation illustration](./consolidation.png)

### Ombi la ujumuishaji {#the-consolidation-request}

Ombi la ujumuishaji litasainiwa na anwani ya utoaji inayohusishwa na mthibitishaji chanzo na kuwa na:

1. Anwani ya mthibitishaji chanzo (k.m., `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Ufunguo wa umma wa mthibitishaji chanzo (k.m., `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Ufunguo wa umma wa mthibitishaji huyo lengwa

Katika ubadilishaji, 2 & 3 zitakuwa sawa. Operesheni hii inaweza kufanywa kwenye [Launchpad](https://launchpad.ethereum.org/).

### Mahitaji ya kusaini {#signing-requirements}

Ili kuwasilisha `ConsolidationRequest`, **anwani ya utoaji ya mthibitishaji chanzo** lazima isaini ombi. Hii inathibitisha udhibiti wa fedha za mthibitishaji.

### Nini kinasainiwa? {#what-is-signed}

[Mzizi wa kusaini](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#compute_signing_root) uliotenganishwa na kikoa wa kipengee cha `ConsolidationRequest` unatumika.

- **Kikoa:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Nyanja za mzizi wa kusaini:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

**Sahihi ya BLS** inayotokana inawasilishwa pamoja na ombi.

Kumbuka: Kusaini kunafanywa na anwani ya utoaji, sio ufunguo wa mthibitishaji.

### Utoaji wa kiasi {#partial-withdrawals}

Wathibitishaji wenye vitambulisho vya **Aina ya 1** hupata ufagiaji wa kiotomatiki, usio na gesi wa salio lao la ziada (chochote zaidi ya 32 ETH) kwenye anwani yao ya utoaji. Kwa sababu **Aina ya 2** inamruhusu mthibitishaji kulimbikiza masalio katika nyongeza za 1 ETH, haitafagia masalio kiotomatiki hadi ifikie 2048 ETH. Utoaji wa kiasi kwa wathibitishaji wa **Aina ya 2** lazima uanzishwe kwa mikono na utagharimu gesi.

## Zana za ujumuishaji {#consolidation-tooling}

Kuna zana kadhaa zinazopatikana za kudhibiti ujumuishaji. Zana rasmi, iliyoundwa na Taasisi ya Ethereum, ni [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Pia kuna zana za wahusika wengine zilizoundwa na taasisi kutoka kwa jumuiya ya uwekaji dhamana ambazo zinaweza kutoa vipengele ambavyo havitolewi na Launchpad. Ingawa zana hapa hazijakaguliwa au kuidhinishwa na Taasisi ya Ethereum, zifuatazo ni zana za chanzo wazi na wanachama wanaojulikana wa jumuiya.

| Zana | Tovuti | Chanzo wazi | Muundaji | Imekaguliwa | Kiolesura | Vipengele muhimu |
| --- | --- | --- | --- | --- | --- | --- |
| Pectra Staking Manager | pectrastaking.com | Ndiyo, Apache 2.0 | [Pier Two](https://piertwo.com/) | Hapana | Kiolesura cha Wavuti | WalletConnect, inafanya kazi na SAFE |
| Pectra Validator Ops CLI Tool | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | Ndiyo, MIT | [Luganodes](https://www.luganodes.com/) | Ndiyo, Quantstamp [Mei 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Mstari wa amri | Ukusanyaji wa mafungu, kwa wathibitishaji wengi kwa wakati mmoja |
| Ethereal | [GitHub](https://github.com/wealdtech/ethereal) | Ndiyo, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Hapana | Mstari wa amri | Seti kamili ya vipengele kwa usimamizi wa mthibitishaji na nodi |
| Siren | [GitHub](https://github.com/sigp/siren) | Ndiyo, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/) | Hapana | Baadhi ya mstari wa amri, lakini hasa kiolesura cha wavuti | Inafanya kazi tu ikiwa unatumia mteja wa mwafaka wa Lighthouse |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Ndiyo, leseni za MIT | [Stakely](https://stakely.io/) | Hapana | Kiolesura cha Wavuti, kinapangishwa na stakely na kiko tayari kupangishwa kibinafsi bila malipo| Inasaidia miunganisho mikuu ya mkoba ikiwa ni pamoja na safe na WalletConnect |

## Maswali Yanayoulizwa Mara kwa Mara {#faq}

### Je, kuchagua kushiriki kunabadilisha bahati yangu ya pendekezo au tuzo? {#change-luck-or-rewards}

Hapana. Kuchagua kushiriki hakupunguzi nafasi yako ya pendekezo - majukumu yako na uteuzi wa pendekezo unabaki vile vile. Kwa mfano, ikiwa una wathibitishaji wawili wa 32 ETH dhidi ya mthibitishaji mmoja wa 64 ETH, utakuwa na nafasi sawa za jumla za kuchaguliwa kupendekeza kitalu na kupata tuzo.

### Je, kuchagua kushiriki kunabadilisha hatari yangu ya ukataji? {#change-slashing-risk}

Kwa waendeshaji wadogo au wasio wa kitaalamu, jibu fupi ni hapana. Jibu refu ni kwamba, kwa waendeshaji wa kitaalamu wanaoendesha wathibitishaji wengi kwa kila nodi na arifa za haraka, kujumuisha kuwa wathibitishaji wachache kunaweza kupunguza uwezo wao wa kukabiliana na ukataji na kuzuia matukio mfululizo. *Adhabu* ya awali ya ukataji kwa wathibitishaji wote imepunguzwa kwa kiasi kikubwa kutoka 1 ETH (kwa kila 32 ETH) hadi 0.0078125 ETH (kwa kila 32 ETH) ili kufidia hatari hii.

### Je, lazima nimtoe mthibitishaji wangu ili kubadilisha? {#exit-validator}

Hapana. Unaweza kubadilisha hapo hapo bila kujitoa.

### Itachukua muda gani kubadilisha / kujumuisha? {#how-long}

Kiwango cha chini cha saa 27.3 lakini ujumuishaji pia unategemea foleni. Foleni hii inajitegemea kando na foleni za amana na utoaji na haiathiriwi nazo.

### Je, ninaweza kuhifadhi faharisi yangu ya mthibitishaji? {#keep-validator-index}

Ndiyo. Ubadilishaji wa hapo hapo unahifadhi faharisi sawa ya mthibitishaji. Ikiwa unajumuisha wathibitishaji wengi, utaweza tu kuhifadhi faharisi ya *mthibitishaji lengwa*.

### Je, nitakosa uthibitisho? {#miss-attestations}

Wakati wa ujumuishaji kwenye mthibitishaji mwingine, mthibitishaji chanzo anajitoa na kuna kipindi cha kusubiri cha saa ~27 kabla ya salio kufanya kazi kwenye mthibitishaji lengwa. Kipindi hiki **hakiathiri vipimo vya utendaji**.

### Je, nitapata adhabu? {#incur-penalties}

Hapana. Mradi mthibitishaji wako yuko mtandaoni, hutapata adhabu.

### Je, anwani za utoaji za wathibitishaji wanaojumuishwa lazima zilingane? {#withdrawal-addresses-match}

Hapana. Lakini *chanzo* lazima kiidhinishe ombi kutoka kwa anwani yake yenyewe.

### Je, tuzo zangu zitalimbikizwa baada ya kubadilisha? {#rewards-compound}

Ndiyo. Ukiwa na vitambulisho vya **Aina ya 2**, tuzo zilizo juu ya 32 ETH zinawekwa dhamana tena kiotomatiki — lakini si mara moja. Kwa sababu ya bafa ndogo (inayoitwa [*hysteresis*](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)), salio lako linahitaji kufikia **zaidi ya 1.25 ETH** kabla ya ziada kuwekwa dhamana tena. Kwa hivyo badala ya kulimbikiza kwa 33.0 ETH, inafanyika kwa 33.25 (salio tendaji = 33 ETH), kisha 34.25 (salio tendaji = 34 ETH), na kuendelea.

### Je, bado ninaweza kupata ufagiaji wa kiotomatiki baada ya kubadilisha? {#automatic-sweep}

Ufagiaji wa kiotomatiki utafanyika tu kwa masalio ya ziada zaidi ya 2048. Kwa utoaji mwingine wote wa kiasi, utahitaji kuanzisha kwa mikono.

### Je, ninaweza kubadili mawazo yangu na kurudi kutoka Aina ya 2 hadi Aina ya 1? {#go-back-to-type1}

Hapana. Kubadilisha hadi **Aina ya 2** hakuwezi kutenguliwa.

### Ikiwa ninataka kujumuisha wathibitishaji wengi, je, lazima nibadilishe kila mmoja kuwa Aina ya 2 kwanza? {#consolidate-multiple-validators}

Hapana! Badilisha mthibitishaji mmoja kuwa Aina ya 2 kisha umtumie huyo kama lengo. Wathibitishaji wengine wote waliojumuishwa kwenye lengo hilo la Aina ya 2 wanaweza kuwa Aina ya 1 au Aina ya 2

### Mthibitishaji wangu yuko nje ya mtandao au chini ya 32 ETH - je, bado ninaweza kumbadilisha? {#offline-or-below-32eth}

Ndiyo. Mradi anafanya kazi (hajajitoa) na unaweza kusaini na anwani yake ya utoaji, unaweza kumbadilisha.

## Rasilimali {#resources}

- [Vipimo vya mwafaka vya Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md): Hili ndilo toleo 'la kweli zaidi' ambalo unapaswa kutegemea. Ukiwa na shaka, soma vipimo
- Sio kila mtu anastarehe kupitia msimbo, kwa hivyo [maxEB-GPT hii](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) inaweza kusaidia kutafsiri vipimo. *Kanusho: Vipimo, sio AI, vinapaswa kutegemewa kama ukweli, kwani AI inaweza kutafsiri vibaya habari au kubuni majibu*
- [pectrified.com](https://pectrified.com/): Tazama hali ya ujumuishaji, amana, na nyakati za kusubiri kwenye foleni
- [Ethereal](https://github.com/wealdtech/ethereal): Zana ya CLI iliyoundwa na jumuiya kwa ajili ya kudhibiti kazi za kawaida za mthibitishaji
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Mkataba ulioundwa na jumuiya unaoruhusu wathibitishaji wengi wa Ethereum kuwekewa amana katika muamala mmoja
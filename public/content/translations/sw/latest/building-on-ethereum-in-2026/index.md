---
title: "Kujenga kwenye Ethereum mwaka 2026: nini kimebadilika"
description: "Maboresho matatu ya itifaki tangu 2023 yalibadilisha mambo mawili ambayo wajenzi wanajali: gharama ya kutumia tabaka la 1 (l1) na kile ambacho mikoba ya kawaida inaweza kufanya. Mwongozo wa vitendo wa kujenga kwenye Ethereum mwaka 2026."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "ada za gesi"
  - "udhanifu wa akaunti"
  - "maboresho ya itifaki"
published: 2026-05-07
image: /images/developers/blog/latest-post-header-3.png
breadcrumb: Kujenga kwenye Ethereum mwaka 2026
lang: sw
---

Ikiwa mtazamo wako wa Ethereum uliundwa kati ya 2021 hadi 2023, umepitwa na wakati. Maboresho matatu ya itifaki tangu wakati huo, [Dencun](/roadmap/dencun/) mnamo Machi 2024, [Pectra](/roadmap/pectra/) mnamo Mei 2025, na [Fusaka](/roadmap/fusaka/) mnamo Desemba 2025, yalibadilisha mambo mawili ambayo wajenzi wanajali, gharama ya kutumia tabaka la 1 (l1) na kile ambacho mikoba ya kawaida inaweza kufanya.

## Mtandao Mkuu ni wa bei nafuu tena {#mainnet-is-cheap-again}

Mfumo wa ada wa 2021 hadi 2023 si dhana salama tena ya msingi.

Kufikia Mei 5, 2026, kifuatiliaji cha gesi cha Etherscan kinaonyesha gesi ya kawaida kuwa karibu Gwei 0.15, na wastani wa kila siku ukiwa karibu Gwei 0.5 hadi Aprili. Hamisho la msingi la ETH linagharimu chini ya senti moja katika kiwango hicho, huku siku za hivi karibuni zikigharimu senti za tarakimu moja ya chini. Mwenendo umekuwa ukishuka katika kila moja ya maboresho ya hivi karibuni, na linalofuata, [Glamsterdam](/roadmap/glamsterdam/), linatarajiwa kushusha ada zaidi. Hiyo inafanya "Mtandao Mkuu wa Ethereum ni ghali sana kwa programu nyingi" kuwa mtazamo uliopitwa na wakati.

Ikiwa unataka kanuni rahisi, tumia hesabu za gesi badala ya hadithi za zamani. Kwa Gwei 0.5, wastani wa hivi karibuni wa Aprili, na ETH ikiwa takriban $2,350, gharama za kielelezo zinaonekana hivi.

| Operesheni       | Gesi Iliyotumika    | Gharama ya Kielelezo |
| :-------------- | :---------- | :---------------- |
| Hamisho la ETH    | 21,000      | **$0.025**        |
| Hamisho la ERC-20 | \~65,000    | **$0.076**        |
| Idhinisha ERC-20  | \~46,000    | **$0.054**        |
| Badilishano            | \~180,000   | **$0.21**         |
| Kusambaza ERC-20   | \~1,200,000 | **$1.41**         |

Hiyo ni mifano, si uhakika. Gharama hubadilika kulingana na bei ya ETH, bei ya gesi, na ugumu wa mkataba. Viwango vya Gwei vinaweza kubadilika sana ndani ya mwezi wa kawaida huku gharama ya dola ikibadilika kidogo sana, kwa sababu mikusanyiko sasa inabeba takriban asilimia 95 ya miamala ya Ethereum na tabaka la 1 (l1) kwa kawaida hufanya kazi chini ya lengo lake la kitalu. Ada za Mtandao Mkuu sasa ziko chini vya kutosha kiasi kwamba programu nyingi zinaweza kufanya kazi kwa busara kwenye Mtandao Mkuu.

### Kwa nini gharama zilishuka {#why-costs-fell}

Maboresho matatu yalifanya kazi kubwa.

Dencun (Machi 2024) ilianzisha EIP-4844 na kuipa mikusanyiko njia yao wenyewe ya data kupitia mablobu, na soko tofauti la ada. Mikusanyiko iliacha kushindana na trafiki ya kawaida ya utekelezaji kwenye nafasi sawa ya kitalu.

Pectra ilianzishwa mnamo Mei 7, 2025. EIP-7691 iliongeza uwezo wa upitishaji wa blobu kutoka lengo la 3 / kiwango cha juu cha mablobu 6 kwa kila kitalu hadi lengo la 6 / kiwango cha juu cha 9, jambo ambalo lilipanua njia ya data ya bei nafuu inayotumiwa na mikusanyiko na kushusha ada za tabaka la 2 (l2) zaidi.

Fusaka ilianzishwa mnamo Desemba 3, 2025. Mabadiliko yake makuu ya uwezo yalikuwa PeerDAS, ambayo inaruhusu wathibitishaji kuchukua sampuli za data ya blobu badala ya kupakua kila blobu kwa ukamilifu, na uchukuaji huo wa sampuli ndio unaofanya idadi kubwa ya mablobu kuwa salama kwenye tabaka la mtandao. Sambamba na hilo, jamii iliongeza kikomo cha gesi cha tabaka la 1 (l1) kutoka 30M hadi 60M wakati wa 2025, na EIP-7935 ya Fusaka ilisanifisha 60M kama msingi mpya. EIP-7825 inaweka kikomo kwa muamala wowote mmoja kuwa takriban gesi 16.78M, jambo ambalo programu nyingi hazitagundua lakini usambazaji mkubwa sana na miito mingi ya pamoja sasa inabidi itoshee ndani yake. EIP-7951 pia iliongeza uthibitishaji wa asili wa secp256r1 (P-256) kwenye Mtandao Mkuu, jambo ambalo linafanya sahihi za kifunguo na WebAuthn kuwa nafuu zaidi kuthibitisha katika mtiririko wa akaunti.

Athari halisi ni kwamba Mtandao Mkuu haupangwi bei tena kama mnyororo uliojaa msongamano wa kudumu.

## Jinsi EIP-7702 inavyobadilisha muundo wa akaunti {#how-eip-7702-changes-the-account-model}

Pectra pia ilileta EIP-7702, ambayo inapa mikoba ya kawaida ufikiaji wa tabia za akaunti janja kama vile ukusanyaji wa mafungu, ufadhili wa gesi, funguo za kipindi, mtiririko wa urejeshaji, na uzoefu wa mtumiaji (UX) unaofaa kwa kifunguo, bila kumfanya mtumiaji ahamie kwenye akaunti mpya.

Inafanya kazi kwa kuongeza aina mpya ya muamala (aina `0x04`, `SetCode`) ambayo inaruhusu EOA kuweka kielekezi kwenye msimbo wa mkataba ambao tayari umesambazwa. Mtumiaji anabaki na anwani ileile, ufunguo wa asili wa EOA unaendelea kuwa na udhibiti kamili wa akaunti, na ukaimishaji unaweza kubadilishwa baadaye au kuwekwa upya kwenye anwani tupu.

Kwa wajenzi wa programu, mabadiliko ya vitendo ni kuuomba mkoba matokeo, si usanidi wa kiwango cha chini wa EIP-7702. Ikiwa mtumiaji anahitaji kuidhinisha na kufanya badilishano katika mtiririko mmoja, omba fungu kupitia ERC-5792 `wallet_sendCalls`. Mkoba unaweza kuamua ikiwa utatumia EIP-7702, ERC-4337, au mfumo mwingine wa akaunti.

Msimbo uliokaimishwa ni mpaka wa usalama. Ikiwa mkoba unaelekeza EOA kwenye msimbo wenye hitilafu au mbaya, msimbo huo unaweza kufanya miito kama mtumiaji, ikiwa ni pamoja na idhinisho la tokeni, hamisho, na mwingiliano wa programu. Wajenzi wanapaswa kuchukulia malengo ya ukaimishaji kama miundombinu ya mkoba, wakitegemea utekelezaji uliokaguliwa na mkoba na kutowaomba watumiaji kukaimisha kwa msimbo unaodhibitiwa na programu kiholela.

## Hili linabadilisha nini kuhusu jinsi ya kujenga {#what-this-changes-about-how-to-build}

Swali la msingi la mjenzi lilikuwa "ni tabaka la 2 (l2) lipi ambalo ni la bei nafuu vya kutosha?" Swali hilo bado lina majibu, lakini si hilo pekee. Huku ada za tabaka la 1 (l1) zikiwa katika kiwango cha senti kwa kila muamala wakati wa mzigo wa kawaida, na EIP-7702 ikiruhusu mkoba wowote kuonyesha uzoefu wa mtumiaji (UX) wa akaunti janja bila kuhamisha anwani, swali la msingi lenye manufaa zaidi ni ikiwa programu inapaswa kuwepo kwenye Mtandao Mkuu, au ikiwa tabaka la 2 (l2) mahususi linatoa usambazaji halisi, ukwasi, au faida ya UX ambayo tabaka la 1 (l1) haliwezi.

Dhana ya akaunti inabadilika pia. Usibuni programu mpya kana kwamba kila akaunti ya mtumiaji ni EOA ya kawaida ya ECDSA ambayo lazima ishikilie ETH kabla ya kufanya chochote cha maana. Pendelea miingiliano ya ukusanyaji wa mafungu katika kiwango cha mkoba kama vile ERC-5792 `wallet_sendCalls`, chukulia ufadhili wa gesi na funguo za kipindi zitakuwa vipengele vya kawaida vya mkoba, na chukulia vifunguo na mtiririko wa urejeshaji kama sehemu ya uzoefu wa mtumiaji (UX) wa akaunti badala ya mbinu tofauti za uingizaji.

## Nini kinafuata {#whats-next}

Uboreshaji unaofuata wa Ethereum uliopewa jina ni Glamsterdam, ukiwa na Orodha za Ufikiaji za Kiwango cha Kitalu (BALs) na utengano wa mpendekezaji na mjengaji (PBS) uliowekwa rasmi (ePBS) kama vipengele vikuu. Kwa pamoja, hivyo vinafanya iwe salama kuongeza kikomo cha gesi cha kitalu kutoka milioni 60 leo kuelekea takriban milioni 200, na kuacha uwezo zaidi wa tabaka la 1 (l1) kwa wajenzi kufanya kazi nao. Uanzishaji unatarajiwa katika nusu ya pili ya 2026. Baada ya Glamsterdam, [Hegotá](https://forkcast.org/upgrade/hegota/) imepangwa kufuata, huku Orodha za Ujumuishaji Zinazolazimishwa na Chaguo la Mchepuo (FOCIL) zikichaguliwa kama kipengele chake kikuu.

Kwa wajenzi, vipengele vinavyofaa kufuatiliwa ni uwezo zaidi wa tabaka la 1 (l1) (BALs), ujumuishaji wa muamala unaotegemewa zaidi (FOCIL), na njia kuelekea udhanifu wa akaunti wa asili. ePBS, kipengele kingine kikuu cha Glamsterdam, kwa kiasi kikubwa ni mabadiliko ya miundombinu ambayo yanaondoa utegemezi wa uaminifu chini ya ujumuishaji wa muamala wa tabaka la 1 (l1). Mabadiliko ya moja kwa moja katika kiwango cha programu ni madogo.

BALs zinahusu kuweka tabaka la 1 (l1) kuwa la bei nafuu kadiri matumizi yanavyoongezeka. Kwa lugha rahisi, kitalu kingekuja na ramani ya akaunti na hifadhi inayohusika. Wateja wanaweza kutumia ramani hiyo kuchukua data mapema na kutekeleza miamala inayojitegemea kwa wakati mmoja, jambo ambalo linafanya iwe salama zaidi kuongeza kikomo cha gesi cha tabaka la 1 (l1) bila kufanya vitalu kuwa vya polepole sana kuthibitisha. Athari ya vitendo kwa wajenzi ni kwamba shughuli zaidi zinaweza kurudi kwenye Mtandao Mkuu bila kuunda upya kiotomatiki mfumo wa gesi wa 2021 hadi 2023.

FOCIL inahusu kuingiza miamala halali kwenye vitalu hata wakati mzalishaji mmoja wa kitalu angependelea kuiacha. Leo, ikiwa upande unaojenga kitalu unapuuza muamala, itifaki iliyosalia ina njia chache za kuulazimisha uingie. Kwa EIP-7805, wathibitishaji kadhaa wangesema, kwa kweli, "tuliona miamala hii halali ikisubiri kwenye mempool ya umma." Kitalu kinachofuata basi kinapaswa kuijumuisha, au wathibitishaji wanaweza kukataa kuunga mkono kitalu hicho. Kwa wajenzi, hili ni muhimu wakati ufikiaji wa kutegemewa wa tabaka la 1 (l1) ni sehemu ya bidhaa, ikiwa ni pamoja na zana za faragha, njia za kuingia zilizodhibitiwa, au programu zinazohudumia watumiaji ambao wanaweza kuchujwa na baadhi ya watoa huduma za miundombinu.

Kwa wajenzi wa programu, kipengele cha Hegotá cha kutazama kwa karibu zaidi ni udhanifu wa akaunti. EIP-8141, Miamala ya Fremu, ingeongeza aina ya muamala ambapo uthibitishaji, utekelezaji, na malipo ya gesi yamegawanywa katika fremu. Kwa vitendo, hiyo inamaanisha akaunti janja inaweza kuthibitisha muamala yenyewe, kufafanua sheria zake za sahihi, kuidhinisha nani analipa gesi, na kutekeleza kitendo kimoja au zaidi bila kutegemea EntryPoint ya ERC-4337, wafungashaji, au wapitishaji wanaoendeshwa na programu.

Hiyo inabadilisha dhana za bidhaa. Ufadhili wa gesi unakuwa muundo wa asili wa akaunti badala ya miundombinu ambayo kila programu inapaswa kupanga kando. Mifumo mbadala ya sahihi inakuwa rahisi kusaidia, ikiwa ni pamoja na vifunguo leo na njia ya kuondoka kwenye ECDSA ikiwa uhamiaji wa baada ya kwanta utakuwa wa lazima. Ikiwa EIP-8141 au muundo sawa wa udhanifu wa akaunti wa asili utafika, muundo wa mjenzi unahama kutoka "EOA inatia sahihi muamala" hadi "akaunti inafafanua jinsi inavyothibitisha, kulipia, na kutekeleza muamala."

Huo ndio mwelekeo, si ahadi. EIP-8141 ni Rasimu, na kufikia Mei 2026 "inazingatiwa tu kujumuishwa" katika Hegotá, ikimaanisha timu za wateja zinaizungumzia lakini hazijajitolea kuileta katika uboreshaji huo. Njia ya vitendo ya ujenzi ya 2026 kwa uzoefu wa mtumiaji (UX) wa akaunti bado ni EIP-7702 pamoja na mtiririko wa mkoba wa ERC-4337, lakini wajenzi wanapaswa kubuni kana kwamba akaunti zinazoweza kupangwa zinakuwa muundo wa msingi wa akaunti.

## Nini cha kujenga tofauti sasa {#what-to-build-differently-now}

Anza kwa kuangalia upya dhana za zamani za ada. Ikiwa mwongozo wako wa usambazaji bado unachukulia Mtandao Mkuu wa Ethereum kama mazingira ya Gwei 10 hadi 30 kwa msingi, labda unaelekeza kazi nyingi sana mbali na tabaka la 1 (l1). Mtandao Mkuu unafaa kuzingatiwa kwanza wakati programu yako inategemea ukwasi wa pamoja, utangamano na itifaki zilizopo, kutoegemea upande wowote, au hali ya thamani ya juu ambayo inapaswa kuishi ambapo usalama wa Ethereum na mwafaka wa kijamii ni imara zaidi.

Tumia tabaka la 2 (l2) kwa sababu ambazo bado ni muhimu, ikiwa ni pamoja na usambazaji, kiasi kikubwa sana cha miamala, mifumo ikolojia mahususi kwa programu, au gharama kwa kila kitendo ambazo zinahitaji kuwa karibu na sifuri iwezekanavyo. Hoja si "Mtandao Mkuu kwa kila kitu." Hoja ni kwamba "Mtandao Mkuu ni ghali sana" haipaswi tena kuwa kichujio cha kwanza.

Kwa upande wa akaunti, jenga kulingana na uwezo wa mkoba badala ya EOA ghafi. Sehemu yako ya mbele inapaswa kuwa tayari kwa miito iliyokusanywa kwa mafungu, gesi iliyofadhiliwa, funguo za kipindi, vifunguo, na mtiririko wa urejeshaji kufika kupitia mikoba. EIP-7702 na ERC-4337 ndizo zana za vitendo leo. Udhanifu wa akaunti wa asili ndio mwelekeo wa kufuatilia unaofuata.

Acha kuchukulia Mtandao Mkuu wa Ethereum kama tabaka ghali la ukamilishaji ambalo unaligusa tu mwishoni, na uache kuchukulia akaunti za watumiaji kama funguo tuli za ECDSA ambazo lazima zishikilie ETH kabla ya kufanya chochote. Ethereum mwaka 2026 inaelekea kwenye utekelezaji wa bei nafuu wa tabaka la 1 (l1) na akaunti zinazoweza kupangwa. Jenga kwa ajili ya ulimwengu huo.

## Usomaji zaidi {#further-reading}

- [Tangazo la Mtandao Mkuu la Pectra](https://blog.ethereum.org/en/2025/04/23/pectra-mainnet)
- [Tangazo la Mtandao Mkuu la Fusaka](https://blog.ethereum.org/2025/11/06/fusaka-mainnet-announcement)
- [Sasisho la Vipaumbele vya Itifaki kwa 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Kituo cha ukaguzi #9 (Apr 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [Miongozo ya Pectra 7702 kwenye ethereum.org](https://ethereum.org/en/roadmap/pectra/7702/)
- [EIP-7702 Weka Msimbo kwa EOAs](https://eips.ethereum.org/EIPS/eip-7702)
- [EIP-7928 Orodha za Ufikiaji za Kiwango cha Kitalu](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-7805 Orodha za Ujumuishaji Zinazolazimishwa na Chaguo la Mchepuo (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8141 Muamala wa Fremu](https://eips.ethereum.org/EIPS/eip-8141)
- [Uboreshaji wa Forkcast Hegotá](https://forkcast.org/upgrade/hegota/)
- [Kifuatiliaji cha Gesi cha Etherscan](https://etherscan.io/gastracker)
- [EIP-7773 Meta ya Hardfork ya Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Ramani ya njia ya Glamsterdam kwenye ethereum.org](https://ethereum.org/roadmap/glamsterdam/)
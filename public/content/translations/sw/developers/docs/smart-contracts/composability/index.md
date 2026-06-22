---
title: Utangamano wa mkataba mahiri
description: Jifunze jinsi mikataba mahiri inavyoweza kuunganishwa kama matofali ya Lego ili kuunda programu tumizi zilizogatuliwa (dapps) changamano kwa kutumia tena vijenzi vilivyopo.
lang: sw
incomplete: true
---

## Utangulizi mfupi {#a-brief-introduction}

Mikataba mahiri ni ya umma kwenye Ethereum na inaweza kufikiriwa kama API zilizo wazi. Huhitaji kuandika mkataba wako mahiri ili kuwa msanidi wa programu tumizi iliyogatuliwa (dapp), unahitaji tu kujua jinsi ya kuingiliana nayo. Kwa mfano, unaweza kutumia mikataba mahiri iliyopo ya [Uniswap](https://uniswap.exchange/swap), soko la kubadilishana lililogatuliwa, kushughulikia mantiki yote ya badilishano la tokeni katika programu yako – huhitaji kuanza upya. Angalia baadhi ya mikataba yao ya [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) na [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## Utangamano ni nini? {#what-is-composability}

Utangamano ni kuunganisha vijenzi tofauti ili kuunda mifumo au matokeo mapya. Katika usanidi wa programu, utangamano unamaanisha wasanidi wanaweza kutumia tena vijenzi vya programu vilivyopo ili kuunda programu mpya. Njia nzuri ya kuelewa utangamano ni kufikiria vipengele vinavyoweza kuunganishwa kama matofali ya Lego. Kila Lego inaweza kuunganishwa na nyingine, ikikuruhusu kuunda miundo changamano kwa kuunganisha Lego tofauti.

Katika Ethereum, kila mkataba mahiri ni aina ya Lego—unaweza kutumia mikataba mahiri kutoka kwa miradi mingine kama matofali ya ujenzi kwa mradi wako. Hii inamaanisha huhitaji kutumia muda kurudia kutatua tatizo ambalo tayari limetatuliwa au kujenga kuanzia mwanzo.

## Utangamano hufanyaje kazi? {#how-does-composability-work}

Mikataba mahiri ya Ethereum ni kama API za umma, kwa hivyo mtu yeyote anaweza kuingiliana na mkataba au kuiunganisha kwenye programu tumizi zilizogatuliwa (dapps) kwa utendaji ulioongezwa. Utangamano wa mkataba mahiri kwa ujumla hufanya kazi kwa kanuni tatu: umoduli, uhuru, na ugunduzi:

**1. Umoduli**: Huu ni uwezo wa vijenzi binafsi kufanya kazi maalum. Katika Ethereum, kila mkataba mahiri una matumizi maalum (kama inavyoonyeshwa katika mfano wa Uniswap).

**2. Uhuru**: Vijenzi vinavyoweza kuunganishwa lazima viweze kufanya kazi kwa kujitegemea. Kila mkataba mahiri katika Ethereum unajitekeleza wenyewe na unaweza kufanya kazi bila kutegemea sehemu nyingine za mfumo.

**3. Ugunduzi**: Wasanidi hawawezi kuita mikataba ya nje au kuunganisha maktaba za programu kwenye programu tumizi ikiwa hazipatikani kwa umma. Kwa muundo, mikataba mahiri ni ya chanzo wazi; mtu yeyote anaweza kuita mkataba mahiri au kuunda mchepuo wa msimbo.

## Faida za utangamano {#benefits-of-composability}

### Mzunguko mfupi wa usanidi {#shorter-development-cycle}

Utangamano hupunguza kazi ambayo wasanidi wanapaswa kufanya wakati wa kuunda [programu tumizi zilizogatuliwa (dapps)](/apps/#what-are-dapps). [Kama Naval Ravikant anavyosema:](https://twitter.com/naval/status/1444366754650656770) "Chanzo wazi kinamaanisha kila tatizo linapaswa kutatuliwa mara moja tu."

Ikiwa kuna mkataba mahiri unaotatua tatizo moja, wasanidi wengine wanaweza kuutumia tena, kwa hivyo hawahitaji kutatua tatizo lile lile. Kwa njia hii, wasanidi wanaweza kuchukua maktaba za programu zilizopo na kuongeza utendaji wa ziada ili kuunda dapps mpya.

### Ubunifu mkubwa zaidi {#greater-innovation}

Utangamano unahimiza ubunifu na majaribio kwa sababu wasanidi wako huru kutumia tena, kurekebisha, kunakili, au kuunganisha msimbo wa chanzo wazi ili kuunda matokeo yanayohitajika. Kama matokeo, timu za usanidi hutumia muda mchache kwenye utendaji wa kimsingi na zinaweza kutenga muda zaidi kufanya majaribio ya vipengele vipya.

### Uzoefu bora wa mtumiaji {#better-user-experience}

Mwingiliano kati ya vijenzi vya mfumo wa ikolojia wa Ethereum unaboresha uzoefu wa mtumiaji. Watumiaji wanaweza kufikia utendaji mkubwa zaidi wakati dapps zinapounganisha mikataba mahiri ya nje kuliko katika mfumo wa ikolojia uliogawanyika ambapo programu haziwezi kuwasiliana.

Tutatumia mfano kutoka kwa biashara ya usuluhishi (arbitrage) ili kuonyesha faida za mwingiliano:

Ikiwa tokeni inafanya biashara kwa bei ya juu kwenye `exchange A` kuliko `exchange B`, unaweza kutumia tofauti ya bei kupata faida. Hata hivyo, unaweza kufanya hivyo tu ikiwa una mtaji wa kutosha kufadhili muamala (yaani, kununua tokeni kutoka `exchange B` na kuiuza kwenye `exchange A`).

Katika hali ambapo huna fedha za kutosha kugharamia biashara, mkopo wa ghafla unaweza kuwa bora. [Mikopo ya ghafla](/defi/#flash-loans) ni ya kiufundi sana, lakini wazo la msingi ni kwamba unaweza kukopa rasilimali (bila dhamana) na kurudisha kiasi hicho ndani ya muamala _mmoja_.

Tukirudi kwenye mfano wetu wa awali, mfanyabiashara wa usuluhishi anaweza kuchukua mkopo wa ghafla mkubwa, kununua tokeni kutoka `exchange B`, kuziuza kwenye `exchange A`, kulipa mtaji + riba, na kubaki na faida, ndani ya muamala huo huo. Mantiki hii changamano inahitaji kuunganisha miito kwa mikataba mingi, jambo ambalo lisingewezekana ikiwa mikataba mahiri ingekosa mwingiliano.

## Mifano ya utangamano katika Ethereum {#composability-in-ethereum}

### Mabadilishano ya tokeni {#token-swaps}

Ikiwa unaunda programu tumizi iliyogatuliwa (dapp) inayohitaji miamala kulipwa kwa ETH, unaweza kuruhusu watumiaji kulipa kwa tokeni nyingine za ERC-20 kwa kuunganisha mantiki ya badilishano la tokeni. Msimbo utabadilisha kiotomatiki tokeni ya mtumiaji kuwa ETH kabla ya mkataba kutekeleza utendakazi ulioitwa.

### Utawala {#governance}

Kujenga mifumo maalum ya utawala kwa ajili ya [DAO](/dao/) kunaweza kuwa ghali na kuchukua muda mwingi. Badala yake, unaweza kutumia zana za utawala za chanzo wazi, kama vile [Aragon Client](https://client.aragon.org/), kuanzisha DAO yako ili kuunda haraka mfumo wa utawala.

### Usimamizi wa utambulisho {#identity-management}

Badala ya kujenga mfumo maalum wa uthibitishaji au kutegemea watoa huduma waliowekwa kati, unaweza kuunganisha zana za utambulisho uliogatuliwa (DID) ili kusimamia uthibitishaji kwa watumiaji. Mfano ni [SpruceID](https://www.spruceid.com/), zana ya chanzo wazi ambayo inatoa utendaji wa "Ingia na Ethereum" unaoruhusu watumiaji kuthibitisha utambulisho wao kwa kutumia mkoba wa Ethereum.

## Mafunzo yanayohusiana {#related-tutorials}

- [Anzisha usanidi wako wa mbele wa dapp ukitumia create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Muhtasari wa jinsi ya kutumia create-eth-app kuunda programu zilizo na mikataba mahiri maarufu kwa chaguomsingi._

## Usomaji zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_

- [Utangamano ni Ubunifu](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Kwa Nini Utangamano ni Muhimu kwa Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [Utangamano ni Nini?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
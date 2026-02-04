---
title: Uundikaji wa mkataba-erevu
description: Jifunze jinsi mikataba-erevu inavyoweza kuunganishwa kama bloku za Lego ili kuunda dapps changamano kwa kutumia tena vijenzi vilivyopo.
lang: sw
incomplete: true
---

## Utangulizi mfupi {#a-brief-introduction}

Mikataba-erevu ni ya umma kwenye Ethereum na inaweza kufikiriwa kama API zilizo wazi. Huhitaji kuandika mkataba-erevu wako mwenyewe ili kuwa msanidi programu wa dapp, unahitaji tu kujua jinsi ya kuingiliana nao. Kwa mfano, unaweza kutumia mikataba-erevu iliyopo ya [Uniswap](https://uniswap.exchange/swap), exchange ya ugatuzi, kushughulikia mantiki yote ya ubadilishaji wa tokeni katika programu yako – huhitaji kuanza kutoka mwanzo. Angalia baadhi ya mikataba yao ya [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) na [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## Uundikaji ni nini? {#what-is-composability}

Uundikaji ni kuunganisha vijenzi tofauti ili kuunda mifumo au matokeo mapya. Katika usanidi wa programu, uundikaji unamaanisha wasanidi programu wanaweza kutumia tena vijenzi vya programu vilivyopo ili kuunda programu mpya. Njia nzuri ya kuelewa uundikaji ni kufikiria vijenzi vinavyoundika kama bloku za Lego. Kila Lego inaweza kuunganishwa na nyingine, kukuruhusu kujenga miundo tata kwa kuunganisha Lego tofauti.

Katika Ethereum, kila mkataba-erevu ni kama Lego—unaweza kutumia mikataba-erevu kutoka kwa miradi mingine kama bloku za ujenzi za mradi wako. Hii inamaanisha si lazima utumie muda kugundua upya gurudumu au kujenga kutoka mwanzo.

## Uundikaji hufanyaje kazi? {#how-does-composability-work}

Mikataba-erevu ya Ethereum ni kama API za umma, kwa hivyo mtu yeyote anaweza kuingiliana na mkataba au kuijumuisha kwenye dapps kwa utendakazi ulioongezwa. Uundikaji wa mkataba-erevu kwa ujumla hufanya kazi kwa kanuni tatu: umodula, uhuru, na ugundulikaji:

\*\*1. **Umodula**: Huu ni uwezo wa vijenzi binafsi kutekeleza kazi maalum. Katika Ethereum, kila mkataba-erevu una kesi maalum ya utumiaji (kama inavyoonyeshwa kwenye mfano wa Uniswap).

\*\*2. **Uhuru**: Vijenzi vinavyoundika lazima viweze kufanya kazi kwa kujitegemea. Kila mkataba-erevu katika Ethereum unajitekeleza na unaweza kufanya kazi bila kutegemea sehemu zingine za mfumo.

\*\*3. **Ugundulikaji**: Wasanidi programu hawawezi kuita mikataba ya nje au kuunganisha maktaba za programu katika programu ikiwa hazipatikani kwa umma. Kwa muundo, mikataba-erevu ni chanzo-wazi; mtu yeyote anaweza kuita mkataba-erevu au kufanya mgawanyiko wa msimbo.

## Faida za uundikaji {#benefits-of-composability}

### Mzunguko mfupi wa usanidi {#shorter-development-cycle}

Uundikaji hupunguza kazi ambayo wasanidi programu wanapaswa kufanya wakati wa kuunda [dapps](/apps/#what-are-dapps). [Kama anavyosema Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) "Chanzo-wazi inamaanisha kila tatizo linapaswa kutatuliwa mara moja."

Ikiwa kuna mkataba-erevu unaotatua tatizo moja, wasanidi programu wengine wanaweza kuutumia tena, kwa hivyo si lazima watatue tatizo lile lile. Kwa njia hii, wasanidi programu wanaweza kuchukua maktaba zilizopo za programu na kuongeza utendakazi wa ziada ili kuunda dapps mpya.

### Ubunifu mkuu {#greater-innovation}

Uundikaji unahimiza uvumbuzi na majaribio kwa sababu wasanidi programu wako huru kutumia tena, kurekebisha, kunakili, au kuunganisha msimbo wa chanzo-wazi ili kuunda matokeo yanayohitajika. Matokeo yake, timu za usanidi hutumia muda mchache kwenye utendakazi wa msingi na zinaweza kutenga muda zaidi kujaribu vipengele vipya.

### Uzoefu bora wa mtumiaji {#better-user-experience}

Utangamano kati ya vijenzi vya mfumo ikolojia wa Ethereum huboresha uzoefu wa mtumiaji. Watumiaji wanaweza kufikia utendakazi mkuu wakati dapps zinapounganisha mikataba-erevu ya nje kuliko katika mfumo ikolojia uliogawanyika ambapo programu haziwezi kuwasiliana.

Tutatumia mfano kutoka kwa biashara ya arbitraji ili kuonyesha manufaa ya utangamano:

Ikiwa tokeni inauzwa kwa bei ya juu kwenye `exchange A` kuliko `exchange B`, unaweza kutumia tofauti ya bei kupata faida. Hata hivyo, unaweza kufanya hivyo tu ikiwa una mtaji wa kutosha kufadhili muamala (yaani, kununua tokeni kutoka `exchange B` na kuiuza kwenye `exchange A`).

Katika hali ambapo huna fedha za kutosha kulipia biashara, mkopo wa haraka unaweza kuwa bora. [Mikopo ya haraka](/defi/#flash-loans) ni ya kiufundi sana, lakini wazo la msingi ni kwamba unaweza kukopa mali (bila dhamana) na kuirejesha ndani ya muamala _mmoja_.

Tukirejea kwenye mfano wetu wa awali, mfanyabiashara wa arbitraji anaweza kuchukua mkopo mkubwa wa haraka, kununua tokeni kutoka `exchange B`, kuziuza kwenye `exchange A`, kulipa mtaji + riba, na kubaki na faida, yote ndani ya muamala mmoja. Mantiki hii changamano inahitaji kuchanganya wito kwa mikataba mingi, jambo ambalo lisingewezekana kama mikataba-erevu ingekosa utangamano.

## Mifano ya uundikaji katika Ethereum {#composability-in-ethereum}

### Kubadilisha tokeni {#token-swaps}

Ukitengeneza dapp inayohitaji miamala kulipwa kwa ETH, unaweza kuwaruhusu watumiaji kulipa kwa tokeni zingine za ERC-20 kwa kuunganisha mantiki ya ubadilishaji wa tokeni. Msimbo utabadilisha kiotomatiki tokeni ya mtumiaji kuwa ETH kabla ya mkataba kutekeleza kitendakazi kilichoitwa.

### Utawala {#governance}

Kujenga mifumo ya utawala maalum kwa [DAO](/dao/) kunaweza kuwa ghali na kuchukua muda. Badala yake, unaweza kutumia zana ya utawala ya chanzo-wazi, kama vile [Aragon Client](https://client.aragon.org/), ili kuanzisha DAO yako na kuunda haraka mfumo wa utawala.

### Usimamizi wa utambulisho {#identity-management}

Badala ya kuunda mfumo maalum wa uthibitishaji au kutegemea watoa huduma wa kati, unaweza kuunganisha zana za utambulisho uliogatuliwa (DID) ili kudhibiti uthibitishaji kwa watumiaji. Mfano ni [SpruceID](https://www.spruceid.com/), zana ya chanzo-wazi ambayo inatoa utendakazi wa "Ingia na Ethereum" unaowaruhusu watumiaji kuthibitisha utambulisho na pochi ya Ethereum.

## Mafunzo yanayohusiana {#related-tutorials}

- [Anzisha usanidi wako wa frontend wa dapp na create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Muhtasari wa jinsi ya kutumia create-eth-app kuunda programu zenye mikataba-erevu maarufu tayari kwa matumizi._

## Masomo zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_

- [Uundikaji ni Ubunifu](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Kwa Nini Uundikaji ni Muhimu kwa Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [Uundikaji ni Nini?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
